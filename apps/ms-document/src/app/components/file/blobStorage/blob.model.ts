import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class blobModel {

  @Field({nullable:true})
  containerName: string;

  @Field({nullable:true})
  blobSAS: string;

  @Field({nullable: true})
  sasUrl: string;
}



