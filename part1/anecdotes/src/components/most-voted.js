import VoteCount from "./vote-count";

const MostVoted = ({ anecdotes, votes, selected }) => {
    return (
        <>
            <h2>Anecdote with most Votes</h2>
            <div>
                {anecdotes[votes.indexOf(Math.max(...votes))]}
            </div>
            <VoteCount votes={votes} selected={votes.indexOf(Math.max(...votes))} />
        </>
    )
}

export default MostVoted;