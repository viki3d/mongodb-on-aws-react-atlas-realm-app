import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HOSTING_URL_PREFIX } from './const';
import NavMenu from './NavMenu';
import PageHome from './PageHome';
import PageAuthors from './PageAuthors';
import PageBooks from './PageBooks';
import PageStats from './PageStats';
import PageNotFound from './PageNotFound';

 
function ViBookstore() {

  return (
	<div class="container bg-light">
		<BrowserRouter>
			<Routes>
				<Route path={"/"+HOSTING_URL_PREFIX} element={<NavMenu />}>
				<Route index element={<PageHome />} />
				<Route path="authors" element={<PageAuthors />} />
				<Route path="books" element={<PageBooks />} />
				<Route path="stats" element={<PageStats />} />
				<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</div>
	
  );
}

export default ViBookstore;
