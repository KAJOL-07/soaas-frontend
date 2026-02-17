import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <h1 className="title">CampusSphere</h1>
      <p className="subtitle">Smart Academic Management System</p>
      <button onClick={() => navigate("/login")}>
        Enter Portal
      </button>
    </div>
  );
}

export default Landing;
