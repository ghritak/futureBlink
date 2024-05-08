import { useEffect, useState } from 'react';
import RouteComponent from './routes/Route';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const user = localStorage.getItem('AUTH_TOKEN');
    if (user) {
      setAuthenticated(true);
    }
  };

  return (
    <BrowserRouter>
      <RouteComponent isAuthenticated={isAuthenticated} />
    </BrowserRouter>
  );
}

export default App;
