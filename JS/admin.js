$(document).ready(function () {
    // let doctors = [
    //     { id: 1, name: "Dr. John Smith", department: "Cardiology", experience: 10 },
    //     { id: 2, name: "Dr. Jane Doe", department: "Dermatology", experience: 8 },
    //     { id: 3, name: "Dr. Adam Johnson", department: "Neurology", experience: 15 },
    //     { id: 4, name: "Dr. Emily Clark", department: "Orthopedics", experience: 12 },
        
    // ];

    let currentPage = 1;
    const rowsPerPage = 5;

    function renderTable(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = doctors.slice(start, end);
        
        $('#doctorsTable tbody').empty();
        paginatedData.forEach(doctor => {
            $('#doctorsTable tbody').append(
                `<tr>
                    <td>${doctor.id}</td>
                    <td>${doctor.name}</td>
                    <td>${doctor.department}</td>
                    <td>${doctor.experience}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteDoctor(${doctor.id})">Delete</button>
                    </td>
                </tr>`
            );
        });
    }

    window.deleteDoctor = function(id) {
        doctors = doctors.filter(doctor => doctor.id !== id);
        renderTable(currentPage);
    }

    $('#prevPage').click(function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable(currentPage);
        }
    });

    $('#nextPage').click(function() {
        if (currentPage * rowsPerPage < doctors.length) {
            currentPage++;
            renderTable(currentPage);
        }
    });

    renderTable(currentPage);
});
