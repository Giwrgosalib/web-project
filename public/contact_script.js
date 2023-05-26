const form = document.getElementById("contactForm"); 

//1.
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
 
  const mail=document.getElementById("mail").value;
  const name=document.getElementById("name").value;
  const message=document.getElementById("message").value;

  //3.
  sendMail(mail, name, message);
})


const sendMail = (email,name,message) => {
    const data = {email,name,message};

    fetch("/send", {
        method: "post", 
        headers: {
            "Content-type": "application/json"},
        body: JSON.stringify(data), 
    }).then((res) =>res.json())
    .then((res)=>{window.location.href = res.url;})
    .catch((error) => { console.log(error)});
  };