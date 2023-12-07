import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../services/config";

function Messages() {
  const { loggedUser } = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsloading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    try {
      const messageCreated = {
        sender: loggedUser._id,
        receiver: params.userId,
        message: newMessage,
        // picProfile: loggedUser.picProfile,
      };

      await service.post(`messages/${params.userId}`, messageCreated);
      getUsers();
      setMessages((previousMessages) => {
        const newArrMess = [...previousMessages];

        newArrMess.push(messageCreated);
        return newArrMess;
      });

      setNewMessage("");
      navigate(`/messages/${params.userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    // console.log(params.userId);

    try {
      const response = await service.get(`/profile/${params.userId}`);

      setUserDetails(response.data);
      setIsloading(false);

      const allMessages = await service.get(`/messages/${params.userId}`);
      setMessages(allMessages.data);
      console.log(allMessages.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteMessage = async (e) => {};

  if (isLoading) {
    return <h3>...lodeando</h3>;
  }

  const messagesToShow = messages.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <div>
      <h2 className="messages-title">
        {" "}
        <strong>Messages with {userDetails.username}</strong>{" "}
      </h2>

      <div className="message-container">
        <h4>Messages</h4>
        <ul>
          {messagesToShow.map((message) => (
            <li key={message._id}>
              {/* <img src={message.sender.picProfile} /> */}
              <p>
                <strong>{message.sender.username}</strong>
              </p>
              <p>{message.message}</p>
              <button onClick={handleDeleteMessage}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleMessageSubmit}>
        <label htmlFor="message">
          <strong>Say sumthing!</strong>
        </label>
        <textarea
          id="message"
          name="message"
          maxLength={200}
          rows={6}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Messages;
