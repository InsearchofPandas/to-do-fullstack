import merge from 'lodash/merge';
// llklkoll00
import { getUser } from 'meteor/apollo';

import ResolutionSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionResolvers from '../../api/resolutions/resolvers';
import UsersSchema from '../../api/users/User.graphql';
import UsersResolvers from '../../api/users/resolvers';
import GoalsSchema from '../../api/goals/Goal.graphql';
import GoalsResolvers from '../../api/goals/resolvers';

Meteor.publish('currentUser', function () {
  return Meteor.users.find(
    { _id: this.userId },
    {
      fields: {
        email: 1,
      },
    }
  );
});

const { ApolloServer } = require('apollo-server');

const typeDefs = [ResolutionSchema, UsersSchema, GoalsSchema];

const resolvers = merge(UsersResolvers, ResolutionResolvers, GoalsResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
