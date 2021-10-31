import { combineReducers } from 'redux';
import {
  FINISH_TIME,
  RESET_TIME,
  FETCH_RECORDS,
  ACTIVE_COMPONENT
} from '../actions/actionTypes';

function finishTime(state = null, action: any) {
  switch (action.type) {
    case FINISH_TIME:
      return action.time;
    case RESET_TIME:
      return null;
    default:
      return state;
  }
}

function dbRecords(state = null, action: any) {
  switch (action.type) {
    case FETCH_RECORDS:
      return action.top10Records;
    default:
      return state;
  }
}

function activeComponent(state = null, action: any) {
  switch (action.type) {
    case ACTIVE_COMPONENT:
      return action.currentActive;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  finishTime,
  dbRecords,
  activeComponent
});

export default rootReducer;
