import { Router } from "@slyte/router";
import  {ZcatAppMap}  from "./maps/map";
import {ZcatAppComponentRegistry}  from "../components/component";
class ZcatAppRouter extends Router {
    lookups(){
		return [{component : ZcatAppComponentRegistry}]
	}

	getComponentRegistry() {
		return this.$component;
	}

	getConfig() {
		var config = {
			baseMap : ZcatAppMap	
		}
		return config;
	}
	
    beforeRouteNavigation = function(prev,current) { 
		
	}
	
    afterRouteNavigation = function(current) {

	}
}

export {ZcatAppRouter} ;

