import './App.css';
import { Login } from './components/SignIn&login/login';
import { SingUp } from './components/SignIn&login/signup';
import  {Route, HashRouter as Router,Switch} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={SingUp}  /> 
          {/* <Route path="/signup" component={SingUp} /> */}
        </Switch>
        
      </Router>

    </div>
  );
}

export default App;
