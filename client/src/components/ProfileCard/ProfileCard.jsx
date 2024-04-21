// import React from 'react'
// import Cover from '../../img/cover.jpg'
// import Profile from '../../img/profileImg.jpg'
// import {Link} from 'react-router-dom'
// import './ProfileCard.css'
// import { useSelector } from 'react-redux'


// function ProfileCard(location) {
//   const {user} = useSelector((state)=>state.authReducer.authData)
//   const posts = useSelector((state)=>state.postReducer.posts)
//   const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER







//   return (
//     <div className='profileCard'>
//       <div className="ProfileImages">
//         <img src={user.coverPicture? serverPublic + user.coverPicture : serverPublic + "defaultCover.jpg"} alt="" />
//         <img src={user.coverPicture? serverPublic + user.coverPicture : serverPublic + "defaultProfile.png"} alt="" />
//       </div>
//       <div className="ProfileName">
//         <span>{user.firstname} {user.lastname}</span>
//         <span>{user.worksAt? user.worksAt: "Write about yourself"}</span>
//       </div>
//       <div className="followStatus">
//         <hr />
//         <div>
//           <div className="follow">
//             <span>{user.following.length}</span>
//             <span>Followings</span>
//           </div>
//           <div className="vl"></div>
//           <div className="follow">
//             <span>{user.followers.length}</span>
//             <span>Followers</span>
//           </div>


//           {location=== 'profilePage' && (
//             <>
//               <div className="vl"></div>
//               <div className="follow">
//                 <span>{posts.filter((post)=> post.userId === user._id).length}</span>
//                 <span>Posts</span>
//               </div>
//             </>
//           )}
//         </div>
//         <hr />
//       </div>
//       {location=== 'profilePage' ? (
//          "" 
//       ):(  
//       <span>
//         <Link style={{textDecoration: "none",color: "inherit"}} to = {'/profile/${user._id}'}>
//         My Profile</Link></span>
//         )}

//     </div>
//   )
// }

// export default ProfileCard

import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as UserApi from '../../api/UserRequest.js';
import { useParams } from "react-router-dom";
const ProfileCard = ({ location }) => {

  const params = useParams();

  const profileUserId = params.id

  const profile = localStorage.getItem('profile');
  const loggedInUserId = profileUserId ? profileUserId : JSON.parse(profile).user._id;


  const [profileUser , setProfileUser] = useState({})

  useEffect(()=> {
    const fetchProfileUser = async()=> {
      const profileusr = await UserApi.getUser(loggedInUserId)
      setProfileUser(profileusr.data)
    }
    fetchProfileUser();

  },[]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log(profileUser.profilePicture)

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={
          profileUser.coverPicture
            ? serverPublic + profileUser.coverPicture
            : Cover
        } alt="CoverImage" />
        <img
          src={
            profileUser.profilePicture
              ? serverPublic + profileUser.profilePicture
              : Profile
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{profileUser.firstname} {profileUser.lastname}</span>
        <span>{profileUser.worksAt ? profileUser.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profileUser.followers?profileUser.followers.length:0}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profileUser.following?profileUser.following.length:0}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                  posts.filter((post) => post.userId === profileUser._id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        // <span>
        //       <Link to={/profile/${user._id}} style={{ textDecoration: "none", color: "inherit" }}>
        //          My Profile
        //        </Link>
        // </span>
        <div style={{ textAlign: "center" }}>
          <span>
            <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              My Profile
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
