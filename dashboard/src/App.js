import { isAuthenticated } from './services/adminApi';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PropertyForm from './components/PropertyForm';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProp from './components/EditProp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/newProperty"
          element={isAuthenticated() ? <PropertyForm /> : <Login />}
        />
         <Route path="/edit/:id" element={isAuthenticated() ? <EditProp /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Login />}
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
