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

/**
users = ["Jake", "Michelle", "Maureen"]\

chores = [
  {chore: "dusting", frequency: 1, type: "weekly"},
  {chore: "mopping", frequency: 2, type: "weekly"},
  {chore: "garbage", frequency: 7, type: "weekly"},
  {chore: "deep clean", frequency: 1, type: "monthly"},
]
 */
