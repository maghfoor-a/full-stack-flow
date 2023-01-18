import { useState } from "react";
import { ResourceFormChangeEvent } from "../utils/interfaces";


//add userID to the resource Form
export default function AddResourcePage(): JSX.Element {
  const [resourceForm, setResourceForm] = useState({
    resource_name: "",
    resource_description: "",
    author_name: "",
    resource_link: "",
    resource_recommendation_reason: "",
    resource_tags: "",
    resource_likes: 0,
    resource_dislikes: 0
  });

  console.log(resourceForm);

  const handleChangeFormValue = (e: ResourceFormChangeEvent) => {
    setResourceForm(() => {
      if (e.target.name !== "resource_tags") {
        return { ...resourceForm, [e.target.name]: e.target.value };
      }
      return {
        ...resourceForm,
        [e.target.name]:
          resourceForm.resource_tags.length === 0
            ? e.target.value
            : resourceForm.resource_tags + ", " + e.target.value,
      };
    });
  };
  return (
    <>
      <h1>This is AddResourcePage.</h1>
      <form>
        <label>
          Resource Name:
          <input
            type="text"
            onChange={(e) => handleChangeFormValue(e)}
            name="resoruce_name"
            value={resourceForm.resource_name}
          ></input>
        </label>
        <label>
          Description:
          <input
            type="text"
            onChange={(e) => handleChangeFormValue(e)}
            name="resource_description"
            value={resourceForm.resource_description}
          ></input>
        </label>
        <label>
          Author Name:
          <input
            type="text"
            onChange={(e) => handleChangeFormValue(e)}
            name="author_name"
            value={resourceForm.author_name}
          ></input>
        </label>
        <label>
          Link:
          <input
            type="text"
            onChange={(e) => handleChangeFormValue(e)}
            name="resource_link"
            value={resourceForm.resource_link}
          ></input>
        </label>
        <select>
          <option value={""}>Choose recommendation type</option>
          <option value={"I recommend this resource after having used it!"}>
            I recommend this resource after having used it!
          </option>
          <option
            value={"I dont't recommend this resource after having used it!"}
          >
            I dont't recommend this resource after having used it!
          </option>
          <option value={"I haven't used this resource but it looks good."}>
            I haven't used this resource but it looks good.
          </option>
        </select>
        <label>
          Recommendation Reason:
          <input
            type="text"
            onChange={(e) => handleChangeFormValue(e)}
            name="resource_recommendation_reason"
            value={resourceForm.resource_recommendation_reason}
          ></input>
        </label>
        <div>
          <label>TypeScript</label>
          <input
            value="TypeScript"
            type="checkbox"
            name="resource_tags"
            onChange={(e) => handleChangeFormValue(e)}
          ></input>
          <label>React</label>
          <input
            value="React"
            type="checkbox"
            name="resource_tags"
            onChange={(e) => handleChangeFormValue(e)}
          ></input>
          <label>APIs</label>
          <input
            value="APIs"
            type="checkbox"
            name="resource_tags"
            onChange={(e) => handleChangeFormValue(e)}
          ></input>
          <label>Node</label>
          <input
            value="Node"
            type="checkbox"
            name="resource_tags"
            onChange={(e) => handleChangeFormValue(e)}
          ></input>
        </div>
      </form>
    </>
  );
}
