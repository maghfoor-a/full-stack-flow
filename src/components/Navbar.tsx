import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(): JSX.Element {
  return (
    <div className="navbar">
      <NavLink to="/" className="navbarTitle navitem">
        Full-Stack-Flow
      </NavLink>
      <NavLink to="/addresource" className="navbarAddresource navitem">
        Add Resource!
      </NavLink>
      <select>
        <option>Guest</option>
      </select>
    </div>
  );
}
