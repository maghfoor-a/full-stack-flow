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
  const [filterTags, setFilterTags] = useState("");

  const handleTagsFilter = (selectedValue: string) => {
    const tagsArray = filterTags.split(", ");
    if (tagsArray.includes(selectedValue)) {
      const filteredTags = tagsArray.filter((tag) => tag !== selectedValue);
      const arrayToString = filteredTags.join(", ");
      return arrayToString;
    }
    if (filterTags.length === 0) {
      return selectedValue;
    }
    if (filterTags.includes(selectedValue)) {
      return "";
    }
    return filterTags + ", " + selectedValue;
  };

  const handleLikeResource = async (id: number) => {
    await axios.patch(BackendURL + `resources/likes/${id}`);
    updateResources();
  };
  return (
    <>
      <div>
        <label>TypeScript</label>
        <input
          value="TypeScript"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-TS"
        ></input>
        <label>React</label>
        <input
          value="React"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          className="resourceTag-React"
          required
        ></input>
        <label>APIs</label>
        <input
          value="APIs"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          className="resourceTag-APIs"
          required
        ></input>
        <label>Node</label>
        <input
          value="Node"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-Node"
        ></input>
        <label>JavaScript</label>
        <input
          value="JavaScript"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-JavaScript"
        ></input>
        <label>CSS</label>
        <input
          value="CSS"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-CSS"
        ></input>
        <label>Week1</label>
        <input
          value="Week1"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-Week1"
        ></input>
        <label>Week2</label>
        <input
          value="Week2"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-Week2"
        ></input>
        <label>Week3</label>
        <input
          value="Week3"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-Week3"
        ></input>
        <label>Week4</label>
        <input
          value="Week4"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-Week4"
        ></input>
        <label>Week5</label>
        <input
          value="Week5"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-Week5"
        ></input>
        <label>Week6</label>
        <input
          value="Week6"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-Week6"
        ></input>
        <label>Week7</label>
        <input
          value="Week7"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-Week7"
        ></input>
        <label>Week8</label>
        <input
          value="Week8"
          type="checkbox"
          name="resource_tags"
          onChange={(e) => setFilterTags(handleTagsFilter(e.target.value))}
          required
          className="resourceTag-Week8"
        ></input>
      </div>
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
            .filter((resource) => resource.resource_tags.includes(filterTags))
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
