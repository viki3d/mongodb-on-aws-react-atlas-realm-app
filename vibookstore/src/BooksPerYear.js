function BooksPerYear(row) {
	return (
		<tr>
			<td>{row.props._id}</td>
			<td>{row.props.booksForThisYear}</td>
		</tr>
	);
}

export default BooksPerYear;
