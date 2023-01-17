import { NavLink } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <div className="navbar">
      <NavLink to="/" className="navbar-title">
        Full-Stack-Flow
      </NavLink>
      <NavLink to="/addresource" className="navbar-addresource">
        Add Resource!
      </NavLink>
      <select>
        <option>Guest</option>
      </select>
    </div>
  );
}
