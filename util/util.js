require("dotenv").config();

exports.logExceptOnTest = (string) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(string);
  }
};
