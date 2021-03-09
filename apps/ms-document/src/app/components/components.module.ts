import { Module } from '@nestjs/common';
import { BlobModule } from './file/blobStorage/blob.module';
import { ReferenceModule } from './reference/reference.module';

@Module({
  imports: [
    ReferenceModule,
    BlobModule
  ],
  providers: []
})
export class ComponentsModule { }
