import {NestFactory} from "@nestjs/core";
import {AppModules} from "./app.modules";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

async function start(){
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModules);

    const  config = new  DocumentBuilder()
        .setTitle('Course for backend')
        .setDescription('Used REST API')
        .setVersion('1.0.0')
        .addTag('Test postgres')
        .build()
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('/api/docs', app, document);
    //app.useGlobalGuards(JwtAuthGuard)

    await app.listen(PORT, ()=> console.log(`Server start on port ${PORT}`))
}
start()