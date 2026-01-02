let activeOverlay = null;
let lastActiveField = null;

// Heuristic field detection
function detectFieldType(element) {
    const type = element.type;
    const name = element.name?.toLowerCase() || '';
    const id = element.id?.toLowerCase() || '';
    const placeholder = element.placeholder?.toLowerCase() || '';
    const label = getLabelText(element).toLowerCase();

    const combined = `${name} ${id} ${placeholder} ${label}`;

    if (combined.includes('email')) return 'email';
    if (combined.includes('phone') || combined.includes('mobile')) return 'phone';
    if (combined.includes('name') || combined.includes('first name') || combined.includes('fullname')) return 'name';
    if (combined.includes('address') || combined.includes('street')) return 'address';

    return 'generic';
}

function getLabelText(element) {
    if (element.labels && element.labels.length > 0) {
        return element.labels[0].innerText;
    }
    return '';
}

function createOverlay(field, profileData) {
    // Remove existing overlay
    if (activeOverlay) {
        activeOverlay.remove();
    }

    const isRestricted = window.location.hostname.includes('docs.google.com');
    const fieldType = detectFieldType(field);
    let suggestions = [];

    // Map field type to profile data
    if (fieldType === 'email') suggestions.push({ label: 'Email', value: profileData.email });
    else if (fieldType === 'phone') suggestions.push({ label: 'Phone', value: profileData.phone });
    else if (fieldType === 'name') suggestions.push({ label: 'Name', value: profileData.name });
    else if (fieldType === 'address') suggestions.push({ label: 'Address', value: profileData.address });
    else {
        // Show all if generic or unmatched
        if (profileData.email) suggestions.push({ label: 'Email', value: profileData.email });
        if (profileData.name) suggestions.push({ label: 'Name', value: profileData.name });
        if (profileData.phone) suggestions.push({ label: 'Phone', value: profileData.phone });
    }

    // Add Custom Fields
    if (profileData.custom) {
        let customs = [];
        if (Array.isArray(profileData.custom)) {
            customs = profileData.custom;
        } else if (typeof profileData.custom === 'object') {
            // Handle potential edge case where it's an object/map
            customs = Object.values(profileData.custom);
        }

        console.log('AutoForm: Found custom fields:', customs.length);

        customs.forEach(cf => {
            if (cf && cf.label && cf.value) {
                suggestions.push({ label: cf.label, value: cf.value });
            }
        });
    }

    // Filter out empty values and duplicates
    const seen = new Set();
    suggestions = suggestions.filter(s => {
        if (!s.value || s.value.length === 0) return false;
        const key = `${s.label}:${s.value}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    if (suggestions.length === 0) return; // No data to show

    const overlay = document.createElement('div');
    overlay.className = 'auto-form-overlay';

    // Calculate position
    const rect = field.getBoundingClientRect();
    overlay.style.top = `${window.scrollY + rect.bottom + 5}px`;
    overlay.style.left = `${window.scrollX + rect.left}px`;

    // Content
    const header = document.createElement('div');
    header.className = 'auto-form-header';
    header.innerHTML = `<span>AutoFill (${fieldType})</span> <button style="border:none;background:none;cursor:pointer;" id="close-af">✕</button>`;

    if (isRestricted) {
        const warning = document.createElement('span');
        warning.className = 'auto-form-warning';
        warning.innerText = 'Restricted site: Copy only.';
        header.appendChild(warning);
    }

    overlay.appendChild(header);

    suggestions.forEach(item => {
        const row = document.createElement('div');
        row.className = 'auto-form-item';

        // Check if we can insert or if we must copy
        const canInsert = !isRestricted;

        row.innerHTML = `
      <div class="auto-form-value" title="${item.value}"><strong>${item.label}:</strong> ${item.value}</div>
      <div class="auto-form-actions">
        <button class="auto-form-btn copy-btn" title="Copy to Clipboard">📋</button>
        ${canInsert ? `<button class="auto-form-btn insert-btn" title="Insert">✏</button>` : ''}
      </div>
    `;

        // Event listeners
        const copyBtn = row.querySelector('.copy-btn');
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent closing immediately
            navigator.clipboard.writeText(item.value).then(() => {
                copyBtn.innerText = '✔';
                setTimeout(() => copyBtn.innerText = '📋', 1000);
            });
        });

        if (canInsert) {
            const insertBtn = row.querySelector('.insert-btn');
            insertBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                insertValue(field, item.value);
                overlay.remove();
            });
            // Allow clicking the whole row to insert if allowed
            row.addEventListener('click', () => {
                insertValue(field, item.value);
                overlay.remove();
            });
        }

        overlay.appendChild(row);
    });

    document.body.appendChild(overlay);
    activeOverlay = overlay;

    overlay.querySelector('#close-af').addEventListener('click', (e) => {
        e.stopPropagation();
        overlay.remove();
        activeOverlay = null;
    });
}

function insertValue(field, value) {
    field.value = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
}

// Global Listeners
document.addEventListener('focusin', async (e) => {
    const target = e.target;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        lastActiveField = target;
        // Retrieve data
        const result = await chrome.storage.local.get(['profiles', 'activeProfileId']);
        if (result.profiles) {
            const activeId = result.activeProfileId || 'default';
            const profile = result.profiles.find(p => p.id === activeId);
            if (profile && profile.data) {
                console.log('AutoForm: Loaded profile data', profile.data);
                createOverlay(target, profile.data);
            }
        }
    }
}, true); // Capture phase to see focus

// Click listener to re-show if needed or handle cases where focus doesn't trigger
document.addEventListener('click', (e) => {
    if (activeOverlay && !activeOverlay.contains(e.target) && e.target !== lastActiveField) {
        activeOverlay.remove();
        activeOverlay = null;
    }
});
