let serverNameInput = document.getElementById('serverName');
let serverForm = document.getElementById('serverForm');

let serverTbody = document.querySelector('#serverTable tbody');

let allServers = {};
let serverId = 0;

serverForm.addEventListener('submit', submitServerInfo);

// create server object and add to allServers, update html and reset input
function submitServerInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let serverName = serverNameInput.value;

  if (serverName !== '') {
    serverId++;
    allServers['server' + serverId] = { serverName };

    updateServerTable();

    serverNameInput.value = '';
  }
}

// Create table row element and pass to appendTd function with input value
function updateServerTable() {
  serverTbody.innerHTML = '';

  for (let key in allServers) {
    let curServer = allServers[key];

    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);

    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;

    appendTd(newTr, curServer.serverName);
    appendTd(newTr, '$' + tipAverage.toFixed(2));

    //adding delete button to the new row
    appendDeleteBtn(newTr)

    serverTbody.append(newTr);
    
  }
}


//remove the server table row if X button is clicked
serverTable.addEventListener('click', function(e){
	if(e.target.tagName === 'BUTTON') {
    //define variable for the button's associated server name id

    let deleteServer = e.target.className;
   
    //keeping track of place in foor loop
    let keymarker=0

    for (let key in allServers) {
      //defining variable for the current server object
      let curServer = allServers[key];
      //defining array for the allServers properties
      let serverArray = Object.keys(allServers);
      //if the current server name matches the class on the delete button
      if (serverArray[keymarker] === deleteServer) {
 
        //remove the server property associated with the server name
      delete allServers[serverArray[keymarker]];

      } else {
        //check the next server
        keymarker += 1;
      }};
    
       //remove the row associated with the button
		e.target.parentElement.remove();
  }});

 