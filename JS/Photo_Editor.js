// JavaScript For Insert Image In input Tag.
// Click On "Choose Image" Button Will Open Directory For Choose Image.
let choose_image_button = document.querySelector(".choose_image button");
let choose_image_input = document.querySelector(".choose_image input");
choose_image_button.addEventListener("click", () => choose_image_input.click());
