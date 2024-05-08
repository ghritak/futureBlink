import RouteComponent from './routes/Route';
import UserProvider from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <RouteComponent />
    </UserProvider>
  );
}

export default App;
