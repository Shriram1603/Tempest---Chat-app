import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';

const Chat = () => {
  const { currentUser } = useUserStore();
  const { chatId, userId } = useChatStore();
  const [chat, setChat] = useState();
  const endRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'userchats', currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const docRef = doc(db, 'users', item.recieverId);
        const userDocSnap = await getDoc(docRef);
        const user = userDocSnap.data();

        return { ...item, user };
      });

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const [img,setImg]=useState({
    file:null,
    url:"",
  }
  );

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const onSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      onSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText(prev => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (text === "") return;

    let imgUrl = null;
  
    try {

      if(img.file){
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        message: arrayUnion({
          text,
          user: currentUser,
          createAt: Date.now(),
          ...(imgUrl && {img: imgUrl }),
        }),
      });
  
      const userIDs = [currentUser.id, userId];
  
      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatSnapshot = await getDoc(userChatRef);
  
        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(chat => chat.chatId === chatId);
          if (chatIndex > -1) {
            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();
  
            await updateDoc(userChatRef, {
              chats: userChatsData.chats,
            });
          }
        }
      });
  
      setText("");
    } catch (error) {
      console.log(error);
    }

    setImg({
      file:null,
      url:"",
    })

    setText("");
  };

  const handleImage=(e)=>{

    if(e.target.files[0]){
    setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
    })}
}
  

  return (
    <div className='chat'>
      <div className="top">
        {chats.map((chat) => (
          
          <div className="user">
          <img src={chat?.user?.avatar || "/assets/avatar.png"} alt="Avatar" />
          <div className="txtes">
            <span>{chat?.user?.username}</span>
            <p>can't talk WhatsApp only</p>
          </div>
        </div>
        ))}
        <div className="icons">
          <img src="/assets/phone.png" alt="More" />
          <img src="/assets/video.png" alt="Video" />
          <img src="/assets/info.png" alt="Edit" />
        </div>
      </div>

      <div className="center">
  {chat?.message?.map((msg) => (
    <div className={`message ${msg.user.id === currentUser.id ? 'own' : ''}`} key={msg?.createAt}>
     { msg?.user?.id !== currentUser.id && <img src={msg?.user?.avatar || "/assets/avatar.png"} alt="Avatar" />}
      <div className="texts">
        {msg.img && <img src={msg.img} alt="Attached" />}
        <p>{msg.text}</p>
        <span>{new Date(msg.createAt).toLocaleTimeString()}</span>
      </div>
    </div>
  ))}
  {img.url && <div className="message own">
    <div className="texts">
      <img src={img.url} alt="" />
      </div>
    
    </div>  }
  <div ref={endRef}></div>
</div>


      <div className="bottom">
        <div className="icon">
          <label htmlFor="file">
          <img src="/assets/img.png" alt="" />
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleImage} />
          <img src="/assets/camera.png" alt="" />
          <img src="/assets/mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder='Type a Message...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img src="/assets/emoji.png" alt="Emoji" onClick={() => setOpen(!open)} />
          <div className="picker">
            {open ? <EmojiPicker onEmojiClick={handleEmoji} /> : null}
          </div>
        </div>
        <button className='button' onClick={handleSend}><span>Send</span></button>
      </div>
    </div>
  );
};

export default Chat;
