import { useState } from "react";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import "./styles.css";

function App() {
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <Login 
        setRole={setRole}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  return role === "student"
    ? <StudentDashboard setIsLoggedIn={setIsLoggedIn}/>
    : <StaffDashboard setIsLoggedIn={setIsLoggedIn}/>;
}

export default App;
