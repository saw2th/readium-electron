import path from "path";
import process from "process";

import * as ActionType from '../constants/ActionType'
import * as ViewType from '../constants/ViewType'

const initialState = ViewType.EXPLORER;

export default function view(state = initialState, action) {
  switch (action.type) {
    case ActionType.BOOK_VIEW:
      return ViewType.BOOK;
    default:
      return initialState;
  }
}