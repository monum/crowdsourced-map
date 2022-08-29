// let uri = encodeURIComponent(
//   `AND(AND({Neighborhood} = 'Bay Village', {Title} = 'This new Project'), AND({Neighborhood} = 'Bay Village', {Title} = 'This new Project'))`
// );

// uri = encodeURIComponent(`OR({Neighborhood} = 'Bay Village')`);

// console.log(uri);
// console.log("".toString());
// `filterByFormula=NOT%28%7Bimage%7D%20%3D%20%27%27%29`;
// const intervals = [
//   { label: "year", seconds: 31536000 },
//   { label: "month", seconds: 2592000 },
//   { label: "day", seconds: 86400 },
//   { label: "hour", seconds: 3600 },
//   { label: "minute", seconds: 60 },
//   { label: "second", seconds: 1 },
// ];

// const timeSince = (date) => {
//   const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
//   const interval = intervals.find((i) => i.seconds < seconds);
//   const count = Math.floor(seconds / interval.seconds);
//   return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
// };

// const month = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sept",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// const writeDate = (date) => {
//   const dateString = `${date.getDate()} ${
//     month[date.getMonth()]
//   } ${date.getFullYear()}`;

//   return dateString;
// };

// const timeStamp = new Date().getTime();
// console.log(writeDate(new Date()));
// console.log(timeSince(new Date(1658606984)));

// 1659212055241

const formula = `NOT({Approved} = '')`;
console.log(encodeURIComponent(formula));
