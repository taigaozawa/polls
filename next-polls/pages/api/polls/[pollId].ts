import {NextApiRequest, NextApiResponse} from 'next';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newPoll = req.body;
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
      } catch (err) {
        res.status(500).json({message: err})
      }
      break;
    default:
      break;
  }
}

export default handler;