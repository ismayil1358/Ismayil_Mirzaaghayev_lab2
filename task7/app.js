const jobList = document.getElementById('job-list');
const loadMoreButton = document.getElementById('load-more');

let jobIDs = [];
let currentIndex = 0;
const jobsPerPage = 6;

async function fetchJobIDs() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
    jobIDs = await response.json();
    loadJobs();
}

async function fetchJobDetails(id) {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return await response.json();
}

async function loadJobs() {
    const endIndex = Math.min(currentIndex + jobsPerPage, jobIDs.length);
    const jobPromises = jobIDs.slice(currentIndex, endIndex).map(id => fetchJobDetails(id));
    
    const jobs = await Promise.all(jobPromises);
    jobs.forEach(job => displayJob(job));

    currentIndex = endIndex;

    if (currentIndex >= jobIDs.length) {
        loadMoreButton.style.display = 'none';
    }
}

function displayJob(job) {
    if (!job) return;

    const jobDiv = document.createElement('div');
    jobDiv.classList.add('job');

    const titleElement = document.createElement('h3');
    titleElement.classList.add('job-title');

    if (job.url) {
        const link = document.createElement('a');
        link.href = job.url;
        link.target = '_blank';
        link.textContent = job.title;
        titleElement.appendChild(link);
    } else {
        titleElement.textContent = job.title;
    }

    const posterElement = document.createElement('p');
    posterElement.textContent = `Posted by: ${job.by}`;

    const dateElement = document.createElement('p');
    dateElement.textContent = `Posted on: ${new Date(job.time * 1000).toLocaleString()}`;

    jobDiv.appendChild(titleElement);
    jobDiv.appendChild(posterElement);
    jobDiv.appendChild(dateElement);

    jobList.appendChild(jobDiv);
}

loadMoreButton.addEventListener('click', loadJobs);

fetchJobIDs();
