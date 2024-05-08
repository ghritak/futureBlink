import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState('INIT');

  return (
    <UserContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
