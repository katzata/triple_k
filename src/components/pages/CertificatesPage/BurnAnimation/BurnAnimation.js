import BaseComponent from "../../../core/BaseComponent/BaseComponent";
import burnAnimationTemplate from "./burnAnimation.hbs";
import "./burnAnimation.scss";

class BurnAnimation extends BaseComponent {
    constructor() {
        super();

        this.component = this.createElement("div")
        this.id = "burnAnimation";
        this.template = burnAnimationTemplate;
        this.templateData = () => {
            return { text: this.text[0] }
        }

        this.disolveFrames = [];
        this.frameIndex = 1;
        this.text = [
            `
                I am the one, Orgasmatron, the outstretched grasping hand
                My image is of agony, my servants rape the land
                Obsequious and arrogant, clandestine and vain
                Two thousand years of misery, of torture in my name
                Hypocrisy made paramount, paranoia the law
                My name is called religion, sadistic, sacred whore

                I twist the truth, I rule the world, my crown is called deceit
                I am the emperor of lies, you grovel at my feet
                I rob you and I slaughter you, your downfall is my gain
                And still you play the sycophant and revel in your pain
                And all my promises are lies, all my love is hate
                I am the politician, and I decide your fate

                I march before a martyred world, an army for the fight
                I speak of great heroic days, of victory and might
                I hold a banner drenched in blood, I urge you to be brave
                I lead you to your destiny, I lead you to your grave
                Your bones will build my palaces, your eyes will stud my crown
                For I am Mars, the god of war, and I will cut you down
            `
        ];

        this.animationsLoop([
            this.handleAnimation
        ], Math.floor(1000 / 30));
    };


    // The burn effect

    handleAnimation = () => {
        const image = this.component.children[0].children[0].children[0];
        image.setAttribute("href", `../../../../assets/gfx/img/disolve_animation/burning_paper${95/* this.frameIndex */}.png`);
        
        if (this.frameIndex < 95) {
            this.frameIndex++
        } else {
            this.frameIndex = 1;
        };
    };

};

export default BurnAnimation;