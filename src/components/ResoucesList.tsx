import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./ResourcesList.css";
import axios from "axios";
import { BackendURL } from "../utils/backendURL";
import useFetchResources from "../utils/useFetchResources";
import { useState } from "react";

function textSummary(text: string, length: number) {
  let returnText = "";

  if (text.length > length) {
    returnText = text.slice(0, length) + "...";
  } else {
    returnText = text;
  }
  return returnText;
}

export function ResourcesList(): JSX.Element {
  const { resources, updateResources } = useFetchResources();
  const [searchValue, setSearchValue] = useState("");

  const handleLikeResource = async (id: number) => {
    await axios.patch(BackendURL + `resources/likes/${id}`);
    updateResources();
  };
  return (
    <>
      <div className="searchBar">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
      </div>
      {resources.length ? (
        <div className="resource-container">
          {resources
            .filter((resource) =>
              resource.resource_name
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase())
            )
            .map((resource) => {
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
                      <p className="description">
                        {textSummary(resource.resource_description, 50)}
                      </p>
                      <p>{resource.resource_tags}</p>

                      <Link
                        className="resourceButton"
                        to={`/fullresource/${resource.resource_id}`}
                      >
                        See Full Resource
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <h1>Loading Data...</h1>
      )}
    </>
  );
}
