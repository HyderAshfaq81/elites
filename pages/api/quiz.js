import dbConnect from '../../db.js'; // Adjust the path accordingly
import { Quiz } from '../../models/Quiz'; // Import your Mongoose models

export default async function handler(req, res) {
  const { method } = req;

  // Connect to MongoDB
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { title, description, questions } = req.body;

        // Create a new quiz object
        const newQuiz = new Quiz({
          title,
          description,
          questions
        });

        // Save the new quiz to the database
        const savedQuiz = await newQuiz.save();

        res.status(201).json(savedQuiz);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
