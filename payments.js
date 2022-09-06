let billAmtInput = document.getElementById('billAmt');
let tipAmtInput = document.getElementById('tipAmt');
let paymentForm = document.getElementById('paymentForm');

let paymentTbody = document.querySelector('#paymentTable tbody');
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

let allPayments = {};
let paymentId = 0;

paymentForm.addEventListener('submit', submitPaymentInfo);

// Add a curPayment object to allPayments, update html and reset input values
function submitPaymentInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let curPayment = createCurPayment();

  if (curPayment) {
    paymentId += 1;

    allPayments['payment' + paymentId] = curPayment;

    appendPaymentTable(curPayment);
    updateServerTable();
    updateSummary();

    billAmtInput.value = '';
    tipAmtInput.value = '';
  }
}

// createCurPayment() will return undefined with negative or empty inputs
// positive billAmt is required but tip can be 0
function createCurPayment() {
  let billAmt = billAmtInput.value;
  let tipAmt = tipAmtInput.value;

  if (billAmt === '' || tipAmt === '') return;

  if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
    return {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    }
  }
}

// Create table row element and pass to appendTd with input value
function appendPaymentTable(curPayment) {
  let newTr = document.createElement('tr');
  newTr.id = 'payment' + paymentId;

  appendTd(newTr, '$' + curPayment.billAmt);
  appendTd(newTr, '$' + curPayment.tipAmt);
  appendTd(newTr, curPayment.tipPercent + '%');

  //adding delete button to the new row
  appendDeleteBtn(newTr);

 paymentTbody .append(newTr);
}

// Create table row element and pass to appendTd with calculated sum of all payment
function updateSummary() {
  let tipPercentAvg;
  let paymentTotal = sumPaymentTotal('tipPercent');
  let numberOfPayments = Object.keys(allPayments).length;

  if (paymentTotal === 0 && numberOfPayments === 0) {
    tipPercentAvg = 0;
  } else {
    tipPercentAvg = paymentTotal / Object.keys(allPayments).length;
  }

  summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
  summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
  summaryTds[2].innerHTML =  Math.round(tipPercentAvg) + '%';
}


//remove the payment table row if X button is clicked
paymentTable.addEventListener('click', function(e){
  if(e.target.tagName === 'BUTTON') {

    e.target.parentElement.remove();
  }});





  //remove the payment table row if X button is clicked
paymentTable.addEventListener('click', function(e){
	if(e.target.tagName === 'BUTTON') {
    //define variable for the button's associated payment id
    let deletePayment = e.target.className;
   
    //keeping track of place in foor loop
    let keymarker=0

    for (let key in allPayments) {
      //defining variable for the current payment object
      let curPayment = allPayments[key];
      //defining array for the allPayments properties
      let paymentArray = Object.keys(allPayments);
      //if the current payment matches the class on the delete button
      if (paymentArray[keymarker] === deletePayment) {
        //remove the payment property from the payment object
      delete allPayments[paymentArray[keymarker]];
      
      } else {
        //check the next server
        keymarker += 1;
      }};
    
       //remove the row associated with the button
		e.target.parentElement.remove();
  }});