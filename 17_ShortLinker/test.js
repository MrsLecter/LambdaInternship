require("dotenv").config();
let list = [
  {
    id: 12,
    email: "newuser@email.com",
    url: "https://www.youtube.com/watch?v=2YlALJP9tYI",
    url_shorted: "cX0pyCWq4",
  },
  {
    id: 13,
    email: "newuser@email.com",
    url: "https://www.youtube.com/",
    url_shorted: "Uq7uKKzg1",
  },
  {
    id: 14,
    email: "newuser@email.com",
    url: "https://sematext.com/blog/node-js-error-handling/",
    url_shorted: "hk9FYjDdD",
  },
];

let prettied = list.map((obj) => {
  return {
    url_original: obj.url,
    url_shorted: `http://${process.env.HOST}:${process.env.PORT}/${obj.url_shorted}`,
  };
});
console.log(prettied);
