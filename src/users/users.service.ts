import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from '../errors';
// import { error } from 'console';

import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

@Injectable()
export class UsersService {
  constructor() {}

  params(merge = {}) {
    const TableName = 'stefanini-users';
    return { TableName, ...merge };
  }

  async findAll() {
    const params = this.params();
    return await dynamo.scan(params).promise();
  }

  async create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const Item = { ...createUserDto, id };
    const params = this.params({ Item });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await dynamo.put(params).promise();
    return Item;
  }

  async findOne(id) {
    const params = this.params({ Key: { id } });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const Item = await dynamo.get(params).promise();
    if (!Item) throw new NotFoundError(`Entity #${id} not found`);
    return Item.Item || false;
  }

  async update(id, updateUserDto: UpdateUserDto) {
    let Item = await this.findOne(id);
    if (!Item) throw new NotFoundError(`Entity #${id} not found`);
    Item = { ...Item, ...updateUserDto, id };
    const params = this.params({ Item });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await dynamo.put(params).promise();
    return Item;
  }

  async delete(id) {
    const Item = await this.findOne(id);
    if (!Item) throw new NotFoundError(`Entity #${id} not found`);
    const params = this.params({ Key: { id } });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await dynamo.delete(params).promise();
    return Item;
  }
}
