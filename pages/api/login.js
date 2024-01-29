import connectToDatabase from '../../db.js'; // Adjust the path accordingly
import User from '../../models/User';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
  const db = await connectToDatabase();
  // const enteredEmail = req.body.email;
  // const { role } = req.body;
  // const enteredPassword = req.body.password;
  const {email, role, password} = req.body

  if (req.method === 'POST') {
    try {
      const user = await User.findOne({ email: email, role: role });
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      const storedHashedPassword = user.password;
      const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
      
      if (passwordMatch) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(402).json({ error: 'User creation failed', error });
    }
  } else {
    return res.status(500).json({ error: 'Method not allowed' });
  }
}
export default handler;
