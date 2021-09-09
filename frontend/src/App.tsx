import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { User } from './API';
import { Collections } from './pages/Collections';
import { Dashboard } from './pages/Dashboard';
import { Header } from './pages/Header';
import { Login } from './pages/Login';
import { PageNotFound } from './pages/PageNotFound';
import { Settings } from './pages/Settings';
import { Sidebar } from './pages/Sidebar';
import { SingleCollection } from './pages/SingleCollection';
import { State } from './state';

/**
 * Main app component
 */
const App = (): JSX.Element => {
  const user: User = useSelector((state: State) => state.user)

  // TODO: Implement Authentication
  if (false) {
    return <Login />
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
              <Dashboard user={user} />
            </Route>
            <Route path="/collections/:id">
              <SingleCollection />
            </Route>
            <Route path="/collections">
              <Collections />
            </Route>
            <Route path="/settings">
              <Settings user={user} />
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
