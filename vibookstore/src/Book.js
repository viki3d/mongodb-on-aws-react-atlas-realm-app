function Book(row) {
	return (
		<tr>
			<td>{row.props.title}</td>
			<td>{row.props.year}</td>
			<td>{row.props.author.firstname} {row.props.author.lastname}</td>
		</tr>
	);
}

export default Book;
