import React from 'react'
import { useUserContext } from '../context/ContextProvider'
const Content2 = () => {
   const {Notes} = useUserContext();

  return (
    <div className="w-full md:w-2/3 p-6 flex flex-wrap gap-6 items-start">

    {Notes.map((value, idx)=>{
        return <div id={idx} className="w-80 bg-white rounded-2xl p-5 flex flex-col gap-4
shadow-[0_10px_25px_rgba(156,163,175,0.4)]
transition duration-300 border border-white">
        
        <h3 className="text-lg font-semibold text-gray-800">
          {value.title}
        </h3>

        <hr className="border-gray-200" />

        <p className="text-gray-600 text-sm leading-relaxed">
          {value.description}
        </p>

      </div>
    })}

    </div>
  )
}

export default Content2