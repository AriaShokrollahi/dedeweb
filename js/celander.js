document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendarView = document.getElementById('calendar-view');
    var timeSlotsView = document.getElementById('time-slots');
    var slotsContainer = document.getElementById('slots-container');
    var confirmBtn = document.getElementById('confirm-btn');
    var selectedDate = null;
    var selectedTime = null;

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        validRange: {
            start: new Date().toISOString().split('T')[0]
        },
        dateClick: function(info) {
            selectedDate = info.dateStr;
            showTimeSlots();
        }
    });
    calendar.render();

    function showTimeSlots() {
        calendarView.style.display = 'none';
        timeSlotsView.style.display = 'flex';
        
        var formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        var timeSlotsTitle = document.querySelector('.time-slots-title');
        timeSlotsTitle.innerHTML = 'Select a Time Slot: <span class="selected-date">' + formattedDate + '</span>';
        
        generateTimeSlots(selectedDate);
    }

    window.showCalendar = function() {
        calendarView.style.display = 'flex';
        timeSlotsView.style.display = 'none';
        selectedTime = null;
        confirmBtn.style.display = 'none';
        
        // Reset the title text when returning to calendar
        var timeSlotsTitle = document.querySelector('.time-slots-title');
        timeSlotsTitle.innerHTML = 'Select a Time Slot:';
    }

    function generateTimeSlots(date) {
        slotsContainer.innerHTML = '';
        confirmBtn.style.display = 'none';

        var startHour = 9;
        var endHour = 18;
        var timeGrid = document.createElement('div');
        timeGrid.classList.add('time-grid');
        
        for (var hour = startHour; hour < endHour; hour++) {
            var slot = document.createElement('div');
            slot.innerText = (hour < 10 ? '0' : '') + hour + ':00';
            slot.classList.add('time-slot');
            slot.onclick = function() {
                document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
                selectedTime = this.innerText;
                confirmBtn.style.display = 'block';
            };
            timeGrid.appendChild(slot);
        }
        
        slotsContainer.appendChild(timeGrid);
    }

    confirmBtn.addEventListener('click', function() {
        if (selectedDate && selectedTime) {
            alert('Appointment confirmed for ' + selectedDate + ' at ' + selectedTime);
            showCalendar();
        }
    });
});