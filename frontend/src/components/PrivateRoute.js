import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

export const PrivateRoute = ({component: Component, ...rest}) => {
      // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        return (
          <Route
            {...rest}
            render={props => {
              console.log("las props " + props)
              if (auth.isAuthenticated()) {
                return <Component {...props} />;
              } else {
                return (
                  <Redirect
                    to={{
                      pathname: "/home",
                      state: {
                        from: props.location
                      }
                    }}
                  />
                );
              }
            }}
          />
        );
      }
