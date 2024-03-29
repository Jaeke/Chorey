/**
 * Chores Management component
 *
 * Input field, number and dropdown selection for frequency weekly and monthly
 *
 * The state for storing these chores should be a array of object
 * -> example
 * [
 *  {chore: "vaccum", frequency: 3, type: "weekly"}
 * ]
 *
 * -> frequency should have a max of 7
 */

import { useState } from 'react';

import { useResponsibility } from '../../context';

import './ManageChores.scss';

function ManageChores() {
  const { chores, setChores, frequency, setFrequency, type, setType } =
    useResponsibility();

  const [newChore, setNewChore] = useState('');

  const addChore = () => {
    if (newChore) {
      setChores([...chores, { chore: newChore, frequency, type }]);
      setNewChore('');
      setFrequency(1);
      setType('weekly');
    }
  };

  return (
    <div>
      <h2>Chores Management</h2>
      <div>
        <input
          type="text"
          placeholder="Chore"
          value={newChore}
          onChange={(e) => setNewChore(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="7"
          value={frequency}
          onChange={(e) => setFrequency(e.target.valueAsNumber)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button onClick={addChore}>Add Chore</button>
      </div>
      <div>
        <h3>Chore List</h3>
        <div className={`registered-chores-list`}>
          {chores.map((chore, index) => (
            <span
              key={index}
            >{`${chore.chore} - ${chore.frequency} times ${chore.type}`}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageChores;
