function extractEmails() {
    const emails = document.body.textContent.match(/\S+@\S+\.\S+/g);
    if (emails) {
        const uniqueEmails = new Set(emails.map(email => email.toLowerCase()));
    
        console.log('Extracted unique emails (lowercase):', Array.from(uniqueEmails));
        chrome.runtime.sendMessage({ emails: Array.from(uniqueEmails) });
    } else {
        console.log('No emails found.');
        chrome.runtime.sendMessage({ emails: [] });
    }
}
  
extractEmails();