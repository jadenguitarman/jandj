window.addEventListener("load", function () {
	//load webps if available
	const check_webp_feature = (feature, callback) => {
		let img = new Image();
		img.onload = function () {
			callback(feature, (img.width > 0) && (img.height > 0));
		};
		img.onerror = function () {
			callback(feature, false);
		};
		img.src = "data:image/webp;base64," + {
			lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
			lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
			alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
			animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
		}[feature];
	};

	const images = [...document.querySelectorAll("[data-src]")];
	if (images.length) {
		check_webp_feature("lossy", function (feature, result) {
			images.forEach(x=>{
				x.setAttribute("loading", "lazy");
				let imageObserver;
				if (!!x.dataset.supports && x.dataset.supports.includes("webp")) {
					imageObserver = new IntersectionObserver(entries => {
						entries.forEach(entry => {
							if (entry.isIntersecting) {
								entry.target.src = entry.target.dataset.src + "." + (result ? "webp" : entry.target.dataset["image-type"]);
							}
						}, {rootMargin:"50px"});
					});
				} else {
					imageObserver = new IntersectionObserver(entries => {
						entries.forEach(entry => {
							if (entry.isIntersecting) {
								entry.target.src = entry.target.dataset.src;
							}
						}, {rootMargin:"50px"});
					});
				}
				imageObserver.observe(x);
			});
		});
	}


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
