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
      console.log("Success:", data);
      document.getElementById("response").innerHTML =
        "<a class='form-a' target='_blank' href='" +
        data.shortUrl +
        "'>" +
        data.shortUrl +
        "</a>";
      document.getElementById("copy").disabled = false;
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
