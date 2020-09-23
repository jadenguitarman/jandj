const scrollEvent = () => {
	const scrollPos = (window.scrollY / window.innerHeight) * 100;
	document.documentElement.style.setProperty("--scroll-pos", scrollPos + "vh");
	let nav = document.querySelector("nav");
	if (scrollPos > 100 && !nav.classList.contains("show-logo")) { //not on first section anymore
		nav.classList.add("show-logo");
	} else if (scrollPos <= 100 && nav.classList.contains("show-logo")) {
		nav.classList.remove("show-logo");
	}
};
scrollEvent();
window.addEventListener("scroll", scrollEvent);

document.getElementById("expand-nav").addEventListener("click", () => {
	const nav = document.querySelector("nav");
	if (!nav.classList.contains("open")) {
		nav.classList.add("open");
	}
});

document.getElementById("close-nav").addEventListener("click", () => {
	const nav = document.querySelector("nav");
	if (nav.classList.contains("open")) {
		nav.classList.remove("open");
	}
});

const mechanicYears = [...document.querySelectorAll(".mechanic-years")];
const setYears = () => {
	if (typeof moment != "undefined") {
		const years = moment().diff("1976-01-01", "years", true).toPrecision(9);
		if (years != mechanicYears[0].innerHTML) {
			mechanicYears.forEach(x => {
				x.innerHTML = years;
			});
			setTimeout(setYears, 3000); //if we updated the years, check again in 3 seconds
			return;
		}
	}
	setTimeout(setYears, 1000); //if we couldn't update the years, try again in 1 second
};
setYears();
