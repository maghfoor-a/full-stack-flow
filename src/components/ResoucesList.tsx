import { ResourcesListProps } from "../utils/interfaces";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./ResourcesList.css";

export function ResourcesList({
  resources,
  handleResourceClick,
}: ResourcesListProps): JSX.Element {
  return (
    <>
      <div className="resource-container">
        {resources.map((resource) => {
          return (
            <div className="resource-item" key={resource.resource_id}>
              <div className="resourceSummary">
                <h3 className="title">{resource.resource_name}</h3>
                <div className="resource-info">
                  <p>{resource.resource_likes}👍</p>
                  <p>{resource.resource_dislikes}👎</p>
                  <p>
                    {format(
                      Date.parse(resource.resource_post_date.toString()),
                      "dd/MM/yy"
                    )}
                  </p>

                  <p className="authorName">{resource.author_name}</p>
                  <p className="description">{resource.resource_description}</p>
                  <p>{resource.resource_tags}</p>

                  <Link
                    className="resourceButton"
                    to={`/fullresource/${resource.resource_id}`}
                    onClick={() => handleResourceClick(resource)}
                  >
                    See Full Resource
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
