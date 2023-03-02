function BooksPerAuthor(row) {
	return (
		<tr>
			<td>{row.props._id.firstname}</td>
			<td>{row.props._id.lastname}</td>
			<td>{row.props._id.country}</td>
			<td>{row.props.booksForThisAuthor}</td>
		</tr>
	);
}

export default BooksPerAuthor;
