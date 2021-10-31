import axios from 'axios';
import {
  FINISH_TIME,
  RESET_TIME,
  FETCH_RECORDS,
  ACTIVE_COMPONENT
} from './actionTypes';

const serverPort = '8080'; //TODO change to server port
const dbURI = `${window.location.protocol}//${window.location.hostname}:${serverPort}`;

export function finishTime(time: number) {
  return {
    type: 'FINISH_TIME',
    time
  };
}

export function resetTime() {
  return {
    type: RESET_TIME
  };
}

function saveRecordsToStore(top10Records: any) {
  return {
    type: FETCH_RECORDS,
    top10Records
  };
}

export function fetchRecords() {
  return function(dispatch: any) {
    console.log('Fetch funcion uri', dbURI);
    axios
      .get(dbURI + '/top_10_records')
      .then(result => dispatch(saveRecordsToStore(result.data)));
  };
}

export function activeComponent(currentActive: string) {
  return {
    type: ACTIVE_COMPONENT,
    currentActive
  };
}
