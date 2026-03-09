import { RouterMap } from "@slyte/router";

class ZcatAppMap extends RouterMap {
	static path='../routes'
	map() {
        this.route("index",{path:'/'}, () => {
            this.route("overview",{path:'/overview'});
            this.route("installation",{path:'/installation'});
            this.route("usage",{path:'/usage'});
            this.route("button",{path:'/button'});
            this.route("input",{path:'/input'});
            this.route("dropdown",{path:'/dropdown'});
            this.route("radio",{path:'/radio'});
            this.route("checkbox",{path:'/checkbox'});
            this.route("toggle",{path:'/toggle'});
            this.route("icon",{path:'/icon'});
            this.route("alert",{path:'/alert'});
            this.route("loader",{path:'/loader'});
            this.route("attention",{path:'/attention'});
            this.route("tab",{path:'/tab'});
            this.route("modal",{path:'/modal'});
            this.route("table",{path:'/table'});
            this.route("popover",{path:'/popover'});
            this.route("pagination",{path:'/pagination'});
            this.route("avatar",{path:'/avatar'});
            this.route("autocomplete",{path:'/autocomplete'});
            this.route("fileupload",{path:'/fileupload'});
            this.route("cards",{path:'/cards'});
            this.route("doublefield",{path:'/doublefield'});
            this.route("keyvalue",{path:'/keyvalue'});
            this.route("datepicker",{path:'/datepicker'});
            this.route("linkbox",{path:'/linkbox'});
            this.route("inlineedit",{path:'/inlineedit'});
            this.route("tooltip",{path:'/tooltip'});
            this.route("label",{path:'/label'});
        });
	}
}
export {ZcatAppMap};
