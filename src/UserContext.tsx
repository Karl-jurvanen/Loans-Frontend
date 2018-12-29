import * as React from "react";

type UserContext = {
    name: string;
    id: number;
    admin: boolean;
}

export default React.createContext<UserContext>({
    name: 'Guest',
    id: 0,
    admin: false
  });
  