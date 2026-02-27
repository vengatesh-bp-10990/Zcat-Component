import { Route } from "@slyte/router";
import { LayoutComp } from "../../components/javascript/layout-comp";
class Index extends Route {

	render() {
		return {outlet : "#outlet", component : LayoutComp}
	}

	static actions(){
		return{
			
		}
	}
}

export {Index};

