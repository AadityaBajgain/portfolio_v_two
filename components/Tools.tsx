"use client"

import React from "react";
import Image from "next/image";

const Tools = () => {
  return (
    <div className="p-6 md:p-8 space-y-6 flex flex-wrap gap-10 justify-between">
      <div>
        <h2 className="gradient-text">Languages that I use</h2>
        <div className="mt-5 flex flex-col gap-5">
          <div>
            <Image
              src="https://skillicons.dev/icons?i=js,ts,py,cpp,c"
              alt="Programming Languages: JavaScript, TypeScript, Python, C++, C"
              width={240}
              height={48}
              unoptimized
            />
          </div>
          <div>
            <Image
              src="https://skillicons.dev/icons?i=html,css"
              alt="Web Technologies: HTML, CSS"
              width={96}
              height={48}
              unoptimized
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="gradient-text">
          frameworks and that I use
        </h2>
        <div className="mt-5">
          <Image
            src="https://skillicons.dev/icons?i=react,next,vite,tailwind,bootstrap"
            alt="Frameworks: React, Next.js, Vite, Tailwind CSS, Bootstrap"
            width={240}
            height={48}
            unoptimized
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
            width={144}
            height={48}
            unoptimized
          />
        </div>
      </div>
    </div>
  )
}

export default Tools
