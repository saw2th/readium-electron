import path from "path";
import process from "process";

import * as ActionType from 'renderer/constants/ActionType'

function buildState(directoryPath) {
  return {
    name: path.basename(directoryPath),
    path: path.normalize(directoryPath)
  }
}

const initialState = buildState(process.cwd());

export default function currentDirectory(state = initialState, action) {
  switch (action.type) {
    case ActionType.EXPLORE:
      return buildState(action.path);
    case ActionType.EXPLORE_UP:
      return buildState(path.dirname(state.path));
    default:
      return state;
  }
}