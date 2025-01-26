import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";


const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if(pasteId){
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])

  function createMyPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    
    if(pasteId){
      dispatch(updateToPastes(paste));
    }
    else{
      dispatch(addToPastes(paste));
      // paste here is a payload
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(value);
    toast.success("Copied!!");
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="flex flex-row gap-5 w-full max-w-3xl items-center mb-8">
        <input
          className="p-3 pl-4 rounded-lg border border-gray-300 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createMyPaste}
          className="p-3 rounded-lg bg-slate-700 text-white shadow-md hover:bg-slate-950 transition-all duration-200"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="w-full max-w-4xl relative">
        <textarea
          className="p-4 rounded-lg border border-gray-300 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          placeholder="Enter content here..."
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-900 transition-all duration-200"
        >
          <FiCopy />
        </button>
      </div>
    </div>
  );
};

export default Home;



//----------------------------------------------------------------------

// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToPastes, updateToPastes } from "../redux/pasteSlice";

// const Home = () => {
//   const [title, setTitle] = useState("");
//   const [value, setValue] = useState("");
//   const [searchParams, setSearchParams] = useSearchParams();
//   const pasteId = searchParams.get("pasteId");
//   const dispatch = useDispatch();
//   const allPastes = useSelector((state) => state.paste.pastes);

//   useEffect(() => {
//     if(pasteId){
//       const paste = allPastes.find((p) => p._id === pasteId);
//       setTitle(paste.title);
//       setValue(paste.content);
//     }
//   }, [pasteId])

//   function createMyPaste(){
//     const paste = {
//       title: title,
//       content: value,
//       _id: pasteId || Date.now().toString(36),
//       createdAt: new Date().toISOString(),
//     }
    
//     if(pasteId){

//       dispatch(updateToPastes(paste));
//     }
//     else{

//       dispatch(addToPastes(paste));
//       //paste here is payload
//     }

//     //After creation  or updation
//     setTitle('');
//     setValue('');
//     setSearchParams({});

//   }

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
//       <div className="flex flex-row gap-5 w-full max-w-3xl items-center mb-8">
//         <input
//           className="p-3 pl-4 rounded-lg border border-gray-300 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           type="text"
//           placeholder="Enter title here"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <button
//           onClick={createMyPaste}
//           className="p-3 rounded-lg bg-slate-700 text-white shadow-md hover:bg-slate-950 transition-all duration-200"
//         >
//           {
//           pasteId ? "Update My Paste" : "Create My Paste"
//           }

//         </button>
//       </div>
//       <div className="w-full max-w-4xl">
//         <textarea
//           className="p-4 rounded-lg border border-gray-300 shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={value}
//           placeholder="Enter content here..."
//           onChange={(e) => setValue(e.target.value)}
//           rows={15}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;