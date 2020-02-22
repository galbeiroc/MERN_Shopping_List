import React from 'react';
import AppNabar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css'


import './App.css';

function App() {
  return (
    <div>
       <AppNabar />
       <ShoppingList />
    </div>
  );
}

export default App;
