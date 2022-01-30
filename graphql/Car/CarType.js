var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLBoolean = require('graphql').GraphQLBoolean;

exports.CarType = new GraphQLObjectType({
  name: 'Car',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    doors: { type: GraphQLInt },
    seats: { type: GraphQLInt },
    pricePerDay: { type: GraphQLInt },
    availability: { type: GraphQLBoolean },
    manufacturer: { type: GraphQLString },
    owner: { type: GraphQLString },
    location: { type: GraphQLString }
  }
})