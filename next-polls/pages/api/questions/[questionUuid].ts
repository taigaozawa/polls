import {NextApiRequest, NextApiResponse} from 'next';
import { connectToDb } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {questionUuid} = req.query;

  const {db} = await connectToDb();
  
  switch(req.method) {
    case 'GET':
      try {
        const foundQuestion = await db.collection('questions').findOne({
          uuid: questionUuid.toString()
        });
        if (!foundQuestion) {
          res.status(404).json({message: 'Not Found.'});
          return;
        }
        res.status(200).json(foundQuestion);
      } catch (err) {
        res.status(500).json({message: err || 'Server Error.'})
      }
      break;
    default:
      res.status(405).json({message: 'Method Not Allowed.'})
      break;
  }
}

export default handler;