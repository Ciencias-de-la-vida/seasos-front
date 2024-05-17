import React, { useState, useEffect } from "react";
import img from "../../assets/images/Logo.png"
function Loader() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      
      <div className="w-28 h-28 absolute z-10">
        <img
          src={img}
          alt="Logo de delfín"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="w-28 h-28 border-8 text-blue-400 text-4xl border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full animate-spin z-0">
       
      </div>
    </div>
  );
}

export default Loader;
