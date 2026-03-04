import { Route } from "@slyte/router";
import { KeyvalueComp } from "../../../components/javascript/keyvalue-comp";

class Keyvalue extends Route {
	render() {
		return { outlet: "#page-outlet", component: KeyvalueComp }
	}

	static actions() {
		return {};
	}
}

export { Keyvalue };
