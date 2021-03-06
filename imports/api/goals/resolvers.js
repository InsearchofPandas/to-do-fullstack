import Goals from './goals';

export default {
  Mutation: {
    createGoal(obj, args, context) {
      const goalId = Goals.insert({
        name: args.name,
        resolutionId: args.resolutionId,
        completed: false,
      });
      return Goals.findOne(goalId);
    },
    toggleGoal(obj, args, context) {
      const goal = Goals.findOne(args._id);
      Goals.update(args._id, {
        $set: {
          completed: !goal.completed,
        },
      });
      return Goals.findOne(args._id);
    },
    deleteGoal(obj, args) {
      const goal = Goals.findOne(args._id);

      Goals.remove(goal);
    },
  },
};
