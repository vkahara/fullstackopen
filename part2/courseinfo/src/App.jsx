const Header = ({ course }) => <h1>{course}</h1>


const Total = ({ course }) => {
  const sum = course.parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises
  }, 0)
  return (
      <b>total of {sum} exercises</b>
  )
} 



const Course = ({ course }) => {  
  return (
    <div>
      <Header course={course.name} />
      
        {course.parts.map(part =>
           <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
        
      <Total course={course} />      
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return <Course course={course} />
}

export default App