import axios from "axios";
import { useState } from "react";
import { BackendURL } from "../utils/backendURL";
import { ResourceFormChangeEvent } from "../utils/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//add userID to the resource Form

//--------------------------------------------------------------------------------------JSX function declaration
export default function AddResourcePage(): JSX.Element {
  const [resourceForm, setResourceForm] = useState({
    resource_name: "",
    author_name: "",
    user_id: 1,
    resource_description: "",
    resource_tags: "",
    resource_content_type: "",
    resource_user_recommendation: "",
    resource_recommendation_reason: "",
    resource_likes: 0,
    resource_dislikes: 0,
    resource_link: "",
  });

  //--------------------------------------------------------------------------------------TAGS handler function
  const handleResourceTags = (selectedValue: string) => {
    const tagsArray = resourceForm.resource_tags.split(", ");
    if (tagsArray.includes(selectedValue)) {
      const filteredTags = tagsArray.filter((tag) => tag !== selectedValue);
      const arrayToString = filteredTags.join(", ");
      return arrayToString;
    }
    if (resourceForm.resource_tags.length === 0) {
      return selectedValue;
    }
    if (resourceForm.resource_tags.includes(selectedValue)) {
      return "";
    }
    return resourceForm.resource_tags + ", " + selectedValue;
  };

  //handling updating the resource form values
  const handleChangeFormValue = (e: ResourceFormChangeEvent) => {
    setResourceForm(() => {
      if (e.target.name !== "resource_tags") {
        return { ...resourceForm, [e.target.name]: e.target.value };
      }
      return {
        ...resourceForm,
        [e.target.name]: handleResourceTags(e.target.value),
      };
    });
  };

  //notify that post has been sucessful
  const notify = () => toast("Successfully posted your resource!");

  //making a post request to the backend to add the resource form
  const postResourceForm = async () => {
    try {
      await axios.post(BackendURL + "resources", resourceForm);
      notify();
    } catch (error) {
      window.alert("Failed to post your resoure data:(");
      console.error(error);
    }
  };

  //--------------------------------------------------------------------------------------handling the submit button click
  const handleSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postResourceForm();
    setResourceForm({
      resource_name: "",
      author_name: "",
      user_id: 1,
      resource_description: "",
      resource_tags: "",
      resource_content_type: "",
      resource_user_recommendation: "",
      resource_recommendation_reason: "",
      resource_likes: 0,
      resource_dislikes: 0,
      resource_link: "",
    });
  };
  //--------------------------------------------------------------------------------------HTML returned
  return (
    <>
      <h1>This is AddResourcePage.</h1>
      <form onSubmit={handleSubmitButton}>
        <label>
          Resource Name:
          <input
            type="text"
            onChange={(e) => handleChangeFormValue(e)}
            name="resource_name"
            value={resourceForm.resource_name}
            className="resourceName"
            required
          ></input>
        </label>
        <label>
          Description:
          <input
            type="text"
            onChange={(e) => handleChangeFormValue(e)}
            name="resource_description"
            value={resourceForm.resource_description}
            className="resourceDescription"
            required
          ></input>
        </label>
        <label>
          Author Name:
          <input
            type="text"
            onChange={(e) => handleChangeFormValue(e)}
            name="author_name"
            value={resourceForm.author_name}
            required
            className="resourceAuthorName"
          ></input>
        </label>
        <label>
          Link:
          <input
            type="text"
            onChange={(e) => handleChangeFormValue(e)}
            name="resource_link"
            value={resourceForm.resource_link}
            required
            className="resourceLink"
          ></input>
          <label>
            Content Type:
            <input
              type="text"
              onChange={(e) => handleChangeFormValue(e)}
              name="resource_content_type"
              value={resourceForm.resource_content_type}
              required
              className="resourceContentType"
            ></input>
          </label>
        </label>
        <select
          name="resource_user_recommendation"
          onChange={(e) => handleChangeFormValue(e)}
          required
          className="resourceRecommendation"
        >
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
            required
            className="resourceReason"
          ></input>
        </label>
        <div>
          <label>TypeScript</label>
          <input
            value="TypeScript"
            type="checkbox"
            name="resource_tags"
            onChange={(e) => handleChangeFormValue(e)}
            required
            className="resourceTag-TS"
          ></input>
          <label>React</label>
          <input
            value="React"
            type="checkbox"
            name="resource_tags"
            onChange={(e) => handleChangeFormValue(e)}
            className="resourceTag-React"
            required
          ></input>
          <label>APIs</label>
          <input
            value="APIs"
            type="checkbox"
            name="resource_tags"
            onChange={(e) => handleChangeFormValue(e)}
            className="resourceTag-APIs"
            required
          ></input>
          <label>Node</label>
          <input
            value="Node"
            type="checkbox"
            name="resource_tags"
            onChange={(e) => handleChangeFormValue(e)}
            required
            className="resourceTag-Node"
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </>
  );
}
