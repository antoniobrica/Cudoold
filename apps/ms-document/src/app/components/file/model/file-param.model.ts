import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileParamModel {

    @Field({ nullable: true, description: `file URL` })
    fileURL?: string;

    @Field({ nullable: true, description: `file Name` })
    fileTitle?: string;

    @Field({ nullable: true, description: `file Name` })
    fileType?: string;

}