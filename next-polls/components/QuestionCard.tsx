import { useState } from "react";

interface Props {
  questionId: number;
  questionText: string;
  options: string[];
  multiple: boolean;
}

const QuestionCard: React.FC<Props> = props => {
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  return (
    <>
      <div className="bg-white mb-5 p-4 rounded-xl shadow">
        <div className="flex items-baseline">
          <div className="font-bold text-lg mr-2">No.{props.questionId}</div>
          <div>{props.questionText}</div>
        </div>
        <div className="border-t my-2">
          {props.options.map((option, index) => {
            return (
              <div key={index} className="border-b py-1">
                {props.multiple ?
                  <div>
                    <label className="flex items-center">
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
                    <label className="flex items-center">
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