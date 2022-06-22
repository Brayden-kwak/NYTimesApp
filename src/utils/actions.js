export const addToStar = item => {
  return dispatch => {
    dispatch({
      type: 'ADD_STAR',
      payload: item,
    });
  };
};

export const addToTitle = item => {
  return dispatch => {
    dispatch({
      type: 'ADD_TITLE',
      payload: item,
    });
  };
};

export const addToDate = item => {
  return dispatch => {
    dispatch({
      type: 'ADD_DATE',
      payload: item,
    });
  };
};

export const addToKeyword = item => {
  return dispatch => {
    dispatch({
      type: 'ADD_KEYWORD',
      payload: item,
    });
  };
};

export const deleteToStar = item => {
  return dispatch => {
    dispatch({
      type: 'DELETE_STAR',
      payload: item,
    });
  };
};
