import './App.scss';
import { CreateUsers, ManageChores } from './components';
import { ResponsibilityProvider } from './context/Responsibility/ResponsibilityContext';

function App() {
  return (
    <div className="main-page-container">
      <ResponsibilityProvider>
        <div>
          <CreateUsers />
          <ManageChores />
        </div>
      </ResponsibilityProvider>
    </div>
  );
}

export default App;
