import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Layout from './Components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Jobs from './pages/Jobs';
import Reviews from './pages/Reviews';
import Payments from './pages/Payments';
import Activities from './pages/Activity';
import Index from './pages/Index';

function App() {
  return (
    // <AuthProvider>
    <Router>
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/activity" element={<Activities />} />


      </Routes>
      {/* </Layout> */}
    </Router>
    
  );
}

export default App;