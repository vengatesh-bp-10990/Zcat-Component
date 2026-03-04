import { Route } from "@slyte/router";
import { PaginationComp } from "../../../components/javascript/pagination-comp";

class Pagination extends Route {
	render() {
		return { outlet: "#page-outlet", component: PaginationComp }
	}

	static actions() {
		return {};
	}
}

export { Pagination };
