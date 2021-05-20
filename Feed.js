function checkCookie(){
	var username = "";
	if(getCookie("username")==false){
		window.location = "login.html";
	}
}

checkCookie();
window.onload = pageLoad;

function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

//   pop up
function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
  }


function pageLoad(){
    document.getElementById('postbtn').onclick = getData;

    document.getElementById('ImgProfile').onclick = fileUpload;
    document.getElementById('fileField').onchange = fileSubmit;
    
    var username = getCookie('username');
    document.getElementById('username').innerHTML = username;

	  showImg(getCookie('img'));
    readpost();
  }

  function getData(){
    var message = document.getElementById('post').value;
    document.getElementById('post').value = "";
    writepost(message);
  }

  function fileUpload(){
	document.getElementById('fileField').click();
  }

  function fileSubmit(){
    document.getElementById('formId').submit();
  }

  function showImg(filename){
    console.log(filename);
    if (filename !==""){
      // var showpic = document.getElementById('ImgProfile');
      // showpic.innerHTML = "";
      // var temp = document.createElement("img");
      // temp.src = filename;
      // showpic.appendChild(temp);
      var newpic = document.getElementById('ImgProfile')
      newpic.src = filename;

    }
  }

  async function readpost(){
    const response = await fetch("/readpost");
    const content = await response.json();
    showpost(content);
  }

  async function writepost(message){
    console.log("Send txt to server");
    const response = await fetch("/writepost",{
      method: "POST",
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
       post:message})
    })
    const content = await response.json();
    console.log(content)
    showpost(content);
  }

  function showpost(data){
    var keys = Object.keys(data);
    var divTag = document.getElementById("feedpost_container");
    divTag.innerHTML = "";
    for (var i = keys.length-1; i >=0 ; i--) {

      var createbox = document.createElement("div");
      createbox.className = "SocialBox"

      divTag.appendChild(createbox);
      var name = document.createElement("h5");
      name.className = "name";
      name.innerHTML = data[keys[i]]["username"];
      createbox.appendChild(name);

      var txtinnerbox = document.createElement("div");
      txtinnerbox.className = "postmessage";

      txtinnerbox.innerHTML = data[keys[i]]["post"];
      
      createbox.appendChild(txtinnerbox);

      var Pic = document.createElement("img");
      Pic.className = "Picinpostbox";
      Pic.src = getCookie('img');
      createbox.appendChild(Pic);
      
    }
  }