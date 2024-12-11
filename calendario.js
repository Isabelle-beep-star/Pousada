const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let currentDate = new Date();
let selectedStartDate = null;
let selectedEndDate = null;

function updateCalendar() {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    document.getElementById('month-year').textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let calendarBody = document.querySelector("#calendar tbody");
    calendarBody.innerHTML = '';

    let day = 1;
    for (let i = 0; i < 6; i++) {  
        let row = document.createElement('tr');
        
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            
            if (i === 0 && j < firstDay) {
                row.appendChild(cell);
            } else if (day <= lastDate) {
                let cellDate = new Date(year, month, day); 
                cell.textContent = day;
                
                cell.addEventListener('click', () => selectDate(cellDate));
                row.appendChild(cell);
                day++;
            } else {
                row.appendChild(cell);
            }
        }
        
        calendarBody.appendChild(row);
    }
}

function selectDate(clickedDate) {
    if (!selectedStartDate || (selectedEndDate && clickedDate < selectedStartDate)) {
        selectedStartDate = clickedDate;
        selectedEndDate = null;
        document.getElementById('selected-date').textContent = `Data selecionada: ${formatDate(selectedStartDate)}`;
        highlightSelectedDate(clickedDate);
        clearHighlightRange();
        
        // Atualiza o campo oculto com a data selecionada
        document.getElementById('data').value = formatDate(selectedStartDate);  // Formato de data para enviar ao PHP
    } else if (!selectedEndDate && clickedDate >= selectedStartDate) {
        selectedEndDate = clickedDate;
        document.getElementById('selected-date').textContent = `Data selecionada: ${formatDate(selectedStartDate)} até ${formatDate(selectedEndDate)}`;
        highlightRange();
        
        // Atualiza o campo oculto com o intervalo de datas (se necessário)
        document.getElementById('data').value = formatDate(selectedStartDate) + ' até ' + formatDate(selectedEndDate);
    } else {
        alert("Selecione a data final após a data inicial.");
    }
}


function highlightSelectedDate(selectedDate) {
    let cells = document.querySelectorAll("td");
    cells.forEach(cell => cell.classList.remove('selected', 'selected-range'));
    
    let selectedCell = Array.from(cells).find(cell => 
        new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(cell.textContent)).getTime() === selectedDate.getTime()
    );
    
    if (selectedCell) selectedCell.classList.add('selected');
}

function highlightRange() {
    if (!selectedStartDate || !selectedEndDate) return;

    let cells = document.querySelectorAll("td");
    cells.forEach(cell => {
        let cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(cell.textContent));

        if (cellDate >= selectedStartDate && cellDate <= selectedEndDate) {
            if (cellDate.getTime() === selectedStartDate.getTime() || cellDate.getTime() === selectedEndDate.getTime()) {
                cell.classList.add('selected');
            } else {
                cell.classList.add('selected-range');
            }
        }
    });
}

function clearHighlightRange() {
    let cells = document.querySelectorAll("td");
    cells.forEach(cell => cell.classList.remove('selected-range'));
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`;
}

document.getElementById('prev-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

document.getElementById('prev-year').addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    updateCalendar();
});

document.getElementById('next-year').addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    updateCalendar();
});


updateCalendar();
