import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Chefs4U
        </NavLink>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink
            className="nav-link"
            aria-current="page"
            to="/"
            >
              View Chefs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="chef/:id">
              Chefs Profile
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" aria-current="page" to="add-event">
              Add An Event
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link"
              aria-current="page"
              to="events/:id/edit"
            >
              Edit Event
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              aria-current="page"
              to="events/favorites"
            >
              Favorite Events
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
