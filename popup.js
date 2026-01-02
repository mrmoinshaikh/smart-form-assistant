document.addEventListener('DOMContentLoaded', () => {
    const statusDiv = document.getElementById('status');
    const customFieldsContainer = document.getElementById('custom-fields-container');
    const addFieldBtn = document.getElementById('add-field-btn');

    // Load saved data
    chrome.storage.local.get(['profiles', 'activeProfileId'], (result) => {
        const activeId = result.activeProfileId || 'default';
        const profiles = result.profiles || [];
        const profile = profiles.find(p => p.id === activeId) ||
            { data: { name: '', email: '', phone: '', address: '', custom: [] } };

        document.getElementById('name').value = profile.data.name || '';
        document.getElementById('email').value = profile.data.email || '';
        document.getElementById('phone').value = profile.data.phone || '';
        document.getElementById('address').value = profile.data.address || '';

        // Load custom fields
        if (profile.data.custom) {
            profile.data.custom.forEach(field => addCustomFieldInput(field.label, field.value));
        }
    });

    // Add Field Button
    addFieldBtn.addEventListener('click', () => {
        addCustomFieldInput('', '');
    });

    function addCustomFieldInput(labelText = '', valueText = '') {
        const div = document.createElement('div');
        div.className = 'input-group custom-field-row';
        div.style.display = 'flex';
        div.style.gap = '8px';
        div.style.alignItems = 'flex-end';

        div.innerHTML = `
      <div style="flex: 1;">
        <label>Label</label>
        <input type="text" class="custom-label" placeholder="e.g. LinkedIn" value="${labelText}">
      </div>
      <div style="flex: 2;">
        <label>Value</label>
        <input type="text" class="custom-value" placeholder="Value..." value="${valueText}">
      </div>
      <button class="remove-field-btn" style="width: auto; background: #ef4444; padding: 6px 10px; height: 32px;">Del</button>
    `;

        div.querySelector('.remove-field-btn').addEventListener('click', () => {
            div.remove();
        });

        customFieldsContainer.appendChild(div);
    }

    // Save data
    document.getElementById('saveBtn').addEventListener('click', () => {
        // Collect custom fields
        const customFields = [];
        document.querySelectorAll('.custom-field-row').forEach(row => {
            const label = row.querySelector('.custom-label').value.trim();
            const value = row.querySelector('.custom-value').value.trim();
            if (label && value) {
                customFields.push({ label, value });
            }
        });

        const newData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            custom: customFields
        };

        chrome.storage.local.get(['profiles', 'activeProfileId'], (result) => {
            let profiles = result.profiles || [];
            let activeId = result.activeProfileId || 'default';

            const profileIndex = profiles.findIndex(p => p.id === activeId);

            if (profileIndex >= 0) {
                profiles[profileIndex].data = newData;
            } else {
                profiles.push({
                    id: activeId,
                    name: 'Default Profile',
                    data: newData
                });
            }

            chrome.storage.local.set({ profiles: profiles }, () => {
                statusDiv.style.display = 'block';
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 2000);
            });
        });
    });
});
