let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

function saveTickets() {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

function createTicket() {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const priority = document.getElementById("priority").value;

  const ticket = {
    id: Date.now(),
    title,
    desc,
    priority,
    status: "Open",
    assigned: "Unassigned"
  };

  tickets.push(ticket);
  saveTickets();
  displayTickets();
}

function changeStatus(id) {
  const ticket = tickets.find(t => t.id === id);
  if (ticket.status === "Open") ticket.status = "In Progress";
  else if (ticket.status === "In Progress") ticket.status = "Resolved";
  else ticket.status = "Closed";

  saveTickets();
  displayTickets();
}

function displayTickets() {
  const container = document.getElementById("tickets");
  container.innerHTML = "";

  tickets.forEach(ticket => {
    container.innerHTML += `
      <div class="ticket">
        <h3>${ticket.title}</h3>
        <p>${ticket.desc}</p>
        <p>Priority: ${ticket.priority}</p>
        <p>Status: ${ticket.status}</p>
        <button onclick="changeStatus(${ticket.id})">Change Status</button>
      </div>
    `;
  });
}

displayTickets();