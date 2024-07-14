document.addEventListener('DOMContentLoaded', (_event) => {
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        document.getElementById('current-time').textContent = timeString;
    }

    setInterval(updateTime, 5000);
    updateTime();

    function updateNews() {
        const newsTicker = document.getElementById('news-ticker');
        const newsItems = [
            "[07/14/2024] Changed primary colors",
            "[07/13/24] Website created"
        ];
        let newsIndex = 0;

        function showNextNews() {
            newsTicker.textContent = newsItems[newsIndex];
            newsIndex = (newsIndex + 1) % newsItems.length;
        }

        setInterval(showNextNews, 5500);
        showNextNews();
    }

    updateNews();
});
