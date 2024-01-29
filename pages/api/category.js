import connectToDatabase from '../../db.js';
import Category from '../../models/Category'; // Assuming Category model is correctly imported

export default async function handler(req, res) {
  await connectToDatabase();
  
  if (req.method === 'POST') {
    const { name, description } = req.body;

    try {
      const newCategory = new Category({ name, description });
      console.log("newCategorynewCategory", newCategory)
      const savedCategory = await newCategory.save();
      
      if (savedCategory) {
        console.log("savedCategorysavedCategory", savedCategory)
        const allCategories = await Category.find();
        res.status(200).json({ message: 'Category created successfully', categories: allCategories });
      } else {
        res.status(400).json({ message: 'Failed to create category' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Failed to create category', error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const allCategories = await Category.find();
      res.status(200).json({ categories: allCategories });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query; // Get the Category ID from the request query parameter
  
    try {
      const deletedCategory = await Category.findByIdAndDelete(id); // Assuming you want to delete the category with the provided ID
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      const allCategories = await Category.find(); // Fetch all categories after deletion
  
      res.status(200).json({ categories: allCategories });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
  }
  
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
