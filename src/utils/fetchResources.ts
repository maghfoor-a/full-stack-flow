import axios from "axios";
import { useEffect, useState } from "react";
import { BackendURL } from "./backendURL";
import { IResource } from "./interfaces";

export default function useFetchResources() {
  const [resources, setResouces] = useState<IResource[]>([]);
  useEffect(() => {
    try {
      axios.get(BackendURL + "resources").then((res) => setResouces(res.data));
    } catch (error) {
      window.alert("Failed to fetch resources");
    }
  }, []);
  return resources;
}
