var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var carType = require('./CarType').CarType;
var CarModel = require('./Car');

exports.DeleteCar = {
  type: carType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async(root, args)=> {
    const removedCar = await CarModel.findByIdAndRemove(args.id)
    if (!removedCar) {
      throw new Error('error')
    }
    return removedCar;
  }
}