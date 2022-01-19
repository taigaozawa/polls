import axios from 'axios';
import useSWR from 'swr';
import { Question } from "../types/Question";
import { QuestionResult } from "../types/QuestionResult";
import ResultChart from './ResultChart';


interface Props {
  questionUuid: string;
  index: number;
}

const QuestionResultCard: React.FC<Props> = props => {
  const questionFetcher = (url: string) => {
    if (url.match(/undefined/)) {
      return;
    }
    return axios(url).then(res => res.data);
  }
  const questionApiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/questions/${props.questionUuid}`
  const { data: questionData } = useSWR(questionApiUrl, questionFetcher);
  const question: Question = questionData;

  const resultFetcher = (url: string) => {
    if (url.match(/undefined/)) {
      return;
    }
    return axios(url).then(res => res.data);
  }
  const resultApiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/questions/${props.questionUuid}/result`;
  const { data: resultData } = useSWR(resultApiUrl, resultFetcher);
  const questionResult: QuestionResult = resultData;
  const distribution = questionResult?.distribution;
  const numberOfSubmits = questionResult?.numberOfSubmits;
  const options = question?.options;

  return (
    <div>
      <div className="bg-white mb-5 p-4 rounded-xl shadow">
        <div className="flex items-baseline">
          <div className="font-bold text-lg mr-2">No.{props.index + 1}</div>
          <div>{question?.description}</div>
        </div>
        <div className="border-t my-2">
          {question?.options.map((option, index) => {
            const numberOfSelection = questionResult?.distribution[index];
            const numberOfSubmits = questionResult?.numberOfSubmits;
            const ratio = numberOfSelection / numberOfSubmits;
            const percentage = Math.round(ratio * 1000) /10;
            return (
              <div key={index} className="border-b ">
                {question?.multiple ?
                  <div>
                    <span className="mr-1">{option} ...</span>
                    <span className="mr-1 font-bold">{percentage || 0}%</span> 
                    <span className="text-sm">({numberOfSelection})</span>
                  </div>
                  :
                  <div>
                    <span className="mr-1">{option} ...</span>
                    <span className="mr-1 font-bold">{percentage || 0}%</span> 
                    <span className="text-sm">({numberOfSelection})</span>
                  </div>
                }
              </div>
            )
          })
          }
          <div className="mt-2 mb-2 text-sm text-gray-500">回答者数: {numberOfSubmits}</div>
          <div>
           <ResultChart options={options} distribution={distribution} numberOfSubmits={numberOfSubmits} />
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default QuestionResultCard;