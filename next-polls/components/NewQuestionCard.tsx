import {Question} from '../types/Question';

interface Props {
  index: number;
  questions: Question[];
  setQuestions: (params: Question[]) => void;
}

const NewQuestionCard: React.FC<Props> = props => {
  const question = props.questions[props.index];
  return (
    <>
      <div className="bg-white mb-4 p-4 rounded-xl shadow">
        <div className="">
          <div className="font-bold text-lg mr-2">No.{props.index + 1}</div>
          <textarea
            rows={2}
            className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2"
            placeholder="質問文を入力..."
            value={question.questionText} onChange={e => {
              const newQuestions = props.questions.map((q, i) => {
                if (i === props.index) {
                  const newQ: Question = { ...q, questionText: e.target.value };
                  return newQ;
                } else {
                  return q;
                }
              })
              props.setQuestions(newQuestions)
            }} />
        </div>
        <div className="border-t my-2 flex flex-col">
          {question.options.map((option, index) => {
            return (
              <div key={index} className="flex border-b justify-between items-center">
                <input
                  placeholder="選択肢を入力..."
                  onChange={e => {
                    const newQuestions = props.questions.map((q, qi) => {
                      if (qi === props.index) {
                        const newOptions = question.options.map((o, oi) =>
                          oi === index ? e.target.value : o
                        )
                        const newQ: Question = { ...q, options: newOptions };
                        return newQ;
                      } else {
                        return q;
                      }
                    })
                    props.setQuestions(newQuestions);
                  }}
                  className="py-1 focus:outline-none w-full" value={option}
                />
                <div
                onClick={() => {
                  const newQuestions = props.questions.map((q, qi) => {
                    if (qi === props.index) {
                      const newOptions = question.options.filter((o, oi) => {
                        return oi !== index;
                      });
                      const newQ: Question = { ...q, options: newOptions };
                      return newQ;
                    } else {
                      return q;
                    }
                  })
                  props.setQuestions(newQuestions);
                }}
                className="cursor-pointer text-lg w-6 flex justify-center h-6 text-red-500">−</div>
              </div>
            )
          })
          }
        </div>
        <div className="flex">
          <div
            onClick={() => {
              const newQuestions = props.questions.map((q, qi) => {
                if (qi === props.index) {
                  const newOptions = [...q.options, ''];
                  const newQ: Question = { ...q, options: newOptions };
                  return newQ;
                } else {
                  return q;
                }
              })
              props.setQuestions(newQuestions);
            }}
            className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full px-2 text-xs py-1">選択肢を追加 +</div>
        </div>
        <div className="flex justify-end">
          <div
            onClick={() => {
              const newQuestions = props.questions.filter((question, index) => {
                return index !== props.index;
              });
              props.setQuestions(newQuestions);
            }}
            className="text-xs bg-gray-200 cursor-pointer font-bold px-2 py-1 rounded-lg text-red-500">この質問を削除</div>
        </div>
      </div>
    </>
  )
}

export default NewQuestionCard;