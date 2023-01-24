import axios from "axios";
import { useEffect, useState } from "react";
import { BackendURL } from "./backendURL";
import { IResource, useFetchResourcesType } from "./interfaces";

export default function useFetchResources(): useFetchResourcesType {
  const [resources, setResouces] = useState<IResource[]>([]);

  const updateResources = () => {
    console.log("Trying to update resources");
    try {
      axios.get(BackendURL + "resources").then((res) => setResouces(res.data));
    } catch (error) {
      window.alert("Failed to fetch resources");
    }
  };
  useEffect(() => {
    updateResources();
  }, []);
  return { resources, updateResources };
}
