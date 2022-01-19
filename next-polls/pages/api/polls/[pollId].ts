import {NextApiRequest, NextApiResponse} from 'next';
import { connectToDb } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  const {pollId} = req.query;
  const {db} = await connectToDb();
  if (pollId === 'undefined') {
    res.status(202).json({message: 'Accepted.'});
    return;
  }

  switch(req.method) {
    case 'GET':
      try {
        const foundPoll = await db.collection('polls').findOne({
          pollId: Number(pollId)
        });
        if (!foundPoll) {
          res.status(404).json({message: 'Not Found.'});
          return;
        }
        res.status(200).json(foundPoll)
      } catch (err) {
        res.status(500).json({message: err})
      }
      break;
    default:
      res.status(405).json({message: 'Method Not Allowed.'})
      break;
  }
}

export default handler;