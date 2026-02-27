import { Lyte } from "@slyte/core";
import  {ZcatAppDb} from "./data-store/db";
import  {ZcatAppComponentRegistry}  from "./components/component";
import  {ZcatAppRouter}  from "./router/router";

class ZcatAppApp extends Lyte{
    lookups(){
        return [{component : ZcatAppComponentRegistry}, {router : ZcatAppRouter} , {db : ZcatAppDb}];
    }
}
export {ZcatAppApp};

