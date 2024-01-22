function checkOrderProcessing(takeOutOrders, dineInOrders, servedOrders) {
  let takeOutIndex = 0;
  let dineInIndex = 0;

  for (let i = 0; i < servedOrders.length; i++) {
    const currentOrder = servedOrders[i];

    if (
      takeOutIndex < takeOutOrders.length &&
      takeOutOrders[takeOutIndex] === currentOrder
    ) {
      takeOutIndex++;
    } else if (
      dineInIndex < dineInOrders.length &&
      dineInOrders[dineInIndex] === currentOrder
    ) {
      dineInIndex++;
    } else {
      return false;
    }
  }

  return true;
}

// Contoh penggunaan
const takeOutOrders = [1, 3, 5];
const dineInOrders = [2, 4, 6];
const servedOrders = [1, 2, 4, 6, 5, 3];

console.log(checkOrderProcessing(takeOutOrders, dineInOrders, servedOrders));

// Output: false

const takeOutOrdersValid = [17, 8, 24];
const dineInOrdersValid = [12, 19, 2];
const servedOrdersValid = [17, 8, 12, 19, 24, 2];

console.log(
  checkOrderProcessing(takeOutOrdersValid, dineInOrdersValid, servedOrdersValid)
);

// Output: true
