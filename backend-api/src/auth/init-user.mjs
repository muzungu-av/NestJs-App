import * as bcrypt from 'bcrypt';

async function hashPassword(password) {
  const saltRounds = 13; // кол-во "соли" для хеширования
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function main() {
  const result_string = await hashPassword('ASie~shai2Vae%nmaeph7'); // пароль входа в арт-конф
  return result_string;
}

let _ = await main();
console.log(_);
