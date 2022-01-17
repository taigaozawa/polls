import PollCard from './PollCard';

const PollList = () => {
  return (
    <div>
    <div className="text-lg text-gray-700 border-b mb-3">投票一覧</div>
    <div className="mb-3">
      <PollCard title="アンケート！" pollId={1452332} description="新しいアンケートです！！！"/>
      </div>
      <div>
      <PollCard title="アンケート！" pollId={1452332} />
    </div>
    </div>
  )
}

export default PollList;