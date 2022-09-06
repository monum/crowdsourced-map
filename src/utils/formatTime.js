const intervals = [
  { label: "year", seconds: 31536000 },
  { label: "month", seconds: 2592000 },
  { label: "day", seconds: 86400 },
  { label: "hour", seconds: 3600 },
  { label: "minute", seconds: 60 },
  { label: "second", seconds: 1 },
];

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const formatTime = (dateNum) => {
  const date = new Date(dateNum);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds > 2592000) {
    const dateString = `${date.getDate()} ${
      month[date.getMonth()]
    } ${date.getFullYear()}`;

    return dateString;
  }
  const interval = intervals.find((i) => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
};

export default formatTime;
