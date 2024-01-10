function plus(event) {
    const eventName = event.srcElement.name;
    console.log(eventName)


    let all = document.getElementsByTagName("*");
    

    for (let i=0, max=all.length; i < max; i++) {
        if (all[i].id === eventName) {

            const element = all[i];
            const num = Number(element.value) + 1;
            element.value = num;

        }
    }
}

function minus(event) {
    const eventName = event.srcElement.name;
    console.log(eventName)

    let all = document.getElementsByTagName("*");
    

    for (let i=0, max=all.length; i < max; i++) {
        if (all[i].id === eventName) {

            const element = all[i];
            const num = Number(element.value) - 1;
            element.value = num;

        }
    }
}

document.onload = loaded();

function loaded() {
    let all = document.getElementsByTagName("*");

    for (let i = 0, max = all.length; i < max; i++) {
        if (all[i].id === "plus") {
            all[i].addEventListener("click", plus);
            all[i].value = 0;
        } else if (all[i].id === "minus") {
            all[i].addEventListener("click", minus);
            all[i].value = 0;
        }
    }
}


