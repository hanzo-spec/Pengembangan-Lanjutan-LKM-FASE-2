 import { Routes, Route } from "react-router-dom";
 import Navbar from "./component/Navbar";
 import Footer from "./component/Footer";
 import PrivateRoute from "./component/PrivateRoute";
 import  GuestRoute from "./component/GuestRoute"
 import Home from "./pages/Home";
 import About from "./pages/About";
 import Projects from "./pages/Projects";
 import Contact from "./pages/Contact";
 import Login from "./pages/Login";
 import Dashboard from "./pages/Dashboard";
 import Profile from "./pages/Profile";
 import NotFound from "./pages/NotFound";

 function App() {
    return (
        <>
        <Navbar />
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route 
                path="/login"
                 element={
                 <GuestRoute>
                    <Login />
                 </GuestRoute>
                } 
                />
                <Route 
                path="/dashboard" 
                element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
                }
                />
                <Route 
                path="/profile" 
                element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
                }
                />
                <Route path="*" element={<NotFound />
                }
                />
            </Routes>
            </main>
            <Footer />
            </>
    );
  }

  export default App;