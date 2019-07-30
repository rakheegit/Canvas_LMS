// App.js

import React, { Component } from 'react';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      
        {/* App Child Component Main*/}
        <Main />
     
    </BrowserRouter>
    </Provider>
    );
  }
  
}

export default App;



