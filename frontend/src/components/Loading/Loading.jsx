import React, { useEffect, useState } from "react";
import "./loading.css";

const Loading = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const messages = ["Loading...", "Hang on, we are setting things up for you"];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 3000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="loader-container">
        <div className="anime-loader"></div>
        <div className="loader-text">{messages[messageIndex]}</div>
      </div>
    );
  };
  
  export default Loading;