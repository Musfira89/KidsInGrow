import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authData, setAuthData] = useState({
    parent_id: null,
  });

  const login = (user, parent_id) => {
    setUser(user);
    setAuthData({ parent_id });
    localStorage.setItem('parent_id', parent_id); // Store parent_id in local storage if needed
  };

  return (
    <AuthContext.Provider value={{ user, setUser, authData, setAuthData, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
