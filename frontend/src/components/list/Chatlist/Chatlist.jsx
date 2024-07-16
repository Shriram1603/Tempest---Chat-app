import React, { useEffect, useState } from 'react';
import './Chatlist.css';
import AddUser from './addUser/AddUser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

const Chatlist = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAdd] = useState(false);
  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        const docRef = doc(db, "users", item.recieverId);
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

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user);
  };

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchbar">
          <img src="/assets/search.png" alt="Search" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "/assets/minus.png" : "/assets/plus.png"}
          className="add"
          onClick={() => setAdd(!addMode)}
        />
      </div>
      {chats.map((chat) => (
        <div className="Items" key={chat.chatId} onClick={() => handleSelect(chat)}>
          <img src={chat.user.avatar || '/assets/avatar.png'} alt="User Avatar" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
};

export default Chatlist;
