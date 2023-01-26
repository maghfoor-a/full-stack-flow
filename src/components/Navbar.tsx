import { NavLink } from "react-router-dom";
import { IUser } from "../utils/interfaces";

import useFetchUsers from "../utils/useFetchUsers";
import "./Navbar.css";

interface NavProps {
  handleUserClicked: (
    e: React.ChangeEvent<HTMLSelectElement>,
    usersList: IUser[]
  ) => void;
  currentUser: IUser | "Guest";
}

export default function Navbar({
  handleUserClicked,
  currentUser,
}: NavProps): JSX.Element {
  const { usersList } = useFetchUsers();
  return (
    <div className="navbar">
      <NavLink to="/" className="navbarTitle navitem">
        Full-Stack-Flow
      </NavLink>
      <NavLink to="/addresource" className="navbarAddresource navitem">
        Add Resource!
      </NavLink>
      <select onChange={(e) => handleUserClicked(e, usersList)}>
        <option value="Guest" data-is-faculty={"false"}>
          Guest
        </option>
        {usersList.map((user) => {
          return (
            <option
              value={user.user_id}
              key={user.user_id}
              selected={
                currentUser !== "Guest" && user.user_id === currentUser.user_id
              }
            >
              {user.user_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
