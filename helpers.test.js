describe("Helpers test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
      billAmtInput.value = 20;
      tipAmtInput.value = 4;
      submitPaymentInfo();
    });
  
    //testing function sumPaymentTotal
    it('should give back a sumPaymentTotal return value equal to the corresponding input amounts', function () {
     //we expect to get the total tip amount equal to the initial tip amount of $4
      expect(sumPaymentTotal('tipAmt')).toEqual(4);
       //we expect to get the total bill amount equal to the initial bill amount of $20
      expect(sumPaymentTotal('billAmt')).toEqual(20);
      //we expect to get the tip percent based on the initial bill and tip values, 20%
      expect(sumPaymentTotal('tipPercent')).toEqual(20);

      //submitting a new set of bill and tip inputs
      billAmtInput.value = 20;
      tipAmtInput.value = 4;
      submitPaymentInfo();

      //we expect to get the total tip amount equal to the sum of inital+new tip, $8
      expect(sumPaymentTotal('tipAmt')).toEqual(8);
       //we expect to get the total bill amount equal to the sum of initial+new bill, $40
      expect(sumPaymentTotal('billAmt')).toEqual(40);
      //we expect to get the tip percent amount equal to the sum of the initial+new tip%, 40%
      expect(sumPaymentTotal('tipPercent')).toEqual(40);
    ;
    });

    //testing function calculateTipPercent
  it('should give back a calculated tip % based on bill and tip amount', function () {
    //a bill of $100 with a $3 tip should give a 3% tip percent
    expect(calculateTipPercent(100,3)).toEqual(3);

  });

  //testing function appendTd
  it('should append a new td element with assigned value to the end of the specified element', function () {
    //create a new element tr
    const newTr = document.createElement('tr');
    //add an id of "payment 7" to the new tr element
    newTr.id = 'payment' + 7; 
    //append the new tr element to the paymentTbody element (defined in payments.js code)
    paymentTbody.append(newTr);
    //run the appendTd function to append a new td with text "do I exist" into the tr element just created/appended to paymentBody
    appendTd(newTr, 'do I exist?');
    //locate the newTr element via the 'payment7' id, and access it's first child inner text. The text should be equal to "do I exist?"
    expect(document.getElementById('payment7').firstElementChild.innerText).toEqual('do I exist?');

  });

    //testing the appendDeleteBtn function I added
    it ('add a new button labeled X with a class name that matches the row id', function() {
      serverNameInput.value = 'Alice';
      submitServerInfo();
      const paymentRow = document.querySelector('#paymentTable tbody tr');
      const serverRow = document.querySelector('#serverTable tbody tr');
      expect(paymentRow.lastChild.innerText).toEqual('X');
      expect(paymentRow.id).toEqual(paymentRow.lastChild.className);
      expect(serverRow.lastChild.innerText).toEqual('X');
      expect(serverRow.id).toEqual(serverRow.lastChild.className);


      });



    afterEach(function() {
      // teardown logic
      // setting the user input value back to blank
  billAmtInput.value = '';
  tipAmtInput.value = '';
  //re-intializing the allPayments Object and paymentID back to zero
  allPayments = {}, 
  paymentId = 0;
  //clearing the contents of the summary table and payment table 
  const summaryTable = document.querySelector('#summaryTable tbody');
  summaryTable.innerHTML='';
  const paymentTable = document.querySelector('#paymentTable tbody');
  paymentTable.innerHTML='';

    //remove the row element from the server table
    serverTbody.innerHTML = '';
      //Clear the allServers object and set serverID back to 0
    allServers={};
    serverID= 0;
  
    });
  });
  