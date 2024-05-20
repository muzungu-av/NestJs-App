import * as bcrypt from 'bcrypt';

async function main() {
  const saltRounds = 13; // кол-во "соли" для хеширования
  const hashedPassword = await bcrypt.hash('ASie~shai2Vae%nmaeph7', saltRounds); // пароль входа в арт-конф
  return hashedPassword;
}

let _ = await main();
console.log(_);
