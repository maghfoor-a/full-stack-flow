import axios from "axios";
import { useState } from "react";
import { BackendURL } from "../utils/backendURL";
import { ResourceFormChangeEvent } from "../utils/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchResources from "../utils/useFetchResources";
import { excludesResource } from "../utils/excludesResource";
import "./AddResource.css";
//add userID to the resource Form

//--------------------------------------------------------------------------------------JSX function declaration
export default function AddResourcePage(): JSX.Element {
  const { resources } = useFetchResources();
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

  const user = localStorage.getItem("user");

  const [tagsChecked, setTagsChecked] = useState({
    TypeScript: false,
    React: false,
    APIs: false,
    Node: false,
    JavaScript: false,
    CSS: false,
    Week1: false,
    Week2: false,
    Week3: false,
    Week4: false,
    Week5: false,
    Week6: false,
    Week7: false,
    Week8: false,
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
  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast("Sign in to submit resource");
  };

  //making a post request to the backend to add the resource form
  const postResourceForm = async () => {
    if (excludesResource(resources, resourceForm.resource_link)) {
      try {
        await axios.post(BackendURL + "resources", resourceForm);
        notify();
      } catch (error) {
        window.alert("Failed to post your resoure data:(");
        console.error(error);
      }
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
    setTagsChecked({
      TypeScript: false,
      React: false,
      APIs: false,
      Node: false,
      JavaScript: false,
      CSS: false,
      Week1: false,
      Week2: false,
      Week3: false,
      Week4: false,
      Week5: false,
      Week6: false,
      Week7: false,
      Week8: false,
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsChecked({ ...tagsChecked, [e.target.value]: e.target.checked });
    handleChangeFormValue(e);
  };
  //--------------------------------------------------------------------------------------HTML returned
  return (
    <>

      <div className="title">
        <h1>This is AddResourcePage.</h1>
      </div>


      <form className="input-form" onSubmit={(e) => (user ? handleSubmitButton(e) : signIn(e))}>

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
            checked={tagsChecked.TypeScript}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-TS"
          ></input>
          <label>React</label>
          <input
            value="React"
            type="checkbox"
            checked={tagsChecked.React}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-React"
          ></input>
          <label>APIs</label>
          <input
            value="APIs"
            type="checkbox"
            checked={tagsChecked.APIs}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-APIs"
          ></input>
          <label>Node</label>
          <input
            value="Node"
            type="checkbox"
            checked={tagsChecked.Node}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-Node"
          ></input>
          <label>JavaScript</label>
          <input
            value="JavaScript"
            type="checkbox"
            checked={tagsChecked.JavaScript}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-JS"
          ></input>
          <label>CSS</label>
          <input
            value="CSS"
            type="checkbox"
            checked={tagsChecked.CSS}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-CSS"
          ></input>
          <label>Week1</label>
          <input
            value="Week1"
            type="checkbox"
            checked={tagsChecked.Week1}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-Week1"
          ></input>
          <label>Week2</label>
          <input
            value="Week2"
            type="checkbox"
            checked={tagsChecked.Week2}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-Week2"
          ></input>
          <label>Week3</label>
          <input
            value="Week3"
            type="checkbox"
            checked={tagsChecked.Week3}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-Week3"
          ></input>
          <label>Week4</label>
          <input
            value="Week4"
            type="checkbox"
            checked={tagsChecked.Week4}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-Week4"
          ></input>
          <label>Week5</label>
          <input
            value="Week5"
            type="checkbox"
            checked={tagsChecked.Week5}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-Week5"
          ></input>
          <label>Week6</label>
          <input
            value="Week6"
            type="checkbox"
            checked={tagsChecked.Week6}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-Week6"
          ></input>
          <label>Week7</label>
          <input
            value="Week7"
            type="checkbox"
            checked={tagsChecked.Week7}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-Week7"
          ></input>
          <label>Week8</label>
          <input
            value="Week8"
            type="checkbox"
            checked={tagsChecked.Week8}
            name="resource_tags"
            onChange={(e) => handleTagsChange(e)}
            className="resourceTag-Week8"
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </>
  );
}
