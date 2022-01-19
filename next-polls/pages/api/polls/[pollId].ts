import {NextApiRequest, NextApiResponse} from 'next';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {  
  switch(req.method) {
    case 'GET':
      try {
        res.status(200).json({})
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