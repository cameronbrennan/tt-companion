import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import PrivateRoute from "../../components/Utils/PrivateRoute";
import "./App.css";
import userService from "../../utils/userService";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import Home from "../Home/Home";
import UserProfile from "../UserProfile/UserProfile";
import CharacterCreate from "../CharacterCreate/CharacterCreate";
import CharactersPage from "../CharactersPage/CharactersPage";
import CharacterProfile from "../CharacterProfile/CharacterProfile";

function App() {
  const [user, setUser] = useState(userService.getUser());
  const history = useHistory();
  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  async function handleLogout() {
    try{
    await userService.logout();
    setUser({ user: null });
    history.push('/login');
    } catch(err){
      console.log(err);
      throw new Error(err);
    }
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />
        </Route>
        <Route exact path="/signup">
          <SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />
        </Route>
        <PrivateRoute exact path="/" user={user}>
          <Home user={user} handleLogout={handleLogout} />
        </PrivateRoute>
        <PrivateRoute path="/create" user={user}>
          <CharacterCreate user={user} handleLogout={handleLogout} />
        </PrivateRoute>
        <PrivateRoute exact path="/characters" user={user}>
          <CharactersPage user={user} handleLogout={handleLogout} />
        </PrivateRoute>
        <PrivateRoute path="/characters/:id" user={user}>
          <CharacterProfile user={user} handleLogout={handleLogout} />
        </PrivateRoute>
        <PrivateRoute path="/:username" user={user}>
          <UserProfile user={user} handleLogout={handleLogout} />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
