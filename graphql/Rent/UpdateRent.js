var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var RentType = require('./RentType').RentType;
var RentModel = require('./Rent');
var GraphQLInt = require('graphql').GraphQLInt;
var CarModel = require('../Car/Car');

exports.UpdateRent = {
    type: RentType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      days: { type: new GraphQLNonNull(GraphQLInt) },
      carId: { type: new GraphQLNonNull(GraphQLString) },
      accountId: { type: new GraphQLNonNull(GraphQLString) },
      price: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async(root, args) =>{
        const updatedCar = await RentModel.findByIdAndUpdate(args.id,args);
        if (!updatedCar) {
          throw new Error('Error')
        }
        return updatedCar;
    }
}

exports.CancelRent = {
  type: RentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async(root, args) =>{
      args.canceled = true
      args.finishedAt = new Date().toISOString().slice(0, 10)

      const updatedRent = await RentModel.findByIdAndUpdate(args.id,args);
      await CarModel.findByIdAndUpdate(updatedRent.carId, { availability: true })
      if (!updatedRent) {
        throw new Error('Error')
      }
      return updatedRent;
  }
}
