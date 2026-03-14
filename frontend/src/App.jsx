import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Members from './pages/Members';
import Matrimonial from './pages/Matrimonial';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="events" element={<Events />} />
            <Route path="gallery" element={<Gallery />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="members" element={<Members />} />
              <Route path="matrimonial" element={<Matrimonial />} />
              <Route path="profile" element={<Profile />} />
              <Route path="admin" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
