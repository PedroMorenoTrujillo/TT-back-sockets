import { Injectable } from '@nestjs/common';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { Model } from 'mongoose';
import { Exchange, ExchangeDocument } from './schema/exchange.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectModel(Exchange.name) private exchange: Model<ExchangeDocument>,
  ) {}

  async create(createExchangeDto: CreateExchangeDto) {
    return await this.exchange.create(createExchangeDto);
  }

  async findAll() {
    return await this.exchange.findOne();
  }

  findOne(id: number) {
    return `This action returns a #${id} exchange`;
  }

  async update(id: string, updateExchangeDto: UpdateExchangeDto) {
    return await this.exchange.updateOne({ _id: id }, updateExchangeDto);
  }

  remove(id: number) {
    return `This action removes a #${id} exchange`;
  }
}
