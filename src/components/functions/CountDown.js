import { useEffect, useRef, useState } from "react";

function CountDown({ h = 0, m = 0, s = 0, onComplete = undefined }) {
  const [totalSeconds, setTotalSeconds] = useState(h * 3600 + m * 60 + s);
  const intervalRef = useRef(null);

  const handleClearInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  // Reset the counter if the props change
  useEffect(() => {
    setTotalSeconds(h * 3600 + m * 60 + s);
  }, [h, m, s]);

  // Handles the interval and its cleanup
  useEffect(() => {
    if (totalSeconds <= 0 && typeof onComplete === 'function') {
      onComplete();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          handleClearInterval();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => handleClearInterval();
  }, [onComplete]);

  const hours = Math.floor(totalSeconds / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value) => (value < 10 ? `0${value}` : String(value));

  return (
    <h6 className="text-white">
      {pad(hours)}h : {pad(minutes)}m : {pad(seconds)}s
    </h6>
  );
}

export default CountDown;
