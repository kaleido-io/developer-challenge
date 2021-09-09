import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { User } from './API';
import { Collections } from './pages/Collections';
import { Dashboard } from './pages/Dashboard';
import { Header } from './pages/Header';
import { Login } from './pages/Login';
import { PageNotFound } from './pages/PageNotFound';
import { Settings } from './pages/Settings';
import { Sidebar } from './pages/Sidebar';
import { SingleCollection } from './pages/SingleCollection';
import { actionCreators, State } from './state';

/**
 * Main app component
 */
const App = (): JSX.Element => {
  const user: User = useSelector((state: State) => state.user)
  const dispatch = useDispatch();
  const { fetchUser } = bindActionCreators(actionCreators, dispatch)

  // Check for logged in user
  const ethAddress = localStorage.getItem('loggedIn')

  // If user not logged in
  if (!ethAddress) {
    return <Login />
  } else if (ethAddress && !user.id.length) {
    fetchUser(ethAddress)
  }

  return (
    <div className="relative h-screen flex overflow-hidden bg-faded">
      {/* Sidebar */}
      <Sidebar />
      {/* Main section */}
      <div className="flex-1 overflow-auto focus:outline-none">
        {/* Top header */}
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/dashboard"]}>
              <Dashboard />
            </Route>
            <Route path="/collections/:id">
              <SingleCollection />
            </Route>
            <Route path="/collections">
              <Collections />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/404" />
            <PageNotFound />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </div>
    </div >
  );
}

export default App;
