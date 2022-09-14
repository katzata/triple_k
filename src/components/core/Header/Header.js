import headerTemplate from "./header.hbs";
import "./header.scss";

// import { capitalise } from "../../../utils/utils";

class Header {
    constructor(text) {
        const { title, nav } = text;

        this.component = document.createElement("header");
        this.template = headerTemplate({ 
            title,
            navL: nav.navL,
            main: nav.main,
            navR: nav.navR
        });

        this.animateGhostTitle();

        window.onpushstate = () => console.log("x");
        console.log(window.location);
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

    render() {
        this.component.innerHTML = this.template;
        return this.component;
    };
}

export default Header;