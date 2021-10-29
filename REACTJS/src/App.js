import './App.css';
import Navigation from './components/Navigation';
// import Home from './components/Home';
import Department from './components/Department';
import Employee from './components/Employee';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <div className="container">
          <Switch>
            <Route exact path="/department">
              <Department></Department>
            </Route>
            <Route exact path="/employee">
              <Employee></Employee>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
