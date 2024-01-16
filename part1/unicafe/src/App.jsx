/* eslint-disable react/prop-types */
import { useState } from "react";

const Statistics = props => <div>{props.text} {props.value}</div>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)


const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [averageCounter, setAverageCounter] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverageCounter(averageCounter + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverageCounter(averageCounter - 1)
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick= {handleGoodClick} text="good" />
      <Button onClick= {handleNeutralClick} text="neutral" />
      <Button onClick= {handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics text="good" value={good} />
      <Statistics text="neutral" value={neutral} />
      <Statistics text="bad" value={bad} />
      <Statistics text="all" value={total} />
      <Statistics text="average" value={averageCounter / total} />
      <Statistics text="positive" value={good / total * 100 + ' %'} />
    </div>
  )
}

export default App