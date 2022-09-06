describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
      billAmtInput.value = 20;
      tipAmtInput.value = 4;
      
    });
  //testing createCurPayment function
    it('should return an object with key values equal to the input values)', function () {
      expect(createCurPayment()).toEqual({billAmt: '20', tipAmt: '4', tipPercent: 20});
    });


   //testing submitPaymentInfo function
   it('should clear the user input values and adds a new payment)', function () {
    submitPaymentInfo();
    //the user inputs should be cleared
    expect(billAmtInput.value).toEqual("");
    expect(tipAmtInput.value).toEqual("");

    //an array of all of the added payment keys will have a length of 1
    expect(Object.keys(allPayments).length).toEqual(1);

//submitting another payment with user inputs
    billAmtInput.value = 20;
    tipAmtInput.value = 4;
    submitPaymentInfo();
     //an array of all of the added payment keyswill have a length of 2
     expect(Object.keys(allPayments).length).toEqual(2);
  });

  
  //testing appendPaymentTable function
  it('should create a new row with the element id corresponding to payment number)', function () {
    submitPaymentInfo();
    //the element id of the new row should be payment1
    expect(document.querySelector('#paymentTable tbody tr').id).toEqual('payment1');

  });
  
   //testing updateSummary function
   it('should uodate summary table after each payment)', function () {
    submitPaymentInfo();
    expect(summaryTds[0].innerHTML).toEqual('$20');
    expect(summaryTds[1].innerHTML).toEqual('$4');
    expect(summaryTds[2].innerHTML).toEqual('20%');

    billAmtInput.value = 20;
    tipAmtInput.value = 4;
    submitPaymentInfo();
    expect(summaryTds[0].innerHTML).toEqual('$40');
    expect(summaryTds[1].innerHTML).toEqual('$8');
    expect(summaryTds[2].innerHTML).toEqual('20%');
    
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
    });
  });
  