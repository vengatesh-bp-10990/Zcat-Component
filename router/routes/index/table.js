import { Route } from "@slyte/router";
import { TableComp } from "../../../components/javascript/table-comp";

class Table extends Route {
	render() {
		return { outlet: "#page-outlet", component: TableComp }
	}

	static actions() {
		return {};
	}
}

export { Table };
