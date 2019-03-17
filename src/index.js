import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import rootReducer from './reducers.js'
import firebase from 'firebase/app'
import 'firebase/firestore'
import fbConfig from './config.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk.withExtraArgument(getFirestore))))

const rrfConfig = {
  useFirestoreForProfile: true
}

firebase.initializeApp(fbConfig)
firebase.firestore()

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(<Provider store={store}>
  <ReactReduxFirebaseProvider {...rrfProps}>
    <App />
  </ReactReduxFirebaseProvider>
</Provider>, document.getElementById('root'))
