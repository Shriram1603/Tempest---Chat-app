import React from 'react'
import { useState } from 'react'

import './Chatlist.css'
import AddUser from './addUser/AddUser';

const Chatlist = () => {

const[addMode,setAdd]=useState(false);

  return (
    <div className="chatlist">
        <div className="search">
            <div className="searchbar">
                <img src="/assets/search.png" alt="Search" />
                <input type="text" placeholder='Search' />
            </div>
            {/* <img src={"/assets/plus.png"} className='add' /> */}
            <img src={ addMode ?"/assets/minus.png" :"/assets/plus.png"} className='add'
            onClick={()=>setAdd(!addMode)} />
        </div>
        <div className="Items">
            <img src='/assets/avatar.png'/>
            <div className="texts">
                <span>Username</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="Items">
            <img src='/assets/avatar.png'/>
            <div className="texts">
                <span>Username</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="Items">
            <img src='/assets/avatar.png'/>
            <div className="texts">
                <span>Username</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="Items">
            <img src='/assets/avatar.png'/>
            <div className="texts">
                <span>Username</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="Items">
            <img src='/assets/avatar.png'/>
            <div className="texts">
                <span>Username</span>
                <p>Hello</p>
            </div>
        </div>
        {addMode && <AddUser/>}
    </div>
  )
}

export default Chatlist