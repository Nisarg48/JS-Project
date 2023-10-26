// JavaScript For Insert Image In input Tag.
// Click On "Choose Image" Button Will Open Directory For Choose Image.
let choose_image_button = document.querySelector(".choose_image button");
let choose_image_input = document.querySelector(".choose_image input");
let imgSrc = document.querySelector(".insert_image img");

let filter_icon_buttons = document.querySelectorAll(".filter_icon_buttons button");
let filter_name = document.querySelector(".filter_info .name");
let slider_value = document.querySelector(".filter_info .value");
let slider = document.querySelector(".slider input");

let brightness = 100,
    contrast = 100,
    saturation = 100,
    blur = 0;

let alignment_icon_buttons = document.querySelectorAll(".alignment_icon_buttons button");
let rotate = 0,
    Flip_X = 1,
    Flip_Y = 1;

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
    
    if(SliderState.id === "Blur")
    {
        slider_value.innerText = `${slider.value}px`;
    }

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
alignment_icon_buttons.forEach((element) => {
    element.addEventListener("click", () => {

        if(element.id === "Rotate_Right")
        {
            rotate = 90;

            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            canvas.width = imgSrc.height;
            canvas.height = imgSrc.width;

            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(rotate * (Math.PI / 180));

            ctx.drawImage(imgSrc, -imgSrc.width / 2, -imgSrc.height / 2, imgSrc.width, imgSrc.height);

            let imageURI = canvas.toDataURL("image/jpg");

            imgSrc.src = imageURI;
        }
        else if(element.id === "Flip_X")
        {
            Flip_X = Flip_X === 1 ? -1 : 1;
        }
        else if(element.id === "Flip_Y")
        {
            Flip_Y = Flip_Y === 1 ? -1 : 1;
        }

        imgSrc.style.transform = `scale(${Flip_X}, ${Flip_Y})`;
    });
});

// JavaScript For Reset Image 
let reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
    brightness = "100";
    contrast = "100";
    saturation = "100";
    blur = "0";
    rotate = 0;
    Flip_X = 1;
    Flip_Y = 1;

    for(let element of filter_icon_buttons)
    {
        console.log(element);
        if(element.id === 'Brightness')
        {
            slider_value.innerText = `${brightness}%`;
        }
        else if(element.id === "Contrast")
        {
            slider_value.innerText = `${contrast}%`;
        }
        else if(element.id === "Saturation")
        {
            slider_value.innerText = `${saturation}%`;
        }
        else if(element.id === "Blur")
        {
            slider_value.innerText = `${blur}px`;
        }
    }

    // replace image with its original image
    let file = choose_image_input.files[0];
    if(!file)
    {
        return;
    }
    imgSrc.src = URL.createObjectURL(file);

    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`; 
    imgSrc.style.transform = `rotate(${rotate}deg) scale(${Flip_X}, ${Flip_Y})`;
});

// JavaScript For Save Image
let save = document.querySelector(".save");

save.addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = imgSrc.naturalWidth;
    canvas.height = imgSrc.naturalHeight;

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`; 
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(Flip_X, Flip_Y);
    ctx.drawImage(
        imgSrc,
        -canvas.width / 2, 
        -canvas.height / 2,
        canvas.width, 
        canvas.height
    );

    // Explicitly specify the image format as 'image/png' when calling toDataURL
    const imageURI = canvas.toDataURL('image/jpg');

    // Create an 'a' element to trigger the download
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = imageURI;
    link.click();
});

// JavaScript for Crop and Resize Features
let cropButton = document.querySelector(".crop");
let resizeButton = document.querySelector(".resize");
let cropResizeOptions = document.querySelector(".crop_resize_options");

cropButton.addEventListener("click", () => {
    cropResizeOptions.style.display = "block";
    document.querySelector(".apply_crop").style.display = "block";
    document.querySelector(".apply_resize").style.display = "none";
});

resizeButton.addEventListener("click", () => {
    // replace image with its original image
    let file = choose_image_input.files[0];
    if(!file)
    {
        return;
    }
    imgSrc.src = URL.createObjectURL(file);

    // Apply filters and alignment on image
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`;
    imgSrc.style.transform = `rotate(${rotate}deg) scale(${Flip_X}, ${Flip_Y})`;
});

let applyCropButton = document.querySelector(".apply_crop");
applyCropButton.addEventListener("click", () => {
    let x = Number(document.getElementById("crop_x").value);
    let y = Number(document.getElementById("crop_y").value);
    let width = Number(document.getElementById("crop_width").value);
    let height = Number(document.getElementById("crop_height").value);

    if (!isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height)) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(
            imgSrc,
            x, y, width, height,
            0, 0, width, height
        );

        imgSrc.src = canvas.toDataURL("image/jpg");
        cropResizeOptions.style.display = "none";
    }
});