 // global
const issuesContainer = document.getElementById('issues-container');
const loader = document.getElementById('loader');
let issues = []; // global issues array

// fetch issues from API
async function fetchIssues() {
    loader.classList.remove('hidden');
    try {
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const result = await res.json();

        console.log('API response:', result);

        issues = Array.isArray(result.data) ? result.data.slice(0, 50) : [];
        renderIssues(issues);
    } catch (err) {
        console.error('Error fetching issues:', err);
        issuesContainer.innerHTML = '<p class="text-red-500">Failed to load issues.</p>';
    } finally {
        loader.classList.add('hidden');
    }
}

// render cards
function renderIssues(issueList) {
    issuesContainer.innerHTML = '';
    issueList.forEach((issue, index) => {
      console.log('Issue status:', issue.status, 'Image path:', issue.status === 'open' ? './Open-Status.png' : './Closed-Status.png');
        const borderColorClass = issue.status === 'open' ? 'border-green-500' : 'border-purple-500';
        const card = document.createElement('div');
        card.className = `bg-white rounded-2xl shadow hover:shadow-lg border-t-4 ${borderColorClass} p-5 flex flex-col justify-between transition-all duration-200`;

        card.innerHTML = `
            <div class="flex justify-between items-start">
            <img src="${issue.status === 'open' ? './Open-Status.png' : './Closed-Status.png'}" class="w-8 h-8 rounded-full">
                <span class="text-xs font-bold px-3 py-1 rounded-full ${issue.priority === 'HIGH' ? 'bg-red-100 text-red-500' : ' bg-yellow-200 text-red-600'}">${issue.priority}</span>
            </div>
            <h3 class="text-gray-800 font-semibold text-lg mt-3  ">${issue.title}</h3>
            <p class="text-gray-500 text-sm mt-2">${issue.description}</p>
            <div class="flex gap-2 mt-3">
                ${issue.labels.map(label => `<span class="text-xs px-2 py-1 rounded-full border ${label === 'BUG' ? 'border-red-200 text-red-500 bg-red-100' : 'border-yellow-200 text-red-600 bg-red-50'}">${label}</span>`).join('')}
            </div>
            <div class="flex justify-between items-center text-gray-500 text-xs mt-4 border-t pt-2">
                <span>#${index + 1} by ${issue.author}</span>
                <span>${new Date(issue.created_at).toLocaleDateString()}</span>
            </div>
        `;
        issuesContainer.appendChild(card);
    });
}

// initial fetch
fetchIssues();