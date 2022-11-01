const windowProps = [
    ["requestAnimationFrame", function requestAnimationFrame() {}]
];

for (const [prop, value] of windowProps) {
    window[prop] = value;
};