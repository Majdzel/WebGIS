function mode() {
    let body = document.body;
    let topL = document.getElementById("topL")
    let topR = document.getElementById("topR")

    body.classList.toggle("dark-mode");
    topL.classList.toggle("topL-dark");
    topR.classList.toggle("topR-dark");
  }