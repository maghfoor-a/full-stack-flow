import useFetchResources from "../utils/fetchResources";
import { FullResourcesPageProps, IResource } from "../utils/interfaces";

export default function FullResourcePage({
  selectedResource,
}: FullResourcesPageProps): JSX.Element {
  const resource = useFetchResources();
  return (
    <>
      {selectedResource && (
        <div>
          <h3>{selectedResource.author_name}</h3>
        </div>
      )}
    </>
  );
}
