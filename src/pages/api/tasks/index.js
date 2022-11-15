import { dbConnect } from 'utils/mongoose';
import Task from 'models/Task';

dbConnect();

export default async function handler(req, res) {

  // console.log(req.method);

  const {method, body} = req;
  
  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find();
        console.log(tasks);
        return res.status(200).json(tasks);
      } catch (error) {
        return res.status(500).json({error: error.message});
        
      }
    
    case 'POST':
      try {
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
      } catch (error) {
        return res.status(500).json({error: error.message});
        
      }
  
    default:
      return res.status(400).json({msg: 'Method not supported'});
  }



  
}