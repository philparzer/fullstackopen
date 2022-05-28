import { useState } from 'react';
import Button from './components/button';
import Headline from './components/headline';
import Statistics from './components/statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const onFeedbackBtnClick = (feedback) => {
    
    setAll(all + 1);

    switch (feedback) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        break;
    }
  }
 
  return (
    <>
      <Headline titleText="give feedback" />
      <Button text="good" onClick={() => onFeedbackBtnClick("good")} />
      <Button text="neutral" onClick={() => onFeedbackBtnClick("neutral")} />
      <Button text="bad" onClick={() => onFeedbackBtnClick("bad")} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </>
  )
}

export default App