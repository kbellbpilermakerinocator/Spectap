import trades from './trades.js';

let currentTrade = null;
let answers = {};

function renderHome() {
  const container = document.getElementById('home');
  container.innerHTML = trades.map(trade => `
    <div onclick="startEstimator('${trade.id}')" class="trade-card card bg-base-100 shadow-xl cursor-pointer">
      <div class="card-body">
        <div class="text-6xl mb-4">${trade.icon}</div>
        <h2 class="card-title">${trade.name}</h2>
        <p class="text-base-content/70">${trade.description}</p>
      </div>
    </div>
  `).join('');
}

function startEstimator(id) {
  currentTrade = trades.find(t => t.id === id);
  answers = {};
  document.getElementById('home').classList.add('hidden');
  document.getElementById('estimator').classList.remove('hidden');
  
  document.getElementById('trade-title').textContent = currentTrade.name;
  renderQuestions();
}

function renderQuestions() {
  const container = document.getElementById('questions');
  container.innerHTML = currentTrade.questions.map((q, index) => {
    let inputHTML = '';
    if (q.type === 'select') {
      inputHTML = `<select onchange="updateAnswer('${q.key}', this.value)" class="select select-bordered w-full">
        <option value="">Select...</option>
        ${q.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
      </select>`;
    } else if (q.type === 'number' || q.type === 'range') {
      inputHTML = `<input type="${q.type}" ${q.min ? `min="${q.min}"` : ''} ${q.max ? `max="${q.max}"` : ''} 
        value="${q.value || ''}" onchange="updateAnswer('${q.key}', this.value)" 
        class="input input-bordered w-full" placeholder="${q.placeholder || ''}">`;
    } else if (q.type === 'checkbox') {
      inputHTML = `<input type="checkbox" onchange="updateAnswer('${q.key}', this.checked)" class="checkbox">`;
    } else if (q.type === 'textarea') {
      inputHTML = `<textarea onchange="updateAnswer('${q.key}', this.value)" class="textarea textarea-bordered w-full h-24"></textarea>`;
    }
    
    return `
      <div>
        <label class="label"><span class="label-text font-medium">${q.label}</span></label>
        ${inputHTML}
      </div>
    `;
  }).join('');
}

function updateAnswer(key, value) {
  answers[key] = value;
  generateSpec();
}

function generateSpec() {
  let spec = `JOB SPECIFICATION - ${currentTrade.name}\n`;
  spec += `Date: ${new Date().toLocaleDateString('en-AU')}\n`;
  spec += `Location: Perth, Western Australia\n\n`;
  
  currentTrade.questions.forEach(q => {
    if (answers[q.key] !== undefined && answers[q.key] !== '') {
      spec += `${q.label}: ${answers[q.key]}\n`;
    }
  });
  
  if (answers.notes) spec += `\nAdditional Notes:\n${answers.notes}\n`;
  
  spec += `\nPlease provide a fixed-price quote based on the exact scope above.\n`;
  spec += `Contact me for any clarifications.\n`;

  document.getElementById('spec-output').textContent = spec;
}

function copySpec() {
  const text = document.getElementById('spec-output').textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ Spec copied to clipboard! Paste it into your message or email.');
  });
}

function downloadPDF() {
  const text = document.getElementById('spec-output').textContent;
  const win = window.open('', '_blank');
  win.document.write(`
    <html><head><title>Job Spec - ${currentTrade.name}</title></head>
    <body style="font-family: Arial; padding: 40px; line-height: 1.6;">
      <pre style="white-space: pre-wrap;">${text}</pre>
    </body></html>
  `);
  win.document.close();
  setTimeout(() => win.print(), 500);
}

function shareLink() {
  // Simple URL param sharing (you can enhance with base64 later)
  const params = new URLSearchParams({ trade: currentTrade.id, data: JSON.stringify(answers) });
  const shareUrl = `${window.location.origin}${window.location.pathname}?${params}`;
  navigator.clipboard.writeText(shareUrl).then(() => {
    alert(`🔗 Shareable link copied!\n\nAnyone with this link can see the pre-filled spec.`);
  });
}

function backToHome() {
  document.getElementById('estimator').classList.add('hidden');
  document.getElementById('home').classList.remove('hidden');
}

// Load on start
window.onload = () => {
  renderHome();
  
  // Optional: load from URL params for shareable links
  const params = new URLSearchParams(window.location.search);
  if (params.has('trade')) {
    // You can add restore logic here if you want
  }
};
