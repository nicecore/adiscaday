import React from 'react'

const About = () => {
  return (
    <div className='container'>
      <p className='about-paragraph'><b>A Disc A Day</b> is a simple music review blog by me, Adam Cameron. Apart from being a place to practice my writing skills and publish my brief thoughts on what I hope will be many albums from a wide variety of genres, I've also built it to practice my web development skills and I will continue to refactor it and add features to it as time goes on. For those who care about that stuff, A Disc A Day's front end is powered by Next.js and Hygraph provides the back end. Like I said, simple! I hope this blog helps you discover new sounds.</p>
      <p>Some upcoming features include:</p>
      <ul>
        <li>• Improved UI</li>
        <li>• Comments on reviews</li>
      </ul>
      <p className='about-paragraph'>
      Any questions, comments, etc. can be sent to <a href="mailto:adamdcameron@gmail.com">adamdcameron@gmail.com</a>. Thank you for reading!
      </p>
    </div>
  )
}

export default About