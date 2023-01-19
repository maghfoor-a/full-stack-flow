import useFetchResources from "../utils/fetchResources";
import { HomePageProps, IResource } from "../utils/interfaces";
import { ResourcesList } from "./ResoucesList";

export default function HomePage(props: HomePageProps): JSX.Element {
  const resources = useFetchResources();
  return (
    <>
      {resources.length ? (
        <ResourcesList
          resources={resources}
          handleResourceClick={props.handleResourceClick}
        />
      ) : (
        <h1>Loading Data</h1>
      )}
    </>
  );
}
