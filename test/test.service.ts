import { Injectable } from "@nestjs/common";
import { PrismaService } from "../src/common/prisma.service";
import * as bcrypt from 'bcrypt'
import { Contact, User } from "@prisma/client";

@Injectable()
export class TestService {
    constructor(private prismaService: PrismaService) {}

    async deleteUser() {
        await this.prismaService.user.deleteMany({where: {username: 'test'}})
    }

    async deleteContact() {
        await this.prismaService.contact.deleteMany({where: {username: 'test'}})
    }

    async getUser(): Promise<User> {
        return await this.prismaService.user.findUnique({where: {username: 'test'}})
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

    async getContact(): Promise<Contact> {
        return await this.prismaService.contact.findFirst({where: {username: 'test'}})
    }
}