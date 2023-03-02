import { Outlet, Link } from "react-router-dom";
import { HOSTING_URL_PREFIX } from './const';

const NavMenu = () => {
	return (
	<>
		<br/>
		<nav className="navbar navbar-expand-lg navbar-light C bg-success bg-opacity-25 rounded">
			<div className="container-fluid">
				<Link className="app-menu-brand-link" to={HOSTING_URL_PREFIX+"/"}>
					<img className="app-nav-menu-logo" alt="logo-vibookstore"
					src={HOSTING_URL_PREFIX+"/logo-vibookstore.png"} />
					ViBookstore
				</Link>
				<button className="navbar-toggler" type="button" 
					data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
					aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item m-1">
							<button type="button" className="btn btn-success">
								<Link className="app-menu-link" to={HOSTING_URL_PREFIX+"/books"}>Books</Link>
							</button>
						</li>
						<li className="nav-item m-1">
							<button type="button" className="btn btn-success">
								<Link className="app-menu-link" to={HOSTING_URL_PREFIX+"/authors"}>Authors</Link>
							</button>
						</li>
						<li className="nav-item m-1">
							<button type="button" className="btn btn-success">
								<Link className="app-menu-link" to={HOSTING_URL_PREFIX+"/stats"}>Statistics</Link>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		{/* Render the selected page: */}
		<Outlet />
	</>
	)
};

export default NavMenu;
