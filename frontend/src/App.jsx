
import './App.css'
import Chat from './components/chat/Chat'
import Details from './components/details/Details'
import List from './components/list/List'
import Login from './components/login/Login';

function App() {
  const user =false;

  return (
    <div className='container'>
      {user ?(
      <>
      <List/>
     <Chat/>
     <Details/>
    </>):<Login/>
}
    </div>
  )
}

export default App
