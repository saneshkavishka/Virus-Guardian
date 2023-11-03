// Function to handle the file upload event
function handleFileUpload(event) {
  const file = event.target.files[0];
  checkFile(file);
}

// Function to check malware for the uploaded file
function checkFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  // Make an AJAX request to the server-side endpoint for malware checking
  fetch('http://localhost:5000/check_malware', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(result => {
      if (result.legitimate) {
        // Display the result indicating the file is legitimate
        displayResult(`File is legitimate: ${result.message}`);
      } else {
        // Display the result indicating the file is malware
        displayResult(`File is malware: ${result.message}`);
      }
    })
    .catch(error => {
      console.error('Error occurred during malware checking:', error);
      // Handle the error, such as displaying an error message to the user
      displayResult('Error occurred during malware checking. Please try again.');
    });
}

// Function to display the result on the page
function displayResult(message) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.textContent = message;
}

document.addEventListener('DOMContentLoaded', function() {
  // Your JavaScript code here
  const fileUploadInput = document.getElementById('fileUpload');
  
  // Attach the file upload event handler
  fileUploadInput.addEventListener('change', handleFileUpload);
  
  // Attach the click event handler to the "Check for Malware" button
  const checkButton = document.getElementById('checkButton');
  checkButton.addEventListener('click', () => {
    // Trigger the file upload event programmatically
    fileUploadInput.click();
  });
});
