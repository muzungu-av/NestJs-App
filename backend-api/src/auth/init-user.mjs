// import { User } from 'user/schemas/user.schema';
// import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

async function hashPassword(password) {
  const saltRounds = 13; // кол-во "соли" для хеширования
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function main() {
  const result_string = await hashPassword('618542');
  return result_string;
}

const result = await main();
console.log(result);
