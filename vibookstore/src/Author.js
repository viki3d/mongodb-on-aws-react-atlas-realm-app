function Author(row) {
	return (
		<tr>
			<td>{row.props.firstname}</td>
			<td>{row.props.lastname}</td>
			<td>{row.props.country}</td>
		</tr>
	);
}

export default Author;
