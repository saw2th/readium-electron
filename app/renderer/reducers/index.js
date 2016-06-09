import { combineReducers } from 'redux'
import currentDirectory from './currentDirectory'
import currentBook from './currentBook'
import view from './view'

const reducers = combineReducers({
  currentDirectory,
  currentBook,
  view
})

export default reducers;