const AverageScore = ({ good, neutral, bad }) => {

    let valueArray = [...Array(good + neutral + bad)];
    valueArray.fill(1, 0, good);
    valueArray.fill(0, good, good + neutral);
    valueArray.fill(-1, good + neutral, good + neutral + bad);

    let average = valueArray.reduce((a, b) => a + b, 0) / valueArray.length;

    return (
        <div>average: 
            {!isNaN(average) && <span>{average}</span>}
        </div>
    )

}

export default AverageScore;