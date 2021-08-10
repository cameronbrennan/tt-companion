import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// component adapted from PrivateRoute example in react-router-dom docs at (reactrouter.com/web/api/Route)
export default function PrivateRoute({ children, user, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? (
            children
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }