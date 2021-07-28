import './App.css';
import { Login } from './pages/login';
import { SignUp } from './pages/singUp';
import  {Route, HashRouter as Router} from 'react-router-dom';
import { ChatScreen } from './pages/chatScreen';
import Editprofile from './pages/Editprofile';
import { ReactReduxContext } from "react-redux";
import { useContext } from "react";

function App() {
 
 const context = useContext(ReactReduxContext);

  return (
    
    <Router> 
          <Route exact path="/" component={Login}  /> 
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/chat" component={ChatScreen}  /> 
          <Route exact path="/chat/editprofile" component={Editprofile}  /> 
    </Router>
  );
}

export default App;
