import React from 'react'
import "./chat.css"


const Chat = () => {
  return (
    <div className='chat'>

      <div className="top">
        <div className="user">
          <img src="/assets/avatar.png" alt="Avatar" />
          <div className="txtes">
            <span>Username</span>
            <p>cant talk whatsapp only</p>
          </div>
        </div>
          <div className="icons">
            <img src="/assets/phone.png" alt="More" />
            <img src="/assets/video.png" alt="Video" />
            <img src="/assets/info.png" alt="Edit" />
          </div>
      </div>


      <div className="center"></div>

      <div className="bottom">
        <div className="icon"></div>

        <input type="text" placeholder='Message' />
      </div>
    </div>
  )
}

export default Chat