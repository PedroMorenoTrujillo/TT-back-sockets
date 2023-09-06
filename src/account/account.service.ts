/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './schema/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private account: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    return await this.account.create(createAccountDto);
  }

  async findAll() {
    return await this.account.find();
  }

  async findOne(id: string) {
    return await this.account.findById(id);
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
