import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { BackendURL } from "../utils/backendURL";
import useFetchResources from "../utils/useFetchResources";
import { IComments } from "../utils/interfaces";
import "./FullResourcePage.css";

//--------------------------------------------------------------------------------------JSX Element declaration
export default function FullResourcePage(): JSX.Element {
  //--------------------------------------------------------------------------------------USESTATE declarations
  const [commentList, setCommentList] = useState<IComments[]>();
  const { resources } = useFetchResources();

  //--------------------------------------------------------------------------------------Defining selected resource
  const { id } = useParams();
  const resource = resources.find((resource) => {
    if (id) {
      return resource.resource_id === parseInt(id);
    }
    return false;
  });

  //--------------------------------------------------------------------------------------GET comments from SERVER
  const getCommentsFromServer = useCallback(async () => {
    console.log("fetching comment list from api");

    try {
      const response = await axios.get(BackendURL + "comments/" + id);

      setCommentList(response.data.rows);
      console.log("newly retreived comments", response.data.rows);
    } catch (error) {
      console.error("you have an error with spots");
    }
    console.log("finished with getcommentsFromServer");
  }, [id]);

  useEffect(() => {
    getCommentsFromServer();
  }, [getCommentsFromServer]);

  //--------------------------------------------------------------------------------------return HTML
  return (
    <>
      {resource && (
        <div>
          <div className="resources-information">
            <h1 className="resource-title">
              {resource.resource_name}: {resource.author_name}
            </h1>
            <p>{resource.resource_description}</p>
            <a href={resource.resource_link}>Resource Link</a>
            <p>{resource.resource_likes}👍</p>
            <p>{resource.resource_dislikes}👎</p>
          </div>
          <div className="comment-section">
            <h1 className="comments-title">comments:</h1>
            <div className="comment-container">
              {commentList?.map((comment) => {
                return (
                  <div className="comment-item" key={comment.comment_id}>
                    <p>
                      {comment.user_id}: {comment.comment_text} - Likes:
                      {comment.comment_Likes}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
