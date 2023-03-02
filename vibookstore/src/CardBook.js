import { HOSTING_URL_PREFIX } from './const';

function CardBook(book) {
	//console.log(book.props.id);
	return (
		<div className="card m-2 C app-book-card">
			<img src={HOSTING_URL_PREFIX+`/books/${book.props.id}.jpg`} alt="book cover" 
				className="card-img-top C app-book-card-img" />
			<div className="card-body C app-book-card-body">
				<h5 className="card-title C app-book-card-title">{book.props.title}</h5>
				<p className="card-text">{book.props.author.firstname} {book.props.author.lastname}</p>
				<p className="card-text" >{book.props.year}</p>
			</div>
		</div>
	);
}

export default CardBook;
