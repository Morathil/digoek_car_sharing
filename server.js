const express = require('express')
const app = express()
const fs = require('fs');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const Schema = require('./graphql/Schema').Schema;
var CarModel = require('./graphql/Car/Car');
var RentModel = require('./graphql/Rent/Rent');
var UserModel = require('./graphql/User/User');
const https = require('https');
const http = require('http');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require("./middleware/auth");

mongoose.connect('mongodb://mongo/car_sharing', (err) => {
    if (err) throw err;
    console.log("connected to mongo");
})

// enable cross origin requests
app.use(cors())
// enable json parsed request bodies
app.use(express.json())
// serve static files from public folder
app.use(express.static('public'))

app.set('port', (process.env.PORT || 4000));

// GRAPHQL

//app.use('/graphql', auth, graphqlHTTP({
app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: global,
    graphiql: true
}));

// B2B INTERFACE

app.get('/cars/list_available', auth, async (req, res) => {
    const cars = await CarModel.find({ availability: true })
    return res.send(cars)
})

app.post('/cars/:carId/rent', auth, async (req, res) => {
    const updatedCar = await CarModel.findByIdAndUpdate(req.params.carId, { availability: false }); 
    const uModel = new RentModel({ days: req.body.days, carId: req.params.carId, accountId: req.body.accountId, price: req.body.price, startedAt: new Date().getTime() })
    const newRent = await uModel.save();

    return res.send({ rentId: newRent.id, carId: updatedCar.id })
})

app.post('/rent/:rentId/cancel', auth, async (req, res) => {
    const uModel = await RentModel.findByIdAndUpdate(req.params.rentId, {canceled: true, finishedAt: new Date().toISOString().slice(0, 10)})
    const updatedCar = await CarModel.findByIdAndUpdate(uModel.carId, { availability: true });
    const updatedRent = await uModel.save();

    return res.send({ rentId: updatedRent.id, carId: updatedCar.id })
})

// REGISTER / LOGIN

app.post("/register", async (req, res) => {
    try {
     // Get user input
     const { firstName, lastName, email, password } = req.body;

     // Validate user input
     if (!(email && password && firstName && lastName)) {
       res.status(400).send("All input is required");
     }

     // check if user already exist
     // Validate if user exist in our database
     const oldUser = await UserModel.findOne({ email });

     if (oldUser) {
       return res.status(409).send("User Already Exist. Please Login");
     }

     //Encrypt user password
     encryptedUserPassword = await bcrypt.hash(password, 10);

     // Create user in our database
     const user = await UserModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email.toLowerCase(), // sanitize
        password: encryptedUserPassword,
     });

     // Create token
     const token = jwt.sign(
       { user_id: user._id, email },
       'randomTokenKey',
       {
         expiresIn: "5h",
       }
     );
     // save user token
     user.token = token;

     // return new user
     res.status(201).json(user);
   } catch (err) {
     console.log(err);
   }
});

app.post("/login", async (req, res) => {
    try {
        // Get user input
        console.log(req.body)
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            'randomTokenKey',
            {
              expiresIn: "5h",
            }
          );

          // save user token
          user.token = token;

          // user
          return res.status(200).json(user);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

// HTTP

http.createServer(app).listen(4000, () => {
    console.log('HTTP server running on port 4000')
});

// HTTPS

https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'carsharing'
}, app).listen(443, () => {
    console.log('HTTPS server running on port 443')
});
