import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef }).catch(() => {
      setExpression("Camera or model failed to start. Check permissions.");
    });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  function handleClick() {
    const mood = detect({ landmarkerRef, videoRef, setExpression });
    if (mood != null && mood !== "") {
      onClick(mood);
    }
  }

  return (
    <div className="detection-panel">
      <div className="detection-panel__header">
        <h2 className="detection-panel__title">Mood detection</h2>
        <p className="detection-panel__hint">
          Position your face in frame, then tap detect — same MediaPipe flow as before.
        </p>
      </div>
      <div className="detection-panel__video-wrap">
        <video ref={videoRef} className="detection-panel__video" playsInline />
        <div className="detection-panel__scan" aria-hidden>
          <motion.div
            className="detection-panel__scan-line"
            animate={{ top: ["0%", "96%", "0%"] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
      <motion.p
        className="detection-panel__expression"
        key={expression}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        {expression}
      </motion.p>
      <div className="detection-panel__actions">
        <button type="button" className="detection-panel__btn" onClick={handleClick}>
          Detect expression
        </button>
      </div>
    </div>
  );
}
