import React from "react";
import { passport} from 'passport'
import { Redirect, Route} from 'react-router-dom'
import PrivateRoute from 'react-private-route'

const PrivateRoute = ({component:Component, ...rest}) => {
// //   const  isAuthenticated = passport.isAuthenticated()

//   return (
//     <Route
//         {...rest}
//         render = {props => 
//             isAuthenticated ? (
//                 <Component {...props}/>
//             ) : (
//                 <Redirect to = {{pathname: "/", state : {from:props.location} }}/>
//             )
//         }
//     />
//   );
};

export default PrivateRoute;
