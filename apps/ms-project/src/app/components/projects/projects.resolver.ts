import { Inject } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetProjectArgs } from './dto/args/get-project.args';
import { GetProjectsArgs } from './dto/args/get-projects.args';
import { CreateProjectInput } from './dto/input/create-project.input';
import { ProjectEntity } from './entity/project.entity';
import { ProjectServiceInterface } from './interface/project.service.interface';

import { Project } from './models/project';
import { ProjectsService } from './projects.service';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    @Inject('ProjectServiceInterface')
    private readonly projectsService: ProjectsService) {}


  @Query(() => [Project], { nullable: true } )
   async getProjects(): Promise<Project[]>  {
     return await this.projectsService.findAll()
   }

  
  @Mutation(() => Project)
  async createProjectDatabase(
    @Args('createProjectData') createProjectData: CreateProjectInput
  ) {
    return this.projectsService.create(createProjectData);
  }

}
