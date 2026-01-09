/**
 * Nexus Güvenlik - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {

    var header = document.getElementById('header');
    var menuToggle = document.getElementById('menuToggle');
    var navMenu = document.getElementById('navMenu');
    var contactForm = document.getElementById('contactForm');

    // Header scroll
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Contact form (Google Forms integration)
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            // Form Google Forms'a gönderiliyor (iframe üzerinden)
            setTimeout(function() {
                alert('Formunuz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
                contactForm.reset();
            }, 500);
        });
    }

    // Hero Slider
    var heroSlides = document.querySelectorAll('.hero-slide');
    var heroImages = document.querySelectorAll('.hero-image-slides img');
    var heroDots = document.querySelectorAll('.hero-dots .dot');
    var prevBtn = document.getElementById('heroPrev');
    var nextBtn = document.getElementById('heroNext');
    var currentSlide = 0;
    var slideCount = heroSlides.length;
    var autoSlideInterval;

    function goToSlide(index) {
        if (slideCount === 0) return;

        // Normalize index
        if (index >= slideCount) index = 0;
        if (index < 0) index = slideCount - 1;

        // Update text slides
        heroSlides.forEach(function(slide, i) {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update images
        heroImages.forEach(function(img, i) {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });

        // Update dots
        heroDots.forEach(function(dot, i) {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        currentSlide = index;
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Initialize slider if elements exist
    if (slideCount > 0) {
        // Button events
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }

        // Dot click events
        heroDots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                stopAutoSlide();
                goToSlide(index);
                startAutoSlide();
            });
        });

        // Start auto slide
        startAutoSlide();
    }

    // FAQ Accordion
    var faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

});
