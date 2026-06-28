import React from 'react'
// HOF 

const HomeComponent = () => {
  return (
    <div>Home</div>
  )
}

export default withAuth(HomeComponent)