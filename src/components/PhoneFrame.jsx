import React, { useState, useEffect } from "react";
import { Battery, Wifi, Signal } from "lucide-react";

export default function PhoneFrame({ children }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="device-container">
      {/* Desktop Device Bezel wrapper */}
      <div className="smartphone">
        <div className="notch"></div>
        <div className="side-button power"></div>
        <div className="side-button volume-up"></div>
        <div className="side-button volume-down"></div>
        
        <div className="screen">
          {/* Status Bar */}
          <div className="status-bar">
            <div className="status-left">
              <span>{time}</span>
            </div>
            <div className="status-right">
              <Signal size={12} strokeWidth={2.5} />
              <span className="network-type">5G</span>
              <Wifi size={12} strokeWidth={2.5} />
              <div className="battery-container">
                <span style={{ fontSize: "9px", marginRight: "2px" }}>98%</span>
                <Battery size={13} strokeWidth={2.5} className="battery-icon" />
              </div>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="screen-content">
            {children}
          </div>

          {/* Home indicator bar */}
          <div className="home-indicator"></div>
        </div>
      </div>
    </div>
  );
}
