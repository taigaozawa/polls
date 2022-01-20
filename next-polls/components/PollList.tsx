import { Poll } from '../types/Poll';
import PollCard from './PollCard';
import SkeltonCard from './SkeltonCard';

interface Props {
  polls: Poll[];
}

const PollList: React.FC<Props> = props => {
  const polls = props.polls;

  return (
    <div>
      <div className="text-lg text-gray-700 border-b mb-3">投票フォーム一覧</div>
      {polls?.length ?
        (polls?.map((poll, index) => {
          return (
            <div className="mb-3" key={index}>
              <PollCard title={poll.title} pollId={poll.pollId} description={poll.description} />
            </div>
          )
        }))
        :
        <SkeltonCard />
      }
    </div>
  )
}

export default PollList;