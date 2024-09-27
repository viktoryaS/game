import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import { type } from "@testing-library/user-event/dist/type";
import Loader from "./Loader";
import Error from "./Error"
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
}

function reducer(state, action) {
  switch(action.type) {
    case "dataReceived":
      // возвращаем новый обьект состояния
      return {
        // берем все текущее состояния 
        ...state, 
        // берем все данные которые только что получили
        questions: action.payload,
        status: "ready",
      }
      case "dataFailed":
        return {
          ...state,
           status: "error",
        }
        case "start" :
          return {
            ...state,
            status: "active",
          }
          case "newAnswer":
            const question = state.questions.at(state.index);
            return {
              ...state,
              answer: action.payload,
              points: action.payload === question.correctOption 
              ? state.points + question.points
              : state.points,
            };
            case "nextQuestion":
              return {...state,
                 index: state.index + 1,
                };
              case "finish":
                return {
                  ...state,
                  status: "finished",
                };
      default:
        throw new Error("Action unkown")
  }
}

function App() {

  // диструктурируем обьект  initialState
 const [{questions, status, index, answer, points}, dispatch] = useReducer(reducer, initialState)

 const numQuestions = questions.length;
 const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
    .then((res) => res.json())
    // Отправим действия на редуктор,полезной нагрузкой будут данные которые только что получили
    .then((data) => dispatch({type: "dataReceived", payload: data}))
    .catch((err) => dispatch({type: "dataReceived"}));
  }, [])


  return (
  <div className="app">
  <Header />
  <Main>
    {/* Если статус finished то отоброзить && этот компонент */}
   {status === "loading" && <Loader />}
   {status === "error" && <Error />}
   {status === "ready" && (
    <StartScreen numQuestions={numQuestions} 
    dispatch={dispatch}/>
    )}
   {status === "active" && (
    <>
    <Progress 
    index={index} 
    numQuestions={numQuestions} 
    points={points}
    maxPossiblePoints={maxPossiblePoints}
    answer={answer}/>
   <Question
    question={questions[index]}
    dispatch={dispatch} 
    answer={answer} />
    <NextButton 
    dispatch={dispatch} 
    answer={answer}
    numQuestions={numQuestions}
    index={index}/>
    </>
    )}
    {/* Если статус finished то отоброзить && этот компонент */}
    {status === "finished" && (
      <FinishScreen points={points} 
      maxPossiblePoints={maxPossiblePoints} />)}
  </Main>
  </div>
 
  )

}

export default App;
