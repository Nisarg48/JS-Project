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
let slider = document.querySelector(".slider input");

let brightness = 100,
    contrast = 100,
    saturation = 100,
    blur = 0;

filter_icon_buttons.forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        element.classList.add("active");
        filter_name.innerText = element.id; 

        if(element.id === 'Brightness')
        {
            slider.max = "200";
            slider.value = brightness;
            slider_value.innerText = `${brightness}%`;
        }
        else if(element.id === "Contrast")
        {
            slider.max = "200";
            slider.value = contrast;
            slider_value.innerText = `${contrast}%`;
        }
        else if(element.id === "Saturation")
        {
            slider.max = "200";
            slider.value = saturation;
            slider_value.innerText = `${saturation}%`;
        }
        else if(element.id === "Blur")
        {
            slider.max = "100";
            slider.value = blur;
            slider_value.innerText = `${blur}px`;
        }
    });
});

slider.addEventListener("input", () => {
    slider_value.innerText = `${slider.value}%`;
    let SliderState = document.querySelector(".filter_icon_buttons .active");
    if(SliderState.id === "Brightness")
    {
        brightness = slider.value;
    }
    else if(SliderState.id === "Contrast")
    {
        contrast = slider.value;
    }
    else if(SliderState.id === "Saturation")
    {
        saturation = slider.value;
    }
    else if(SliderState.id === "Blur")
    {
        blur = slider.value;
    }

    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`; 
});

// Add JavaScript On Alignment icons
let alignment_icon_buttons = document.querySelectorAll(".alignment_icon_buttons button");
let rotate = 0,
    Flip_X = 1,
    Flip_Y = 1;
alignment_icon_buttons.forEach((element) => {
    element.addEventListener("click", () => {
        if(element.id === "Rotate_Left")
        {
            rotate -= 90;
        }
        else if(element.id === "Flip_X")
        {
            Flip_X = Flip_X === 1 ? -1 : 1;
        }
        else if(element.id === "Flip_Y")
        {
            Flip_Y = Flip_Y === 1 ? -1 : 1;
        }

        imgSrc.style.transform = `rotate(${rotate}deg) scale(${Flip_X}, ${Flip_Y}))`;
    });
});


