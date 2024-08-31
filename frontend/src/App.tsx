import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import Login from "./pages/Login";
import Tour from "./pages/Tour";
import TourDetails from "./pages/TourDetails";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/tour"
              element={
                <ProtectedRoute>
                  <Tour />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tourDetails/:id"
              element={
                <ProtectedRoute>
                  <TourDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
