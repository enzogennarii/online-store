import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

import './App.css';

function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/products/:productId" component={ ProductDetail } />
      </Switch>
    </main>
  );
}

export default App;
