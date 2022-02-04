var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLDate = require('graphql').GraphQLDate;
var GraphQLDateTime = require('graphql').GraphQLTime;

exports.RentType = new GraphQLObjectType({
  name: 'Rent',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    days: { type: new GraphQLNonNull(GraphQLInt) },
    carId: { type: new GraphQLNonNull(GraphQLString) },
    accountId: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    canceled: { type: GraphQLBoolean },
    startedAt: { type: GraphQLString },
    finishedAt: { type: GraphQLString }
  }
})
