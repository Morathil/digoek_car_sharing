var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var RentType = require('./RentType').RentType;
var RentModel = require('./Rent');
var GraphQLInt = require('graphql').GraphQLInt;

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
      args.finishedAt = new Date().getTime()

      const updatedCar = await RentModel.findByIdAndUpdate(args.id,args);
      if (!updatedCar) {
        throw new Error('Error')
      }
      return updatedCar;
  }
}