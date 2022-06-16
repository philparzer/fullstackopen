const Total = (props) => {
  
  let exercisesArr = props.parts.map(part => part.exercises);

  return (
      <p>total of {exercisesArr.reduce((a, b) => a + b, 0)} excercises</p>
    )
  }
  
  export default Total;