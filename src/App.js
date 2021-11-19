import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import TelaPrincipal from './pages/TelaPrincipal';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ TelaPrincipal } />
        <Route path="/Cart" component={ Cart } />
        <Route path="/product-details" component={ ProductDetails } />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
