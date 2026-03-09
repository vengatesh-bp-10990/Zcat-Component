import { Lyte } from "@slyte/core";
import  {ZcatAppDb} from "./data-store/db";
import  {ZcatAppComponentRegistry}  from "./components/component";
import  {ZcatAppRouter}  from "./router/router";
import  {LyteUiComponentAddon}  from "@zoho/lyte-ui-component/addon.js";
import  {ZcatUiAddon}  from "zcat-ui/addon.js";

class ZcatAppApp extends Lyte{
    lookups(){
        return [{component : ZcatAppComponentRegistry}, {router : ZcatAppRouter} , {db : ZcatAppDb}, LyteUiComponentAddon, ZcatUiAddon];
    }
}
export {ZcatAppApp};

