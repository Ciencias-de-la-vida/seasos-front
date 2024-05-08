import React, { useState, useEffect } from "react";

function Loader() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex-col gap-4 w-full flex items-center justify-center">
      <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
        <img
          src="/src/assets/images/Logo.png"
          alt="Logo de delfín"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
}

export default Loader;
