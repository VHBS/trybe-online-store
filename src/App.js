import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import TelaPrincipal from './pages/TelaPrincipal';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ TelaPrincipal } />
        <Route path="/Cart" component={ Cart } />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
