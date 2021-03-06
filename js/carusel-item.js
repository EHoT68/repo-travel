$(document).ready(function() {

   var sync1 = $("#sync1");
   var sync2 = $("#sync2");
   var slidesPerPage = 4; //globaly define number of elements per page
   var syncedSecondary = true;

   sync1.owlCarousel({
       items: 1,
       slideSpeed: 2000,
       nav: true,
       autoplay: false, 
       dots: true,
       responsiveRefreshRate: 200,
       navText: ['<svg width="25" height="45" viewBox="0 0 25 45" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24 0.999998L2.49433 20.2655C1.16332 21.4579 1.16333 23.5421 2.49433 24.7345L24 44" stroke="#D4D4D4" stroke-width="2"/> </svg>', '<svg width="25" height="45" viewBox="0 0 25 45" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 0.999998L22.5057 20.2655C23.8367 21.4579 23.8367 23.5421 22.5057 24.7345L0.999998 44" stroke="#D4D4D4" stroke-width="2"/> </svg>'],
   }).on('changed.owl.carousel', syncPosition);

   sync2
       .on('initialized.owl.carousel', function() {
           sync2.find(".owl-item").eq(0).addClass("current");
       })
       .owlCarousel({
           items: 1,
           dots: true,
           nav: true,
           smartSpeed: 200,
           slideSpeed: 500,
           navText: ['<svg width="25" height="45" viewBox="0 0 25 45" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M24 0.999998L2.49433 20.2655C1.16332 21.4579 1.16333 23.5421 2.49433 24.7345L24 44" stroke="#D4D4D4" stroke-width="2"/> </svg>', '<svg width="25" height="45" viewBox="0 0 25 45" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 0.999998L22.5057 20.2655C23.8367 21.4579 23.8367 23.5421 22.5057 24.7345L0.999998 44" stroke="#D4D4D4" stroke-width="2"/> </svg>'],
           slideBy: 1,//alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
           responsiveRefreshRate: 100
       }).on('changed.owl.carousel', syncPosition2);

   function syncPosition(el) {
       //if you set loop to false, you have to restore this next line
       //var current = el.item.index;

       //if you disable loop you have to comment this block
       var count = el.item.count - 1;
       var current = Math.round(el.item.index - (el.item.count / 2) - .5);

       if (current < 0) {
           current = count;
       }
       if (current > count) {
           current = 0;
       }

       //end block

       sync2
           .find(".owl-item")
           .removeClass("current")
           .eq(current)
           .addClass("current");
       var onscreen = sync2.find('.owl-item.active').length - 1;
       var start = sync2.find('.owl-item.active').first().index();
       var end = sync2.find('.owl-item.active').last().index();

       if (current > end) {
           sync2.data('owl.carousel').to(current, 100, true);
       }
       if (current < start) {
           sync2.data('owl.carousel').to(current - onscreen, 100, true);
       }
   }

   function syncPosition2(el) {
       if (syncedSecondary) {
           var number = el.item.index;
           sync1.data('owl.carousel').to(number, 100, true);
       }
   }

   sync2.on("click", ".owl-item", function(e) {
       e.preventDefault();
       var number = $(this).index();
       sync1.data('owl.carousel').to(number, 300, true);
   });
});
;(function() {

	// ?????????????????? ???????? ?????????????????? ???? ????????????????, ?????????????? ?????????? ?????????????????? ?????????????????????? ????????
	// ???? ?????????????????????????? ?????????????????????? ???????????????? ?????????????? ???????????????? '[data-modal]'
	const mOpen = document.querySelectorAll('[data-modal]');
	// ???????? ?????? ?????????????????? ???????????????????? ???????????????????????? ????????????, ???????????????????? ???????????? ??????????????
	if (mOpen.length == 0) return;

		  // ???????????????? ?????? ?????????????????????? ????????
	const overlay = document.querySelector('.overlay'),
		  // ?????????????????? ?????????????????????? ????????
		  modals = document.querySelectorAll('.dlg-modal'),
		  // ?????????????????? ???????? ?????????????????? ???? ????????????????, ?????????????? ??????????
		  // ?????????????????? ?????????????????????? ????????
		  // ???? ?????????????????????????? ?????????????????????? ???????????????? ?????????????? ???????????????? '[data-close]'
		  mClose = document.querySelectorAll('[data-close]');
	// ???????? ???????????????????????? ????????: false - ???????? ??????????????, true - ??????????????
	let	mStatus = false;

	for (let el of mOpen) {
		el.addEventListener('click', function(e) {
			// ???????????????????? ?????????????? [data-modal], ???????????????????? ID ???????????????????????? ????????,
			// ?????????????? ?????????????????? ??????????????
			// ???? ???????????????? ID ???????????????? ???????????? ???? ?????????????? ?? ?????????? ??????????????????????????????
			let modalId = el.dataset.modal,
				modal = document.getElementById(modalId);
			// ???????????????? ?????????????? ???????????????? ???????????????????????? ????????, ????????????????????
			// ???????????????? ???????????? ???????????????????????? ????????
			modalShow(modal);
		});
	}

	// ???????????????????????????? ?????????????????????? ?????????????? ???? ??????????????????, ??????????????????????
	// ?????????????????????? ????????
	for (let el of mClose) {
		el.addEventListener('click', modalClose);
	}

	// ???????????????????????????? ???????????????????? ?????????????? ?????????????? ???? ??????????????
	document.addEventListener('keydown', modalClose);

	function modalShow(modal) {
		// ???????????????????? ???????????????? ???????????????????????? ????????
		overlay.classList.remove('fadeOut');
		overlay.classList.add('fadeIn');

		// ???????????????????? ?????? ???????????????? ?????????????????? ???????????????????????? ????????
		// ?????????????? ?? ?????????????????? ????????????, ?????????????????????????????? ???????? ????????????????
		if (typeAnimate === 'fade') {
			modal.classList.remove('fadeOut');
			modal.classList.add('fadeIn');
		} else if (typeAnimate === 'slide') {
			modal.classList.remove('slideOutUp');
			modal.classList.add('slideInDown');
		}
		// ???????????????????? ????????, ????????????????????????, ?????? ?????????????????????? ???????? ??????????????
		mStatus = true;
	}

	function modalClose(event) {
		if (mStatus && ( event.type != 'keydown' || event.keyCode === 27 ) ) {
			// ?????????????? ???? ?????????????? ???????????? ?????????????? ?????????????????? modals (???????????? ?????????????????????? ????????)
			// ?? ?? ?????????????????????? ???? ???????? ????????????????, ???????????????????????? ???? ???????????? ????????????????,
			// ?????????????? ?????????? ???????????????? ???????????????? ???????? ?? ?????????????????? ?????????? ???????????????? ????????????????
			for (let modal of modals) {
				if (typeAnimate == 'fade') {
					modal.classList.remove('fadeIn');
					modal.classList.add('fadeOut');
				} else if (typeAnimate == 'slide') {
					modal.classList.remove('slideInDown');
					modal.classList.add('slideOutUp');
				}
			}

			// ?????????????????? overlay
			overlay.classList.remove('fadeIn');
			overlay.classList.add('fadeOut');
			// ???????????????????? ????????, ???????????????????????? ?????? ???????????????? ?? 'false'
			// ?????? ???????????????? ?????????????????? ??????, ?????? ???? ???????????????? ?????? ????????????????
			// ?????????????????????? ????????
			mStatus = false;
		}
	}
})();