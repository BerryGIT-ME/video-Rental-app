import auth from "../services/authService";

function Logout() {
  auth.logout();
  window.location = "/";

  return null;
}

export default Logout;
