import React from "react";

export const UserContext = React.createContext(
    {
        usuario: {
                username: 'juancho',
                rol: 'admin'
            }
    }
);
