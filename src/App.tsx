import { BrowserRouter } from "react-router-dom";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import "./App.css";
import { useState } from "react";
import { IUser } from "./utils/interfaces";

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<IUser | "Guest">(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const intialUser = JSON.parse(saved);
      return intialUser;
    }
    return "Guest";
  });

  function handleUserClicked(
    e: React.ChangeEvent<HTMLSelectElement>,
    usersList: IUser[]
  ) {
    const clickedUser = usersList.filter(
      (user) => user.user_id.toString() === e.target.value
    )[0];
    setCurrentUser({
      user_id: clickedUser.user_id,
      user_name: clickedUser.user_name,
      user_isfaculty: clickedUser.user_isfaculty,
    });
    localStorage.setItem("user", JSON.stringify(clickedUser));
  }

  function handleLogOut() {
    setCurrentUser("Guest");
    localStorage.removeItem("user");
  }
  return (
    <>
      <BrowserRouter>
        <Navbar
          handleUserClicked={handleUserClicked}
          currentUser={currentUser}
          handleLogOut={handleLogOut}
        />
        <MainContent />
      </BrowserRouter>
    </>
  );
}

export default App;
