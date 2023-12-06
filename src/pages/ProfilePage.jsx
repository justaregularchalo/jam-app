import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import service from "../services/config";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function ProfilePage() {
  const { loggedUser } = useContext(AuthContext);
  const params = useParams();
  // console.log(params);

  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const navigate = useNavigate();

  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const commentCreated = {
        commenter: loggedUser._id,
        user: params.userId,
        comment: newComment,
      };

      await service.post(`comment/${params.userId}`, commentCreated);

      getUsers();
      setNewComment("");
      navigate(`/profile/${params.userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [params.userId]);

  const getUsers = async () => {
    console.log(params.userId);

    try {
      const response = await service.get(`/profile/${params.userId}`);

      setUserDetails(response.data);
      setIsloading(false);

      const commentsResponse = await service.get(`/comment/${params.userId}`);
      setComments(commentsResponse.data);
      console.log(commentsResponse.data)
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h3>...lodeando</h3>;
  }

  function commentOnProfile(comment) {
    return comment.user === params.userId;
  }

  const CommentToShow = comments.filter(commentOnProfile);

  return (
    <div>
      <h1>{userDetails.username}</h1>

      <img src="" alt={userDetails.username} />

      <p>
        {" "}
        <strong>Instrument: </strong> {userDetails.instrument}
      </p>

      <p>
        {" "}
        <strong>Genre: </strong> {userDetails.genre}
      </p>

      <p>
        {" "}
        <strong>Location: </strong> {userDetails.location}
      </p>

      <p>
        {" "}
        <strong>Info: </strong> {userDetails.bio}
      </p>

      <div className="video-container">
        <img src="" alt="" />

        <button>
          <NavLink to={"/artists"}>See all artists</NavLink>
        </button>

        <form onSubmit={handleCommentSubmit}>
          <label htmlFor="comment">
            <strong>Comment:</strong>
          </label>
          <textarea
            id="comment"
            name="comment"
            maxLength={200}
            rows={6}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button type="submit">Send Comment</button>
        </form>

        <br />
        <br />

        <div className="comments-container">
          <h2>Comments:</h2>
          <ul>
            {CommentToShow.map((comment) => (
              <li key={comment._id}>
                <p>{comment.comment}</p>
                <p>By: {loggedUser.username}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
