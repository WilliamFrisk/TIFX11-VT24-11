import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import io from "socket.io-client";

interface ResultPageProps {
  video: File;
}

const Result: React.FC<ResultPageProps> = ({ video }) => {
  const socket = io("http://localhost:5000");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => console.log("Connected to WebSocket server"));
    socket.on("disconnect", () =>
      console.log("Disconnected from WebSocket server")
    );

    socket.on("result", (data) => {
      setIsLoading(false);
      console.log("Received result:", data);
      setResults(data);
      socket.disconnect();
    });

    const reader = new FileReader();

    reader.onload = () => {
      const fileData = reader.result;
      socket.emit("file", { fileName: video.name, fileData });
      console.log("File uploaded", video.name);
      setIsLoading(true);
    };

    reader.readAsArrayBuffer(video);

    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{isLoading ? <Spinner animation="border" /> : <h1>Results!</h1>}</>;
};

export default Result;
