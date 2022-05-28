import StatisticLine from "./statistic-line";
import Headline from "./headline";
import AverageScore from "./average-score";
import PercentagePositive from "./percentage-positive";

const Statistics = ({ good, neutral, bad, all }) => {
    return (
        <> 
            <Headline titleText="statistics" />
            <table>
                <tbody>
                    <tr><td><StatisticLine text="good" resultValue={good} /></td></tr>
                    <tr><td><StatisticLine text="neutral" resultValue={neutral} /></td></tr>
                    <tr><td><StatisticLine text="bad" resultValue={bad} /></td></tr>
                    <tr><td><StatisticLine text="all" resultValue={all}/></td></tr>
                    <tr><td><AverageScore good={good} neutral={neutral} bad={bad} /></td></tr>
                    <tr><td><PercentagePositive good={good} neutral={neutral} bad={bad} /></td></tr>
                </tbody>
            </table>
        </> 
    )
}

export default Statistics;