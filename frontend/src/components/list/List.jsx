import React from 'react'
import "./list.css"
import { Userinfo } from './Userinfo/Userinfo'
import Chatlist from './Chatlist/Chatlist'

const List = () => {
  return (
    <div className='list'>
      <Userinfo/>
      <Chatlist/>
    </div>
  )
}

export default List