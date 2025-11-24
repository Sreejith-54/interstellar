let current_image = document.getElementById('daily-image');
let current_date = document.getElementById("today's-date");
let current_explaination = document.getElementById('daily-explanation');
let specific_event = document.getElementById('particular-event');
let gallery = document.getElementById('all-images');

const api_url = 'https://api.nasa.gov/planetary/apod?api_key=BJfQOMqQG2SL2jbUcXfOWP8OrgjgOzXWspoMuwTG';
const api_key = 'BJfQOMqQG2SL2jbUcXfOWP8OrgjgOzXWspoMuwTG';

async function load() {
    try{
        let response = await fetch(api_url,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${api_key}`
            }
        })
        if (response.ok){
            let daily_content = await response.json();
            console.log('content',daily_content);
            current_image.src=daily_content.hdurl;
            current_image.alt=daily_content.title;
            current_date.textContent=daily_content.date;
            current_explaination.textContent=daily_content.explanation;
        }
        else{
            console.log('error');
        }
    }
    catch(error){
        console.log('error',error);
    }
}
async function images(){
    try{
        let img_response = await fetch(`https://api.nasa.gov/planetary/apod?count=12&api_key=BJfQOMqQG2SL2jbUcXfOWP8OrgjgOzXWspoMuwTG`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${api_key}`
            }
        })
        if (img_response.ok){
            let images = await img_response.json();
            images.forEach(image => {
                console.log('image',image);
                let image_container = document.createElement('img');
                image_container.className= "gallery_image";
                image_container.src=image.url;
                image_container.alt=image.title;
                gallery.append(image_container);
            });

        }
    }
    catch(error){
        console.log('error',error)
    }
}
async function specific_event_info(value){
    let date = value.value;
    console.log('date',value);
    try{
        let specific_event_response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=BJfQOMqQG2SL2jbUcXfOWP8OrgjgOzXWspoMuwTG`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${api_key}`
            }
        })
        if (specific_event_response.ok){
            document.getElementById('particular-event-img').style.display='block';
            let specific_event_data = await specific_event_response.json();
            console.log('data',specific_event_data)
            document.getElementById('particular-event-img').src=specific_event_data.url;
            document.getElementById('particular-event-img').alt=specific_event_data.title;
            document.getElementById('particular-event-explanation').textContent=specific_event_data.explanation;
            window.scrollTo({top:750,behavior:"smooth"})
        }
    }
    catch(error){
        console.log('error',error)
    }
}

function scroll1(){
    scrollTo({top:0,behavior:"smooth"})
}
load();
images();