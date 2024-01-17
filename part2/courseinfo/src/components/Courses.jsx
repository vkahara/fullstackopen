const Courses = ({ courses }) => {  
    return (
      <div>
          {courses.map(course => (
            <div key={course.id}>
              <Header course= {course.name} />
                  
                {course.parts.map(part => (
                  <p key={part.id}>
                    {part.name} {part.exercises}
                  </p>
                ))}
              <Total course={course} />
            </div>
          ))}  
      </div>
    )
  }

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ course }) => {
  const sum = course.parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises
  }, 0)
  return (
      <b>total of {sum} exercises</b>
  )
} 

export default Courses