import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Account, AccountDocument } from './schema/account.schema';
@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private account: Model<AccountDocument>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    createAccountDto.details = createAccountDto.details.map((item) => {
      item.orderCode = new mongoose.mongo.ObjectId().toString();
      item.orderId = new mongoose.mongo.ObjectId().toString();
      return item;
    });
    createAccountDto.availableBalance =
      createAccountDto.details.length > 0
        ? createAccountDto.details[createAccountDto.details.length - 1]
            .availableBalance
        : 0;
    createAccountDto.balance =
      createAccountDto.details.length > 0
        ? createAccountDto.details[createAccountDto.details.length - 1].balance
        : 0;
    return await this.account.create(createAccountDto);
  }

  async findAll() {
    return await this.account.find();
  }

  async findOne(id: string) {
    return await this.account.findById(id);
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    try {
      updateAccountDto.availableBalance =
        updateAccountDto.details.length > 0
          ? updateAccountDto.details[updateAccountDto.details.length - 1]
              .availableBalance
          : 0;
      updateAccountDto.balance =
        updateAccountDto.details.length > 0
          ? updateAccountDto.details[updateAccountDto.details.length - 1]
              .balance
          : 0;
      updateAccountDto.details = updateAccountDto.details.map((item) => {
        item.orderCode =
          item.orderCode ?? new mongoose.mongo.ObjectId().toString();
        item.orderId = item.orderId ?? new mongoose.mongo.ObjectId().toString();
        return item;
      });
      const updatedAccount = await this.account.findByIdAndUpdate(
        { _id: id },
        updateAccountDto,
        { new: true },
      );
      return await this.findAll();
    } catch (e) {
      console.log(e);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
