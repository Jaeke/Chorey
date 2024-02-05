/**
 * Input field for adding users
 */

import { useState } from 'react';

import { useResponsibility } from '../../context';

import './CreateUsers.scss';

const CreateUsers = () => {
  const { users, setUsers } = useResponsibility();

  const [inputValue, setInputValue] = useState('');

  const handleAddUser = () => {
    if (Array.isArray(users)) {
      setUsers([...users, inputValue]);
    } else {
      console.error('Users state is not an array');
      // Optionally reset the users state here
      setUsers([inputValue]);
    }
    setInputValue('');
  };

  const handleInputChange = (e) => {
    e.preventDefault();

    setInputValue(e.target.value);
  };

  return (
    <div className={`create-user-container`}>
      <h2>Add Users</h2>

      <div className={`registered-users-container`}>
        {users.length > 0 &&
          users.map((user, i) => (
            <div key={i} className={`individual-user-container`}>
              {user}
            </div>
          ))}
      </div>

      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="button" onClick={handleAddUser}>
          add
        </button>
      </div>
    </div>
  );
};

export default CreateUsers;
