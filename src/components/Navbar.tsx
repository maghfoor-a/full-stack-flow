import { NavLink } from "react-router-dom";
import { IUser } from "../utils/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useFetchUsers from "../utils/useFetchUsers";
import "./Navbar.css";

interface NavProps {
  handleUserClicked: (
    e: React.ChangeEvent<HTMLSelectElement>,
    usersList: IUser[]
  ) => void;
  handleLogOut: () => void;
  currentUser: IUser | "Guest";
}

const notify = () => toast("Please sign in to add a resource");

export default function Navbar({
  handleUserClicked,
  handleLogOut,
  currentUser,
}: NavProps): JSX.Element {
  const { usersList } = useFetchUsers();
  return (
    <div className="navbar">
      <NavLink to="/" className="navbarTitle navitem">
        Full-Stack-Flow
      </NavLink>
      <NavLink
        to={currentUser !== "Guest" ? "/addresource" : "#"}
        onClick={() => currentUser === "Guest" && notify()}
        className="navbarAddresource navitem"
      >
        Add Resource!
      </NavLink>
      <select onChange={(e) => handleUserClicked(e, usersList)}>
        <option value="Guest" data-is-faculty={"false"}>
          Sign In
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
      {currentUser !== "Guest" && (
        <button onClick={handleLogOut} className="log-out">
          Log out
        </button>
      )}
      <ToastContainer />
    </div>
  );
}
