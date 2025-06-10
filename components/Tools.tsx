"use client"

import React from "react";


const Tools = () => {
  return (
    <div className="p-6 md:p-8 space-y-6 flex flex-wrap gap-10 justify-between">
      <div>
      <h2 className="gradient-text">Languages that I use</h2>
      <div  className="mt-5 flex flex-col gap-5">
        <div>
          <img src="https://skillicons.dev/icons?i=js,ts,py,cpp,c" alt="programming languages"/>
        </div>
        <div>
          <img src="https://skillicons.dev/icons?i=html,css" alt=""/>
        </div>
      </div>
      </div>
      <div>
        <h2 className="gradient-text">
          frameworks and that I use
        </h2>
        <div className="mt-5">
          <img src="https://skillicons.dev/icons?i=react,next,vite,tailwind,bootstrap " alt="" />
        </div>
      </div>
      <div>
        <h2 className="gradient-text">
          Databases that I use
        </h2>
        <div className="mt-5">
          <img src="https://skillicons.dev/icons?i=firebase,mongodb,mysql" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Tools
