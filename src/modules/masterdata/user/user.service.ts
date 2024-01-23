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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private common: CommonGeneric,
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
    pageNumber: number = 1,
    pageSize: number = 10,
  ): Promise<BaseResponse<User[]>> {
    try {
      const [result, totalItems] = await this.repo.findAndCount({
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return {
        statusCode: HttpStatus.OK,
        message: MESSAGE_RESPONSE.OK,
        pagination: this.common.getPagination(pageNumber, pageSize, totalItems),
        data: result,
      };
    } catch (error) {
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
