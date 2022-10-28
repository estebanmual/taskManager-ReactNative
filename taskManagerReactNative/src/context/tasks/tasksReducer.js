const TasksReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: action.payload.tasks,
      };
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
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default TasksReducer;
