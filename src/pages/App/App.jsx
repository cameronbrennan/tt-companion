import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {PrivateRoute} from "../../components/Utils/PrivateRoute";
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
        {userService.getUser() ? (
          <>
            <Switch>
              <Route exact path="/">
                <Home user={user} handleLogout={handleLogout} />
              </Route>
              <Route path="/create">
                <CharacterCreate user={user} handleLogout={handleLogout} />
              </Route>
              <Route exact path="/characters">
                <CharactersPage user={user} handleLogout={handleLogout} />
              </Route>
              <Route path="/characters/:id">
                <CharacterProfile user={user} handleLogout={handleLogout} />
              </Route>
              <Route path="/:username">
                <UserProfile user={user} handleLogout={handleLogout} />
              </Route>
            </Switch>
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </div>
  );
}

export default App;
