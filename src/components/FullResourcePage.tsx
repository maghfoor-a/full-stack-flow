import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "../utils/baseURL";
import useFetchResources from "../utils/fetchResources";
import {
  FullResourcesPageProps,
  IComments,
  IResource,
} from "../utils/interfaces";

export default function FullResourcePage({
  selectedResource,
}: FullResourcesPageProps): JSX.Element {
  const [commentList, setCommentList] = useState<IComments[]>();
  const resource = useFetchResources();
  const getCommentsFromServer = async () => {
    console.log("fetching comment list from api");
    try {
      const response = await axios.get(
        BaseURL + "comments/" + selectedResource?.resource_id
      );

      setCommentList(response.data.rows);
      console.log("newly retreived comments", response.data.rows);
    } catch (error) {
      console.error("you have an error with spots");
    }
    console.log("finished with getcommentsFromServer");
  };
  useEffect(() => {
    if (selectedResource) {
      getCommentsFromServer();
    }
  }, []);
  return (
    <>
      {selectedResource && (
        <div>
          <div className="resourcesInformation">
            <h1>
              {selectedResource.resource_name}: {selectedResource.author_name}
            </h1>
            <p>{selectedResource.resource_description}</p>
            <a href={selectedResource.resource_link}>Resource Link</a>
            <p>{selectedResource.resource_likes}👍</p>
            <p>{selectedResource.resource_dislikes}👎</p>
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
