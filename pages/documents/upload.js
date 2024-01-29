import { useRouter } from 'next/router';
import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layouts";

const Upload = () => {
  const router = useRouter()
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  }, []);

  const handleUpload = async () => {
    try {
      if (files.length === 0) {
        alert("Please choose a file to upload.");
        return;
      }

      setIsLoading(true);

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      // Make a POST request to the backend server to upload the files
      const response = await fetch('/api/document', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Files Upload Successfully!")
        router.push('/documents')
        console.log(result);
      }
      setFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      <div
        className="py-[64px] px-[136px] bg-gray-100"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="w-full">
          <div className="text-[48px] font-[500] w-full flex justify-center">Upload your document to start studying</div>
          <div className="text-[20px] w-full flex justify-center text-gray-400">See <span className="mx-2 text-blue-600"> AI-powered </span> answers, explanations, recommendations, one-click tutor help, and more</div>
        </div>
        <div>
          <div
            className="rounded-[20px] bg-white h-[535px] mt-4 p-6 shadow"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="border-2 border-gray-400 h-full rounded-[24px] border-dotted">
              <div className="flex justify-center items-center w-full h-full">
                <div className="">
                  <div className="w-full flex items-center justify-center">
                    <svg className="w-[80px] h-[80px]" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.75 5H30C36.9036 5 42.5 10.5964 42.5 17.5V23.75C42.5 27.2018 45.2982 30 48.75 30H55C61.9036 30 67.5 35.5964 67.5 42.5V68.75C67.5 72.2018 64.7018 75 61.25 75H18.75C15.2982 75 12.5 72.2018 12.5 68.75V11.25C12.5 7.79822 15.2982 5 18.75 5ZM41.7678 38.2322C41.2989 37.7634 40.663 37.5 40 37.5C39.337 37.5 38.7011 37.7634 38.2322 38.2322L28.2322 48.2322C27.2559 49.2085 27.2559 50.7915 28.2322 51.7678C29.2085 52.7441 30.7915 52.7441 31.7678 51.7678L37.5 46.0355L37.5 60C37.5 61.3807 38.6193 62.5 40 62.5C41.3807 62.5 42.5 61.3807 42.5 60L42.5 46.0355L48.2322 51.7678C49.2085 52.7441 50.7915 52.7441 51.7678 51.7678C52.7441 50.7915 52.7441 49.2085 51.7678 48.2322L41.7678 38.2322Z" fill="#002DE4"></path><path d="M47.5 17.5C47.5 13.1232 45.8932 9.12159 43.2373 6.05302C54.5671 9.01258 63.4874 17.9329 66.447 29.2627C63.3784 26.6068 59.3768 25 55 25H48.75C48.0596 25 47.5 24.4404 47.5 23.75V17.5Z" fill="#002DE4"></path></svg>
                  </div>
                  <div className="text-[32px] font-[400]">
                    Drag and drop or <span className="text-blue-600">upload</span> your study document
                  </div>
                  <div className='flex gap-6'>
                    <input type="file" onChange={handleFileChange} multiple style={{ display: 'none' }} />
                    <button
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md h-[40px]"
                      onClick={() => document.querySelector('input[type="file"]').click()}
                    >
                      Choose Files
                    </button>
                    <div className="mt-4 text-gray-700">
                      {files?.length > 0
                        ? files?.map((file, index) => (
                            <div key={index} className="mb-2">
                              {file.name}
                            </div>
                          ))
                        : 'No files chosen'}
                    </div>
                    <button className="h-[40px] mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" onClick={handleUpload}>
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Upload;
