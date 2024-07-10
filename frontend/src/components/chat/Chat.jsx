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


      <div className="center">

        <div className="message">
          <img src='/assets/avatar.png'/>
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias sint a cupiditate commodi fugiat? Minima eveniet blanditiis dignissimos consequatur, expedita facere. Natus ex nulla error rem fugiat, repudiandae nobis velit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias sint a cupiditate commodi fugiat? Minima eveniet blanditiis dignissimos consequatur, expedita facere. Natus ex nulla error rem fugiat, repudiandae nobis velit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src='/assets/avatar.png'/>
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias sint a cupiditate commodi fugiat? Minima eveniet blanditiis dignissimos consequatur, expedita facere. Natus ex nulla error rem fugiat, repudiandae nobis velit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
          <img src='/assets/tanjiro.jpg' />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias sint a cupiditate commodi fugiat? Minima eveniet blanditiis dignissimos consequatur, expedita facere. Natus ex nulla error rem fugiat, repudiandae nobis velit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src='/assets/avatar.png'/>
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias sint a cupiditate commodi fugiat? Minima eveniet blanditiis dignissimos consequatur, expedita facere. Natus ex nulla error rem fugiat, repudiandae nobis velit.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias sint a cupiditate commodi fugiat? Minima eveniet blanditiis dignissimos consequatur, expedita facere. Natus ex nulla error rem fugiat, repudiandae nobis velit.</p>
            <span>1 min ago</span>
          </div>
        </div>

      </div>

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
        <button className='button'><span>Send</span></button>
      </div>
    </div>
  )
}

export default Chat