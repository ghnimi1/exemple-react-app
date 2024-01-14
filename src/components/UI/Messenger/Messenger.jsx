import { Worker } from "@react-pdf-viewer/core";
// Import the main component viewer
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import React, { useEffect, useState, useRef, useContext } from "react";
import socket from "../../../socket";
import { SocketContext } from "../../../Contexte/socketContext";
import "./Messenger.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUserFriends,
  faCommentAlt,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from "axios";
function Messenger({ setIsMessenger, display, roomId }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  let time = moment(new Date()).format("hh:mm A");
  const currentUser = sessionStorage.getItem("user");
  const [text, setText] = useState("");
  const [msg, setMsg] = useState([]);
  const messagesEndRef = useRef(null);
  const { chat } = useContext(SocketContext);

  //image related
  const [File, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();
  const [showModal, setShowModal] = React.useState(false);
  const [viewPdf, setViewPdf] = useState(null);

  // fn upload
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

  useEffect(() => {
    socket.on("FE-receive-message", ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  // Scroll to Bottom of Message List
  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (e) => {
    const formData = new FormData();
    if (File) {
      formData.append("msg", File);
      formData.append("pdf", true);
    } else {
      formData.append("msg", text);
      formData.append("pdf", false);
    }

    formData.append("roomId", roomId);
    formData.append("sender", currentUser);
    formData.append("time", time);

    const result = await axios.post("http://localhost:3001/savedata", formData);

    if (File) {
      socket.emit("BE-send-message", {
        roomId,
        msg: result.data.result.msg,
        sender: currentUser,
        time,
        pdf: 1,
      });
      setText("");
    } else {
      socket.emit("BE-send-message", {
        roomId,
        msg: text,
        sender: currentUser,
        time,
        pdf: 0,
      });
      setText("");
    }
    setFile(null);
  };
  return (
    <div className="messenger-container">
      <div className="messenger-header">
        <h3>Meeting details</h3>
        <FontAwesomeIcon
          className="icon"
          icon={faTimes}
          onClick={() => {
            setIsMessenger(false);
          }}
        />
      </div>

      <div className="messenger-header-tabs">
        <div className="tab">
          <FontAwesomeIcon className="icon" icon={faUserFriends} />
          <p>People (1)</p>
        </div>
        <div className="tab active">
          <FontAwesomeIcon className="icon" icon={faCommentAlt} />
          <p>Chat</p>
        </div>
      </div>

      <div className="chat-section">
        {chat &&
          chat.map(({ sender, msg, time, pdf }, idx) => {
            return (
              <div key={idx} className="chat-block">
                <div className="sender">
                  {sender} <small>{time}</small>
                </div>
                {/* <p className="msg">here commes an actual msg </p> */}
                {pdf === 0 ? (
                  <>
                    <p className="msg">{msg} </p>
                  </>
                ) : (
                  <div
                    className="cursor-pointer "
                    onClick={() => {
                      setViewPdf(msg);
                      setShowModal(!showModal);
                    }}
                  >
                    {" "}
                    <p className="msg">{msg} </p>
                  </div>
                )}
              </div>
            );
          })}
        <div style={{ float: "left", clear: "both" }} ref={messagesEndRef} />
      </div>

      <div className="send-msg-section">
        <input
          placeholder="Send a message to everyone"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="w-fit">
          <input
            onChange={pickedHandler}
            type="file"
            className="hidden"
            id="attache_file"
          />
          <label htmlFor="attache_file" className="cursor-pointer">
            <FontAwesomeIcon className="icon" icon={faPaperclip} />
          </label>
        </div>
        <div onClick={sendMessage}>
          <FontAwesomeIcon className="icon" icon={faPaperPlane} />
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-fit bg-white outline-none focus:outline-none">
                {/*header*/}

                {/*body*/}
                <div className=" h-96 overflow-auto" style={{ width: "70vw" }}>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                    {/* <!-- The viewer component will be put here --> */}
                    <Viewer
                      fileUrl={`http://localhost:3001/uploads/pdf/${viewPdf}`}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setViewPdf(null);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Messenger;
