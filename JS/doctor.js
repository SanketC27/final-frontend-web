$(document).ready(function () {
    // const appointments = [
    //     { id: 1, patientName: "John Doe", date: "2024-04-01", time: "10:00 AM", status: "Pending" },
    //     { id: 2, patientName: "Jane Doe", date: "2024-04-02", time: "11:30 AM", status: "Pending" },
    //     { id: 3, patientName: "Alice Brown", date: "2024-04-03", time: "1:00 PM", status: "Approved" },
    //     { id: 4, patientName: "Bob Smith", date: "2024-04-04", time: "3:00 PM", status: "Cancelled" }
    // ];
    
    let currentPage = 1;
    const rowsPerPage = 5;

    function renderTable(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = appointments.slice(start, end);
        
        $('#appointmentsTable').empty();
        paginatedData.forEach(appointment => {
            $('#appointmentsTable').append(
                `<tr>
                    <td>${appointment.id}</td>
                    <td>${appointment.patientName}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.time}</td>
                    <td id="status-${appointment.id}">${appointment.status}</td>
                    <td id="actions-${appointment.id}">
                        <button class="btn btn-success btn-sm" onclick="approveAppointment(${appointment.id})">Approve</button>
                        <button class="btn btn-danger btn-sm" onclick="cancelAppointment(${appointment.id})">Cancel</button>
                    </td>
                </tr>`
            );
        });
    }

    window.approveAppointment = function(id) {
        $(`#status-${id}`).text("Approved").css("color", "green");
        $(`#actions-${id}`).html("<span class='text-success'>Completed</span>");
    }

    window.cancelAppointment = function(id) {
        $(`#status-${id}`).text("Cancelled").css("color", "red");
        $(`#actions-${id}`).html("<span class='text-danger'>Completed</span>");
    }

    $('#prevPage').click(function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    });

    $('#nextPage').click(function() {
        if (currentPage * rowsPerPage < appointments.length) {
            currentPage++;
            renderTable(currentPage);
        }
    });

    renderTable(currentPage);
});
