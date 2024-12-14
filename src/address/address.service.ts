import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Address, User } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, UpdateAddressRequest } from "../model/address.model";
import { add, Logger } from "winston";
import { AddressValidation } from "./address.validation";
import { ContactService } from "../contact/contact.service";

@Injectable()
export class AddressService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private contactService: ContactService
  ) {}

  async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
    const createRequest = this.validationService.validate(
      AddressValidation.CREATE,
      request
    )

    await this.contactService.checkContactMustExist(
      user.username,
      createRequest.contact_id
    )

    const address = await this.prismaService.address.create({
      data: createRequest
    })

    return this.toAddressResponse(address)
  }

  toAddressResponse(address: Address): AddressResponse {
    return {
      id: address.id,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code
    }
  }

  async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
    const getRequest = this.validationService.validate(AddressValidation.GET, request)
    
    await this.contactService.checkContactMustExist(
      user.username,
      getRequest.contact_id
    )

    const address = await this.checkAddressMustExists(getRequest.contact_id, getRequest.address_id)

    return this.toAddressResponse(address)
  }

  async checkAddressMustExists(contactId: number, addressId: number): Promise<Address> {
    const address = await this.prismaService.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId
      }
    })

    if (!address) {
      throw new HttpException('Address is not found', 404)
    }

    return address
  }

  async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
    const updateRequest = this.validationService.validate(AddressValidation.UPDATE, request)

    await this.contactService.checkContactMustExist(
      user.username,
      updateRequest.contact_id
    )

    let address = await this.checkAddressMustExists(updateRequest.contact_id, updateRequest.id)

    address = await this.prismaService.address.update({
      where: {id: updateRequest.id, contact_id: updateRequest.contact_id},
      data: updateRequest
    })

    return this.toAddressResponse(address)
  }

  async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
    const removeRequest = this.validationService.validate(AddressValidation.REMOVE, request)

    await this.contactService.checkContactMustExist(
      user.username,
      removeRequest.contact_id
    )

    let address = await this.checkAddressMustExists(removeRequest.contact_id, removeRequest.address_id)
    
    await this.prismaService.address.delete({
      where: {
        id: removeRequest.address_id,
        contact_id: removeRequest.contact_id
      }
    })

    return this.toAddressResponse(address)
  }

  async list(user: User, contactId: number): Promise<AddressResponse[]> {
    await this.contactService.checkContactMustExist(
      user.username,
      contactId
    )

    const addresses = await this.prismaService.address.findMany({
      where: {
        contact_id: contactId
      }
    })

    return addresses.map((address: Address) => this.toAddressResponse(address))
  }
}