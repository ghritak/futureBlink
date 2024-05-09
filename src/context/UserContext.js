import { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState('INIT');
  const [toast, setToast] = useState({ visibility: false });

  return (
    <UserContext.Provider
      value={{ authStatus, setAuthStatus, toast, setToast }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
