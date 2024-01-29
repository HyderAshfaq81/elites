import React, { useState } from "react";
import ShowAllDoc from '../../components/Documents/ShowAll';
import UploadDocument from '../../components/Documents/UploadDocument';
import Layout from "../../components/Layouts";

const Documents = () => {
  const [uploading, setUploading] = useState(false)

  return (
    <Layout>
      {!uploading &&
        <div>
          <ShowAllDoc
            setUploading={setUploading}
          />  
        </div>
      }
      {uploading &&
        <div>
          <UploadDocument
            setUploading={setUploading}
          />  
        </div>
      }
    </Layout>
  )
}
export default Documents;
