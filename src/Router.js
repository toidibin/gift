import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/home/Index'
import Question from './pages/question/Index'
import Subscriptions from './pages/subscriptions/Index'

const AppRouter = () => (
  <Router>
    <div>  
      <Route path="/" exact component={Home} />
      <Route path="/question" component={Question} />
			<Route path="/subscribe" component={Subscriptions} />
    </div>
  </Router>
);

export default AppRouter;