// pages/api/document.js
import multer from 'multer';
import connectToDatabase from '../../db';
import File from '../../models/File';

const upload = multer({ dest: 'static/uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      upload.array('files')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ success: false, message: 'File upload error' });
        } else if (err) {
          return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }

        // Save the file details to the database
        const files = req.files.map((file) => ({
          filename: file.originalname,
          path: file.path,
        }));

        await File.insertMany(files);

        res.status(200).json({ success: true, message: 'Files uploaded successfully' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const files = await File.find();
      res.status(200).json({ success: true, files });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
}
