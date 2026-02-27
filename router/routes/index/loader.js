import { Route } from "@slyte/router";
import { LoaderComp } from "../../../components/javascript/loader-comp";

class Loader extends Route {
  render() {
    return { outlet: "#page-outlet", component: LoaderComp }
  }

  static actions() {
    return {};
  }
}

export { Loader };
