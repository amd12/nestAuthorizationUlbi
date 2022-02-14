import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationExecutor} from "class-validator/types/validation/ValidationExecutor";
import {ValidationException} from "../exceptions/validation.exception";

@Injectable()
export class ValidationPipes implements PipeTransform<any>{
  async  transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if (errors.length){
            console.log(errors)
             let massage = errors.map(err =>{
                 return `${err.property} - ${Object.values(err.constraints).join(', ')}`
             })
            throw new ValidationException(massage)
        }

        return value;
    }

}