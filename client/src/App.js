import './App.css';
import { Login } from './components/SignIn&login/login';
import { SignUp } from './components/SignIn&login/singUp';
import  {Route, HashRouter as Router} from 'react-router-dom';
function App() {
  return (
    <Router> 
          <Route exact path="/" component={Login}  /> 
          <Route exact path="/signup" component={SignUp} />
    </Router>
  );
}

export default App;
