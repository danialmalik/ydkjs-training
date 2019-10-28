let counter = 0;

function increment(){
    postMessage(counter++);
    setTimeout(increment, 1000)
}

increment()
