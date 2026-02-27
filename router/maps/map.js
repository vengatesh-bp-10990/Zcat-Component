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
        });
	}
}
export {ZcatAppMap};
