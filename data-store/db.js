import { Db,RESTConnector,RESTSerializer } from "@slyte/data";

class ZcatAppDb extends Db{
    static Connector = RESTConnector;
    static Serializer = RESTSerializer;
}

let Schema = ZcatAppDb.Schema;
export {ZcatAppDb,Schema};
