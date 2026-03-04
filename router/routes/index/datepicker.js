import { Route } from "@slyte/router";
import { DatepickerComp } from "../../../components/javascript/datepicker-comp";

class Datepicker extends Route {
	render() {
		return { outlet: "#page-outlet", component: DatepickerComp }
	}

	static actions() {
		return {};
	}
}

export { Datepicker };
