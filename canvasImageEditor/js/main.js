const fileInput = document.querySelector('#imageFileInput');
const canvas = document.querySelector('#canvas');
const canvasCtx = canvas.getContext('2d');
const sliderForm = document.getElementById('reset');
const brightnessInput = document.querySelector('#brightness');
const contrastInput = document.querySelector('#contrast');
const saturationInput = document.querySelector('#saturation');
const hueInput = document.querySelector('#hue');
const blurInput = document.querySelector('#blur');
const inversionInput = document.querySelector('#inversion');
const sepiaInput = document.querySelector('#sepia');
const grayscaleInput = document.querySelector('#grayscale');
const opacityInput = document.querySelector('#opacity');


const settings = {};
let image = null;
let File_Name;
let Edited = false;

function resetSettings(){
    settings.brightness = "100";
    settings.contrast = '1';
    settings.saturation = "130";
    settings.hue = '0';
    settings.blur = '0';
    settings.inversion = '0';
    settings.sepia = '0';
    settings.grayscale = '0';
    settings.opacity = '200';

    brightnessInput.value = settings.brightness;
    contrastInput.value = settings.contrast;
    saturationInput.value = settings.saturation;
    hueInput.value = settings.hue;
    blurInput.value = settings.blur;
    inversionInput.value = settings.inversion;
    sepiaInput.value = settings.sepia;
    grayscaleInput.value = settings.grayscale;
    opacityInput.value = settings.opacity;

}
 function updateSettings(key, value){
if (!image) return;
    
    settings[key] = value;
    renderImage();
    
}

function gnerateFilter(){
    const {brightness, contrast, saturation, hue, blur, inversion, sepia, grayscale, opacity } = settings;

    return `brightness(${brightness}%) contrast(${contrast}) saturate(${saturation}%) hue-rotate(${hue}deg) blur(${blur}px) invert(${inversion}) sepia(${sepia}) grayscale(${grayscale}) opacity(${opacity}%)`;
}


function renderImage(){
    canvas.width = image.width;
    canvas.height = image.height;
    canvasCtx.filter= gnerateFilter();
    canvasCtx.drawImage(image, 0, 0);
}

brightnessInput.addEventListener("change",() => updateSettings("brightness", brightnessInput.value));
contrastInput.addEventListener("change",() => updateSettings("contrast", contrastInput.value));
saturationInput.addEventListener("change", () => updateSettings("saturation", saturationInput.value));
hueInput.addEventListener("change", () => updateSettings("hue", hueInput.value));
blurInput.addEventListener("change", () => updateSettings("blur", blurInput.value));
inversionInput.addEventListener("change", () => updateSettings("inversion", inversionInput.value));
sepiaInput.addEventListener("change", () => updateSettings("sepia", sepiaInput.value));
grayscaleInput.addEventListener("change", () => updateSettings("grayscale", grayscaleInput.value));
opacityInput.addEventListener("change", () => updateSettings("opacity", opacityInput.value));

fileInput.addEventListener("change", () => {
   
        image = new Image();
        image.addEventListener('load', () => {
            resetSettings();
            renderImage();
        });
        image.src = URL.createObjectURL(fileInput.files[0]);
        
});

resetSettings();

sliderForm.addEventListener('click', function(){
   
        resetSettings();
        renderImage();

});

function Download_btn(){

	 if(image.getAttribute('src') != ""){

        canvasCtx.drawImage(image,0,0, canvas.width, canvas.height);       
          const jpegUrl = canvas.toDataURL("image/jpg");

		  const link = document.createElement("a");
		  document.body.appendChild(link);

		  link.setAttribute("href",jpegUrl);
		  link.setAttribute("download",File_Name);
		  link.click();
		  document.body.removeChild(link);
 
   }	 	    
   }
