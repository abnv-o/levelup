import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Content from '../components/Content'
import Feutures_section from '../components/Feutures_section'
import  Footer  from '../components/Footer'

const Main = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Content/>
        <Feutures_section/>
        <Footer/>
    </div>
  )
}

export default Main