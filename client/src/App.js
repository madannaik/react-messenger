import './App.css';
import { Login } from './components/SignIn&login/login';
import { SignUp } from './components/SignIn&login/singUp';
import  {Route, HashRouter as Router} from 'react-router-dom';
import { ChatScreen } from './components/chat/chatScreen';
import Editprofile from './components/chat/Editprofile';
function App() {
  return (
    // <div>
    //   <ChatScreen/>
    // </div>
    <Router> 
          <Route exact path="/" component={Login}  /> 
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/chat" component={ChatScreen}  /> 
          <Route exact path="/chat/editprofile" component={Editprofile}  /> 
    </Router>
  );
}

export default App;
