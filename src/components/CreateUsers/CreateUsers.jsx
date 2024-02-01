/**
 * Input field for adding users
 */

import { useState } from 'react';
import { useResponsibility } from '../../context';

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
    <div>
      <h2>Add Users</h2>

      <ul>
        {users.length > 0 && users.map((user, i) => <li key={i}>{user}</li>)}
      </ul>

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
