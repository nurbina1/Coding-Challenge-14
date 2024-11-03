// script.js

// Function to fetch unresolved tickets
async function fetchTickets() {
    const ticketContainer = document.getElementById('ticket-container');
    const errorMessage = document.getElementById('error-message');
    const loadingIndicator = document.getElementById('loading-indicator');
  
    try {
      // Show loading indicator
      loadingIndicator.style.display = 'block';
  
      // Fetch data from the API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      // Check if the response is OK (status code 200–299)
      if (!response.ok) {
        throw new Error('Failed to fetch tickets. Please try again later.');
      }
  
      const tickets = await response.json();
  
      // Check if there are tickets available
      if (tickets.length === 0) {
        throw new Error('No unresolved tickets available.');
      }
  
      // Clear any previous error messages and display tickets
      errorMessage.style.display = 'none';
      displayTickets(tickets);
  
    } catch (error) {
      // Display error message to the user
      errorMessage.style.display = 'block';
      errorMessage.textContent = error.message;
    } finally {
      // Hide loading indicator regardless of success or failure
      loadingIndicator.style.display = 'none';
    }
  }
  
  // Function to display tickets on the page
  function displayTickets(tickets) {
    const ticketContainer = document.getElementById('ticket-container');
    ticketContainer.innerHTML = ''; // Clear any existing content
  
    tickets.forEach(ticket => {
      const ticketElement = document.createElement('div');
      ticketElement.classList.add('ticket');
      ticketElement.innerHTML = `
        <h3>Ticket ID: ${ticket.id}</h3>
        <p><strong>Customer Name:</strong> User ${ticket.userId}</p>
        <p><strong>Issue Description:</strong> ${ticket.title}</p>
        <p><strong>Details:</strong> ${ticket.body}</p>
      `;
      ticketContainer.appendChild(ticketElement);
    });
  }
  
  // Call fetchTickets to load tickets when the page loads
  fetchTickets();
  