const BlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl,
  setNewTitle,
  setNewAuthor,
  setNewUrl
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title:<input type='text' value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/></div>
        <div>author:<input type='text' value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)}/></div>
        <div>url:<input type='text' value={newUrl} onChange={(event) => setNewUrl(event.target.value)}/></div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm