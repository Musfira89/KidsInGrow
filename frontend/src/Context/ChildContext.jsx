// context/ChildContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ChildContext = createContext();

export const ChildProvider = ({ children }) => {
  const [childId, setChildId] = useState(null);

  return (
    <ChildContext.Provider value={{ childId, setChildId }}>
      {children}
    </ChildContext.Provider>
  );
};

export const useChild = () => useContext(ChildContext);
