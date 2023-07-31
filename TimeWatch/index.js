const secondsEl = document.querySelector('#seconds')
const tensEl = document.querySelector('#tens')
const startBtn = document.querySelector('#buttonStart')
const stopBtn = document.querySelector('#buttonStop')
const resetBtn = document.querySelector('#buttonReset')

let seconds = 0
let tens = 0
let Interval

startBtn.addEventListener('click', function(){
    Interval = setInterval(startTimer, 10)
}) 

stopBtn.addEventListener('click', function(){
    stopTimer()
})

resetBtn.addEventListener('click', function(){
    stopTimer()
    resetTimer()
})

function startTimer() {
    tens++
    if (tens <= 99) {
        tensEl.innerHTML = tens;
    }
    if (tens > 99) {
        seconds++
        secondsEl.innerHTML = seconds
        tens = 0
        tensEl.innerHTML = tens
    }
}

function stopTimer() {
    clearInterval(Interval)
}

function resetTimer() {
    tens = 0
    seconds = 0
    tensEl.innerHTML = tens
    secondsEl.innerHTML = seconds
}