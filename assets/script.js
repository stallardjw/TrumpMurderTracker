// Function to create the counter
function createCounter(targetCount) {
    const counterDiv = document.getElementById('counter');
    counterDiv.innerHTML = '';
    const countStr = targetCount.toLocaleString(); // Added commas for thousands separator

    countStr.split('').forEach((char, index, arr) => {
        if (char === ',') {
            const commaSpan = document.createElement('span');
            commaSpan.textContent = ',';
            commaSpan.classList.add('comma');
            counterDiv.appendChild(commaSpan);
        } else {
            const flipCard = document.createElement('div');
            flipCard.classList.add('flip-card');
            flipCard.style.width = '80px'; // Default width
            flipCard.style.height = '120px'; // Default height

            const flipCardInner = document.createElement('div');
            flipCardInner.classList.add('flip-card-inner');

            const flipCardFront = document.createElement('div');
            flipCardFront.classList.add('flip-card-front');
            flipCardFront.textContent = char;
            flipCardFront.style.fontSize = '60px'; // Default font size

            const flipCardBack = document.createElement('div');
            flipCardBack.classList.add('flip-card-back');
            flipCardBack.textContent = char; 
            flipCardBack.style.fontSize = '60px'; // Default font size

            flipCardInner.appendChild(flipCardFront);
            flipCardInner.appendChild(flipCardBack);
            flipCard.appendChild(flipCardInner);
            counterDiv.appendChild(flipCard);

            // Trigger the flip animation
            setTimeout(() => {
                flipCard.classList.add('flip');
            }, 100);
        }
    });

    // Adjust comma styling
    document.querySelectorAll('.comma').forEach(comma => {
        comma.style.fontSize = '60px';
        comma.style.margin = '0 10px';
    });

    // Responsive adjustments
    function adjustFlipCardSize() {
        const screenWidth = window.innerWidth;
        document.querySelectorAll('.flip-card').forEach(flipCard => {
            if (screenWidth < 768) {
                flipCard.style.width = '60px';
                flipCard.style.height = '90px';
                flipCard.querySelector('.flip-card-front').style.fontSize = '40px';
                flipCard.querySelector('.flip-card-back').style.fontSize = '40px';
            } else {
                flipCard.style.width = '80px';
                flipCard.style.height = '120px';
                flipCard.querySelector('.flip-card-front').style.fontSize = '60px';
                flipCard.querySelector('.flip-card-back').style.fontSize = '60px';
            }
        });
    }

    window.addEventListener('resize', adjustFlipCardSize);
    adjustFlipCardSize();
}

// Function to load news articles from JSON
function loadNewsArticles() {
    fetch('news.json')
        .then((response) => response.json())
        .then((data) => {
            const newsList = document.getElementById('news-list');
            newsList.innerHTML = ''; // Clear existing content

            data.forEach((article) => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = article.title;
                link.target = '_blank'; // Open link in a new tab
                listItem.appendChild(link);
                newsList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('Error loading news articles:', error);
        });
}

// Initialize the page
createCounter(1219581);
loadNewsArticles();
