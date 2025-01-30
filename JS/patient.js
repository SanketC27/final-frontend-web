$(document).ready(function () {
    // Sample Doctor Data (5 Records)
    // let doctors = [
    //     { id: 1, name: "Dr. Smith", speciality: "Cardiology", experience: 10 }
    //     { id: 2, name: "Dr. Johnson", speciality: "Surgery", experience: 15 },
    //     { id: 3, name: "Dr. Adams", speciality: "Dermatology", experience: 8 },
    //     { id: 4, name: "Dr. Williams", speciality: "Neurology", experience: 12 },
    //     { id: 5, name: "Dr. Brown", speciality: "Orthopedics", experience: 9 }
    // ];

    // // Sample Appointment Data (5 Records)
    // let appointments = [
    //     { id: 101, doctorId: 1, date: "2025-02-01", time: "10:00 AM", status: "Approved" },
    //     { id: 102, doctorId: 2, date: "2025-02-03", time: "02:00 PM", status: "Pending" },
    //     { id: 103, doctorId: 3, date: "2025-02-05", time: "11:30 AM", status: "Completed" },
    //     { id: 104, doctorId: 4, date: "2025-02-07", time: "04:00 PM", status: "Cancelled" },
    //     { id: 105, doctorId: 5, date: "2025-02-10", time: "09:00 AM", status: "Pending" }
    // ];

    let doctorsPerPage = 3;
    let currentDoctorPage = 1;
    let totalDoctorPages = Math.ceil(doctors.length / doctorsPerPage);

    function populateDoctors(page = 1) {
        let filteredDoctors = doctors.filter(d => {
            return ($('#filterSpeciality').val() === "" || d.speciality === $('#filterSpeciality').val()) &&
                (d.name.toLowerCase().includes($('#searchName').val().toLowerCase()));
        });

        $('#doctorTableBody').empty();
        let start = (page - 1) * doctorsPerPage;
        let end = start + doctorsPerPage;
        let paginatedDoctors = filteredDoctors.slice(start, end);

        paginatedDoctors.forEach(d => {
            $('#doctorTableBody').append(`
                <tr>
                    <td>${d.id}</td>
                    <td>${d.name}</td>
                    <td>${d.speciality}</td>
                    <td>${d.experience}</td>
                    <td><button class='btn btn-primary book-btn' data-id='${d.id}'>Book</button></td>
                </tr>
            `);
        });

        updateDoctorPagination(filteredDoctors.length);
    }

    function updateDoctorPagination(totalDoctors) {
        totalDoctorPages = Math.ceil(totalDoctors / doctorsPerPage);
        let paginationHtml = '';

        for (let i = 1; i <= totalDoctorPages; i++) {
            paginationHtml += `<li class="page-item ${i === currentDoctorPage ? 'active' : ''}">
                                <a class="page-link doctor-page-link" href="#">${i}</a>
                               </li>`;
        }

        $('#doctorTableBody').closest('.card').find('.pagination').html(paginationHtml);
    }

    // Event listener for pagination click
    $(document).on('click', '.doctor-page-link', function () {
        currentDoctorPage = parseInt($(this).text());
        populateDoctors(currentDoctorPage);
    });

    function populateAppointments() {
        $('#appointmentTableBody').empty();

        appointments.forEach(a => {
            $('#appointmentTableBody').append(`
                <tr>
                    <td>${a.id}</td>
                    <td>${a.doctorId}</td>
                    <td>${a.date}</td>
                    <td>${a.time}</td>
                    <td>${a.status}</td>
                </tr>
            `);
        });
    }

    // Search and filter doctors dynamically
    $('#searchName, #filterSpeciality').on('input change', function () {
        currentDoctorPage = 1;
        populateDoctors();
    });

    // Book Appointment - Show Modal
    $(document).on('click', '.book-btn', function () {
        let doctorId = $(this).data('id');
        $('#selectedDoctorId').val(doctorId);
        $('#appointmentModal').modal('show');
    });

    // Confirm Booking - Show Alert
    $('#confirmBooking').click(function () {
        alert('Appointment booked successfully!');
        $('#appointmentModal').modal('hide');
    });

    // Initial Population
    populateDoctors();
    populateAppointments();
});
