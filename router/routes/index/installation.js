import { Route } from "@slyte/router";
import { InstallationComp } from "../../../components/javascript/installation-comp";

class Installation extends Route {
	render() {
		return { outlet: "#page-outlet", component: InstallationComp }
	}

	static actions() {
		return {};
	}
}

export { Installation };
