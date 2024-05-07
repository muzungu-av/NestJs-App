db.createUser({ user: "admin", pwd: "adminpass", roles: ["root"] });
sleep(1000);
db.getSiblingDB("paintings").createCollection("users");
db.getSiblingDB("paintings").users.insertOne({
  username: "Viktor",
  email: "abc@gl.com",
  password: "change_me",
});
sleep(1000);
db.getSiblingDB("paintings").createUser({
  user: "owner",
  pwd: "903903",
  roles: ["readWrite", "dbAdmin"],
});
db.shutdownServer();

// для подключения

// как супер админ
// mongo -u admin -p adminpass --authenticationDatabase admin

// как админ базы "paintings"
// # mongo -u owner -p 903903 --authenticationDatabase paintings

// db.users.find().pretty()

// http://172.18.0.102:3000/api/auth/login?username=abc@gl.com&password=1234
