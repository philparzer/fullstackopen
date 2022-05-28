import VoteCount from "./vote-count";

const Anecdote = ({ anecdotes, votes, selected, vote, pickRandomQuote }) => {
    return (
        <>
            <h2>Anecdote of the Day</h2>
            <div>
                {anecdotes[selected]}
            </div>
            <VoteCount votes={votes} selected={selected} />
            <div>
                <button onClick={() => vote()}>vote</button>
                <button onClick={() => pickRandomQuote()}>next anecdote</button>
            </div>
        </>
    )
}

export default Anecdote;