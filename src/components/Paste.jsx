import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { FaCopy, FaShare } from "react-icons/fa6";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  return (
    <div>
      <input
        className="w-full max-w-xl ml-[10%] sm:ml-0 mt-5 p-3 pl-4 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-full sm:p-2"
        type="search"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mx-16 mt-5">
        {
          filteredData.length > 0 && filteredData.map(
            (paste) => {
              return (
                <div key={paste?._id} className="border p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-lg font-semibold">
                      {paste.title}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                        <NavLink to={`/?pasteId=${paste?._id}`}><BiSolidEdit /></NavLink>
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
                        <NavLink to={`/pastes/${paste?._id}`}><FaEye /></NavLink>
                      </button>
                      <button 
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600" 
                        onClick={() => handleDelete(paste?._id)}>
                        <FaTrashAlt />
                      </button>
                      <button 
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600" 
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}>
                        <FaCopy />
                      </button>
                      <button 
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600" 
                        onClick={() => navigator.share({ 
                          title: "Check this out!", 
                          text: "Here's something interesting:", 
                          url: "https://example.com" 
                        })}>
                        <FaShare />
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-700 mb-4">
                    {paste.content}
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    {formatDate(paste.createdAt)}
                  </div>
                </div>
              )
            }
          )
        }
      </div>

    </div>
  )
}

export default Paste;


//--------------------------------------------------------------------------------------I


// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeFromPastes } from "../redux/pasteSlice";
// import toast from "react-hot-toast";
// import { NavLink } from "react-router-dom";

// const Paste = () => {

//   const pastes = useSelector((state) => state.paste.pastes);

//   const [searchTerm, setSearchTerm] = useState('')
  
//   const dispatch = useDispatch();

//   const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

//   function handleDelete(pasteId) {
//     dispatch(removeFromPastes(pasteId));
//   }

//   return (
//     <div>
//       <input
//       className="max-w-xl ml-[10%] mt-5 p-3 pl-4 rounded-lg border border-gray-300 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//       type="search"
//       placeholder="search here.."
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div className="flex flex-col gap-5 mx-16 mt-5">
//         {
//           filteredData.length > 0 && filteredData.map(
//             (paste) => {
//               return (
//                 <div key={paste?._id} className="border">
//                   <div>
//                     {paste.title}
//                   </div>
//                   <div>
//                     {paste.content}
//                   </div>
//                   <div className="flex flex-row gap-4 place-content-evenly">
//                       <button>
//                           <NavLink 
//                           to={`/?pasteId=${paste?._id}`}>
//                             Edit
//                           </NavLink>
//                       </button>
//                       <button>
//                           <NavLink 
//                            to={`/pastes/${paste?._id}`}>
//                             View
//                           </NavLink>
//                       </button>
//                       <button onClick={() => handleDelete(paste?._id)}>
//                           Delete
//                       </button>
//                       <button onClick={() =>{navigator.clipboard.writeText(paste?.content)
//                       toast.success("Copied to Clipboard")}
//                       }>
//                           Copy
//                       </button>
//                       <button onClick={() => navigator.share({ title: "Check this out!", text: "Here's something interesting:", url: "https://example.com" })}>
//                           Share
//                       </button>
//                   </div>
//                   <div>
//                     {paste.createdAt}
//                   </div>
//                 </div>
//               )
//             }  
//           )
//         }
//       </div>

//     </div>
//   )
// }

// export default Paste