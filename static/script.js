// Content toggle functionality
function toggleContent() {
    var content = document.getElementById("extra-content");
    var button = document.getElementById("toggle-button");
    if (content.style.display === "none") {
        content.style.display = "block";
        button.textContent = "Read Less";
    } else {
        content.style.display = "none";
        button.textContent = "Read More";
    }
}

// Read More/Less animations with jQuery
$(document).ready(function () {
    $("#toggle-button").click(function () {
        $("#extra-content").fadeIn();
        $(this).hide();
    });

    $("#toggle-button-less").click(function () {
        $("#extra-content").fadeOut(function () {
            $("#toggle-button").show();
        });
    });
});

// Weather API integration
$(document).ready(function () {
    const apiKey = "6dd1ec3a6da133e4e9bf4aa86e6538eb"; 
    const city = "Pittsburgh";
    const units = "imperial"; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

    $.getJSON(apiUrl, function (data) {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        $("#weather-widget").html(`
            <div class="weather-info">
                <img src="${iconUrl}" alt="${description}" class="weather-icon">
                <p><strong>Temperature:</strong> ${temperature}°F</p>
                <p><strong>Condition:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            </div>
        `);
    }).fail(function () {
        $("#weather-widget").html("<p>Unable to load weather information. Please try again later.</p>");
    });
});

// Image slideshow functionality
$(document).ready(function() {
    const images = ['static/Incline.jpg', 'static/Incline1.jpg'];
    let currentIndex = 0;

    function preloadImages() {
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    function initSlideshow() {
        preloadImages();
        $('#slideshow-img').attr('src', images[0]);
    }

    $('.left-arrow').click(function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        $('#slideshow-img').attr('src', images[currentIndex]);
    });

    $('.right-arrow').click(function() {
        currentIndex = (currentIndex + 1) % images.length;
        $('#slideshow-img').attr('src', images[currentIndex]);
    });

    initSlideshow();
});

// Mailing list form validation
$(document).ready(function() {
    $('#mailing-list-form').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const zipcode = $('#zipcode').val();
        
        if (phone && !/^\d{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return false;
        }
        
        if (zipcode && !/^\d{5}$/.test(zipcode)) {
            alert('Please enter a valid 5-digit zip code');
            return false;
        }
        
        alert('Thank you for subscribing to our mailing list!');
        this.reset();
    });
});