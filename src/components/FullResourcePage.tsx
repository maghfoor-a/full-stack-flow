import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";
import { BackendURL } from "../utils/backendURL";
import useFetchResources from "../utils/useFetchResources";
import "./FullResourcePage.css";
import useFetchComments from "../utils/useFetchComments";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//--------------------------------------------------------------------------------------JSX Element declaration
export default function FullResourcePage(): JSX.Element {
  const { resources } = useFetchResources();

  const [commentSubmit, setCommentSubmit] = useState({
    user_id: 0,
    comment_text: "",
  });

  //--------------------------------------------------------------------------------------Defining selected resource
  const { id } = useParams();
  const resource = resources.find((resource) => {
    if (id) {
      return resource.resource_id === parseInt(id);
    }
    return false;
  });
  const user = localStorage.getItem("user");
  //--------------------------------------------------------------------------------------GET comments from SERVER
  const { commentList, updateComments } = useFetchComments(id);

  const postCommentToServer = async (user_id: number, comment_text: string) => {
    if (comment_text.length > 0 && id) {
      try {
        await axios.post(BackendURL + "comments", {
          resource_id: id,
          user_id: user_id,
          comment_text: comment_text,
        });
        updateComments();
      } catch (error) {
        console.log("error from post");
      }
    } else {
      alert("you must write something before you submit!");
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (user) {
      postCommentToServer(JSON.parse(user).user_id, commentSubmit.comment_text);
    } else {
      signIn();
    }
  };

  const handleDeleteComment = async (comment_id: number) => {
    console.log("deleting comment", comment_id);
    try {
      await axios.delete(BackendURL + "comments/" + comment_id);
      updateComments();
    } catch (error) {
      console.log("could not delete comment");
    }
  };

  const handleLikedComment = async (comment_id: number) => {
    try {
      await axios.patch(BackendURL + `comments/likes/${comment_id}`);
      updateComments();
    } catch (error) {
      console.error("could not like comment", error);
      window.alert("Failed to like comment, please try again later");
    }
  };
  const signIn = () => {
    toast("Sign in to submit comment");
  };

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
            <div>
              <h1>add a comment</h1>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  user ? handleCommentSubmit(e) : signIn();
                }}
              >
                <input
                  placeholder={
                    user
                      ? JSON.parse(user).user_name
                      : "Sign in to add a comment"
                  }
                  type="text"
                  value={user ? JSON.parse(user).user_name : ""}
                  onChange={() =>
                    setCommentSubmit({
                      ...commentSubmit,
                      user_id: user && JSON.parse(user).user_id,
                    })
                  }
                />
                <input
                  placeholder="comment here"
                  type="text"
                  value={commentSubmit.comment_text}
                  onChange={(e) =>
                    setCommentSubmit({
                      ...commentSubmit,
                      comment_text: e.target.value,
                    })
                  }
                />
                <input type="submit" />
              </form>
            </div>
          </div>
          <h1 className="comments-title">comments:</h1>
          <div className="comment-container">
            {commentList.map((comment) => {
              return (
                <div className="comment-item" key={comment.comment_id}>
                  <p>
                    {comment.user_name}: {comment.comment_text} - Likes:
                    {comment.comment_likes}
                  </p>

                  <div className="comment-buttons">
               
                      

                  {user && comment.user_id === JSON.parse(user).user_id && (
                    <button className="delete-button"

                      onClick={() => handleDeleteComment(comment.comment_id)}
                    >
                      delete
                    </button> )}

                    <button
                      className="like-button"
                      onClick={() => handleLikedComment(comment.comment_id)}
                    >
                      like
                    </button>
                  </div>
                  

                </div>
              );
            })}
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
