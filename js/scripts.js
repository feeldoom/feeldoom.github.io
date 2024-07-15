document.addEventListener('DOMContentLoaded', (_event) => {
    async function fetchRepos() {
        try {
            const response = await fetch('https://api.github.com/users/feeldoom/repos');
            const repos = await response.json();
            const reposList = document.getElementById('repos-list');
            const recentRepos = repos.filter(repo => {
                const updatedDate = new Date(repo.updated_at);
                const now = new Date();
                const diffTime = Math.abs(now - updatedDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 30;
            });
            recentRepos.forEach(repo => {
                const repoItem = document.createElement('div');
                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.target = '_blank';
                repoLink.textContent = `[${new Date(repo.updated_at).toLocaleDateString()}] ${repo.name}`;
                repoItem.appendChild(repoLink);
                reposList.appendChild(repoItem);
            });
        } catch (error) {
            console.error('Error fetching repos:', error);
        }
    }

    async function fetchActivity() {
        try {
            const response = await fetch('https://api.github.com/users/feeldoom/events');
            const events = await response.json();
            const activityTable = document.getElementById('activity-table').querySelector('tbody');
            const recentEvents = events.slice(0, 10);
            recentEvents.forEach(event => {
                const row = document.createElement('tr');
                const dateCell = document.createElement('td');
                dateCell.textContent = new Date(event.created_at).toLocaleDateString();
                const eventCell = document.createElement('td');
                eventCell.textContent = event.type;
                const repoCell = document.createElement('td');
                const repoLink = document.createElement('a');
                repoLink.href = `https://github.com/${event.repo.name}`;
                repoLink.target = '_blank';
                repoLink.textContent = event.repo.name;
                repoCell.appendChild(repoLink);
                row.appendChild(dateCell);
                row.appendChild(eventCell);
                row.appendChild(repoCell);
                activityTable.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching activity:', error);
        }
    }

    fetchRepos();
    fetchActivity();
    
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

        newsTicker.addEventListener('animationiteration', showNextNews);
        showNextNews();
    }

    updateNews();
});