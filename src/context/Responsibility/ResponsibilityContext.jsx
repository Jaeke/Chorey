import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ResponsibilityContext = createContext();

export const ResponsibilityProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [chores, setChores] = useState(() => {
    const savedChores = localStorage.getItem('chores');
    return savedChores ? JSON.parse(savedChores) : [];
  });

  const [frequency, setFrequency] = useState(1);
  const [type, setType] = useState('weekly');

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('chores', JSON.stringify(chores));
  }, [users, chores]);

  return (
    <ResponsibilityContext.Provider
      value={{
        users,
        setUsers,
        chores,
        setChores,
        frequency,
        setFrequency,
        type,
        setType,
      }}
    >
      {children}
    </ResponsibilityContext.Provider>
  );
};

// Define propTypes for ResponsibilityProvider
ResponsibilityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
