import { useEffect, useState } from "react";
import axios from 'axios';
import useSWR from 'swr';
import { Question } from "../types/Question";
import { Submit } from "../types/Submit";
import { Answer } from "../types/Answer";
import { Result } from "postcss";
import { QuestionResult } from "../types/QuestionResult";

interface Props {
  questionUuid: string;
  index: number;
}

const ResultCard: React.FC<Props> = props => {
  const questionFetcher = (url: string) => {
    if (url.match(/undefined/)) {
      return;
    }
    return axios(url).then(res => res.data);
  }
  const questionApiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/questions/${props.questionUuid}`
  const {data: questionData} = useSWR(questionApiUrl, questionFetcher);
  const question: Question = questionData;

  const resultFetcher = (url: string) => {
    if (url.match(/undefined/)) {
      return;
    }
    return axios(url).then(res => res.data);
  }
  const resultApiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/questions/${props.questionUuid}/result`;
  const {data: resultData} = useSWR(resultApiUrl, resultFetcher);
  const questionResult: QuestionResult = resultData;

  return (
    <>
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
            const percentage = Math.round(ratio * 1000) / 10 ;
            return (
              <div key={index} className="border-b ">
                {question?.multiple ?
                  <div>
                    {option} ... {numberOfSelection}/{numberOfSubmits} ({percentage || 0}%)
                  </div>
                  :
                  <div>
                    {option} ... {numberOfSelection}/{numberOfSubmits} ({percentage || 0}%)
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