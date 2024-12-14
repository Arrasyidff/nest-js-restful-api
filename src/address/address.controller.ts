import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { AddressService } from "./address.service";
import { WebResponse } from "../model/web.model";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, UpdateAddressRequest } from "../model/address.model";
import { Auth } from "../common/auth.decorator";
import { User } from "@prisma/client";

@Controller('/api/contacts/:contactId/addresses')
export class AddressController {
  constructor(
    private addressService: AddressService
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() request: CreateAddressRequest
  ): Promise<WebResponse<AddressResponse>> {
    request.contact_id = contactId
    const response = await this.addressService.create(user, request)
    return {
      data: response
    }
  }

  @Get('/:addressId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number
  ): Promise<WebResponse<AddressResponse>> {
    const request: GetAddressRequest = {
      contact_id: contactId,
      address_id: addressId
    }
    const response = await this.addressService.get(user, request)
    return {
      data: response
    }
  }

  @Put('/:addressId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() request: UpdateAddressRequest
  ): Promise<WebResponse<AddressResponse>> {
    request.id = addressId
    request.contact_id = contactId
    const response = await this.addressService.update(user, request)
    return {
      data: response
    }
  }

  @Delete('/:addressId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number
  ): Promise<WebResponse<boolean>> {
    const request: RemoveAddressRequest = {
      contact_id: contactId,
      address_id: addressId
    }
    await this.addressService.remove(user, request)
    return {
      data: true
    }
  }

  @Get()
  @HttpCode(200)
  async list(
    @Auth() user: User,
    @Param('contactId', ParseIntPipe) contactId: number
  ): Promise<WebResponse<AddressResponse[]>> {
    const response = await this.addressService.list(user, contactId)
    return {
      data: response
    }
  }
}