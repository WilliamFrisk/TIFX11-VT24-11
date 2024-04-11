import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import io from "socket.io-client";
import axios from "axios";

// Configure Axios instance with default origin (adjust as needed)

interface ResultPageProps {
  video: File;
}

const Result: React.FC<ResultPageProps> = ({ video }) => {
  const socket = io("http://127.0.0.1:5000");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState();

  useEffect(() => {
    socket.connect();
    socket.on("connected", () => {
      const reader = new FileReader();
      console.log("connected to server");
      reader.onload = (data: any) => {
        const fileData = reader.result;
        socket.emit("file", { fileName: video.name, fileData });
        console.log("File uploaded", video.name);

        setIsLoading(true);
      };
      reader.readAsArrayBuffer(video);
    });

    socket.on("result", (data) => {
      setIsLoading(false);
      console.log("Received result:", data.message);
      setResults(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [video]);

  return <>{isLoading ? <Spinner animation="border" /> : <h1>Results!</h1>}</>;
};

export default Result;
