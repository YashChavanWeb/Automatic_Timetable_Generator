const subjects = ['CN', 'DLCOA', 'ADBMS', 'SE', 'TCS', 'PCE-2'];
const labSubjects = ['L-CN', 'L-DLCOA', 'L-SE', 'L-PCE-2', 'Mini Project'];
const teachers = ['Priti Rumao', 'Dr.Dinesh Patil', 'Smita Jawale', 'Soniya Khatu', 'Swapna Borde', 'Dr.Aashi Cynth'];

const lec_rooms = [215, 216, 218, 219, 313, 314, 417, 418];
const lab_rooms = [1, 2, 3, 4, 5, 6];

const divisions = ['TE1', 'TE2', 'TE3']; // Divisions
const faculties = [
    { faculty_name: "Dr.Dinesh Patil", teaching_subjects: ["OS", "SE", "L-SE"] },
    { faculty_name: "Dr.Priti Rumao", teaching_subjects: ["TCS", "CP", "L-CN"] },
    { faculty_name: "Dr.Swapna Borde", teaching_subjects: ["DLCOA", "AOA", "L-DLCOA"] },
    { faculty_name: "Dr.Sonia Khatu", teaching_subjects: ["MP", "CG", "CN", "L-CN"] },
    { faculty_name: "Dr.Smita Jawale", teaching_subjects: ["DBMS", "ADBMS"] },
    { faculty_name: "Dr.Aashi Cynth", teaching_subjects: ["PCE-2", "L-PCE-2"] },
    { faculty_name: "External", teaching_subjects: ["Mini Project"] }
];

const subjectToFacultyMap = {};
faculties.forEach(faculty => {
    faculty.teaching_subjects.forEach(subject => {
        subjectToFacultyMap[subject] = faculty.faculty_name;
    });
});

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const columns = 9; // Including breaks

// Function to shuffle the array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Function to assign rooms (either lecture or lab rooms)
function assignRoom(isLab) {
    if (isLab) {
        return lab_rooms[Math.floor(Math.random() * lab_rooms.length)];
    } else {
        return lec_rooms[Math.floor(Math.random() * lec_rooms.length)];
    }
}

// Function to shift null values to the right in a row (excluding breaks)
function shiftNullsToRight(row) {
    // Exclude break slots (2 and 5)
    const nonBreakSlots = row.filter((_, idx) => idx !== 2 && idx !== 5);
    const nonNullValues = nonBreakSlots.filter(slot => slot[0] !== null);
    const nullValuesCount = nonBreakSlots.length - nonNullValues.length;

    // Create a new array with non-null values followed by nulls
    const newRow = [...nonNullValues, ...new Array(nullValuesCount).fill([null, null, null])];

    // Now, reconstruct the row by placing the break slots (index 2 and 5) back in the same positions
    const finalRow = row.map((slot, idx) => {
        if (idx === 2 || idx === 5) {
            return slot; // Keep breaks as they are
        } else {
            return newRow.shift();
        }
    });

    return finalRow;
}

// Function to generate timetable for a division
function generateTimetableForDivision(division) {
    const matrix = [];
    const subjectCounts = {}; // Track the count of each subject
    subjects.forEach(subject => (subjectCounts[subject] = 0));

    for (let i = 0; i < daysOfWeek.length; i++) {
        // const row = new Array(columns).fill([null, null, null]);
        const row = new Array(columns).fill([null, null]);
        const shuffledSubjects = [...subjects];
        shuffleArray(shuffledSubjects);

        let subjectIndex = 0;
        const rowUsedSubjects = new Set();

        // Assign lab subject for the day
        const labSubject = labSubjects[i % labSubjects.length];
        const labTeacher = subjectToFacultyMap[labSubject];

        const availableSlots = [0, 1, 3, 4, 6, 7, 8];
        let consecutiveSlots = [];

        // Try to assign consecutive slots for lab subjects
        while (consecutiveSlots.length === 0) {
            const randomSlotIndex = Math.floor(Math.random() * availableSlots.length);
            const firstSlot = availableSlots[randomSlotIndex];

            if (availableSlots.includes(firstSlot + 1)) {
                consecutiveSlots = [firstSlot, firstSlot + 1];
            } else {
                availableSlots.splice(randomSlotIndex, 1);
            }

            if (availableSlots.length === 0) {
                throw new Error("No consecutive slots available for lab subjects.");
            }
        }

        // Assign lab subject to consecutive slots
        const labRoom = assignRoom(true);
        row[consecutiveSlots[0]] = [labSubject, labTeacher, labRoom];
        row[consecutiveSlots[1]] = [labSubject, labTeacher, labRoom];
        rowUsedSubjects.add(labSubject);

        // Now assign lecture subjects to the remaining available slots
        const lectureSlots = [];
        for (let j = 0; j < columns; j++) {
            if (j === 2 || j === 5) continue; // Skip breaks (index 2 and 5)
            if (row[j][0] === null) {
                lectureSlots.push(j); // Collect available lecture slots
            }
        }

        // Fill lecture slots without leaving gaps
        let emptySlots = lectureSlots.length;
        for (let j = 0; j < lectureSlots.length; j++) {
            if (subjectIndex < shuffledSubjects.length && emptySlots > 0) {
                let subject;
                let attempts = 0;
                do {
                    subject = shuffledSubjects[subjectIndex];
                    subjectIndex++;
                    attempts++;
                    if (attempts > shuffledSubjects.length) break; // Avoid infinite loop
                } while (
                    rowUsedSubjects.has(subject) || subjectCounts[subject] >= 3
                );

                // Place the subject in the slot if it's available and hasn't been used 3 times
                if (subject && subjectCounts[subject] < 3) {
                    const room = assignRoom(false);
                    row[lectureSlots[j]] = [subject, subjectToFacultyMap[subject], room];
                    subjectCounts[subject]++;
                    rowUsedSubjects.add(subject);
                }
            } else {
                // If there are still empty slots, just leave them empty
                row[lectureSlots[j]] = [null, null, null];
                emptySlots--;
            }
        }

        // Shift null values to the right for the row
        const shiftedRow = shiftNullsToRight(row);

        // Ensure that the row is not entirely blank (if no subjects assigned, fallback)
        if (shiftedRow.every(slot => slot[0] === null)) {
            const randomSlot = Math.floor(Math.random() * columns);
            const fallbackSubject = shuffledSubjects[subjectIndex % shuffledSubjects.length];
            const fallbackRoom = assignRoom(false);
            shiftedRow[randomSlot] = [fallbackSubject, subjectToFacultyMap[fallbackSubject], fallbackRoom];
        }

        matrix.push(shiftedRow);
    }

    return matrix;
}


// Function to render the timetable in the HTML container
function renderTimetable(division, matrix) {
    const timetableContainer = document.getElementById('timetable-container');
    if (!timetableContainer) {
        console.error('Container not found!');
        return;
    }

    const timetableBody = document.createElement('table');
    timetableBody.classList.add('timetable');

    const timetableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Day/Time</th>
        <th>9:00 AM - 10:00 AM</th>
        <th>10:00 AM - 11:00 AM</th>
        <th>11:00 AM - 11:15 AM</th>
        <th>11:15 AM - 12:15 PM</th>
        <th>12:15 PM - 1:15 PM</th>
        <th>1:15 PM - 2:00 PM</th>
        <th>2:00 PM - 3:00 PM</th>
        <th>3:00 PM - 4:00 PM</th>
        <th>4:00 PM - 5:00 PM</th>
    `;
    timetableHeader.appendChild(headerRow);
    timetableBody.appendChild(timetableHeader);

    matrix.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');

        // Create the first cell for the day
        const dayCell = document.createElement('td');
        dayCell.textContent = daysOfWeek[rowIndex];
        tr.appendChild(dayCell);

        let colIndex = 0;
        while (colIndex < row.length) {
            const [currentSubject, currentTeacher, currentRoom] = row[colIndex];

            if (currentSubject === null) {
                // Handle empty cells
                const emptyCell = document.createElement('td');
                emptyCell.classList.add('empty-cell');
                tr.appendChild(emptyCell);
                colIndex++;
                continue;
            }

            // Determine the span for consecutive same-subject cells
            let colspan = 1;
            while (
                colIndex + colspan < row.length &&
                row[colIndex + colspan][0] === currentSubject &&
                row[colIndex + colspan][1] === currentTeacher &&
                row[colIndex + colspan][2] === currentRoom
            ) {
                colspan++;
            }

            // Create a cell for the current subject
            const td = document.createElement('td');
            if (colspan > 1) {
                td.setAttribute('colspan', colspan);
            }

            const subjectCell = document.createElement('div');
            subjectCell.classList.add('subject-cell');

            const subjectName = document.createElement('div');
            subjectName.classList.add('subject-name');
            subjectName.textContent = currentSubject;

            const teacherName = document.createElement('div');
            teacherName.classList.add('teacher-name');
            teacherName.textContent = currentTeacher;

            const roomNumber = document.createElement('div');
            roomNumber.classList.add('room-number');
            roomNumber.textContent = `Room: ${currentRoom}`;

            subjectCell.appendChild(subjectName);
            subjectCell.appendChild(teacherName);
            subjectCell.appendChild(roomNumber);
            td.appendChild(subjectCell);

            tr.appendChild(td);

            // Skip over the merged columns
            colIndex += colspan;
        }

        timetableBody.appendChild(tr);
    });

    const divisionHeading = document.createElement('h2');
    divisionHeading.textContent = `${division} Timetable`;
    timetableContainer.appendChild(divisionHeading);
    timetableContainer.appendChild(timetableBody);
}

// Function to generate and render timetables for all divisions
function generateAndRenderAllTimetables() {
    // Clear existing content
    const timetableContainer = document.getElementById('timetable-container');
    if (timetableContainer) {
        timetableContainer.innerHTML = ''; // Clear any previously rendered
        // content in the container
    }

    // Generate timetable for each division and render it
    divisions.forEach(division => {
        const timetableMatrix = generateTimetableForDivision(division);
        renderTimetable(division, timetableMatrix);
    });
}

// Trigger timetable generation on page load or button click
document.addEventListener('DOMContentLoaded', () => {
    generateAndRenderAllTimetables();
});
