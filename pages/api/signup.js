import connectToDatabase from '../../db.js'; // Adjust the path accordingly
import User from '../../models/User';

const handler = async (req, res) => {
  const db = await connectToDatabase();
  
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      const checkDup = await User.findOne({ email });
      if (checkDup) {
        return res.status(401).json({ message: 'Email already exists!' });
      }

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        // role: req.body.role,
        role: 'admin',
      });

      const user = await newUser.save();

      console.log('User created:', user);
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(400).json({ error: 'User creation failed', error });
    }
  } else {
    return res.status(500).json({ error: 'Method not allowed' });
  }
}
export default handler;
