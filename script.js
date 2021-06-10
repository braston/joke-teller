const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Setup Text to Speech API
const ttsKey = '62222fa43592476e88eb8116aaaf6a92';
let ttsText = '';
const jokeURL = 'https://official-joke-api.appspot.com/random_joke';

// Disable / Enable Button when audio is playing
function toggleButton (){
    button.disabled = !button.disabled;
}

// Convert text to speech and play audio
function tellJoke(){
    VoiceRSS.speech({
        key: ttsKey,
        src: ttsText,
        hl: 'en-au',
        v: 'Isla',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false 
    });
}

// Retrieve random joke from Joke API
async function getJoke(){
    try{
        const response = await fetch(jokeURL);
        const data = await response.json();
        ttsText = `${data.setup}       ${data.punchline}`;
        toggleButton();
        tellJoke();
    } catch (error) {
        console.log('Unable to fetch Joke!', error);
    }
}

// Important Note!!! When using the event listener command:
// DON'T CALL THE FUNCTION (IE SEE BELOW)
//button.addEventListener("click", getJoke());
// INSTEAD, REFER TO FUNCTION NAME:
button.addEventListener("click", getJoke);
audio.addEventListener('ended', toggleButton);


