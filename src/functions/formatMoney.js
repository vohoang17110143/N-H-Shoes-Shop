export const formatMoney = (money) => {
  var sMoney = money.toString();
  var output = [];
  for (let index = 0; index < sMoney.length; index++) {
    output.push(sMoney[index]);
  }
  for (let index = output.length - 3; index > 0; index -= 3) {
    output.splice(index, 0, ".");
  }
  return output;
};
