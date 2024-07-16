import React, { useEffect, useState } from 'react';
import './details.css';
import { auth, db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

const Details = () => {
  const { currentUser } = useUserStore();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'userchats', currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map(async (item) => {
        // Determine which user is the other user
        const otherUserId = item.recieverId === currentUser.id ? item.senderId : item.recieverId;

        const docRef = doc(db, 'users', otherUserId);
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

  return (
    <div className='details'>
      {chats.map((chat, index) => (
        <div className='user' key={index}>
          <img src={chat.user?.avatar || '/assets/avatar.png'} alt='User Avatar' />
          <h2>{chat.user?.username}</h2>
          <p>cant talk Tempest Only</p>
        </div>
      ))}
      <div className='info'>
        <div className='Options'>
          <div className='title'>
            <span>Chat Settings</span>
            <img src='/assets/arrowUp.png' alt='Expand' />
          </div>
        </div>
        <div className='Options'>
          <div className='title'>
            <span>Privacy & Help</span>
            <img src='/assets/arrowUp.png' alt='Expand' />
          </div>
        </div>
        <div className='Options'>
          <div className='title'>
            <span>Shared Photos</span>
            <img src='/assets/arrowDown.png' alt='Collapse' />
          </div>
          <div className='photos'>
            {/* Example photo items */}
            <div className='photoitem'>
              <div className='photodetails'>
                <img src='/assets/tanjiro.jpg' alt='Photo' />
                <span>2024_image.png</span>
              </div>
              <img src='/assets/download.png' className='icons' alt='Download' />
            </div>
            <div className='photoitem'>
              <div className='photodetails'>
                <img src='/assets/tanjiro.jpg' alt='Photo' />
                <span>2024_image.png</span>
              </div>
              <img src='/assets/download.png' className='icons' alt='Download' />
            </div>
            <div className='photoitem'>
              <div className='photodetails'>
                <img src='/assets/tanjiro.jpg' alt='Photo' />
                <span>2024_image.png</span>
              </div>
              <img src='/assets/download.png' className='icons' alt='Download' />
            </div>
            <div className='photoitem'>
              <div className='photodetails'>
                <img src='/assets/tanjiro.jpg' alt='Photo' />
                <span>2024_image.png</span>
              </div>
              <img src='/assets/download.png' className='icons' alt='Download' />
            </div>
            {/* Additional photo items can be dynamically rendered */}
          </div>
        </div>
        <div className='Options'>
          <div className='title'>
            <span>Shared Files</span>
            <img src='/assets/arrowUp.png' alt='Expand' />
          </div>
        </div>
        <button className='button'><span>Block User</span></button>
        <button className='logoutbutton' onClick={() => auth.signOut()}><span>Logout</span></button>
      </div>
    </div>
  );
};

export default Details;
