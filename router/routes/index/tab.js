import { Route } from "@slyte/router";
import { TabComp } from "../../../components/javascript/tab-comp";

class Tab extends Route {
	render() {
		return { outlet: "#page-outlet", component: TabComp }
	}

	static actions() {
		return {};
	}
}

export { Tab };
