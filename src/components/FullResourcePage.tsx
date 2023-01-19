import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { BaseURL } from "../utils/baseURL";
import useFetchResources from "../utils/fetchResources";
import {
  FullResourcesPageProps,
  IComments,
  IResource,
} from "../utils/interfaces";

export default function FullResourcePage(): JSX.Element {
  const [commentList, setCommentList] = useState<IComments[]>();
  const resourceList = useFetchResources();
  const { id } = useParams();
  const resource = resourceList.find((resource) => {
    if (id) {
      return resource.resource_id === parseInt(id);
    }
    return false;
  });
  const getCommentsFromServer = useCallback(async () => {
    console.log("fetching comment list from api");

    try {
      const response = await axios.get(BaseURL + "comments/" + id);

      setCommentList(response.data.rows);
      console.log("newly retreived comments", response.data.rows);
    } catch (error) {
      console.error("you have an error with spots");
    }
    console.log("finished with getcommentsFromServer");
  }, []);

  useEffect(() => {
    getCommentsFromServer();
  }, [getCommentsFromServer]);
  return (
    <>
      {resource && (
        <div>
          <div className="resourcesInformation">
            <h1>
              {resource.resource_name}: {resource.author_name}
            </h1>
            <p>{resource.resource_description}</p>
            <a href={resource.resource_link}>Resource Link</a>
            <p>{resource.resource_likes}👍</p>
            <p>{resource.resource_dislikes}👎</p>
          </div>
          <div className="commentContainer">
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
      )}
    </>
  );
}
