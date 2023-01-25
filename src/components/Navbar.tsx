import { NavLink } from "react-router-dom";
import useFetchUsers from "../utils/useFetchUsers";
import "./Navbar.css";

export default function Navbar(): JSX.Element {
  const { usersList, updateUsers } = useFetchUsers();
  return (
    <div className="navbar">
      <NavLink to="/" className="navbarTitle navitem">
        Full-Stack-Flow
      </NavLink>
      <NavLink to="/addresource" className="navbarAddresource navitem">
        Add Resource!
      </NavLink>
      <select>
        <option value="">Guest</option>
        {usersList.map((user) => {
          return (
            <option value={user.user_name} key={user.user_id}>
              {user.user_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
