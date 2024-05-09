import RouteComponent from './routes/Route';
import UserProvider from './context/UserContext';
import Toast from './components/ui-components/toast/Toast';

function App() {
  return (
    <UserProvider>
      <Toast />
      <RouteComponent />
    </UserProvider>
  );
}

export default App;
