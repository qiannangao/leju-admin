function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const orderBackData = []
for (let i = 1; i < 50; i++) {
  orderBackData.push({
    // date: '2023-05-' + (i > 9 ? i : '0' + i),
    date: 'date' + i,
    order: randomNum(80, 500),
    returnNum: randomNum(10, 100)
  })
}
console.log(orderBackData)
export default orderBackData
