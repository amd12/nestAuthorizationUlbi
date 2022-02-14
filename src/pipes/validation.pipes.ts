import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";

@Injectable()
export class ValidationPipes implements PipeTransform<any>{
    transform(value: any, metadata: ArgumentMetadata): any {
        return undefined;
    }

}