import { Poll } from '../types/Poll';
import PollCard from './PollCard';
import useSWR from 'swr';
import axios from 'axios';

interface Props {
  polls: Poll[];
}

const PollList: React.FC<Props> = props => {
  const polls = props.polls;

  return (
    <div>
    <div className="text-lg text-gray-700 border-b mb-3">投票一覧</div>
    {polls?.map(poll => {
      return (
        <div className="mb-3">
          <PollCard title={poll.title} pollId={poll.pollId} description={poll.description} />
        </div>
      )
    })}
    </div>
  )
}

export default PollList;