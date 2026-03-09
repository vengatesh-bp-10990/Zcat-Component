import { ComponentRegistry } from "@slyte/component";
import { LyteUiComponentComponentRegistry } from "@zoho/lyte-ui-component/components/component.js";
import { ZcatUiComponentRegistry } from "zcat-ui/components/component.js";

class ZcatAppComponentRegistry extends ComponentRegistry{
    constructor(){
        super();
    }
    lookups(){
        return []
    }
    addRegistries() {
        return [
            ...LyteUiComponentComponentRegistry._instanceList,
            ...ZcatUiComponentRegistry._instanceList
        ];
    }
}

export {ZcatAppComponentRegistry}; 

