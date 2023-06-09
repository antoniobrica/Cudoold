import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BkpEntity } from '../../../entities/bkp.entity';
import { FolderEntity } from '../../../entities/folder.entity';
import ReferenceFilterParams from '../../../utils/types/referenceFilterParams';
import { FolderModel } from '../../folder/model/folder.model';
import { FolderService } from '../../folder/service/folder.service';
import { CreateBkpInput } from '../dto/create-bkp.input';
import { BkpModel } from '../model/bkp.model';
import { BkpService } from '../service/bkp.service';


@Resolver(() => BkpModel)
export class BkpResolver {
  constructor(
    private readonly bkpService: BkpService,
    private readonly folderService: FolderService) { }

  @Query(() => [BkpModel], { nullable: true })
  async Bkp(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<BkpEntity[]> {
    return await this.bkpService.findAllBkp(referenceFilter)
  }

  @Mutation(() => BkpModel)
  async createBkp(
    @Args('bkpDetails') createBkpInput: CreateBkpInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.bkpService.createBkp(createBkpInput, referenceFilter);
  }

  @Mutation(() => BkpModel)
  async updateBkp(
    @Args('bkpDetails') createBkpInput: CreateBkpInput,
    @Args("referenceFilter") referenceFilter: ReferenceFilterParams
  ) {
    return this.bkpService.updateBkp(createBkpInput, referenceFilter);
  }

  @Query(() => [FolderModel], { nullable: true })
  async BkpFolders(@Args("referenceFilter") referenceFilter: ReferenceFilterParams): Promise<FolderEntity[]> {
    return await this.folderService.findAllFolder(referenceFilter)
  }

}
