const TasksReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      };
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default TasksReducer;
