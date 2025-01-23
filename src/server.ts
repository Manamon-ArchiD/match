import { Express } from "express"
import { Builder } from "./builder";

export class ServerApplication {
    constructor(private app: Express, private port: Number) { }

    start = () => {
        this.app.listen(this.port, () => {
            console.log(`Express is listening at port ${this.port} \nSwagger available at http://localhost:${this.port}/api-docs`);
        })
    }
}