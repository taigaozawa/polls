import PollCard from './PollCard';

const PollList = () => {
  return (
    <div>
    <div className="text-lg text-gray-700 border-b mb-3">投票一覧</div>
    <div className="mb-3">
      <PollCard title="アンケートします！" pollId={1452} description="新しいアンケートです！！！"/>
      </div>
      <div>
      <PollCard title="しつもーん" pollId={9373241} description="例文です。" />
    </div>
    </div>
  )
}

export default PollList;