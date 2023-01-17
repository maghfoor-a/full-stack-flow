import { NavLink } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <div className="navbar">
      <NavLink to="/" className="navbarTitle">
        Full-Stack-Flow
      </NavLink>
      <NavLink to="/addresource" className="navbarAddresource">
        Add Resource!
      </NavLink>
      <select>
        <option>Guest</option>
      </select>
    </div>
  );
}
