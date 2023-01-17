import useFetchResources from "../utils/fetchResources";
import { ResourcesList } from "./ResoucesList";

export default function HomePage(): JSX.Element {
  const resources = useFetchResources();
  return (
    <>
      {resources.length ? (
        <ResourcesList resources={resources} />
      ) : (
        <h1>Loading Data</h1>
      )}
    </>
  );
}
