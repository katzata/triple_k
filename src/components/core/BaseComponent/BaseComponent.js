class BaseComponent {
    constructor() {
        this.component = document.createElement("div");
        this.component.id = "";
        this.template = "";
    };

    animationsLoop(animations, customDelay) {
        const delay = customDelay ? customDelay : 1000 / 60;
        let prevTime = new Date().getTime();

        (function loop() {
            const currentTime = new Date().getTime();

            if (currentTime - prevTime > delay) {
                prevTime = currentTime;

                for (const animation of animations) {
                    animation();
                };
            };

            window.requestAnimationFrame(loop);
        })();
    };

    onLoad(onLoadFunctions) {
        window.onload = () => {
            for (const onLoadFunction of onLoadFunctions) {
                onLoadFunction();
            };
        };
    };

    random(num) {
        if (num) {
            return Math.ceil((Math.random() * num) - (num / 2));
        } else {
            return Math.random();
        };
    };

    render() {
        this.component.innerHTML = this.template;
        return this.component;
    };
};

export default BaseComponent;