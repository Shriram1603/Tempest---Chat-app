import React, { useState } from 'react';
import "./Userinfo.css"
export const Userinfo = () => {

    

  return (
    <div className="userinfo">
      <div className="user">
        <img src="/assets/avatar.png" alt="Avatar" />
        <h2>Username</h2>
      </div>
      <div className="icon">
        <img src="/assets/more.png" alt="More" />
        <img src="/assets/video.png" alt="Video" />
        <img src="/assets/edit.png" alt="Edit" />
      </div>
    </div>
  );
};
