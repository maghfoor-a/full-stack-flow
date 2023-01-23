import { ResourcesListProps } from "../utils/interfaces";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./ResourcesList.css";
import axios from "axios";
import { BackendURL } from "../utils/backendURL";

export function ResourcesList({
  resources,
  handleResourceClick,
}: ResourcesListProps): JSX.Element {
  const handleLikeResource = async (id: number) => {
    await axios.patch(BackendURL + `resources/likes/${id}`);
  };
  return (
    <>
      <div className="resource-container">
        {resources.map((resource) => {
          return (
            <div className="resource-item" key={resource.resource_id}>
              <div className="resourceSummary">
                <h3 className="title">{resource.resource_name}</h3>
                <div className="resource-info">
                  <button
                    onClick={() => handleLikeResource(resource.resource_id)}
                  >
                    {resource.resource_likes}👍
                  </button>
                  <button>{resource.resource_dislikes}👎</button>
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
