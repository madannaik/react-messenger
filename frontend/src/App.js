import './App.css';
import { Login } from './pages/login';
import { SignUp } from './pages/singUp';
import  {Route, HashRouter as Router} from 'react-router-dom';
import { ChatScreen } from './pages/chatScreen';
import Editprofile from './pages/Editprofile';

function App() {
 return (
    
    <Router basename={'/client'}> 
          <Route exact path="/" component={SignUp}  /> 
          <Route exact path="/login" component={Login} />
          <Route exact path="/chat" component={ChatScreen}  /> 
          <Route exact path="/chat/editprofile" component={Editprofile}  /> 
    </Router>
  );
}

export default App;
