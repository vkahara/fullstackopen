import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, SET_BIRTHYEAR } from "../../queries";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    setBirthyear({ variables: { name, setBornTo: born } });
    console.log(name, born);
    setName("");
    setBorn("");
  };

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          ></input>
        </div>

        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          ></input>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default Authors;
