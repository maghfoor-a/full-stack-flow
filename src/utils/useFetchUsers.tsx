import axios from "axios";
import {  useEffect, useState } from "react";
import { BackendURL } from "./backendURL";
import { IUser } from "./interfaces";

export default function useFetchComments() {
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const updateUsers = () => {
    try {
      axios.get(BackendURL + "users").then((res) => setUsersList(res.data));
    } catch (error) {
      window.alert("Failed to fetch users, please try again later");
    }
  };
  useEffect(() => {
    updateUsers();
  }, []);
  return { usersList, updateUsers };
}
