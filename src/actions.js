export const updateTimeSlot = (props, timeSlot) => {
  return (dispatch) => {
    props.firestore.update({ collection: 'timeSlots', doc: timeSlot.id}, {
      name: timeSlot.name,
      order: timeSlot.order
    })
    .then(() => dispatch({ type: 'set_TIMESLOT', timeSlot}))
    .catch(err => dispatch({ type: 'CREATE_PROJECT_ERROR', err}))
  }
}

export const updateShowDetails = (status) => {
  return (dispatch) => {
    dispatch({ type: 'SHOW_DETAILS', status })
  }
}

export const updateOrder = (order) => {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_ORDER', order })
  }
}

export const updateShowEmail = (status) => {
  return (dispatch) => {
    dispatch({ type: 'SHOW_EMAIL', status })
  }
}

export const updateShowStripe = (status) => {
  return (dispatch) => {
    dispatch({ type: 'SHOW_STRIPE', status })
  }
}

export const updateShowTimes = (status) => {
  return (dispatch) => {
    dispatch({ type: 'SHOW_TIMES', status })
  }
}

export const updateShowThankyou = (status) => {
  return (dispatch) => {
    dispatch({ type: 'SHOW_THANKYOU', status })
  }
}