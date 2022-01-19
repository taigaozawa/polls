import router from 'next/router';

const NewPollButton = () => {
  return (
    <div className="pt-5 pb-3 flex">
            <div
            onClick={() => router.push('/polls/new')} 
            className="bg-green-600 text-white font-bold rounded-full px-3 py-1 hover:bg-green-700 cursor-pointer">
              新規投票フォーム ＋
            </div>
          </div>
  )
}

export default NewPollButton;