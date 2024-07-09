import React from 'react'
import {useState} from 'react'
import EmojiPicker from "emoji-picker-react";
import "./chat.css"


const Chat = () => {

  const[open,setOpen]=useState(false)
  const[Text,setText]=useState("")


  const handleEmoji = e =>{
    setText(prev => prev + e.emoji)
    setOpen(false)
  }

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
        <div className="icon">
          <img src="/assets/img.png" alt="" />
          <img src="/assets/camera.png" alt="" />
          <img src="/assets/mic.png" alt="" />
        </div>

        <input type="text" placeholder='Type a Message...'value={Text} onChange={(e)=>setText(e.target.value)}/>
        <div className="emoji">
          <img src="/assets/emoji.png" alt="Emoji" onClick={()=>setOpen(!open)}/>
          <div className="picker">
            {open ?<EmojiPicker onEmojiClick={handleEmoji}/>:null}
          </div>
        </div>
        <button className='sendbutton'>Send</button>
      </div>
    </div>
  )
}

export default Chat