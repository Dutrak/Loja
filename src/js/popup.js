const toggleBlur = () => {
  const blur = document.querySelector("#blur");
  blur.classList.toggle("active");

  const popup = document.querySelector(".formulario");
  popup.classList.toggle("active");
};