let isListeningMouse = false;
let element = document.documentElement;
element.addEventListener("mousedown", event => {
    let context = Object.create(null);
    contexts.set("mouse" + (1 << event.button), context);

    start(event, context);

    let mousemove = event => {
        let button = 1;
        while(button <= event.buttons) {
            if ( button & event.buttons) {
                let key = button;
                if (button === 2)
                    key = 4;
                else if (button === 4)
                    key = 2;
                let context = contexts.get("mouse" + key);
                move(event, context);
            }
            button = button << 1;
        }
    };
    let mouseup = event => {
        let context = contexts.get("mouse" + (1 << event.button));
        end(event, context);
        contexts.delete("mouse" + (1 << event.button));
        if (event.buttons === 0) {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
            isListeningMouse = false;
        }
    };
    if (!isListeningMouse) {
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
        isListeningMouse = true;
    }
})

let contexts = new Map();

element.addEventListener("touchstart", event => {
    for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(event.identifier, context);
        start(touch,context);
    }
});

element.addEventListener("touchmove", event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(event.identifier);
        move(touch, context);
    }
});

element.addEventListener("touchend", event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(event.identifier);
        end(touch, context);
        contexts.delete(event.identifier);
    }
});

element.addEventListener("touchcancel", event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(event.identifier);
        cancel(touch, context);
        contexts.delete(event.identifier);
    }
});

let start = (point, context) => {
    context.startX = point.clientX, context.startY = point.clientY;
    context.isPan = false;
    context.isTap = true;
    context.isPress = false;
    context.handler = setTimeout(() => {
        context.isPan = false;
        context.isTap = false;
        context.isPress = true;
        context.handler = null;
        console.log("pressStart");
    },500)
}

let move = (point,context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isPan = true;
        context.isTap = false;
        context.isPress = false;
        console.log("panStart");
        clearTimeout(context.handler);
    }

    if (context.isPan) {
        console.log(dx, dy);
        console.log("pan");
    }
}

let end = (point, context) => {
    if (context.isTap) {
        console.log("tap");
        clearTimeout(context.handler);
    }
    if (context.isPan) {
        console.log("panEnd");
    }
    if (context.isPress) {
        console.log("pressEnd");
    }
}

let cancel = (point, context) => {
    clearTimeout(context.handler);
    console.log("cancel", point.clientX, point.clientY);
}
