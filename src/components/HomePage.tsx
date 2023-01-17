import useFetchResources from "../utils/fetchResources";

export default function HomePage(): JSX.Element {
  const resources = useFetchResources();
  return (
    <>
      {resources.length ? (
        <h1>This is HomePage component.</h1>
      ) : (
        <h1>Loading Data</h1>
      )}
    </>
  );
}
