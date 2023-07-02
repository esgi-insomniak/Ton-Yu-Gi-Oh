import {forwardRef, Module} from "@nestjs/common";
import {PingController} from "../controllers/ping/ping.controller";
import {AppModule} from "./app.module";


@Module({
    imports: [forwardRef(() => AppModule)],
    controllers: [PingController],
})

export class PingModule {}