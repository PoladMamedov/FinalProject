import commentsTypes from "../type/comments";

const initialState = {
  comments: [],
};

// eslint-disable-next-line default-param-last
function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case commentsTypes.FILL_COMMENTS:
      return {
        ...state,
        comments: [...action.payload.comments],
      };
      case commentsTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
      };
      case commentsTypes.REMOVE_COMMENT:
      return {
        ...state,
        comments: [...state.comments.filter(({_id: ID}) => ID !== action.payload.commentID)],
      };
      case commentsTypes.UPDATE_COMMENT:
      return {
        ...state,
        comments: [...state.comments.map((comment) => {
          // eslint-disable-next-line no-underscore-dangle
          if (comment._id === action.payload.commentID) return action.payload.updatedComment;
          return comment;
        })]
      };
    default:
      return state;
  }
}

export default commentsReducer;
