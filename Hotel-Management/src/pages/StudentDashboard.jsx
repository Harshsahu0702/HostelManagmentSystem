import { useLocation } from "react-router-dom";

export default function StudentDashboard() {
  const location = useLocation();
  const { sid, password } = location.state || {};

  return (
    <div >
      <h1>Hello {sid}</h1>
      <p>Your password is: {password}</p>
    </div>
  );
}
