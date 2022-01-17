import {NextApiRequest, NextApiResponse} from 'next';
import {db} from '../../../utils/admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newPoll = req.body;
  const collectionRef = db.collection('polls');
  const {pollId} = req.query;
  
  switch(req.method) {
    case 'POST':
      try {
        res.status(200);
      } catch (err) {
        res.status(500).json({message: err})
      }
      break;
    case 'GET':
      try {
        const pollSnapshot = await collectionRef.where('pollId', '==', pollId).get();
        pollSnapshot.forEach(doc => {
          res.status(200).json(JSON.stringify(doc.data()));
        })
      } catch (err) {
        res.status(500).json({message: err})
      }
      break;
    default:
      break;
  }
}

export default handler;