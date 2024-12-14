import { Injectable } from "@nestjs/common";
import { PrismaService } from "../src/common/prisma.service";
import * as bcrypt from 'bcrypt'
import { Address, Contact, User } from "@prisma/client";

@Injectable()
export class TestService {
    constructor(private prismaService: PrismaService) {}

    async deleteUser() {
        await this.prismaService.user.deleteMany({where: {username: 'test'}})
    }

    async deleteContact() {
        await this.prismaService.contact.deleteMany({where: {username: 'test'}})
    }

    async deleteAddress() {
        await this.prismaService.address.deleteMany({where: {contact: {username: 'test'}}})
    }

    async createUser() {
        await this.prismaService.user.create({data: {
            username: 'test',
            name: 'test',
            password: await bcrypt.hash('secret', 10),
            token: 'test'
        }})
    }

    async createContact() {
        await this.prismaService.contact.create({data: {
            first_name: 'test',
            last_name: 'test',
            email: 'test@sample.com',
            phone: '098990987',
            username: 'test'
        }})
    }

    async createAddress() {
        const contact = await this.getContact()
        await this.prismaService.address.create({data: {
            street: 'test',
            city: 'test',
            province: 'test',
            country: 'test',
            postal_code: '122333',
            contact_id: contact.id
        }})
    }

    async getUser(): Promise<User> {
        return await this.prismaService.user.findUnique({where: {username: 'test'}})
    }

    async getContact(): Promise<Contact> {
        return await this.prismaService.contact.findFirst({where: {username: 'test'}})
    }

    async getAddress(): Promise<Address> {
        return await this.prismaService.address.findFirst({where: {contact: {username: 'test'}}})
    }
}