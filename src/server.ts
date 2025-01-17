import { Express } from "express"
import Builder from "./builder";


export class ServerApplication {
    constructor(private app: Express, private port: Number) { }

    start = () => {
        this.app.listen(this.port, () => {
            console.log(`Express is listening at http://localhost:${this.port}`);
        })
    }
}

const init = async () => {
    const port = parseInt(process.env.PORT);
    const builder = new Builder();
    const serverApp = await builder.build(port || 3000);
    serverApp.start();
};

init();