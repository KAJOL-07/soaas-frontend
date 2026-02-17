import { useState } from "react";

function Login({ setRole, setIsLoggedIn }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!selectedRole) {
      alert("Please select role");
      return;
    }

    if (
      (selectedRole === "student" &&
        regNo === "22CS101" &&
        password === "student123") ||
      (selectedRole === "staff" &&
        regNo === "STAFF01" &&
        password === "staff123")
    ) {
      setRole(selectedRole);
      setIsLoggedIn(true);
    } else {
      alert("Invalid Credentials");
    }
  };

return (
  <div className="login-box">
      <h2>CampusSphere Portal</h2>
      <p>Welcome Back!</p>

      <form onSubmit={handleLogin}>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>

        <input
          type="text"
          placeholder="Register Number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p style={{fontSize:"12px"}}>
        Demo Student: 22CS101 / student123 <br/>
        Demo Staff: STAFF01 / staff123
      </p>
    </div>
  );
}

export default Login;
