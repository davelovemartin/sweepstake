import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const initState = {}
const uiState = {
  order: '',
  showDetails: false,
  showEmail: false,
  showStripe: false,
  showTimes: false,
  showThankyou: false,
}

const uiReducer = (state = uiState, action) => {
  switch (action.type) {
    case 'SHOW_DETAILS':
      return Object.assign({}, state, {
        showDetails: action.status
      })
    case 'UPDATE_ORDER':
    console.log(action.order)
      return Object.assign({}, state, {
        order: action.order
      })
    case 'SHOW_EMAIL':
      return Object.assign({}, state, {
        showEmail: action.status
      })
    case 'SHOW_STRIPE':
      return Object.assign({}, state, {
        showStripe: action.status
      })
    case 'SHOW_TIMES':
      return Object.assign({}, state, {
        showTimes: action.status
      })
    case 'SHOW_THANKYOU':
      return Object.assign({}, state, {
        showThankyou: action.status
      })
    default:
      return state
  }
}

const timeSlotReducer = (state = initState, action) => { 
  switch (action.type) {
    case 'UPDATE_TIMESLOT':
      console.log('update sent')
      return state
    case 'CREATE_PROJECT_ERROR':
      console.log(action.err)
      return state
    default: 
      return state
  }
}

export default combineReducers({
  ui: uiReducer,
  timeSlot: timeSlotReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

