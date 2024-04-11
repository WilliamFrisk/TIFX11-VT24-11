import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";

// Configure Axios instance with default origin (adjust as needed)

interface ResultPageProps {
  video: File;
}

const Result: React.FC<ResultPageProps> = ({ video }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState();

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:5000/fileupload"); // Adjust the URL as needed

    socket.onopen = () => {
      setIsLoading(true);
      console.log("WebSocket connection established.");
      const blob = new Blob([video], { type: video.type });
      socket.send(blob);
    };

    socket.onmessage = (event) => {
      setIsLoading(false);
      console.log("Message received from server:", event.data);
      // Handle incoming messages from the server
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      // Handle errors
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      // Handle closed connection
    };

    return () => {
      // Cleanup function to close the WebSocket connection
      socket.close();
    };
  }, []);

  return <>{isLoading ? <Spinner animation="border" /> : <h1>Results!</h1>}</>;
};

export default Result;
