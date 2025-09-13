// Listen for the hotkey command
chrome.commands.onCommand.addListener((command) => {
    if (command === 'track-job') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: extractAndSendJobData
        });
      });
    }
  });
  
  // Function to extract job data (injected into page)
  function extractAndSendJobData() {
    const jobData = extractJobData();
    if (jobData) {
      chrome.runtime.sendMessage({ action: 'trackJob', data: jobData });
    }
  }