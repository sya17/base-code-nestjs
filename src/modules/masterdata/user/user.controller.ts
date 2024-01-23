import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponse } from 'src/common/interface/base-response.interface';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/models/pagination.model';
import { BaseResponseSwagger } from 'src/models/base-response.model';
import { APP_CONSTANT } from 'src/common/constants/general.constant';

@Controller(`${APP_CONSTANT.endpoint_version}User`)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create User',
    description: 'Endpoint for create masterdata User',
  })
  @ApiCreatedResponse({ type: BaseResponseSwagger<User>, isArray: false })
  @ApiBadRequestResponse({ type: BaseResponseSwagger<User>, isArray: false })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<BaseResponse<User>> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get User',
    description: 'Endpoint for get masterdata User',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit size',
    required: false,
  })
  @ApiOkResponse({ type: BaseResponseSwagger, isArray: true })
  @ApiBadRequestResponse({ type: BaseResponseSwagger<User>, isArray: false })
  async findAll(
    @Query(ValidationPipe) paginationDto: PaginationDto,
  ): Promise<BaseResponse<User[]>> {
    return await this.userService.findAll(
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get By Id User',
    description: 'Endpoint for get by id masterdata User',
  })
  @ApiOkResponse({ type: BaseResponseSwagger, isArray: true })
  @ApiBadRequestResponse({ type: BaseResponseSwagger<User>, isArray: false })
  async findOne(@Param('id') id: string): Promise<BaseResponse<User>> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update User',
    description: 'Endpoint for update masterdata User',
  })
  @ApiCreatedResponse({ type: BaseResponseSwagger, isArray: true })
  @ApiBadRequestResponse({ type: BaseResponseSwagger<User>, isArray: false })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<BaseResponse<User>> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete User',
    description: 'Endpoint for delete masterdata User',
  })
  @ApiOkResponse({ type: BaseResponseSwagger, isArray: true })
  @ApiBadRequestResponse({ type: BaseResponseSwagger<User>, isArray: false })
  async remove(@Param('id') id: string): Promise<BaseResponse<User>> {
    return await this.userService.remove(id);
  }
}
