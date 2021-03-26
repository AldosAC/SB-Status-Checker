const data = [
  "hello",
  "test",
  "sbstatus",
  "check",
  "no"
]

module.exports.randomData = () => {
  return data[Math.floor(Math.random() * 5)];
}