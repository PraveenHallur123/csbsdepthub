// Theme Toggle
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Dynamic Content Loader
class ContentManager {
    constructor() {
        this.notes = [
            { name: "DBMS Chapter 4", date: "2023-10-15", link: "assets/pdfs/dbms-ch4.pdf" },
            { name: "AI Module 3", date: "2023-10-14", link: "assets/pdfs/ai-mod3.pdf" }
        ];

        this.events = [
            { name: "Tech Symposium 2023", date: "2023-11-05", location: "Auditorium" },
            { name: "Project Submission", date: "2023-10-25", location: "CSBS Dept." }
        ];
    }

    loadNotes() {
        const container = document.getElementById('latestNotes');
        this.notes.forEach(note => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${note.link}" class="note-link">
                    ${note.name}
                    <span class="update-date">${note.date}</span>
                </a>
            `;
            container.appendChild(li);
        });
    }

    loadEvents() {
        const container = document.getElementById('upcomingEvents');
        this.events.forEach(event => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="event-item">
                    <h4>${event.name}</h4>
                    <p class="event-date">${event.date}</p>
                    <p class="event-location">${event.location}</p>
                </div>
            `;
            container.appendChild(li);
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const contentManager = new ContentManager();
    contentManager.loadNotes();
    contentManager.loadEvents();

    // Set saved theme
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }
});

// Search Functionality
function searchNotes(query) {
    const notes = document.querySelectorAll('.note-card');
    notes.forEach(note => {
        const text = note.innerText.toLowerCase();
        note.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

// Timetable Generator
function generateTimetable() {
    const timetableData = {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        subjects: {
            '9:00-10:00': ['DBMS', 'AI', 'OS', 'Networking', 'Project'],
            '10:00-11:00': ['Web Dev', 'Business Mgmt', 'DSA', 'Cloud Computing', 'Seminar'],
            // Add more time slots...
        }
    };

    const table = document.createElement('table');
    table.className = 'timetable';
    
    // Create table headers
    const headerRow = table.insertRow();
    headerRow.insertCell().textContent = 'Time/Day';
    timetableData.days.forEach(day => {
        headerRow.insertCell().textContent = day;
    });

    // Create table body
    Object.entries(timetableData.subjects).forEach(([time, subjects]) => {
        const row = table.insertRow();
        row.insertCell().textContent = time;
        subjects.forEach(subject => {
            const cell = row.insertCell();
            cell.textContent = subject;
            cell.className = 'subject-cell';
        });
    });

    document.querySelector('.timetable-container').appendChild(table);
}

// Initialize Timetable
if (window.location.pathname.includes('timetable.html')) {
    generateTimetable();
}