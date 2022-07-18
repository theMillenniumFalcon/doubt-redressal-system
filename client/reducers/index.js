import { combineReducers } from 'redux'

import doubts from './doubts'
import answers from './answers'
import comments from './comments'
import users from './users'

export default combineReducers({ doubts, comments, users, answers })