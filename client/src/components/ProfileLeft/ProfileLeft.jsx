import React from 'react'

import LogoSearch from '../LogoSearch/LogoSearch'
import FollowersCard from '../followersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'

function ProfileLeft() {
  return (
    <div className='profileside'>
      <LogoSearch/>
      <InfoCard/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileLeft
