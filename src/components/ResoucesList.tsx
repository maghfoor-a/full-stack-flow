import { IResource, ResourcesListProps } from "../utils/interfaces";
import { format } from "date-fns";

export function ResourcesList({
  resources,
  handleResourceClick,
}: ResourcesListProps): JSX.Element {
  return (
    <>
      {resources.map((resource) => {
        return (
          <div className="singleResource" key={resource.resource_id}>
            <div className="resourceSummary">
              <h3>{resource.resource_name}</h3>
              <p>{resource.resource_likes}👍</p>
              <p>{resource.resource_dislikes}👎</p>
              <p>
                {format(
                  Date.parse(resource.resource_post_date.toString()),
                  "dd/MM/yy"
                )}
              </p>
            </div>
            <p className="authorName">{resource.author_name}</p>
            <p className="description">{resource.resource_description}</p>
            <p>{resource.resource_tags}</p>
            <button onClick={() => handleResourceClick(resource)}></button>
          </div>
        );
      })}
    </>
  );
}
