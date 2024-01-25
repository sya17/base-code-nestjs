import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CommonGeneric } from 'src/common/util/common.util';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildCriteria } from 'src/common/util/build-criteria.util';
import { FilterCriteriaUtil } from 'src/common/util/filter-criteria.util';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, CommonGeneric, BuildCriteria, FilterCriteriaUtil],
  exports: [UserService],
})
export class UserModule {}
