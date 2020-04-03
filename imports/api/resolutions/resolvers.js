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
    goals: (resolution) => {
      console.log(Goals.find({ resolutionId: resolution._id }).fetch());
      return Goals.find({ resolutionId: resolution._id }).fetch();
    },
  },

  Mutation: {
    createResolution(obj, args, context) {
      const resolutionsId = Resolutions.insert({
        name: args.name,
        userId: context.user._id,
      });
      return Resolutions.findOne(resolutionsId);
    },
  },
};
