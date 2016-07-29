import path from "path";
import process from "process";

import * as ActionType from 'renderer/constants/ActionType'
import * as ViewType from 'renderer/constants/ViewType'

const initialState = ViewType.EXPLORER;

export default function view(state = initialState, action) {
  switch (action.type) {
    case ActionType.BOOK_VIEW:
      return ViewType.BOOK;
    case ActionType.EXPLORE:
      return ViewType.EXPLORER;
    case ActionType.EXPLORE_UP:
      return ViewType.EXPLORER;
    default:
      return state;
  }
}