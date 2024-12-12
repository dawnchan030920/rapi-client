import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "@/pages/Overview";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Project from "./pages/Project";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Overview />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/project/:projectId"
            element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
