import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import TelaPrincipal from './pages/TelaPrincipal';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ TelaPrincipal } />
        <Route path="/Cart" component={ Cart } />
        <Route path="/product-details" component={ ProductDetails } />
        <Route path="/Checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
