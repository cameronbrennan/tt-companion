import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import userService from "../../utils/userService";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import Home from "../Home/Home";
import UserProfile from "../UserProfile/UserProfile";
import AddCharForm from "../AddCharForm/AddCharForm";
import CharactersPage from "../CharactersPage/CharactersPage";

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
                <AddCharForm user={user} handleLogout={handleLogout} />
              </Route>
              <Route path="/characters">
                <CharactersPage user={user} handleLogout={handleLogout}/>
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
