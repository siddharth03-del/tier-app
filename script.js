let currentdraggeditem;
function createtierlist(tierna){
    console.log("button clicked");
    const tierlist = document.createElement('div');
    const bigdiv = document.createElement('div');
tierlist.classList.add('tier-design');
const tierheading = document.createElement('h1');
const delbutton = document.createElement('button');
const headingdiv = document.createElement('div');
const imageplacediv = document.createElement('div');
imageplacediv.classList.add('image-placed-div');
delbutton.classList.add('del-button');
bigdiv.classList.add('big-div');
delbutton.textContent = 'delete';
tierheading.textContent = tierna;
tierheading.classList.add('tier-design-h1');
headingdiv.appendChild(tierheading);
tierlist.appendChild(headingdiv);
tierlist.appendChild(imageplacediv);
const colorinput = document.getElementById('color-selector');
tierheading.style.background = colorinput.value;
bigdiv.appendChild(tierlist);
bigdiv.appendChild(delbutton);
const tierlistsec = document.getElementById("tier-list-section");
tierlistsec.appendChild(bigdiv);
delbutton.addEventListener('click',(event)=>{
    deletetier(event.target.parentNode);
})
setupdropzone(imageplacediv);
}
const submitbtn = document.getElementById("input-button");
submitbtn.addEventListener('click', (event)=>{
    const tiername = document.getElementById("input-box");
    if(tiername.value === ""){
        alert("Tier name cannot be empty");
    }
    else{
        createtierlist(tiername.value);
    }
    tiername.value = "";
})
function createimage(url){
    const imagediv = document.createElement('div');
    const img = document.createElement('img');
    img.src = url;
    imagediv.classList.add('image-div-design');
    img.classList.add('image-design');
    imagediv.setAttribute('draggable', 'true');
    imagediv.appendChild(img);
    const imagesection = document.getElementById('non-tier-list-section');
    imagesection.appendChild(imagediv);
    setupimagedivfordrag(imagediv);
    removefromtierlist(imagediv);
}
const imagesubmit = document.getElementById('img-bt')
imagesubmit.addEventListener('click', ()=>{
    const image = document.getElementById('image-input');
    if(image.value === ''){
        alert("Please enter the url");
    }
    else{
        createimage(image.value);
    }
    image.value = "";
})
function setupimagedivfordrag(item){
    item.addEventListener('dragstart', (event)=>{
        currentdraggeditem = event.target.parentNode;
    })
}
function setupdropzone(tierlist){
    tierlist.addEventListener('drop', (event)=>{
        console.log("drop");
        event.preventDefault();
    }
    )
    tierlist.addEventListener('dragover',function (event){
        if(this !== currentdraggeditem.parentNode){
            event.target.appendChild(currentdraggeditem);
            console.log("successfully placed");
        }
    })
}
function removefromtierlist(imagediv){
    imagediv.addEventListener('dblclick', ()=>{
        imagediv.parentNode.removeChild(imagediv);
        const imagesection = document.getElementById('non-tier-list-section');
        imagesection.appendChild(imagediv);
    }
    )
}
function deletetier(bigdiv){
    const tierlist = bigdiv.children[0];
    const section = document.getElementById('tier-list-section');
    const imagesection = document.getElementById('non-tier-list-section');
    const imagedivs = tierlist.children;
    console.log(imagedivs.length);
    console.log(imagedivs);
    while(imagedivs.length!=1){
        const image = imagedivs[1];
        tierlist.removeChild(image);
        imagesection.appendChild(image);
    }
    section.removeChild(bigdiv);
}