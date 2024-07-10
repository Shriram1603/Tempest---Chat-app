import React from 'react'
import "./details.css"

const Details = () => {
  return (
    <div className='details'>

      <div className='user'>
        <img src='/assets/avatar.png'/>
        <h2>Username</h2>
        <p>cant talk Tempest Only</p>
      </div>
      <div className="info">
        <div className="Options">
          <div className="title">
            <span>Chat Settings</span>
            <img src="/assets/arrowUp.png" />
          </div>
        </div>
        <div className="Options">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="/assets/arrowUp.png" />
          </div>
        </div>
        <div className="Options">
          <div className="title">
            <span>Shared Photos</span>
            <img src="/assets/arrowDown.png" />
          </div>
            <div className="photos">


              <div className="photoitem">
                <div className="photodetails">
                <img src="/assets/tanjiro.jpg" alt="" />
                <span>2024_image.png</span>
                </div>
              <img src="/assets/download.png" className='icons' alt="" />
              </div>
              <div className="photoitem">
                <div className="photodetails">
                <img src="/assets/tanjiro.jpg" alt="" />
                <span>2024_image.png</span>
                </div>
              <img src="/assets/download.png" className='icons' alt="" />
              </div>
              <div className="photoitem">
                <div className="photodetails">
                <img src="/assets/tanjiro.jpg" alt="" />
                <span>2024_image.png</span>
                </div>
                <img src="/assets/download.png" className='icons'  alt="" />
              </div>
              <div className="photoitem">
                <div className="photodetails">
                <img src="/assets/tanjiro.jpg" alt="" />
                <span>2024_image.png</span>
                </div>
                <img src="/assets/download.png" className='icons'  alt="" />
              </div>
              <div className="photoitem">
                <div className="photodetails">
                <img src="/assets/tanjiro.jpg" alt="" />
                <span>2024_image.png</span>
                </div>
                <img src="/assets/download.png" className='icons'  alt="" />
              </div>
              
            </div>
          
        </div>
        <div className="Options">
          <div className="title">
            <span>Shared Files</span>
            <img src="/assets/arrowUp.png" />
          </div>
        </div>
        <button className='button'><span>Block User</span></button>
        <button className='logoutbutton'><span>Logout</span></button>

      </div>
    </div>
  )
}

export default Details