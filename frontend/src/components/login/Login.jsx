import React,{useState} from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';

const Login = () => {

    const[avatar,setAvatar]=useState({
        file: null,
        url:""
    })

    const [loading,setLoading]=useState(false)

    const handleAvatar=(e)=>{

        if(e.target.files[0]){
        setAvatar({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })}
    }

    const handleRegister= async(e)=>{
        e.preventDefault()
        setLoading(true);
        const formData = new FormData(e.target);
        const {username,password,email}=Object.fromEntries(formData)
        console.log({username,password,email})
        
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, "users", res.user.uid), {
                id : res.user.uid,
                username : username,
                avatar : imgUrl,
                email : email,
                blocked : [],
              });
              
              await setDoc(doc(db, "userchats", res.user.uid), {
                chat : [],
              });

              toast.success("Registered Success !! You can Login now")
              

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }

    }


    const handleLogin= async (e)=>{
        e.preventDefault()

        setLoading(true);

        const formData = new FormData(e.target);
        const {email,password}=Object.fromEntries(formData)
        console.log({password,email})

        try{
            await signInWithEmailAndPassword(auth, email, password);

            toast.success("Logged in Successfully !!");

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }

        
        
    }

  return (
    <div className="login">
        <div className="item">
            <h2>Welcome Back</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Email' name='email' />
                <input type="text" placeholder='password' name='password' />
                <button disabled={loading} className='button'><span>{loading?"loading...":"Login"}</span></button>
            </form>

        </div>
        <div className="seperator"></div>
        <div className="item">
            <h2>Register</h2>
            <form action="" onSubmit={handleRegister}>
                <label htmlFor="file" style={{cursor:"pointer"}}> 
                    <img src={avatar.url || "/assets/avatar.png"} alt="" /><span>upload Profile pic</span>
                </label>
                <input type="file"  id="file" style={{display:"none"}} onChange={handleAvatar} />
                <input type="text" placeholder='username' name='username' />
                <input type="text" placeholder='email' name='email' />
                <input type="text" placeholder='password' name='password' />
                <button className='button' disabled={loading}><span>{loading?"loading...":"SignUp"}</span></button>
            </form>

        </div>
    </div>
  )
}

export default Login