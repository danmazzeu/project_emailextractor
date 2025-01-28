document.getElementById('extractButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id }, 
            files: ['content.js']
        });
    });
});
  
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.emails) {
        const emailList = document.getElementById('emailList');
        emailList.value = request.emails.join('\n');
        document.getElementById('downloadButton').disabled = false;

        // Count emails and display the count
        const emailCount = request.emails.length;
        const emailCountDisplay = document.getElementById('emailCount');
        emailCountDisplay.style.display = "flex";
        emailCountDisplay.textContent = `${emailCount} e-mail(s) extraído(s)`;
    }
});
  
function downloadCSV(emails) {
    const csvContent = "data:text/csv;charset=utf-8," + emails.map(email => email).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "emails.csv");
    document.body.appendChild(link);
    link.click();
}
  
document.getElementById('downloadButton').addEventListener('click', () => {
    const emailList = document.getElementById('emailList').value.split('\n');
    downloadCSV(emailList);
});
