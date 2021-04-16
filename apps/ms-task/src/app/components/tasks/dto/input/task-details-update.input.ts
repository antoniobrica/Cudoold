import { Optional } from "@nestjs/common";
import { Field, InputType } from "@nestjs/graphql";
import TaskFileParams from "../../../../utils/types/fileParam";
import PeopleParams from "../../../../utils/types/peopleParams";
import { TaskBasicDetailsUpdateInput } from "./task-basic-details-update.input";
@InputType()
export class TaskDetailsUpdateInput {

    @Field(type => TaskBasicDetailsUpdateInput)
    taskBasics?: TaskBasicDetailsUpdateInput;

    @Field(type => [PeopleParams], { description: `This is for title task title` })
    @Optional()
    followers?: PeopleParams[];

    @Field(type => [PeopleParams], { description: `This is for title task title` })
    @Optional()
    assignees?: PeopleParams[];

    @Field(type => [TaskFileParams], { description: `Task Files` })
    files?: TaskFileParams[];
}
