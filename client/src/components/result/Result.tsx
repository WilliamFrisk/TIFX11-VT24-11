import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Result.module.css";
import { io } from "socket.io-client";
interface ResultPageProps {
  file: File;
}

const Result: React.FC<ResultPageProps> = ({ file }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [video, setVideo] = useState<File>(file); // [1
  const [results, setResults] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const socket = io("ws://127.0.0.1:5000/test");
    socket.on("connect", () => {
      console.log(`Connected? ${socket.connected}`);
      setIsLoading(true);

      if (video) {
        // Check if video prop is available
        const blob = new Blob([video], { type: video.type }); // Use video.type for mime type;
        try {
          console.log("blob", blob);
          socket.emit("fileupload", blob, video.name);
        } catch (error) {
          console.log("error block");
          console.log("hejh");
          console.error("Error uploading file:", error);
        } finally {
          console.log(video.name);
          console.log("finally block");
        }
      } else {
        console.error("No video file found");
      }
    });

    socket.on("disconnect", () => {
      console.log(`is Connected? ${socket.connected}`);
      setIsLoading(false);
    });
    socket.on("result", (...args) => {
      console.log(args);
      setIsLoading(false);
    });
    socket.on("error", (...args) => {
      console.log(args);
      console.log("Error");
    });

    return () => {
      socket.close();
    };
  }, []);

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
            <div className={styles.head}>
              <h1 className={styles.header_text}>{video.name}</h1>
            </div>
            <div className={styles.body}>
              <div className={styles.grid}>
                <div className={styles.leftSection}>
                  {results && (
                    <div className={styles.resultStats}>
                      <div className={styles.columns}>
                        <div
                          className={`${styles.columns_item} ${styles.firstColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            Angle of right knee:
                          </span>
                          <span className={styles.dataSpan}>
                            {results.data.right_knee}
                          </span>
                        </div>
                        <div
                          className={`${styles.columns_item} ${styles.secondColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            Angle of left knee:
                          </span>
                          <span className={styles.dataSpan}>
                            {results.data.left_knee}
                          </span>
                        </div>
                      </div>
                      <div className={styles.columns}>
                        <div
                          className={`${styles.columns_item} ${styles.firstColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            Angle of right elbow:
                          </span>
                          <span className={styles.dataSpan}>
                            {results.data.right_elbow}
                          </span>
                        </div>
                        <div
                          className={`${styles.columns_item} ${styles.secondColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            Angle of left elbow:
                          </span>
                          <span className={styles.dataSpan}>
                            {results.data.left_elbow}
                          </span>
                        </div>
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
                  <p className={styles.video_text}>
                    Click on the video to view in fullscreen.<br></br> Our model
                    added keypoints to the video to calculate the angles of the
                    joints.
                  </p>
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
