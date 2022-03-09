import React, { useState, useEffect } from 'react'
import axios from 'axios'

import GameList from './GameList'

import { useNavigate } from 'react-router-dom'

export default function Game() {
  const gameSlug = window.location.pathname.slice(1)

  const [gameData, setGameData] = useState({})
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState({})
  const [answers, setAnswers] = useState([])

  const [correctAns, setCorrectAns] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/webapi/game/${gameSlug}`)
      .then(res => {
        if (res.data) {
          setGameData(res.data)

          setScore(res.data.score)

          setRandomQuestion(score)
          setRandomAnswers(score)

        } else {
          navigate('/404')
        }
      })
      .catch(err => console.log(err))
  }, [gameSlug, score, navigate])

  const setRandomQuestion = (number) => {
    const questionsOfNum = GameList[number]
    const randomQuestionObject = questionsOfNum[Math.floor(Math.random() * questionsOfNum.length)]

    setQuestion(randomQuestionObject)
  }

  const setRandomAnswers = (number) => {
    const answers = [number]

    while (answers.length < 4) {
      const newNum = Math.floor(Math.random() * 10)

      if (!answers.includes(newNum)) {
        answers.push(newNum)
      }
    }

    answers.sort(() => Math.random() - 0.5555555)

    setAnswers(answers)
  }

  const nextQnA = (number) => {
    if (correctAns) {
      setRandomQuestion(number)
      setRandomAnswers(number)
      setCorrectAns(false)
    }
  }

  const updateScore = (e) => {
    const number = e.target.getAttribute('score')

    if (parseInt(number) === question.answer) {
      axios.post(`/webapi/game/${gameSlug}`, { score: score + 1 })
        .then(res => {
          setCorrectAns(true)
        })
        .catch(err => console.log(err));
    }
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
          answers.map((eachNum, index) => (
            <div className="col-6" key={index}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="answerRadio"
                  id={`answerRadio${eachNum}`}
                  score={eachNum}
                  onClick={updateScore}
                  value={eachNum}
                />
                <label className="form-check-label" htmlFor={`answerRadio${eachNum}`}>
                  {eachNum}
                </label>
              </div>
            </div>
          ))
        }
      </div>

      <div className="d-flex justify-content-end mt-5">
        <div className="col-7">
          <button type="button" className="btn btn-primary px-5" onClick={() => nextQnA(score + 1)} disabled={!correctAns}>Next</button>
        </div>
      </div>

    </div>
  )
}
