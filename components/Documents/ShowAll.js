import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { TailSpin } from "react-loader-spinner";

const DocumentShowAll = ({ setUploading }) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/document', {
        method: 'GET',
      });
      setLoading(false)
      const result = await response.json();
      if (result.success) {
        setFiles(result.files);
      } else {
        console.error('Error fetching files:', result.message);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);
  const handleDocumentUpload = () => {
    router.push(`/documents/upload`);
  }
  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">List of Documents</h1>
      <div className="loader-container">
        {loading && (
          <TailSpin type="TailSpin" color="#00BFFF" className="h-[80px] w-[80px]" />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <div key={file._id} className="bg-white rounded-md shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{file.filename}</h2>
            <p className="text-gray-700">{file.path}</p>
            <a href={file.path} target="_blank"  className="text-blue-500 hover:underline block mt-2">
              Open File
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-2">
        <div
          className="cursor-pointer mr-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => handleDocumentUpload()}
        >
          Upload Document
        </div>
      </div>
    </div>
  );
};

export default DocumentShowAll;
