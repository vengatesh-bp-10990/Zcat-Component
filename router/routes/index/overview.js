import { Route } from "@slyte/router";
import { OverviewComp } from "../../../components/javascript/overview-comp";

class Overview extends Route {
	render() {
		return { outlet: "#page-outlet", component: OverviewComp }
	}

	static actions() {
		return {};
	}
}

export { Overview };
