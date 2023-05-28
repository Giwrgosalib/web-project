const form = document.getElementById("contactForm"); 

//submit event
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
 
  const mail=document.getElementById("mail").value;
  const name=document.getElementById("name").value;
  const message=document.getElementById("message").value;

  //send mail
  sendMail(mail, name, message);
})

//send mail info to server using Promise
const sendMail = (email,name,message) => {
    const data = {email,name,message};

    fetch("/send", {
        method: "post", 
        headers: {
            "Content-type": "application/json"},
        body: JSON.stringify(data), 
    }).then((res) =>res.json())
    .catch((error) => { console.log(error)});
  };