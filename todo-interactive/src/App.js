import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Todo from './components/Todo';

function App() {
    return (
        <Router>
          <div className="App">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/index" element={<Todo />} />
            </Routes>
          </div>
        </Router>
      );
}

export default App;
