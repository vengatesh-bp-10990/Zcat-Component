import { Route } from "@slyte/router";
import { RadioComp } from "../../../components/javascript/radio-comp";

class Radio extends Route {
	render() {
		return { outlet: "#page-outlet", component: RadioComp }
	}

	static actions() {
		return {};
	}
}

export { Radio };
