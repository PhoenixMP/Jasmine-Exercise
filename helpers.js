
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

//adds a delete button at the end of an inputted row
function appendDeleteBtn(tr) {
  const deleteBtn = document.createElement('BUTTON');
  deleteBtn.innerText ='X'
   //assigning the corresponding row id to the delete button element class name
  deleteBtn.className = tr.id;
  tr.append(deleteBtn);
  
}
