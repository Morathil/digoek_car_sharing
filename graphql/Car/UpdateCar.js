var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var carType = require('./CarType').CarType;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var CarModel = require('./Car');

exports.UpdateCar = {
    type: carType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        availability: { type: new GraphQLNonNull(GraphQLBoolean) }
    },
    resolve: async(root, args) =>{
        const updatedCar = await CarModel.findByIdAndUpdate(args.id,args);
        if (!updatedCar) {
          throw new Error('Error')
        }
        return updatedCar;
    }
}