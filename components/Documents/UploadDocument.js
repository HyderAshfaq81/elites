// import { useState } from 'react';

// const UploadDocument = ({setUploading}) => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       // Handle file upload logic here (e.g., send file to server)
//       console.log("Uploading file:", selectedFile);
//     } else {
//       alert("Please choose a file to upload.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-8">
//       <div className='flex'>
//         <div className='w-1/2'></div>
//         <h1 className="w-1/2 text-3xl font-bold  mb-8">Upload Documents</h1>
//         <div className="flex items-center justify-center mb-6">
//           <button
//             onClick={() => setUploading(false)}
//             className="w-[150px] cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             All Documents
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-md p-8">
//         <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
//           Choose File
//         </label>
//         <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
//         <div className="mt-4 text-gray-700">{selectedFile ? selectedFile.name : 'No file chosen'}</div>
//         <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" onClick={handleUpload}>
//           Upload
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadDocument;
