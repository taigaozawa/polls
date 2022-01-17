import {NextApiRequest, NextApiResponse} from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch(req.method) {
    default:
      res.status(200).json({message: 'This is Polls API!'})
      break;
  }
}

export default handler;