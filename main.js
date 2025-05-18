// Tetapkan nilai minimum tanggal di datepicker sebagai hari ini
var today = new Date().toISOString().split('T')[0];
document.getElementById("date").setAttribute('min', today);

function Main() {
    // Validasi format email
    var email_format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Validasi hanya angka bulat
    var whole_num = /^[1-9]+$/;

    if (document.getElementById("movie_name").value === "") {
        alert("Silakan pilih film!");
        return;
    }
    if (document.getElementById("theaters").value === "") {
        alert("Silakan pilih ruang bioskop!");
        return;
    }
    if (document.getElementById("date").value === "") {
        alert("Silakan pilih tanggal!");
        return;
    }
    if (document.getElementById("date").value < today) {
        alert("Tanggal tidak valid!");
        return;
    }
    if (document.getElementById("email").value === "") {
        alert("Silakan berikan email!");
        return;
    } else {
        if (!email_format.test(document.getElementById("email").value)) {
            alert("Silakan berikan email yang valid!");
            return;
        }
    }
    if (document.getElementById("tickets_quantity").value === "") {
        alert("Silakan tentukan jumlah tiket!");
        return;
    } else {
        if (!whole_num.test(document.getElementById("tickets_quantity").value)) {
            alert("Silakan tentukan jumlah tiket yang benar!");
            return;
        }
    }

    // Ambil tanggal yang dipilih pengguna
    var date = new Date(document.getElementById("date").value);

    if (document.getElementById("movie_name").value !== "" && document.getElementById("theaters").value !== "" && document.getElementById("date").value !== "" && document.getElementById("email").value !== "" && document.getElementById("tickets_quantity").value !== "") {
        document.getElementById("movie_name_booked").innerHTML = document.getElementById("movie_name").value;
        document.getElementById("theater").innerHTML = document.getElementById("theaters").value;
        document.getElementById("date_booked").innerHTML = date.toLocaleDateString();
        document.getElementById("email_booked").innerHTML = document.getElementById("email").value;
        document.getElementById("tickets_booked").innerHTML = document.getElementById("tickets_quantity").value;

        // Total biaya (misalnya $5 per tiket)
        var quantity = document.getElementById("tickets_quantity").value;
        document.getElementById("total_price_view").innerHTML = quantity * 5;

        // Tampilkan tombol kedua
        document.getElementById("button2").style.display = "inline";
    }
}

function myFunction() {
    var r = confirm("Reservasi tiket untuk film yang diberikan?");
    if (r === true) {
        location.reload();
    }
}