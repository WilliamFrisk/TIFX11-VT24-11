import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Result.module.css";
import { io } from "socket.io-client";
import { useTranslation } from "react-i18next";
interface ResultPageProps {
  file: File;
}

const Result: React.FC<ResultPageProps> = ({ file }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [video, setVideo] = useState<File>(new File([], "")); // [1
  const [results, setResults] = useState<any>(null);
  const isSent = useRef(false);
  const isFullscreen = false;
  const { t } = useTranslation();
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
                console.log("End of file reached");
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
  }, [file]);

  return (
    <div className={isFullscreen ? styles.fullscreen : styles.Container}>
      {isLoading ? (
        <div className={styles.overlay}>
          <Spinner animation="border" />
          <p className={styles.overlay_text}>{t(results.process)}</p>
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
                            {t("results.right_knee")}
                          </span>
                          <span className={styles.dataSpan}>
                            {results.right_knee + "°"}
                          </span>
                        </div>
                        <div
                          className={`${styles.columns_item} ${styles.secondColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            {t("results.left_knee")}
                          </span>
                          <span className={styles.dataSpan}>
                            {results.left_knee + "°"}
                          </span>
                        </div>

                        <div
                          className={`${styles.columns_item} ${styles.firstColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            {t("results.right_hip")}
                          </span>
                          <span className={styles.dataSpan}>
                            {results.right_hip + "°"}
                          </span>
                        </div>
                        <div
                          className={`${styles.columns_item} ${styles.secondColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            {t("results.left_hip")}
                          </span>
                          <span className={styles.dataSpan}>
                            {results.left_hip + "°"}
                          </span>
                        </div>

                        <div
                          className={`${styles.columns_item} ${styles.firstColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            {t("results.right_elbow")}
                          </span>
                          <span className={styles.dataSpan}>
                            {results.right_elbow + "°"}
                          </span>
                        </div>
                        <div
                          className={`${styles.columns_item} ${styles.secondColumn}`}
                        >
                          <span className={styles.infoSpan}>
                            {t("results.left_elbow")}
                          </span>
                          <span className={styles.dataSpan}>
                            {results.left_elbow + "°"}
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
                </div>
              </div>
            </div>
            <p className={styles.video_text}>
              {t("results.click")}
              <br /> {t("results.added_keypoints")}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Result;
