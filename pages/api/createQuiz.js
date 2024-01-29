import connectToDatabase from '../../db.js';
import { Quiz } from '../../models/Quiz';

const deleteExpiredLiveQuizzes = async () => {
  try {
    const currentTime = new Date();
    const expiredLiveQuizzes = await Quiz.find({ type: 'live', expirationTime: { $lte: currentTime } });

    if (expiredLiveQuizzes.length > 0) {
      await Quiz.deleteMany({ type: 'live', expirationTime: { $lte: currentTime } });
      console.log('Expired "Live" quizzes deleted successfully');
    } else {
      console.log('No expired "Live" quizzes found');
    }
  } catch (error) {
    console.error('Failed to delete expired "Live" quizzes:', error);
  }
};

export default async function handler(req, res) {
  await connectToDatabase();
  if (req.method === 'POST') {
    const { title, description, questions, quizType, category, enabled, paymentAmount } = req.body;
    try {
      const questionsWithAnswers = questions.map(({ text, answers }) => ({
        text,
        answers: answers.map(({ text, isCorrect }) => ({ text, isCorrect })),
      }));
      
      // Set the expiration time to 1 minute ahead
      const expirationTime = new Date(Date.now() + 1 * 60 * 1000);
      const newQuiz = new Quiz({
        title,
        type: quizType,
        description,
        category: category,
        enabled: enabled,
        questions: questionsWithAnswers,
        createdAt: new Date(), // Store the creation timestamp
        expirationTime,  //Set expiration time 1 minute ahead
        paymentAmount: paymentAmount
      });    
      
      const savedQuiz = await newQuiz.save();
      res.status(201).json(savedQuiz);

      // Schedule a job to delete the created "Live" quiz after one minute
      setTimeout(async () => {
        await Quiz.deleteOne({ _id: savedQuiz._id, type: 'live' });
        console.log('Live quiz deleted after one minute');
      }, 1 * 60 * 1000); // Delete the quiz after one minute

      // Start a scheduled job to periodically check for expired "Live" quizzes
      setInterval(deleteExpiredLiveQuizzes, 60 * 1000);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create quiz', error: error.message });
    }
  } else if (req.method === 'GET') {
    const { id } = req.query; // Assuming the ID is passed as a query parameter

    if (id) {
      try {
        const foundQuiz = await Quiz.findById(id);

        if (foundQuiz) {
          res.status(200).json(foundQuiz);
        } else {
          res.status(404).json({ message: 'Quiz not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch quiz', error: error.message });
      }
    } else {
      try {
        const allQuizzes = await Quiz.find({});
        res.status(200).json(allQuizzes);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch quizzes', error: error.message });
      }
    }
  } else if (req.method === 'PATCH') {
    try {
      const { id } = req.query; // Get the quiz ID from the request query parameter
      const { questions, quiz } = req.body; // Get the updated questions from the request body

      if (quiz) {
        if (!quiz._id) {
          return res.status(400).json({ message: 'Quiz ID is required' });
        }
  
        const foundQuiz = await Quiz.findById(quiz._id);
  
        if (!foundQuiz) {
          return res.status(404).json({ message: 'Quiz not found' });
        }
  
        foundQuiz.enabled = quiz.enabled;
        const updatedQuiz = await foundQuiz.save();
        const quizes = await Quiz.find();
        res.status(200).json(quizes);
      } else {
        if (!id) {
          return res.status(400).json({ message: 'Quiz ID is required' });
        }
  
        const foundQuiz = await Quiz.findById(id);
  
        if (!foundQuiz) {
          return res.status(404).json({ message: 'Quiz not found' });
        }
  
        // Update the quiz questions with the provided data
        foundQuiz.questions = questions.questions;
        const updatedQuiz = await foundQuiz.save();
        res.status(200).json(updatedQuiz);  
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to update quiz', error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query; // Get the quiz ID from the request query parameter
      
      if (!id) {
        return res.status(400).json({ message: 'Quiz ID is required' });
      }

      const foundQuiz = await Quiz.findByIdAndDelete(id);

      if (!foundQuiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }

      const allQuizes = await Quiz.find({});;

      // Update the quiz questions with the provided data
      res.status(200).json(allQuizes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update quiz', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
