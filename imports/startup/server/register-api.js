const { ApolloServer, gql } = require('apollo-server');
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge'

import ResolutionSchema from '../../api/resolutions/Resolutions.graphql'
import ResolutionResolvers from '../../api/resolutions/resolvers'

const TestSchema = `
type Query {
    hi: String
    resolutions: [Resolution]
}`

const typeDefs = [ 
    TestSchema,
    ResolutionSchema
];

const testResolvers = {
    Query: {
        hi() {
            return "Hello ME!";
        }}}

const resolvers = merge(testResolvers, ResolutionResolvers)

const schema = makeExecutableSchema({typeDefs, resolvers})

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });