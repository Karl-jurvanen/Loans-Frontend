import * as React from "react";

type UserContext = {
    name: string;
    id: number;
}

export default React.createContext<UserContext>({
    name: 'Guest',
    id: 0,
  });
  