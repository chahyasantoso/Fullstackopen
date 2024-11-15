import { useState } from 'react'

const Anecdote = ({text, voteCount}) => {
  return (
    <>
      <p>{text}</p>
      <p>has {voteCount} votes</p>
    </>
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

  const randomIndex = () => Math.floor(Math.random() * anecdotes.length)
  const [selected, setSelected] = useState(randomIndex())
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const incrementVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const selectRandomAnecdotes = () => setSelected(randomIndex())

  const biggestVoteIndex = () => {
    const sortedVotes = [...votes].sort((a, b) => b - a) //sort descending
    const biggestVote = sortedVotes[0]

    return votes.indexOf(biggestVote)
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} voteCount={votes[selected]} />
      <button onClick={incrementVote}>vote</button>
      <button onClick={selectRandomAnecdotes}>next ancdote</button>

      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[biggestVoteIndex()]} voteCount={votes[biggestVoteIndex()]} />

    </div>
  )
}

export default App