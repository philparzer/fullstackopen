const PercentagePositive = ({ good, neutral, bad }) => {

    let percentageGood = (good / (good + neutral + bad)) * 100;

    return (
        <div>percentage: 
            {!isNaN(percentageGood) && <span>{percentageGood} %</span>}
        </div> 
    )
}

export default PercentagePositive;