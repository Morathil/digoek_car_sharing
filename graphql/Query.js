var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLBoolean = require('graphql').GraphQLBoolean;

var CarModel = require('./Car/Car');
var carType = require('./Car/CarType').CarType;

var RentModel = require('./Rent/Rent');
var rentType = require('./Rent/RentType').RentType;

// Query
exports.Query = new GraphQLObjectType({
  name: 'Query',
  fields:  ()=> {
    return {
      cars: {
        type: new GraphQLList(carType),
        resolve:  async ()=> {
          const cars = await CarModel.find()
          if (!cars) {
            throw new Error('error while fetching data')
          }
          return cars
        }
      },
      carsFiltered: {
        type: new GraphQLList(carType),
        args: {
          location: { type: new GraphQLNonNull(GraphQLString) },
          availability: { type: new GraphQLNonNull(GraphQLBoolean) }
        },
        resolve: async (root, args)=> {
          const cars = await CarModel.find({ location: args.location, availability: args.availability })
          if (!cars) {
            throw new Error('error while fetching data')
          }
          return cars
        }
      },      
      rent: {
        type: new GraphQLList(carType),
        resolve:  async ()=> {
          const cars = await RentModel.find()
          if (!cars) {
            throw new Error('error while fetching data')
          }
          return cars
        }        
      },
      rentsActive: {
        type: new GraphQLList(carType),
        resolve:  async ()=> {
          const cars = await RentModel.find({ cancelled: false, finishedAt: undefined })
          if (!cars) {
            throw new Error('error while fetching data')
          }
          return cars
        }        
      }      
    }
  }
})