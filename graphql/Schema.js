var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var query = require('./Query').Query;
var mutation = require('./Mutations')

exports.Schema = new GraphQLSchema({
  query: query,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
})