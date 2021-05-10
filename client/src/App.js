import './App.css';
import { Login } from './components/SignIn&login/login';
import { SignUp } from './components/SignIn&login/singUp';
import  {Route, HashRouter as Router} from 'react-router-dom';
import { ChatScreen } from './components/chat/chatScreen';
function App() {
  return (
    // <div>
    //   <ChatScreen/>
    // </div>
    <Router> 
          <Route exact path="/" component={Login}  /> 
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/chat" component={ChatScreen}  /> 
    </Router>
  );
}

export default App;
