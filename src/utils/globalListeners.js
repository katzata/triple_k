const events = {
    click: [],
    mouseenter: [],
    mouseleave: [],
}

window.addEventListener("click", (e) => {
    const count = events.click.length;
    const { target } = e;

    for (let i = 0; i < count; i++) {
        if (events.click[i].identifier === target.id || events.click[i].identifier === target.className ||
            events.click[i].identifier === target.parentElement.id || events.click[i].identifier === target.parentElement.className
            ) {
            console.log("x", events.click[i].identifier);
            events.click[i].eventHandler();
            break;
        };
    };
    // events.mouseenter.filter(el => el.class === )
});

window.addEventListener("mouseenter", (e) => {
    const count = events.mouseenter.length;
    const { target } = e;

    for (let i = 0; i < count; i++) {
        if (events.mouseenter[i].class === target.className) {
            // console.log("x");
            break;
        };
    };
    // events.mouseenter.filter(el => el.class === )
});

window.addEventListener("mouseleave", (e) => {
    // console.log("x");
});

export const addGlobalListener = ({ eventName, identifier, eventHandler }) => {
    console.log("yay", { eventName, identifier, eventHandler });
    if (events[eventName]) {
        const existingEvent = events[eventName].filter(el => el.identifier === identifier)[0];
        // console.log(existingEvent);
        if (!existingEvent) events[eventName].push({ identifier, eventHandler });
        console.log(events);
        // for (let i = 0; i < count; i++) {
        //     events[eventName][i].eventName === eventName;
        // };
    };

    // console.log(eventName);
};