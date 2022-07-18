const date = {
  obj: "",
};

date.obj = new Date().toLocaleDateString("en-US", {
  timeZone: "America/New_York",
});
console.log(date.obj);
