// Mobile responsive navigation bar
document.addEventListener('DOMContentLoaded', () => {
	    const toggleBtn = document.querySelector('.responsive-nav-toggle-btn');
	    const navLinks = document.querySelector('.responsive-nav-links');
	    const allNavItemsWithSubmenus = document.querySelectorAll('.responsive-nav-links li.has-submenu');

	    // Toggle main navigation menu on hamburger click
	    toggleBtn.addEventListener('click', () => {
	        navLinks.classList.toggle('active');
	        toggleBtn.classList.toggle('active'); // For hamburger animation
	        
	        // When closing the main menu, ensure all sub-menus are also closed
	        if (!navLinks.classList.contains('active')) {
	            allNavItemsWithSubmenus.forEach(item => {
	                item.classList.remove('active');
	            });
	        }
	    });

	    // Handle sub-menu clicks for mobile (and desktop if preferred for click-to-open)
	    allNavItemsWithSubmenus.forEach(item => {
	        const mainLink = item.querySelector('a'); // The main anchor tag (e.g., "About us")

	        mainLink.addEventListener('click', (event) => {
	            // Check if we are on a mobile screen (matching CSS breakpoint)
	            // Or if you want click behavior on desktop as well, remove this check
	            if (window.innerWidth <= 900) {
	                event.preventDefault(); // Prevent default link navigation for submenu toggles

	                // Toggle 'active' class on the clicked parent li
	                item.classList.toggle('active');

	                // Close other open sub-menus at the same level
	                const parentUl = item.closest('ul'); // Get the parent UL (nav-links or sub-links)
	                if (parentUl) {
	                    parentUl.querySelectorAll('li.has-submenu.active').forEach(otherItem => {
	                        if (otherItem !== item) { // Don't close the currently clicked item
	                            otherItem.classList.remove('active');
	                            // Also close any nested sub-menus within the closed item
	                            otherItem.querySelectorAll('li.has-submenu.active').forEach(nestedItem => {
	                                nestedItem.classList.remove('active');
	                            });
	                        }
	                    });
	                }
	            }
	        });

	        // Optional: For desktop, if you want sub-menus to stay open on hover
	        // This is handled purely by CSS `li:hover > ul` for desktop.
	        // The JS click handler takes precedence on mobile due to `preventDefault()`
	        // and media query check.
	    });

	    // Optional: Close main menu and all sub-menus when clicking outside the header
	    document.addEventListener('click', (event) => {
	        const header = document.querySelector('.responsive-nav-header');
	        if (!header.contains(event.target) && navLinks.classList.contains('active')) {
	            navLinks.classList.remove('active');
	            toggleBtn.classList.remove('active');
	            allNavItemsWithSubmenus.forEach(item => {
	                item.classList.remove('active');
	            });
	        }
	    });

	    // Optional: Close menu if window is resized from mobile to desktop
	    let isMobile = window.innerWidth <= 900;
	    window.addEventListener('resize', () => {
	        const wasMobile = isMobile;
	        isMobile = window.innerWidth <= 900;

	        if (wasMobile && !isMobile) { // If resized from mobile to desktop
	            navLinks.classList.remove('active'); // Close main menu
	            toggleBtn.classList.remove('active'); // Reset hamburger icon
	            allNavItemsWithSubmenus.forEach(item => { // Close all sub-menus
	                item.classList.remove('active');
	            });
	        }
	    });
	});








// Slide show of images
document.addEventListener('DOMContentLoaded', () => {
		    const sliderContainer = document.querySelector('.slider-container');
		    const imageWrapper = document.querySelector('.image-wrapper');
		    const images = document.querySelectorAll('.image-wrapper img');
		    const dotsContainer = document.querySelector('.dots-container');

		    let currentIndex = 0;
		    const totalImages = images.length;
		    const slideIntervalTime = 3000; // Time in milliseconds (e.g., 3000ms = 3 seconds)
		    let slideInterval; // Variable to hold the interval ID

		    // --- Create Navigation Dots ---
		    function createDots() {
		        for (let i = 0; i < totalImages; i++) {
		            const dot = document.createElement('span');
		            dot.classList.add('dot');
		            dot.dataset.index = i; // Store the index for easy access
		            dotsContainer.appendChild(dot);
		            dot.addEventListener('click', () => {
		                goToSlide(i);
		                resetAutoplay(); // Reset autoplay when a dot is clicked
		            });
		        }
		    }

		    // --- Update Dots (Highlight active dot) ---
		    function updateDots() {
		        const dots = document.querySelectorAll('.dot');
		        dots.forEach((dot, index) => {
		            if (index === currentIndex) {
		                dot.classList.add('active');
		            } else {
		                dot.classList.remove('active');
		            }
		        });
		    }

		    // --- Go To Specific Slide ---
		    function goToSlide(index) {
		        if (index < 0) {
		            currentIndex = totalImages - 1; // Loop to the last image
		        } else if (index >= totalImages) {
		            currentIndex = 0; // Loop to the first image
		        } else {
		            currentIndex = index;
		        }
		        const offset = -currentIndex * 100; // Calculate percentage to slide
		        imageWrapper.style.transform = `translateX(${offset}%)`;
		        updateDots();
		    }

		    // --- Next Slide (for autoplay) ---
		    function nextSlide() {
		        goToSlide(currentIndex + 1);
		    }

		    // --- Autoplay Control Functions ---
		    function startAutoplay() {
		        slideInterval = setInterval(nextSlide, slideIntervalTime);
		    }

		    function stopAutoplay() {
		        clearInterval(slideInterval);
		    }

		    function resetAutoplay() {
		        stopAutoplay();
		        startAutoplay();
		    }

		    // --- Initial Setup ---
		    createDots();
		    goToSlide(0); // Show the first image initially
		    startAutoplay(); // Start the automatic sliding

		    // --- Optional: Pause/Resume Autoplay on Hover ---
		    sliderContainer.addEventListener('mouseenter', stopAutoplay);
		    sliderContainer.addEventListener('mouseleave', startAutoplay);
		});




// Hiding forms using accordion
// Jobs page
/*
const accordionButton = document.querySelector('.accordion-button');
const accordionContent = document.querySelector('.hidden-container');
accordionButton.addEventListener('click', () => {
	accordionContent.classList.toggle('show');
});*/

//Enabling popup of containers
// Profile update form
document.addEventListener('DOMContentLoaded', function(){
	const openFormLink = document.getElementById('openFormLink');
	const formPopup = document.getElementById('formPopup');
	const closeFormBtn = document.getElementById('closeFormBtn');

	// Function to open the popup
	function openPopup(){
		formPopup.classList.add('active');
	}

	// Function to close the popup
	function closePopup(){
		formPopup.classList.remove('active');
	}

	// Event listener to the link click
	if (openFormLink) {
		openFormLink.addEventListener('click', function(event){
			event.preventDefault(); // Prevent default link behavior
			openPopup();
		});
	}

	// Event listener for close button click
	if (closeFormBtn) {
		closeFormBtn.addEventListener('click', function(){
			closePopup();
		});
	}

	//Add event listener to close when clicking outside the popup area
	if (formPopup) {
		formPopup.addEventListener('click', function(event){
			// Check if the click occured directly on the background (the popup container)
			// and not on the popup content itself
			if (event.target === formPopup) {
				closePopup();
			}
		});
	}
});