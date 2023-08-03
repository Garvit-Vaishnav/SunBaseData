var data= "";
function AcessToken(){
    var data = {
        "login_id" : "test@sunbasedata.com",
        "password" : "Test@123"
    };
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("POST", "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp");
    xhr.setRequestHeader("Content-Type", "text/plain");
    var Acess_Token = xhr.send(data);
    data= Acess_Token.acess_Token
   console.log(data);
}

// Get customer list:-----------------------
  function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp");
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['id']+'</td>';
          trHTML += '<td>'+object['fname']+'</td>';
          trHTML += '<td>'+object['lname']+'</td>';
          trHTML += '<td>'+object['Address']+'</td>';
          trHTML += '<td>'+object['city']+'</td>';
          trHTML += '<td>'+object['state']+'</td>';
          trHTML += '<td>'+object['email']+'</td>';
          trHTML += '<td>'+object['phone']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['id']+')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();



// Create new customer-----------------------------------
  function showUserCreateBox() {
    Swal.fire({
      title: 'Customer Details',
      html:
        '<input id="id" type="hidden">' +
        '<input id="fname" class="swal2-input" placeholder="First Name">' +
        '<input id="lname" class="swal2-input" placeholder="Last Name">' +
        '<input id="Address" class="swal2-input" placeholder="Address">' +
        '<input id="city" class="swal2-input" placeholder="city">'+
        '<input id="state" class="swal2-input" placeholder="state">'+
        '<input id="email" class="swal2-input" placeholder="email">'+
        '<input id="phone" class="swal2-input" placeholder="phone">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
 }
  
  function userCreate() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const Address = document.getElementById("Address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp");
    xhttp.setRequestHeader("Authorization", "dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=");
    xhttp.send(JSON.stringify({ 
      "fname": fname, "lname": lname, "Address": Address, "city": city, "state": state, "email": email, "phone": phone
      
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
}


// Update customer--------------------------

function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.mecallapi.com/api/users/"+id);
    xhttp.send(data);
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects['user'];
        console.log(user);
        Swal.fire({
          title: 'Edit User',
          html:
            '<input id="id" type="hidden" value='+user['id']+'>' +
            '<input id="fname" class="swal2-input" placeholder="First Name">' +
            '<input id="lname" class="swal2-input" placeholder="Last Name">' +
            '<input id="Address" class="swal2-input" placeholder="Address">' +
            '<input id="city" class="swal2-input" placeholder="city">'+
            '<input id="state" class="swal2-input" placeholder="state">'+
            '<input id="state" class="swal2-input" placeholder="email">'+
            '<input id="state" class="swal2-input" placeholder="phone">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          }
        })
      }
    };
  }
  
  function userEdit() {
    const id = document.getElementById("id").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const Address = document.getElementById("Address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp");
    xhttp.setRequestHeader("Authorization", "dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=");
    xhttp.send(JSON.stringify({ 
      "id": id, "fname": fname, "lname": lname, "username": username, "email": email, 
      "avatar": "https://www.mecallapi.com/users/cat.png"
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }


// Delete customer-------------------------------------------

function userDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp");
    xhttp.setRequestHeader("Authorization", "dGVzdEBzdW5iYXNlZGF0YS5jb206VGVzdEAxMjM=");
    xhttp.send(JSON.stringify({ 
      "fname": fname
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      } 
    };
  }
