import router from 'next/router';

interface Props {
  title: string;
  pollId: number;
  description?: string;
};

const PollCard: React.FC<Props> = props => {
  return (
    <>
    <div
    onClick={() => router.push(`/polls/${props.pollId}`)} 
    className="shadow bg-white p-3 rounded-xl cursor-pointer hover:bg-gray-50">
      <div className="flex items-baseline">
        <div className="font-bold mr-2">{props.title}</div>
        <div className="text-sm text-gray-500"><span className="mr-0.5">#</span>{props.pollId}</div>
      </div>
      <div className="text-sm mt-0.5 text-gray-700">{props.description}</div>
    </div>
    </>
  )
}

export default PollCard;