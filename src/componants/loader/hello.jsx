"use client";
import React, { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

const CountDown = ({ limitTime }) => {
  const initialSeconds = limitTime;
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1;
        secureLocalStorage.setItem("sp", newSeconds.toString());
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    if (time <= 0) {
      return "Completed";
    } else {
      return `${formattedMinutes}:${formattedSeconds}`;
    }
  };

  return (
    <div>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

export default CountDown;
