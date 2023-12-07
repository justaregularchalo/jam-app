import { Link, useParams } from "react-router-dom";
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
  
    // Verificar si newComment no está vacío antes de enviar
    if (newComment.trim() !== "") {
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
    } else {
      // Muestra un mensaje o realiza alguna acción si el comentario está vacío
      console.log("Error: Message cant' be blank");
    }
  };
  

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    console.log(params.userId);

    try {
      const response = await service.get(`/profile/${params.userId}`);

      setUserDetails(response.data);

      const commentsResponse = await service.get(`/comment/${params.userId}`);
      console.log(commentsResponse.data);
      setComments(commentsResponse.data);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h3>...lodeando</h3>;
  }

  const handleDeleteComment = async (indexToDelete) => {
    console.log("Intentando borrar el índice", indexToDelete);
    try {
      const clone = JSON.parse(JSON.stringify(comments));
      const commentIdToDelete = clone[indexToDelete]._id;
      await service.delete(
        `comment/comment/${(params.commentId, commentIdToDelete)}`
      );
      clone.splice(indexToDelete, 1);
      setComments(clone);
      // navigate("/my-profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <div>
      <h1>{userDetails.username}</h1>

      <img
        className="profile-image"
        src={userDetails.picProfile}
        alt={userDetails.username}
        width={200}
      />

      <div className="left-column-all-users">
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
      </div>

      <div className="button-container">
        <button className="boton">
          <NavLink to={`/messages/${params.userId}`}>message me</NavLink>
        </button>

        <button className="boton">
          <NavLink to={"/artists"}>all artists</NavLink>
        </button>
      </div>

      <div className="video-container">
        <img src="" alt="" />

        <form onSubmit={handleCommentSubmit}>
          <div className="form-group">
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
          </div>
          <button className="boton" type="submit">
            Send
          </button>
        </form>

        <br />
        <br />

        <div >
          <h2>Comments:</h2>
          <ul className="comments-container">
            {comments.map((comment, index) => (
              <li key={comment._id}>
                <p>
                  <strong>{comment.commenter.username} </strong>

                </p>
                  {comment.comment}
                {comment.commenter._id === loggedUser._id && (
                  <button
                    className="boton-eliminar-comments"
                    onClick={() => handleDeleteComment(index)}
                  >
                   Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
