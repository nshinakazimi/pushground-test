const initialData = {
  events: null,
  audiences: null,
};

const data = (state = initialData, action) => {
  switch (action.type) {
    case "GET_AUDIENCES":
      return {
        ...state,
        audiences: action.data,
      };
    case "GET_EVENTS":
      return {
        ...state,
        events: action.data,
      };
    default:
      return state;
  }
};

export default data;
