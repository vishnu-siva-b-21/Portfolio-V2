emailjs.init("Eos5CN8Xqe55EDPdz");

document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = validateContactForm();
  if (isValid) {
    sendEmail();
  }
});

function validateContactForm() {
  let isValid = true;

  // Name validation
  const name = document.getElementById("name");
  const nameError = document.getElementById("name-error");
  if (name.value.trim() === "") {
    nameError.innerText = "Name is required";
    name.classList.add("error");
    name.style.borderColor = "red";
    isValid = false;
  } else {
    nameError.innerText = "";
    name.classList.remove("error");
    name.style.borderColor = "";
  }

  // Email validation
  const email = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.innerText = "Invalid email address";
    email.classList.add("error");
    email.style.borderColor = "red";
    isValid = false;
  } else {
    emailError.innerText = "";
    email.classList.remove("error");
    email.style.borderColor = "";
  }

  // Services validation
  const services = document.querySelectorAll("input[type=checkbox]:checked");
  const servicesError = document.getElementById("services-error");
  if (services.length === 0) {
    servicesError.innerText = "At least one service must be selected";
    document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
      //                    checkbox.classList.add('error');
      //                    checkbox.style.borderColor = 'red';
    });
    isValid = false;
  } else {
    servicesError.innerText = "";
    document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
      checkbox.classList.remove("error");
      checkbox.style.borderColor = "";
    });
  }

  // Message validation
  const message = document.getElementById("message");
  const messageError = document.getElementById("message-error");
  if (message.value.trim() === "") {
    messageError.innerText = "Message is required";
    message.classList.add("error");
    message.style.borderColor = "red";
    isValid = false;
  } else {
    messageError.innerText = "";
    message.classList.remove("error");
    message.style.borderColor = "";
  }
  return isValid;
}

function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const services = [];

  document
    .querySelectorAll("input[type=checkbox]:checked")
    .forEach((checkbox) => {
      services.push(
        checkbox.nextElementSibling.querySelector(".form-check-label-text")
          .textContent
      );
    });

  const service = services.join(", ");

  let templateParams = {
    from_name: name,
    email: email,
    service: service,
    message: message,
  };

  const service_id = "service_btw9e5e";
  const template_id = "template_6xd9qcb";
  const publicKey = "Eos5CN8Xqe55EDPdz";

  emailjs
    .send(service_id, template_id, templateParams, publicKey)
    .then((response) => {
      Swal.fire({
        title: "Email sent successfully!",
        text: "Thanks for reaching out",
        icon: "success",
      }).then(() => {
        // Reset form fields
        document.getElementById("contact-form").reset();
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "Email could not be sent!",
        text: "Please try again one more time",
        icon: "error",
      });
    });

  console.log(templateParams);
}
