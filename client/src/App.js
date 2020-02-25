import React, { Component } from 'react';
import AppNabar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppNabar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
