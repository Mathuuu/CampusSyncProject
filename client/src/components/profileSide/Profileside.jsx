import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './Profileside.css'
import FollowersCard from '../followersCard/FollowersCard'

function Profileside() {
  return (
    <div className='profileside'>
      <LogoSearch/>
      <ProfileCard location = "homepage"/>
      <FollowersCard/>
    </div>
  )
}

export default Profileside
