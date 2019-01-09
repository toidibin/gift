import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/home/Index'
import Question from './pages/question/Index'

const AppRouter = () => (
  <Router>
    <div>  
      <Route path="/" exact component={Home} />
      <Route path="/question" component={Question} />
    </div>
  </Router>
);

export default AppRouter;