import { useLocation } from "react-router-dom";

export default function AdminDashboard() {
  const location = useLocation();
  const { email, password } = location.state || {};

  return (
    <div >
      <h1>Hello Admin</h1>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
    </div>
  );
}
