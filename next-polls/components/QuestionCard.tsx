import { useEffect, useState } from "react";
import axios from 'axios';
import useSWR from 'swr';
import { Question } from "../types/Question";
import { Submit } from "../types/Submit";
import { Answer } from "../types/Answer";
import { useAuthContext } from "../utils/AuthContext";

interface Props {
  questionUuid: string;
  index: number;
  answers: Answer[];
  setAnswers: (answers:Answer[]) => void;
}

const QuestionCard: React.FC<Props> = props => {
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const {currentUser} = useAuthContext();

  const fetcher = (url: string) => {
    if (url.match(/undefined/)) {
      return;
    }
    return axios(url).then(res => res.data);
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_API_ORIGIN}/api/questions/${props.questionUuid}`
  const {data} = useSWR(apiUrl, fetcher);

  const question: Question = data;

  useEffect(() => {
    const newAnswers = props.answers?.map((answer, i) => {
      if (i === props.index) {
        return {...answer, indexes: checkedIndexes}
      } else {
      return answer;
      }
    })
    props.setAnswers(newAnswers)
  }, [checkedIndexes]);

  useEffect(() => {
    if (!currentUser) return;
    const newAnswers = props.answers?.map((answer, i) => {
      if (i === props.index) {
        return {...answer, createdBy: currentUser.uid}
      } else {
        return answer;
      }
    })
    props.setAnswers(newAnswers);
  }, [currentUser]);

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
                    <label className="flex items-center py-2 cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={checkedIndexes.includes(index)}
                        onChange={() => {
                          if (checkedIndexes.includes(index)) {
                            const newCheckedIndexes = checkedIndexes.filter(element => element !== index)
                            setCheckedIndexes(newCheckedIndexes);
                          } else {
                            setCheckedIndexes([...checkedIndexes, index]);
                          }
                        }}
                      />
                      <span className="ml-1">{option}</span>
                    </label>
                  </div>
                  :
                  <div>
                    <label className="flex items-center py-2 cursor-pointer hover:bg-gray-100">
                      <input
                        type="radio"
                        checked={index === checkedIndexes[0]}
                        onChange={() => setCheckedIndexes([index])}
                      />
                      <span className="ml-1">{option}</span>
                    </label>
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

export default QuestionCard;