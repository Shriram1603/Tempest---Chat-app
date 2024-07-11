
import { useEffect } from 'react';
import './App.css'
import Notification from './components/Notfication/Notification';
import Chat from './components/chat/Chat'
import Details from './components/details/Details'
import List from './components/list/List'
import Login from './components/login/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';
import Loading from './components/Loading/Loading';

function App() {
  const {currentUser,isLoading,fetchUserInfo}= useUserStore();
 

  useEffect(() => {
    const unSub =onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user.uid);
    })

    return () => {
      unSub();
    }
  },[fetchUserInfo]);

  console.log({currentUser,isLoading})

  if(isLoading) return <div class="anime-loader"></div>



  return (
    <div className='container'>
      {currentUser ?(
      <>
      <List/>
     <Chat/>
     <Details/>
    </>):<Login/>
}
  <Notification/>
    </div>
  )
}

export default App
