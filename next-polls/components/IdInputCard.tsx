import router from 'next/router';
import {useState} from 'react';

const IdInputCard = () => {
  const [pollId, setPollId] = useState('');
  return (
    <div className="w-full bg-gray-500 rounded-xl p-4 shadow mb-10">
            <div className="flex justify-center font-bold text-white">投票IDを入力して、投票ページに移動</div>
            <div className="flex justify-center text-2xl text-white mt-2 mb-2">
              <span className="">#</span>
            <input 
            value={pollId}
            type="numeric"
            onChange={e => setPollId(e.target.value)}
            placeholder="ID"
            className="w-32 text-black mx-1.5 rounded-full focus:outline-none focus:ring focus: ring-green-500 px-3"/>
            <span 
            onClick={() => router.push(`/polls/${pollId}`)}
            className="hover:text-green-500 cursor-pointer">→</span></div>
          </div>
  )
}

export default IdInputCard;