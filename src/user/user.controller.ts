import { Body, Controller, Delete, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from "../model/user.model";
import { WebResponse } from "../model/web.model";
import { Auth } from "../common/auth.decorator";
import { User } from "@prisma/client";

@Controller('api/users/')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(200)
  async register(@Body() request: RegisterUserRequest): Promise<WebResponse<UserResponse>> {
    const response = await this.userService.register(request)
    return {
      data: response
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() request: LoginUserRequest): Promise<WebResponse<UserResponse>> {
    const response = await this.userService.login(request)
    return {
      data: response
    }
  }

  @Get('current')
  @HttpCode(200)
  async get(@Auth() user: User): Promise<WebResponse<UserResponse>> {
    const response = await this.userService.get(user)
    return {
      data: response
    }
  }

  @Patch('current')
  @HttpCode(200)
  async update(@Auth() user: User, @Body() request: UpdateUserRequest): Promise<WebResponse<UserResponse>> {
    const response = await this.userService.update(user, request)
    return {
      data: response
    }
  }

  @Delete('current')
  @HttpCode(200)
  async logout(@Auth() user: User): Promise<WebResponse<boolean>> {
    await this.userService.logout(user)
    return {
      data: true
    }
  }
}