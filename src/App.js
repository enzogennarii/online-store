import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <main className="App">
      <Switch>
        <Route exact path="/" component={ Home } />
      </Switch>
    </main>
  );
}

export default App;
