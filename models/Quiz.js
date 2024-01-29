const mongoose = require('mongoose');


//Check if alreay exists
if (mongoose.connection.models['Answer']) {
  delete mongoose.connection.models['Answer'];
}
if (mongoose.connection.models['Question']) {
  delete mongoose.connection.models['Question'];
}
if (mongoose.connection.models['Quiz']) {
  delete mongoose.connection.models['Quiz'];
}

// Schema for Answers
const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
});

// Schema for Questions
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  answers: [answerSchema] // Array of answers for the question
});

// Schema for Quizzes
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'english'
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    default: "mock"
  },
  enabled: {
    type: Boolean,
    required: true,
    default: false
  },
  paymentAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  questions: [questionSchema] // Array of questions for the quiz
});

const Answer = mongoose.model('Answer', answerSchema);
const Question = mongoose.model('Question', questionSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { Answer, Question, Quiz };
