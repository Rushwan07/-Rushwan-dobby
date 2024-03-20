import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState } from "react";
function App() {
  const [searchData, setSearchData] = useState([]);
  const { user } = useAuthContext()
  return (


    <div className="App">
      <BrowserRouter>
        <Navbar setSearchResults={setSearchData} />

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home searchData={searchData} /> : <Navigate to="/login" />}
            />
            <Route
              path="/upload"
              element={user ? <Upload /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />

          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
