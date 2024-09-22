import { format } from 'date-fns';

export default function handler(request, response) {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM do, yyyy 'at' HH:mm:ss");
  
  response.status(200).json({ 
    message: `Hello from Vercel Serverless Function!`,
    currentTime: formattedDate
  });
}