import Resolutions from "./resolutions";
import Goals from "../goals/goals";

export default {
  Query: {
    resolutions(obj, args, context) {
      const userId = context.user === undefined ? null : context.user._id;

      return Resolutions.find({ userId }).fetch();
    },
  },

  Resolution: {
    goals: (resolution) =>
      Goals.find({
        resolutionId: resolution._id,
      }).fetch(),

    completed: (resolution) => {
      const goals = Goals.find({
        resolutionId: resolution._id,
      }).fetch();
      if (goals.length === 0) return false;
      const completedGoals = goals.filter((goal) => goal.completed);
      return goals.length === completedGoals.length;
    },
  },

  Mutation: {
    createResolution(obj, args, context) {
      const userId = context.user === undefined ? null : context.user._id;
      const resolutionsId = Resolutions.insert({
        name: args.name,
        userId: userId,
      });
      return Resolutions.findOne(resolutionsId);
    },
  },
};
