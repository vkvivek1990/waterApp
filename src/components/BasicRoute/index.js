import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mapspage from '../../pages/Mapspage/indexMap';
import App from '../../App';

export default class BasicRoute extends React.Component {
   render() {
      return (
          <React.Fragment>
                  <Router>
         <div>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/maps">Maps</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            </ul>
         </div>
         <Switch>
          <Route path="/maps"> <Mapspage /> </Route>
          <Route path="/"> <App /> </Route>
        </Switch>
        </Router>
         </React.Fragment>
      )
   }
}
