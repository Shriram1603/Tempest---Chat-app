import './addUser.css'

import React from 'react'

const AddUser = () => {
  return (
    <div className="adduser">
        <form action="">

            <input type="text" placeholder='username' name='username' />
            <button><span>Search</span></button>
        </form>
        <div className="user">
            <div className="detail">
                <img src="/assets/avatar.png" alt="" />
                <span>User name</span>
            </div>
            <button><span>Add User</span></button>
        </div>
    </div>
  )
}

export default AddUser