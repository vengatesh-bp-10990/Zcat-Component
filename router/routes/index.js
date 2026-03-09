import { Route } from "@slyte/router";
import { LayoutComp } from "../../components/javascript/layout-comp";
class Index extends Route {

	divert() {
		if (this.navigation.info.route === "index") {
			this.replaceWith("index.overview");
		}
	}

	render() {
		return {outlet : "#outlet", component : LayoutComp}
	}

	static actions(){
		return{
			
		}
	}
}

export {Index};

