"use client"

import React from "react";
import Image from "next/image";
const style = {
  "width":"auto",
  "height":"auto"
}
const Tools = () => {
  return (
    <div className="p-6 flex flex-wrap md:p-8 space-y-6 gap-10 justify-between">
      <div>
        <h2 className="gradient-text">Languages that I use</h2>
        <div className="mt-5 flex flex-col gap-5">
          <div>
            <Image
              src="https://skillicons.dev/icons?i=java,py,js,ts,cpp,c"
              alt="Programming Languages: Java, Python, JavaScript, TypeScript, C++, C"
              width={100}
              height={100}
              unoptimized
              style={style}
            />
          </div>
          <div>
            <Image
              src="https://skillicons.dev/icons?i=html,css"
              alt="Web Technologies: HTML, CSS"
              width={100}
              height={100}
              unoptimized
              style={style}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="gradient-text">
          frameworks that I use
        </h2>
        <div className="mt-5">
          <Image
            src="https://skillicons.dev/icons?i=react,next,vite,tailwind,bootstrap"
            alt="Frameworks: React, Next.js, Vite, Tailwind CSS, Bootstrap"
            width={100}
            height={100}
            unoptimized
            style={style}
          />
        </div>
      </div>
      <div>
        <h2 className="gradient-text">
          Databases that I use
        </h2>
        <div className="mt-5">
          <Image
            src="https://skillicons.dev/icons?i=firebase,mongodb,mysql"
            alt="Databases: Firebase, MongoDB, MySQL"
            width={100}
            height={100}
            unoptimized
            style={style}
          />
        </div>
      </div>
      <div>
        <h2 className="gradient-text">
          Tools that I use
        </h2>
        <div className="mt-5">
          <Image
            src="https://skillicons.dev/icons?i=vscode,git,github,postman"
            alt="tools: vscode, git, github, postman"
            width={100}
            height={100}
            unoptimized
            style={style}
          />
        </div>
      </div>
    </div>
  )
}

export default Tools
