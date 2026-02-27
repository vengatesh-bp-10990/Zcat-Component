import { Route } from "@slyte/router";
import { InputComp } from "../../../components/javascript/input-comp";

class Input extends Route {
	render() {
		return { outlet: "#page-outlet", component: InputComp }
	}

	static actions() {
		return {};
	}
}

export { Input };
