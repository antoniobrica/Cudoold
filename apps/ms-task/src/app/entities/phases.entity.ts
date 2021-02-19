import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Phases {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    Id: string;

    // @Field()
    // @Column('uuid')
    // phaseId: string;

    @Field()
    @Column()
    phaseTitle: string;

    @Field()
    @Column()
    companyId: number;

    @Field()
    @Column()
    clientId: number;
    
}