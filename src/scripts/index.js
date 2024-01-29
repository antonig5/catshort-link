document.getElementById("urlForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const url = document.getElementById("url").value;
  const custom = document.getElementById("custom").value;

  const data = { url: url, custom: custom };

  fetch("https://api-link-pwcl.onrender.com/api", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        var alertElement = document.getElementById("alert-error");
        alertElement.style.display = "block"; // Mostrar el alert
        setTimeout(function () {
          alertElement.style.top = "10px"; // Mover hacia abajo para la animación
        }, 10);

        // Ocultar el alert y restablecer la posición después de 3 segundos
        setTimeout(function () {
          alertElement.style.top = "-152px"; // Mover hacia arriba
          setTimeout(function () {
            alertElement.style.display = "none";
          }, 500); // Esperar a que termine la animación para ocultar
        }, 3000);
      } else {
        console.log("Success:", data);
        document.getElementById("response").innerHTML =
          "<a class='form-a' target='_blank' href='" +
          data.shortUrl +
          "'>" +
          data.shortUrl +
          "</a>";
        document.getElementById("copy").disabled = false;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

document.getElementById("copy").addEventListener("click", async function (e) {
  e.preventDefault();

  try {
    let text = document
      .getElementById("response")
      .innerHTML.replace(/<[^>]*>/g, "");

    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard: ", text);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
});

document.getElementById("copy").addEventListener("click", function () {
  var alertElement = document.getElementById("alert");
  alertElement.style.display = "block"; // Mostrar el alert
  setTimeout(function () {
    alertElement.style.top = "10px"; // Mover hacia abajo para la animación
  }, 10);

  // Ocultar el alert y restablecer la posición después de 3 segundos
  setTimeout(function () {
    alertElement.style.top = "-152px"; // Mover hacia arriba
    setTimeout(function () {
      alertElement.style.display = "none";
    }, 500); // Esperar a que termine la animación para ocultar
  }, 3000);
});
