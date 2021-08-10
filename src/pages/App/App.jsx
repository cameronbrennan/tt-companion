import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
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
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser({ user: null });
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
