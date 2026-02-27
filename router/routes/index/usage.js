import { Route } from "@slyte/router";
import { UsageComp } from "../../../components/javascript/usage-comp";

class Usage extends Route {
	render() {
		return { outlet: "#page-outlet", component: UsageComp }
	}

	static actions() {
		return {};
	}
}

export { Usage };
