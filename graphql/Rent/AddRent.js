var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var RentType = require('./RentType').RentType;
var RentModel = require('./Rent');

exports.AddRent = {
  type: RentType,
  args: {
    days: { type: new GraphQLNonNull(GraphQLInt) },
    carId: { type: new GraphQLNonNull(GraphQLString) },
    accountId: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve: async(root, args)=> {
 //under the resolve method we get our arguments
    args.startedAt = new Date().getTime()

    const uModel = new RentModel(args);
    const newRent = await uModel.save();
    if (!newRent) {
      throw new Error('error');
    }
    return newRent
  }
}