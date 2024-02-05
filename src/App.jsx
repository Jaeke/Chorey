import { ChoresCalendar, CreateUsers, ManageChores } from './components';
import { ResponsibilityProvider } from './context/Responsibility/ResponsibilityContext';

import './App.scss';

function App() {
  return (
    <div className="main-page-container">
      <ResponsibilityProvider>
        <div className={`users-chores-section`}>
          <CreateUsers />
          <ManageChores />
        </div>

        <div className={`calendar-section`}>
          <ChoresCalendar />
        </div>
      </ResponsibilityProvider>
    </div>
  );
}

export default App;
