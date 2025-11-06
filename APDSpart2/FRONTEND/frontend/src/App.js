import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar";
import PostList from "./components/postList";
import EditPost from "./components/postEdit";
import CreatePost from "./components/postCreate";
import Register from "./components/register";
import Login from "./components/customerlogin";
import Signup from "./components/customersignup";
import HomeScreen from "./components/homescreen";
import Customerpayments from './components/customerpayments';
import AdminLogin from './components/adminlogin';
import Viewscreen from './components/view';


// Layout wrapper for pages with Navbar
const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="content">{children}</div>
  </>
);

function App() {
  return (
    <Routes>
      {/* HomeScreen without navbar */}
      <Route path="/" element={<HomeScreen />} />
      <Route path="/Signup" element={<Signup />} />
       <Route path="/create" element={<CreatePost />} />

      {/* Login and Signup pages */}
      <Route path="/customerlogin" element={<Login />} />
       <Route path="/adminlogin" element={<AdminLogin />} />
       <Route path="/Viewscreen" element={<Viewscreen />} />
  

      {/* Other pages with Navbar */}
      <Route path="/posts" element={<PostList />} />
      <Route path="/edit/:id" element={<Layout><EditPost /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/customerpayments" element={<Layout><Customerpayments /></Layout>} />


      {/* Optional: 404 page */}
      <Route path="*" element={<Layout><h2>Page Not Found</h2></Layout>} />
    </Routes>
  );
}

export default App;
