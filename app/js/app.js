// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'

document.addEventListener('DOMContentLoaded', () => {

	// Custom JS
	mobMenuToggle()
	stickyHeader()
	worksSlider ()
	scrollNavbar()
	smoothScroll()
})

let wow = new WOW(
	{
	boxClass:     'wow',      // default
	animateClass: 'animated', // default
	offset:       0,          // default
	mobile:       true,       // default
	live:         true        // default
  }
  )

window.addEventListener("load", function() {
	wow.init();
	hideLoader ();
  })
function hideLoader () {
	let loader = document.querySelector('.loader')
	loader.style.display = 'none'
}



// мобильное меню
function mobMenuToggle() {
	let btn = document.querySelector('.header__navigation-btn-menu')
	let menu = document.querySelector(btn.dataset.toggle)
	let header = document.querySelector('.header')
	btn.addEventListener('click', function (e) {
		btn.classList.toggle('active')
		menu.classList.toggle('active')
		header.classList.toggle('active')
	})
	menu.addEventListener('click', function (e) {
		if (e.target.tagName === 'A') {
			btn.classList.remove('active')
			menu.classList.remove('active')
			header.classList.remove('active')
		}
	})
}

function stickyHeader() {
	let header = document.querySelector('.header')

	if (document.body.getBoundingClientRect().top < 0) {
		header.classList.add('sticky')
	} else {
		header.classList.remove('sticky')
	}

	document.addEventListener('scroll', function () {
		if (document.body.getBoundingClientRect().top < 0) {
			header.classList.add('sticky')
		} else {
			header.classList.remove('sticky')
		}

	})
}

function smoothScroll() {
	let linkNav = document.querySelectorAll('[href^="#"]')
	let headerHeight = document.querySelector('.header').getBoundingClientRect().height
	let V = 0.2;
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset // производим прокрутка прокрутка
			let hash = this.href.replace(/[^#]*(.*)/, '$1');
			let tar = document.querySelector(hash) // к id элемента, к которому нужно перейти
			let t = tar.getBoundingClientRect().top - headerHeight
			let start = null;

			requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) {
					start = time;
				}
				var progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash // URL с хэшем
				}
			}
			if (t > 1 || t < -1) {
				requestAnimationFrame(step)
			}
		});
	}
}

function scrollNavbar() {
	// Получаем все элементы блоков и элементы навигации

	const navItems = document.querySelectorAll('#primary-menu a'); 
	// Замените '.nav-item' на ваш класс элементов навигации
	const blocks = getBlocks(); // Замените '.block' на ваш класс блоков
	const blocksPosition = getBlocksPositions()
	let currentPosition = [blocksPosition[0], blocksPosition[1]]

	function getBlocksPositions() {
		let positions = []
		blocks.forEach((item, index) => {
			positions.push(item.offsetTop)
		})
		return positions
	}


	function getBlocks() {
		let blocks = []
		navItems.forEach((item, index) => {
			blocks.push(document.querySelector(item.getAttribute('href')))
		})
		return blocks
	}

	// Функция, которая определяет, находится ли элемент в зоне видимости экрана
	function isElementInViewport(el, ind, pos) {
		return (
			pos >= el &&
			pos < (blocksPosition[ind + 1] || document.documentElement.getBoundingClientRect().height)
		);
	}

	// Функция, которая добавляет класс активного элемента навигации
	function setActiveNavItem() {
		let documentPosition = Math.abs(document.documentElement.getBoundingClientRect().top) + document.querySelector('.header').getBoundingClientRect().height + 1
		if ((documentPosition > currentPosition[0] && documentPosition < currentPosition[1])) return
		blocksPosition.forEach((block, index) => {
			if (isElementInViewport(block, index, documentPosition)) {
				currentPosition[0] = block
				currentPosition[1] = blocksPosition[index + 1]
				navItems.forEach(navItem => {
					navItem.parentElement.classList.remove('active'); // Удаляем класс активного элемента навигации у всех элементов
				});
				navItems[index].parentElement.classList.add('active'); // Добавляем класс активного элемента навигации соответствующему блоку
			}
		});
	}

	// Событие скрола
	window.addEventListener('scroll', setActiveNavItem);
	setActiveNavItem()
}


function worksSlider () {
	let swiper = new Swiper(".works-slider", {
		slidesPerView: 3,
		spaceBetween: 30,
		noSwiper: false,
		speed: 400,
		autoHeight: true,
		navigation: {
			nextEl: ".works-button-next",
			prevEl: ".works-button-prev",
		},
		pagination: {
			el: ".works-pagination",
			type: "fraction",
		},
		   // Responsive breakpoints   
		   breakpoints: {  
   
			// when window width is <= 320px     
			320: {       
			   slidesPerView: 1,
			   spaceBetween: 15     
			},     
			// when window width is <= 480px     
			480: {       
			   slidesPerView: 2,       
			   spaceBetween: 20     
			},   
		
			// when window width is <= 640px     
			992: {       
			   slidesPerView: 3,       
			   spaceBetween: 30     
			} 
		
		 } 
	});
}