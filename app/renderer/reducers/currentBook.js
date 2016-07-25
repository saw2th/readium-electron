import path from "path";
import process from "process";

import * as ActionType from '../constants/ActionType'

const initialState = {
  path: null
}

export default function currentBook(state = initialState, action) {
  switch (action.type) {
    case ActionType.BOOK_VIEW:
      return action.book;
    case ActionType.BOOK_CLOSE:
      return initialState;
    default:
      return state;
  }
}