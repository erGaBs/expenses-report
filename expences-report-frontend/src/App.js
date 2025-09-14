import './App.css';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { UserContext } from './context/UserContext';
import { useState } from 'react';



function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
      <AppRoutes />
      </UserContext.Provider>
    </div>
  );
}

export default App;