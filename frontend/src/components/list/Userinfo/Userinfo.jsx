
import "./Userinfo.css"
import { useUserStore } from '../../../lib/userStore';
export const Userinfo = () => {

  const {currentUser}= useUserStore();

  console.log(currentUser.avatar)
    

  return (
    <div className="userinfo">
      <div className="user">
        <img src={ currentUser.avatar || "/assets/avatar.png" } alt="Avatar" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icon">
        <img src="/assets/more.png" alt="More" />
        <img src="/assets/video.png" alt="Video" />
        <img src="/assets/edit.png" alt="Edit" />
      </div>
    </div>
  );
};
