import {NextApiRequest, NextApiResponse} from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method) {
    case 'POST':
      const newPoll = req.body;
      try {
        res.status(200).json({newPoll});
      } catch (err) {
        res.status(500).json({message: err.message})
      }
      break;
    case 'GET':
      res.status(200).json({message: 'GET'})
      break;
    default:
      break;
  }
}

export default handler;