import { ChoresCalendar, CreateUsers, ManageChores } from './components';
import { ResponsibilityProvider } from './context/Responsibility/ResponsibilityContext';

import './App.scss';

function App() {
  return (
    <div className="main-page-container">
      <ResponsibilityProvider>
        <div>
          <CreateUsers />
          <ManageChores />
        </div>

        <div>
          <ChoresCalendar />
        </div>
      </ResponsibilityProvider>
    </div>
  );
}

export default App;
