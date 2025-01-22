import { Builder } from "./builder";

const init = async () => {
    console.log("===== Server Application =====");
    const port = parseInt(process.env.PORT);
    const builder = new Builder();
    const serverApp = await builder.build(port || 3000);
    serverApp.start();
};

init();