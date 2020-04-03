export default {
  Query: {
    user(obj, args, context) {
      // console.log(context);
      //   console.log(context.user.emails);
      return context.user;
    },
  },
  User: {
    email: (user) => user.emails[0].address,
  },
};
