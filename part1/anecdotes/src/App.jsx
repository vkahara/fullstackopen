/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const DisplayAnecdote = (props) => {
  return(
    <div>
      {props.anecdotes}
      <br></br>
      has {props.points} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const vote = (anecdote) => {
    const copy = [...points]
    copy[anecdote] += 1
    setPoints(copy)
    
  }
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([...new Uint8Array(8)])
  

  const setRandomValue = () => {
    setSelected(Math.floor(Math.random() * 7))
  }

  return (
    <div>
      
      <DisplayAnecdote anecdotes={anecdotes[selected]} points={points[selected]} />
      <Button onClick={() => vote(selected)} text="vote" />
      <Button onClick={setRandomValue} text="next anecdote" />
    </div>
  )
}

export default App