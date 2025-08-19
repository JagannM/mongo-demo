console.log("before");
//const result = getuser(1);
//console.log(result);
/* getuser(1, (user) => {
  console.log(user);
}); */

/* const p = getuser(1);
p.then((result) => console.log(result));*/

console.log("after");

async function userinfo() {
  const result = await getuser(1);
  console.log(result);
}
userinfo();

function getuser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("reading user from db.....");
      resolve({ id: id, gitHubUsername: "jagan" });
    }, 2000);
  });
}

/* function getuser(id, callback) {
  setTimeout(() => {
    callback({ id: 1, name: "jagan" });
  }, 2000);
} */
