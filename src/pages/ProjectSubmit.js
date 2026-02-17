import { useState } from "react";

function ProjectSubmit() {
  const [title, setTitle] = useState("");

  const submitProject = () => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push({ title, status: "Pending" });
    localStorage.setItem("projects", JSON.stringify(projects));
    alert("Project Submitted");
    setTitle("");
  };

  return (
    <div className="section">
      <h3>Submit Project</h3>

      <input
        type="text"
        placeholder="Enter Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={submitProject}>Submit Project</button>
    </div>
  );
}

export default ProjectSubmit;
