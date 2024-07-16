import { collection, query, where, getDocs, serverTimestamp, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import './addUser.css'

import React, { useState } from 'react'
import { useUserStore } from '../../../../lib/userStore';

const AddUser = () => {

  const [user, setUser] = useState(null);
  const {currentUser}= useUserStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      } else {
        setUser(null); // Reset user if no user is found
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAdd = async() => {
    const chatRef = collection(db, "chats");
    const userChatRef = collection(db ,"userchats");

    try{

      const newChatRef =doc(chatRef);

      await setDoc(newChatRef,{
        createdAt : serverTimestamp(),
        message: [],
      })

      await updateDoc(doc(userChatRef,user.id),{
        chats:arrayUnion({
          chatId : newChatRef.id,
          lastMessage:"",
          recieverId: currentUser.id,
          updatedAt: Date.now(),
        })
      });
      await updateDoc(doc(userChatRef,currentUser.id),{
        chats:arrayUnion({
          chatId : newChatRef.id,
          lastMessage:"",
          recieverId: user.id,
          updatedAt: Date.now(),
        })
      });

    }catch(err){
      console.log(err);
    }


  }

  return (
    <div className="adduser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder='username' name='username' />
        <button type='submit'><span>Search</span></button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "/assets/avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}><span>Add User</span></button>
        </div>
      )}
    </div>
  )
}

export default AddUser
