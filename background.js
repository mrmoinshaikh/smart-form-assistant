/* Basic background script */
chrome.runtime.onInstalled.addListener(() => {
  console.log("Auto Form Filler installed.");
  // Initialize default storage if needed
  chrome.storage.local.get(['profiles'], (result) => {
    if (!result.profiles) {
      chrome.storage.local.set({
        profiles: [{
          id: 'default',
          name: 'Default Profile',
          data: {
            name: '',
            email: '',
            phone: '',
            address: ''
          }
        }],
        activeProfileId: 'default'
      });
    }
  });
});
