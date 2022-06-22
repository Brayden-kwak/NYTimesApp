const initialState = {
  postStar: [],
  postTitle: [],
  postDate: [],
  postKeyword: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_STAR':
      return Object.assign({}, state, {
        postStar: [...state.postStar, action.payload],
      });
    case 'ADD_TITLE':
      return Object.assign({}, state, {
        postTitle: [...state.postTitle, action.payload],
      });
    case 'ADD_DATE':
      return Object.assign({}, state, {
        postDate: [...state.postDate, action.payload],
      });
    case 'ADD_KEYWORD':
      return Object.assign({}, state, {
        postKeyword: [...state.postKeyword, action.payload],
      });
    case 'DELETE_STAR':
      let newStarItems = state.postStar.filter(stars => {
        return stars !== action.payload;
      });
      return Object.assign({}, state, {
        postStar: newStarItems,
      });
    default:
      return state;
  }
};

export default reducers;
