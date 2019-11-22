console.log('Client side js');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3003/weather?address="texas"').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    fetch(`http://localhost:3003/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = "Current Temp: " + data.temperature + " degC"
                messageTwo.textContent = "Chance of Rain: " +  data.precipProbability + " %"
            }
        })
    })
})