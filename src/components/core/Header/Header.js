import headerTemplate from "./header.hbs";
import "./header.scss";

class Header {
    constructor() {
        this.component = document.createElement("header");
    };

    animateGhostTitle() {
        const random = (num) => Math.ceil((Math.random() * num) - (num / 2));
        let prevTime = new Date().getTime();
        
        (function loop() {
            const currentTime = new Date().getTime();

            if (currentTime - prevTime >= 17) {
                prevTime = currentTime;
                
                const ghostTitle = document.querySelector(".headerGhostTitle");
                const offset = 10;
                const posX = random(offset);
                const posY = random(offset);

                ghostTitle.style.transform = `translate(${posX}px, ${posY}px)`
            };

            window.requestAnimationFrame(loop);
        })();
    };

    render(text) {
        this.component.innerHTML = headerTemplate(text);
        this.animateGhostTitle();
        console.log(text);
        return this.component;
    };
}

export default Header;