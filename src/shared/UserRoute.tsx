import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './UserContext';

// TODO Implement UserRoute later
export default function UserRoute({ component: Component, ...rest }) {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/bijeenkomsten/zoeken', state: { from: props.location } }} />
        )
      }
    />
  );
}
