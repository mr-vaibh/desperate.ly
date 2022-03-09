import React, { useState, useEffect } from 'react'
import axios from 'axios'

import GameList from './GameList'

import { useNavigate } from 'react-router-dom'

export default function Game() {
  const gameSlug = window.location.pathname.slice(1)

  const [gameData, setGameData] = useState({})
  // const [score, setScore] = useState(0)
  const [question, setQuestion] = useState({})
  const [answers, setAnswers] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/webapi/game/${gameSlug}`)
      .then(res => {
        if (res.data) {
          setGameData(res.data)

          // setScore(res.data.score)
          setRandomQuestion(res.data.score)
          setRandomAnswers(res.data.score)

        } else {
          navigate('/404')
        }
      })
      .catch(err => console.log(err))
  }, [gameSlug, navigate])

  const setRandomQuestion = (number) => {
    const questionsOfNum = GameList[number]
    const randomQuestionObject = questionsOfNum[Math.floor(Math.random() * questionsOfNum.length)]

    setQuestion(randomQuestionObject)
  }

  const setRandomAnswers = (number) => {
    const answers = [number]

    while (answers.length <= 4) {
      const newNum = Math.floor(Math.random() * 10)

      if (!answers.includes(newNum)) {
        answers.push(newNum)
      }
    }

    answers.sort(() => Math.random() - 0.5555555)
    
    setAnswers(answers)
  }

  return (
    <div className="container w-50 my-5">
      <div className="row">
        <div className="col">
          <h3>Q {gameData.score + 1}. {question.question} </h3>
        </div>
      </div>

      <div className="row">

        {
          answers.map(eachNum => (
            <div className="col-6">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="answerRadio" id={`answerRadio${eachNum}`} />
                <label className="form-check-label" htmlFor={`answerRadio${eachNum}`}>
                  {eachNum}
                </label>
              </div>
            </div>
          ))
        }
      </div>

      <div className="d-flex justify-content-between mt-5">
        <div className="col-6">
          <button className="btn btn-secondary">Previous</button>
        </div>
        <div className="col-6">
          <button className="btn btn-primary">Next</button>
        </div>
      </div>

      {/* {gameData.score} */}
    </div>
  )
}
