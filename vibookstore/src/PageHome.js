import { HOSTING_URL_PREFIX } from './const';

function PageHome() {
	
  return (
    <div className="app-page-home">
		<h2>
			Welcome to ViBookstore!
		</h2>
		<div>by viki3d</div>
		<h6>
			<span className="m-1">powered by</span>
			<img src={HOSTING_URL_PREFIX+"/logo-reactjs.png"} alt="logo reactjs" className="app-react-logo" />
			<span className="m-1">ReactJS and</span>
			<img src={HOSTING_URL_PREFIX+"/logo-mongodb.png"} alt="logo mongodb" className="app-mongodb-logo" />
			<span className="m-1">MongoDB on </span>
			<img src={HOSTING_URL_PREFIX+"/logo-aws.png"}     alt="logo aws"     className="app-aws-logo" />
			<span className="m-1">AWS</span>
		</h6>
		<img className="app-page-home-img" alt="logo vibookstore" 
			src={HOSTING_URL_PREFIX+"/logo-vibookstore.png"} />
    </div>
  );
}

export default PageHome;
