import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header'
import Questionnaire from './components/Questionnaire';
import Register from './components/Register';
import Results from './components/Results';
import Login from './components/admin/Login';

import { UserProvider } from './providers/user';
import { AuthProvider } from './providers/auth';
import Dashboard from './components/admin/Dashboard';

function App() {
  return (
    <AuthProvider>
    <UserProvider>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Register/>
          </Route>
          <Route exact path="/cuestionario">
            <Questionnaire/>
          </Route>
          <Route exact path="/resultados">
            <Results/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard/>
          </Route>
        </Switch>
      </Router>
    </UserProvider>
    </AuthProvider>
  );
}



export default App;
