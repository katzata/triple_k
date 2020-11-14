let getAge = () => {
	let age = Date.now() - new Date(1985, 4, 3).getTime();
	let ageDate = new Date(age);

	return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
};

module.exports = {
	// icons: {
	// 	titles: [
	// 		"HTML",
	// 		"CSS",
	// 		"Sass",
	// 		"Bootstrap",
	// 		"JavaScript",
	// 		"jQuery",
	// 		"Pixi.js",
	// 		"React",
	// 		"webpack",
	// 		"Node.js",
	// 		"Git",
	// 	],
	// 	src: [
	// 		"../assets/icons/html.svg", 
	// 		"../assets/icons/css.svg",
	// 		"../assets/icons/sass.svg",
	// 		"../assets/icons/bootstrap.svg",
	// 		"../assets/icons/js.svg",
	// 		"../assets/icons/jquery.svg",
	// 		"../assets/icons/pixi.svg", 
	// 		"../assets/icons/react.svg",
	// 		"../assets/icons/webpack.svg",
	// 		"../assets/icons/nodejs.svg",
	// 		"../assets/icons/git.svg"
	// 	]
	// }
}