import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Result.module.css";
import { io } from "socket.io-client";

interface ResultPageProps {
  file: File;
}

const Result: React.FC<ResultPageProps> = ({ file }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [video, setVideo] = useState<File>(new File([], "")); // [1
  const [results, setResults] = useState<any>(null);
  const isSent = useRef(false);
  const isFullscreen = false;

  useEffect(() => {
    if (file && !isSent.current) {
      const socket = io("http://127.0.0.1:5000");
      const chunkSize = 1024 * 1024 * 50; // 50 MB
      let offset = 0;

      socket.on("connect", () => {
        function readAndSendChunk() {
          const reader = new FileReader();
          const blob = file.slice(offset, offset + chunkSize);

          reader.onload = (e) => {
            if (e.target && e.target.result) {
              socket.emit(
                "video_chunk",
                new Uint8Array(e.target.result as ArrayBuffer),
                file.name
              );
              offset += chunkSize;

              if (offset < file.size) {
                readAndSendChunk();
              } else {
                socket.emit("end_video_transfer", file.name);
              }
            }
          };

          reader.readAsArrayBuffer(blob);
        }

        readAndSendChunk();
      });

      socket.on("disconnect", () => {
        console.log(`is Connected? ${socket.connected}`);
        setIsLoading(false);
      });

      socket.on("video_saved", (...args) => {
        const file = new File([args[0].video_data], "result.mp4", {
          type: "video/mp4",
        });
        setVideo(file);
        setResults(args[0].additional_data);

        setIsLoading(false);
        isSent.current = true;
        socket.disconnect();
      });

      socket.on("error", (...args) => {
        console.log(args);
        console.log("Error");
      });

      return () => {
        socket.close();
      };
    }
  }, [video]);

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
                            {results.right_knee}
                          </span>
                        </div>
                        <div
                          className={`${styles.columns_item} ${styles.secondColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            Angle of left knee:
                          </span>
                          <span className={styles.dataSpan}>
                            {results.left_knee}
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
                            {results.right_elbow}
                          </span>
                        </div>
                        <div
                          className={`${styles.columns_item} ${styles.secondColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            Angle of left elbow:
                          </span>
                          <span className={styles.dataSpan}>
                            {results.left_elbow}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.rightSection}>
                  <div className={styles.videoContainer}>
                    <video controls className={styles.video}>
                      <source
                        src={URL.createObjectURL(video)}
                        type={video.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className={styles.video_text}>
                    Click on the video to view in fullscreen.
                    <br /> Our model added keypoints to the video to calculate
                    the angles of the joints.
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
