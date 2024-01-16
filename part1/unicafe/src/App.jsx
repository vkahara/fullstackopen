/* eslint-disable react/prop-types */
import { useState } from "react";

const StatisticsLine = props =>(
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr> 
)

const Statistics = (props) => {
  if (props.all === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good} />
          <StatisticsLine text="neutral" value={props.neutral} />
          <StatisticsLine text="bad" value={props.bad} />
          <StatisticsLine text="all" value={props.all} />
          <StatisticsLine text="average" value={props.average} />
          <StatisticsLine text="positive" value={props.positive} />
        </tbody>
      </table>
    </div>
  )
}

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
      <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      all={total}
      average={averageCounter / total}
      positive={good / total * 100 + ' %'}
      />
    </div>
  )
}

export default App