import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { ValidationService } from '../common/validation.service';
import { PrismaService } from '../common/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.info(`Register new user ${JSON.stringify(request)}`);
    const registerUserRequest = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    );

    const totalUsernameWithSameUsername = await this.prismaService.user.count({
      where: { username: registerUserRequest.username },
    });

    if (totalUsernameWithSameUsername !== 0) {
      throw new HttpException('Username already registered', 400);
    }

    registerUserRequest.password = await bcrypt.hash(
      registerUserRequest.password,
      10,
    );
    const user = await this.prismaService.user.create({
      data: registerUserRequest,
    });

    return {
      username: user.username,
      name: user.name,
    };
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    this.logger.debug(`UserService.login(${JSON.stringify(request)})`);
    const loginRequest: LoginUserRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    let user = await this.prismaService.user.findUnique({
      where: { username: loginRequest.username },
    });
    if (!user) {
      throw new HttpException('Username or password is invalid', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Username or password is invalid', 401);
    }

    user = await this.prismaService.user.update({
      where: { username: loginRequest.username },
      data: { token: uuid() },
    });

    return {
      username: user.username,
      name: user.name,
      token: user.token,
    };
  }

  async get(user: User): Promise<UserResponse> {
    return {
      username: user.username,
      name: user.name,
    };
  }

  async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    this.logger.debug(
      `UserService.update(${user}, ${JSON.stringify(request)})`,
    );

    const updateRequest = this.validationService.validate(
      UserValidation.UPDATE,
      request,
    );
    if (updateRequest.name) {
      user.name = updateRequest.name;
    }
    if (updateRequest.password) {
      user.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const result = await this.prismaService.user.update({
      where: { username: user.username },
      data: user,
    });

    return {
      username: result.username,
      name: result.name,
    };
  }

  async logout(user: User): Promise<UserResponse> {
    this.logger.debug(`UserService.logout(${user}})`);

    await this.prismaService.user.update({
      where: { username: user.username },
      data: { token: null },
    });

    return {
      username: user.username,
      name: user.name,
    };
  }
}
