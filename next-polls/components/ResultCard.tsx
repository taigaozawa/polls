import { useEffect, useState } from "react";
import axios from 'axios';
import useSWR from 'swr';
import { Question } from "../types/Question";
import { Submit } from "../types/Submit";
import { Answer } from "../types/Answer";

interface Props {
  questionUuid: string;
  index: number;
}

const ResultCard: React.FC<Props> = props => {
  const questionFetcher = (url: string) => {
    if (!url) {
      console.log('undefinedです');
      return;
    } 
    return axios(url).then(res => res.data);
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/questions/${props.questionUuid}`
  const {data} = useSWR(apiUrl, questionFetcher);

  const question: Question = data;

  return (
    <>
      <div className="bg-white mb-5 p-4 rounded-xl shadow">
        <div className="flex items-baseline">
          <div className="font-bold text-lg mr-2">No.{props.index + 1}</div>
          <div>{question?.description}</div>
        </div>
        <div className="border-t my-2">
          {question?.options.map((option, index) => {
            return (
              <div key={index} className="border-b ">
                {question?.multiple ?
                  <div>
                    {option}
                  </div>
                  :
                  <div>
                    {option}
                  </div>

                }
              </div>
            )
          })
          }
        </div>
      </div>
    </>
  )
}

export default ResultCard;