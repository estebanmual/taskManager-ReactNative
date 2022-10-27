const TasksReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      if (action.payload.orderTasks) {
        return {
          ...state,
          tasks: action.payload.orderTasks,
        };
      } else {
        return {
          ...state,
          tasks: [action.payload.task],
        };
      }
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(item => {
          if (item.id === action.payload.task.id) {
            return action.payload.task;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default TasksReducer;
