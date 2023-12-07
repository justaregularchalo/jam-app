import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
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
  
    // Verificar si newMessage no está vacío antes de enviar
    if (newMessage.trim() !== "") {
      try {
        const messageCreated = {
          sender: loggedUser._id,
          receiver: params.userId,
          message: newMessage,
          
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
    } else {
      // Muestra un mensaje o realiza alguna acción si el mensaje está vacío
      console.log("Error: Message cant be blank");
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

  const handleDeleteMessage = async (indexToDelete) => {
    console.log("Intentando borrar el índice", indexToDelete);

    try {
      const clone = JSON.parse(JSON.stringify(messages));
      clone.splice(indexToDelete, 1);

      const messageIdToDelete = messages[indexToDelete]._id;

      await service.delete(
        `messages/message/${(params.messageId, messageIdToDelete)}`
      );

      setMessages(clone);

      navigate(`/messages/${params.userId}`);
    } catch (err) {
      console.log(err);
    }
  };

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
      
        <ul className="lista-mensajes">
          {messagesToShow.map((message, index) => (
            <li key={message._id}>
              {/* <img src={message.sender.picProfile} /> */}
              <p>
                <strong>{message.sender.username}</strong>
              </p>
              <p>{message.message}</p>

              {message.sender._id === loggedUser._id && (
                <button className="boton-eliminar" onClick={() => handleDeleteMessage(index)}>
                  Delete
                </button>
              )}
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
      </form>
      <div className="botones-mensajes"> 
      
      <button className="boton">
        <NavLink to={`/profile/${params.userId}`}>Go back</NavLink>
      </button>
      <button className="boton" onClick={handleMessageSubmit} type="submit">
        Send
      </button>
      
      
      </div>
    </div>
  );
}

export default Messages;
