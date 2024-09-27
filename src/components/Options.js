import { type } from "@testing-library/user-event/dist/type";

export default function Options({question, dispatch, answer}) {
const hasAnswered = answer !== null;

    return (
        <div className="options">
        {question.options.map((option, index) => (
            <button
            // когда выполняем условный css всегда лучше использовать тернальный?
            className={`btn btn-option ${index === answer ? 
                "answer" : "" } ${
                    hasAnswered
                     ? index === question.correctOption 
                     ?"correct" 
                     : "wrong"
                    : ""}`}
            key={option}
            //  При любом ответе мы хотим отключить кнопки
            disabled={hasAnswered}
            onClick={() => dispatch({type: "newAnswer",
                payload: index})}>
                {option}
            </button>
        ))}
        </div>
    )
}