import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Layout from './Components/Layout';
import Login from './pages/Login';


function App() {
  return (
    // <AuthProvider>
    <Router>
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />


      </Routes>
      {/* </Layout> */}
    </Router>
    
  );
}

export default App;