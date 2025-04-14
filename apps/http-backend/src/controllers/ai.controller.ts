import { NextFunction, Request, Response } from "express";
import { genAI, instruction } from "../config/gemini";


export const generatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { input, history = [] } = req.body;
  
      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-pro-exp-03-25' });

      const fullPrompt = `${instruction}\n\nUser prompt: ${input}`;
      
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      console.log(text);
      

      res.status(200).json(text);
  
    } catch (error) {
      next(error);
    }
  };