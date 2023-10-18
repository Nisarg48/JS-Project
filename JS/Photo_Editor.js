// JavaScript For Insert Image In input Tag.
// Click On "Choose Image" Button Will Open Directory For Choose Image.
let choose_image_button = document.querySelector(".choose_image button");
let choose_image_input = document.querySelector(".choose_image input");
let imgSrc = document.querySelector(".insert_image img");

choose_image_button.addEventListener("click", () => choose_image_input.click());

// Insert That Image At ".insert_image img" 
choose_image_input.addEventListener("change", () => {
    console.log(choose_image_input.files);
    console.log(choose_image_input.files[0]);

    let file = choose_image_input.files[0];
    if(!file)
    {
        return;
    }
    imgSrc.src = URL.createObjectURL(file);
})

// Make filter_icon active
// Change Text Of Slider
let filter_icon_buttons = document.querySelectorAll(".filter_icon_buttons button");
let filter_name = document.querySelector(".filter_info .name");
let slider_value = document.querySelector(".filter_info .value");

filter_icon_buttons.forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        element.classList.add("active");
        filter_name.innerText = element.id; 
    });
});





