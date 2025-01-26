// import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  useSelector } from "react-redux";
// import { addToPastes, updateToPastes } from "../redux/pasteSlice";


const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("final paste");
  


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="flex flex-row gap-5 w-full max-w-3xl items-center mb-8">
        <input
          className="p-3 pl-4 rounded-lg border border-gray-300 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
          onChange={(e) => (e.target.value)}
        />
        {/* <button
          onClick={createMyPaste}
          className="p-3 rounded-lg bg-slate-700 text-white shadow-md hover:bg-slate-950 transition-all duration-200"
        >
          {
          pasteId ? "Update My Paste" : "Create My Paste"
          }
        </button> */}
      </div>
      <div className="w-full max-w-4xl">
        <textarea
          className="p-4 rounded-lg border border-gray-300 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={paste.content}
          disabled
          placeholder="Enter content here..."
          onChange={(e) => (e.target.value)}
          rows={15}
        />
      </div>
    </div>
  )
}

export default ViewPaste