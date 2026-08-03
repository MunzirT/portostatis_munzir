// Header scroll behavior (hide on scroll down, shrink) + mobile menu toggle
(function () {
    var lastScrollTop = 0;
    var header = document.getElementById('main-header');
    var mobileMenu = document.getElementById('mobile-menu');
    var menuToggle = document.getElementById('menu-toggle');
    var nav = document.getElementById('main-nav');

    if (header && nav) {
        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) return;

            if (scrollTop > lastScrollTop && scrollTop > 80) {
                header.classList.remove('top-0');
                header.classList.add('-top-24');
            } else {
                header.classList.remove('-top-24');
                header.classList.add('top-0');
            }

            if (scrollTop > 20) {
                nav.classList.remove('h-20');
                nav.classList.add('h-16');
            } else {
                nav.classList.remove('h-16');
                nav.classList.add('h-20');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
})();

// Generic image slider (replaces the previous Alpine.js x-data sliders)
(function () {
    var sliders = document.querySelectorAll('[data-slider]');

    sliders.forEach(function (slider) {
        var slides = slider.querySelectorAll('[data-slide]');
        var prevBtn = slider.querySelector('[data-slider-prev]');
        var nextBtn = slider.querySelector('[data-slider-next]');
        var dotsWrap = slider.querySelector('[data-slider-dots]');
        var counter = slider.querySelector('[data-slider-counter]');
        var current = 0;

        if (!slides.length) return;

        // Static per-slide ordinal labels, e.g. "01 / 05" — fixed per slide, not tied to which one is active
        slides.forEach(function (slide, i) {
            var label = slide.querySelector('[data-slide-index]');
            if (label) {
                label.textContent = '0' + (i + 1) + ' / 0' + slides.length;
            }
        });

        var dots = [];
        if (dotsWrap) {
            slides.forEach(function (_, i) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                dot.addEventListener('click', function () { show(i); });
                dotsWrap.appendChild(dot);
                dots.push(dot);
            });
        }

        function show(index) {
            current = (index + slides.length) % slides.length;
            slides.forEach(function (slide, i) {
                slide.classList.toggle('slide-active', i === current);
            });
            dots.forEach(function (dot, i) {
                dot.classList.toggle('slide-dot-active', i === current);
            });
            if (counter) {
                counter.textContent = 'Image ' + (current + 1) + ' of ' + slides.length;
            }
        }

        if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1); });

        show(0);
    });
})();
