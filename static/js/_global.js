window.addEventListener("load", function () {
	//add event listeners for navbar
	const nav = document.querySelector("nav");
	[...document.querySelectorAll("nav > .container > a")].forEach(a => {
		a.addEventListener("click", () => {
			nav.className = "";
		});
	});
});

const expandNav = document.getElementById("expand-nav");
let sectionIndex = Math.floor((expandNav.getBoundingClientRect().top + window.scrollY) / window.innerHeight);
window.addEventListener("scroll", () => {
	let newSection = Math.floor((expandNav.getBoundingClientRect().top + window.scrollY) / window.innerHeight);
	if (newSection != sectionIndex) {
		if (newSection % 2 == 1) {
			expandNav.style.fill = "var(--jj-dark-blue)";
		} else {
			expandNav.style.fill = "var(--jj-off-white)";
		}
		sectionIndex = newSection;
	}
});
