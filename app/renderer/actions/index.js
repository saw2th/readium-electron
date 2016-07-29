import path from "path";

import * as ActionType from 'renderer/constants/ActionType'

export function explore(path) {
  return {
    type: ActionType.EXPLORE,
    path: path
  }
}

export function exploreUp() {
  return {
    type: ActionType.EXPLORE_UP
  }
}

export function viewBook(book) {
  return {
    type: ActionType.BOOK_VIEW,
    book: book
  }
};