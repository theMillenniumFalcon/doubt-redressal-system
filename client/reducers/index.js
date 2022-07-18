import { combineReducers } from 'redux'

import doubts from './doubts'
import answers from './answers'
import comments from './comments'

export default combineReducers({ doubts, answers, comments })