describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
    
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    //Should expect there to be only 1 key-pair values in the allServers object
    expect(Object.keys(allServers).length).toEqual(1);
    //Should expect that the sever name for the server ID to be Alice
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should clear the serverNameInput', function() {
    submitServerInfo();
    //Should epect the server name input box to be cleared
    expect(serverNameInput.value).toEqual('');
  });

  it ('should update the new id to "server1"', function() {
  updateServerTable();
  submitServerInfo();
  //locate the tr element created for the server 
  const newRow = document.querySelector('#serverTable tbody tr');
  //should expect the new tr element created for server to have an id of"server1"
  expect(newRow.getAttribute('ID')).toEqual('server1');
  });


  afterEach(function() {
    // teardown logic
  //remove the row element from the server table
    serverTbody.innerHTML = '';
      //Clear the allServers object and set serverID back to 0
    allServers={};
    serverID= 0;
   

  });
});
