import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import {UilPen} from '@iconscout/react-unicons';
import ProfileModel from '../ProfileModel/ProfileModel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import * as UserApi from '../../api/UserRequest.js';
import { logOut } from '../../actions/AuthAction.js';

const InfoCard = () => {

  const [modelOpened, setModelOpened] = useState(false);

  const dispatch = useDispatch()
  const params = useParams();

  const profileUserId = params.id
  const [profileUser , setProfileUser] = useState({})

  const {user} = useSelector((state)=>state.authReducer.authData)

  const profile = localStorage.getItem('profile');
  const loggedInUserId = JSON.parse(profile).user._id;

  useEffect(()=> {
    const fetchProfileUser = async()=> {
      const profileusr = await UserApi.getUser(profileUserId)
      setProfileUser(profileusr.data)
    }
    fetchProfileUser();
    

  },[]);

  console.log(loggedInUserId == profileUserId)
  
  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className='InfoCard'>
      <div className="InfoHead">
        <h4>Profile Info</h4>
          {
            profileUserId == loggedInUserId ? (        <div>
              <UilPen 
              width='2rem' 
              height='1.2rem' 
              onClick={()=>setModelOpened(true)}
              />
              <ProfileModel
               modelOpened={modelOpened} 
               setModelOpened={setModelOpened}
               data = {user}
               setter = {setProfileUser}
               />
           </div>) : (<></>)
          }

       
      </div>

      <div className="info">
        <span>
            <b>Name : </b>
        </span>
        <span>{profileUser.firstname?profileUser.firstname:''} {profileUser.lastname?profileUser.lastname:''}</span>
      </div>

      <div className="info">
        <span>
            <b>Role : </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
            <b>Lives in : </b>
        </span>
        <span>{profileUser.livesin?profileUser.livesin:'Please Update'}</span>
      </div>

      <div className="info">
        <span>
            <b>Class : </b>
        </span>
        <span>{profileUser.class?profileUser.class:'Please Update'}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default InfoCard
