import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import styles from "./Result.module.css";

interface ResultPageProps {
  video: File;
}

const Result: React.FC<ResultPageProps> = ({ video }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:5000/fileupload");

    socket.onopen = () => {
      setIsLoading(true);
      console.log("WebSocket connection established.");
      const blob = new Blob([video], { type: video.type });
      socket.send(blob);
    };

    socket.onmessage = (event) => {
      setIsLoading(false);
      const data = JSON.parse(event.data);
      console.log("Results:", data);
      setResults(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, [video]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={isFullscreen ? styles.fullscreen : styles.Container}>
      {isLoading ? (
        <div className={styles.overlay}>
          <Spinner animation="border" />
          <p className={styles.overlay_text}>Processing...</p>
        </div>
      ) : (
        <>
          <div className={styles.resultContainer}>
            <h1 className={styles.header_text}>{video.name}</h1>
            <div className={styles.body}>
              <div className={styles.grid}>
                <div className={styles.leftSection}>
                  {results && (
                    <div className={styles.resultStats}>
                      <div className={styles.columns}>
                        <p className={styles.columns_item}>
                          Angle of right knee: {results.data.right_knee}
                        </p>
                        <p className={styles.columns_item}>
                          Angle of left knee: {results.data.left_knee}
                        </p>
                      </div>
                      <div className={styles.columns}>
                        <p className={styles.columns_item}>
                          Angle of right elbow: {results.data.right_elbow}
                        </p>
                        <p className={styles.columns_item}>
                          Angle of left elbow: {results.data.left_elbow}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.rightSection}>
                  <div className={styles.videoContainer}>
                    <video
                      controls
                      className={styles.video}
                      onClick={toggleFullscreen}
                    >
                      <source
                        src={URL.createObjectURL(video)}
                        type={video.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Result;
