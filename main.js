 const issuesContainer = document.getElementById("issues-container");
const loader = document.getElementById("loader");

const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");

const openCount = document.getElementById("open-count");
const closedCount = document.getElementById("closed-count");
const issueCount = document.getElementById("issue-count");

const searchInput = document.getElementById("search-input");
const issueModal = document.getElementById("issue-modal");
const modalClose = document.getElementById("modal-close");

// modal fields
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalStatus = document.getElementById("modal-status");
const modalPriority = document.getElementById("modal-priority");
const modalAuthor = document.getElementById("modal-author");
const modalLabel = document.getElementById("modal-label");
const modalDate = document.getElementById("modal-date");

let allIssues = [];

// ====== FETCH ALL ISSUES ======
async function fetchIssues() {
  loader.classList.remove("hidden");
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  allIssues = data.data;
  updateCounts();
  showIssues(allIssues);
  loader.classList.add("hidden");
}

// ====== UPDATE COUNTS ======
function updateCounts() {
  const open = allIssues.filter(i => i.status === "open").length;
  const closed = allIssues.filter(i => i.status === "closed").length;
  issueCount.textContent = `${allIssues.length} Issues`;
  openCount.textContent = `Open (${open})`;
  closedCount.textContent = `Closed (${closed})`;
}

// ====== SHOW ISSUES ======
function showIssues(list) {
  issuesContainer.innerHTML = list.map(issue => {
    const color = issue.status === "open" ? "border-green-500" : "border-purple-500";
    const icon = issue.status === "open" ? "./Open-Status.png" : "./Closed-Status.png";
    const labels = (issue.labels || []).map(l => `<span class="text-xs px-2 py-1 rounded-full border">${l}</span>`).join("");
    
    return `
      <div class="bg-white rounded-xl shadow-sm border-t-4 p-4 space-y-3 hover:shadow-md transition ${color}" data-id="${issue.id}">
        <div class="flex justify-between items-center">
          <img src="${icon}" class="w-6 h-6">
          <span class="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-500">${issue.priority}</span>
        </div>
        <h3 class="font-semibold text-gray-800">${issue.title}</h3>
        <p class="text-sm text-gray-500">${issue.description}</p>
        <div class="flex gap-2">${labels}</div>
        <div class="flex justify-between text-xs text-gray-400 pt-2 border-t">
          <span>#${issue.id} by ${issue.author}</span>
          <span>${issue.created_at}</span>
        </div>
      </div>
    `;
  }).join("");

  // ====== ADD CLICK FOR MODAL ======
  document.querySelectorAll("#issues-container > div").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      const issue = allIssues.find(i => i.id == id);
      if(issue){
        modalTitle.textContent = issue.title;
        modalDescription.textContent = issue.description;
        modalStatus.textContent = issue.status;
        modalPriority.textContent = issue.priority;
        modalAuthor.textContent = issue.author;
        modalLabel.textContent = issue.labels?.join(", ") || "None";
        modalDate.textContent = issue.created_at;
        issueModal.showModal();
      }
    });
  });
}

// ====== TAB ACTIVE ======
function setActive(btn) {
  [btnAll, btnOpen, btnClosed].forEach(b => {
    b.classList.remove("bg-[#5D00FF]", "text-white");
    b.classList.add("text-gray-500", "bg-white");
  });
  btn.classList.add("bg-[#5D00FF]", "text-white");
}

// ====== FILTER ======
btnAll.addEventListener("click", () => { setActive(btnAll); showIssues(allIssues); });
btnOpen.addEventListener("click", () => { setActive(btnOpen); showIssues(allIssues.filter(i => i.status==="open")); });
btnClosed.addEventListener("click", () => { setActive(btnClosed); showIssues(allIssues.filter(i => i.status==="closed")); });

// ====== SEARCH ON TYPE ======
searchInput.addEventListener("input", async () => {
  const text = searchInput.value;
  loader.classList.remove("hidden");
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`);
  const data = await res.json();
  showIssues(data.data);
  loader.classList.add("hidden");
});

// ====== MODAL CLOSE ======
modalClose.addEventListener("click", () => {
  issueModal.close();
});

// ====== INIT ======
fetchIssues();