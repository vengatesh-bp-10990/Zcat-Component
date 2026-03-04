import { Route } from "@slyte/router";
import { FileuploadComp } from "../../../components/javascript/fileupload-comp";

class Fileupload extends Route {
	render() {
		return { outlet: "#page-outlet", component: FileuploadComp }
	}

	static actions() {
		return {};
	}
}

export { Fileupload };
