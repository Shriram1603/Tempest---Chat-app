import React,{useState} from 'react'
import './login.css'
const Login = () => {

    const[avatar,setAvatar]=useState({
        file: null,
        url:""
    })

    const handleAvatar=(e)=>{

        if(e.target.files[0]){
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })}
    }

  return (
    <div className="login">
        <div className="item">
            <h2>Welcome Back</h2>
            <form action="">
                <input type="text" placeholder='username' name='username' />
                <input type="text" placeholder='password' name='password' />
                <button className='button'><span>Login</span></button>
            </form>

        </div>
        <div className="seperator"></div>
        <div className="item">
            <h2>Register</h2>
            <form action="">
                <label htmlFor="file" style={{cursor:"pointer"}}> 
                    <img src={avatar.url || "/assets/avatar.png"} alt="" /><span>upload Profile pic</span>
                </label>
                <input type="file"  id="file" style={{display:"none"}} onChange={handleAvatar} />
                <input type="text" placeholder='username' name='username' />
                <input type="text" placeholder='email' name='email' />
                <input type="text" placeholder='password' name='password' />
                <button className='button'><span>SignUp</span></button>
            </form>

        </div>
    </div>
  )
}

export default Login