import { Route } from "@slyte/router";
import { AutocompleteComp } from "../../../components/javascript/autocomplete-comp";

class Autocomplete extends Route {
	render() {
		return { outlet: "#page-outlet", component: AutocompleteComp }
	}

	static actions() {
		return {};
	}
}

export { Autocomplete };
