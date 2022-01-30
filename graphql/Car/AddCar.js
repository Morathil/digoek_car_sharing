var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var carType = require('./CarType').CarType;
var CarModel = require('./Car');

exports.AddCar = {
  type: carType,
  args: {
    doors: { type: new GraphQLNonNull(GraphQLInt) },
    seats: { type: new GraphQLNonNull(GraphQLInt) },
    pricePerDay: { type: new GraphQLNonNull(GraphQLInt) },
    availability: { type: new GraphQLNonNull(GraphQLBoolean) },
    manufacturer: { type: new GraphQLNonNull(GraphQLString) },
    owner: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async(root, args)=> {
 //under the resolve method we get our arguments
  
    const uModel = new CarModel(args);
    const newCar = await uModel.save();
    if (!newCar) {
      throw new Error('error');
    }
    return newCar
  }
}