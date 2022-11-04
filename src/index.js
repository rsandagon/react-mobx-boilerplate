
import "./assets/css/base.css"
import "./assets/css/main.css"

import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router } from 'react-router'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'
import App from './App'
import AppStore from './store/AppStore'

// stores
const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

const serviceStore = new ServiceStore()
const appStore = new AppStore(serviceStore)

//const socket = io.connect("http://localhost:9001/");
const socket = {}

const stores = {
  routing: routingStore,
  appStore: appStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);