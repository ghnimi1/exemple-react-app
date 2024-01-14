import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
// Import the main component viewer
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function ViewRoom() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [url, setUrl] = useState([]);
  const [message, setMessage] = useState([]);

  const [showModal, setShowModal] = React.useState(false);
  const [viewPdf, setViewPdf] = useState(null);

  const { id } = useParams();
  // console.log(id);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/roomById/${id}`);

      if (res.data) {
        setUrl(res.data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMessage = async () => {
    try {
      const res = await axios.get("http://localhost:3001/allData/" + url.url);

      if (res.data) {
        setMessage(res.data.result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getMessage();
  }, [id, url]);

  return (
    <div
      className="user"
      style={{
        width: "100%",
        marginLeft: "5%",
        height: "90%",
        marginRight: "5%",
        position: "relative",
        paddingBottom: 40,
        paddingInline: 20,
        border: "1px solid #E6552D",
      }}
    >
      <div
        style={{
          background: "#6495ED",
          width: "150px",
          color: "white",
          padding: "10px",
          borderRadius: 7,
          textAlign: "center",
          position: "absolute",
          top: -23,
          background: "#E6552D",
        }}
      >
        Room details
      </div>
      <Table striped style={{ marginBottom: "10%" }}>
        <thead>
          <tr>
            <th>N°</th>
            <th>sender</th>
            <th>msg</th>
            <th>time</th>
            <th>room</th>
          </tr>
        </thead>
        <tbody>
          {message.map((item, key) => (
            <tr>
              <td>{key + 1}</td>
              <td>{item?.sender}</td>
              {item.pdf ? (
                <td>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      setShowModal(true);
                      setViewPdf(item.msg);
                    }}
                  >
                    {item?.msg}
                  </button>
                </td>
              ) : (
                <td>{item?.msg}</td>
              )}

              <td>{item?.time}</td>
              <td>{item?.room}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showModal ? (
        <>
          <div className="justify-center z-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-fit bg-white outline-none focus:outline-none">
                {/*header*/}

                {/*body*/}
                <div className=" h-80 overflow-auto" style={{ width: "70vw" }}>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                    {/* <!-- The viewer component will be put here --> */}
                    <Viewer
                      fileUrl={`http://localhost:3001/uploads/pdf/${viewPdf}`}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end px-6 border-t border-solid border-slate-200 rounded-b">
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

export default ViewRoom;
