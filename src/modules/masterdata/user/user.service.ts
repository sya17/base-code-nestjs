import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseResponse } from 'src/common/interface/base-response.interface';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGE_RESPONSE } from 'src/common/constants/message.constant';
import { CommonGeneric } from 'src/common/util/common.util';
import { CustomBadRequestException } from 'src/common/exceptions/custom-bad-request.exception';
import { PageAndOrderDto } from 'src/models/page-and-order.model';
import { queryFilters } from 'src/models/query-filters.model';
import { BuildCriteria } from 'src/common/util/build-criteria.util';
import { FilterCriteriaUtil } from 'src/common/util/filter-criteria.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private common: CommonGeneric,
    private userFilterCriteria: FilterCriteriaUtil<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<BaseResponse<User>> {
    try {
      createUserDto.password = this.common.hashPassword(createUserDto.password);
      createUserDto.name =
        createUserDto.firstName + ' ' + createUserDto.lastName;
      let result = await this.repo.save(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: MESSAGE_RESPONSE.CREATED,
        data: result,
      };
    } catch (error) {
      throw new CustomBadRequestException('Error ', error);
    }
  }

  async findAll(
    filters: queryFilters,
    pageOrder: PageAndOrderDto,
  ): Promise<BaseResponse<User[]>> {
    let option = this.userFilterCriteria.filter(
      this.common.extractFilter(filters.filters),
      pageOrder,
    );

    console.log('option', option);

    try {
      const [result, totalItems] = await this.repo.findAndCount(option);
      return {
        statusCode: HttpStatus.OK,
        message: MESSAGE_RESPONSE.OK,
        pagination: this.common.getPagination(
          pageOrder.page,
          pageOrder.limit,
          totalItems,
        ),
        data: result,
      };
    } catch (error) {
      console.log('Error ', error);

      throw new CustomBadRequestException('Error ', error);
    }
  }

  async findOne(id: string): Promise<BaseResponse<User>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        message: MESSAGE_RESPONSE.OK,
        data: await this.repo.findOneById(id),
      };
    } catch (error) {
      throw new CustomBadRequestException('Error ', error);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<BaseResponse<User>> {
    try {
      await this.repo.update(id, updateUserDto);
      return {
        statusCode: HttpStatus.OK,
        message: MESSAGE_RESPONSE.UPDATED,
        data: await this.repo.findOneById(id),
      };
    } catch (error) {
      throw new CustomBadRequestException('Error ', error);
    }
  }

  async remove(id: string): Promise<BaseResponse<User>> {
    try {
      let result = await this.repo.findOneById(id);
      await this.repo.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: MESSAGE_RESPONSE.DELETES,
        data: result,
      };
    } catch (error) {
      throw new CustomBadRequestException('Error ', error);
    }
  }
}
