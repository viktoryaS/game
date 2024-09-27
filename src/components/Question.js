import Options from "./Options";

export default function Question({question, answer, dispatch}) {
    console.log(question);

    return (
       <div>{question.question}

     <Options question={question} dispatch={dispatch} answer={answer}/>
       </div>
    )
}