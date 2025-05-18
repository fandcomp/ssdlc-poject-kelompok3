// Firebase configuration (Ganti dengan konfigurasi Anda dari Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAxljg9my76Gg0uO9cqUC3nrB1HV-joiug",
  authDomain: "ssdlc-project-kelompok3.firebaseapp.com",
  projectId: "ssdlc-project-kelompok3",
  storageBucket: "ssdlc-project-kelompok3.firebasestorage.app",
  messagingSenderId: "602078438128",
  appId: "1:602078438128:web:9096c3e59399034b8ed835",
  measurementId: "G-61RSRTMQ6B"
};
firebase.initializeApp(firebaseConfig);

// Set tanggal minimum pada date picker
document.addEventListener('DOMContentLoaded', function() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById("date").setAttribute('min', today);
});

// Pantau status autentikasi
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('booking').style.display = 'block';
    } else {
        document.getElementById('auth').style.display = 'block';
        document.getElementById('booking').style.display = 'none';
    }
});

// Fungsi login
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Logged in:', userCredential.user);
        })
        .catch((error) => {
            console.error('Login error:', error);
            alert('Login gagal: ' + error.message);
        });
}

// Fungsi registrasi
function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Registered:', userCredential.user);
        })
        .catch((error) => {
            console.error('Registration error:', error);
            alert('Registrasi gagal: ' + error.message);
        });
}

// Fungsi utama untuk menampilkan detail pesanan
function Main() {
    const movie = document.getElementById("movie_name").value;
    const theater = document.getElementById("theaters").value;
    const date = document.getElementById("date").value;
    const tickets = document.getElementById("tickets_quantity").value;

    if (!movie || !theater || !date || !tickets) {
        alert("Harap isi semua field!");
        return;
    }

    document.getElementById("movie_name_booked").innerHTML = movie;
    document.getElementById("theater").innerHTML = theater;
    document.getElementById("date_booked").innerHTML = new Date(date).toLocaleDateString();
    document.getElementById("tickets_booked").innerHTML = tickets;
    document.getElementById("total_price_view").innerHTML = "$" + (tickets * 5);
    document.getElementById("button2").style.display = "inline";
}

// Fungsi untuk mengirim invoice melalui email
function myFunction() {
    const user = firebase.auth().currentUser;
    if (user) {
        user.getIdToken().then((idToken) => {
            const movie = document.getElementById('movie_name_booked').innerText;
            const theater = document.getElementById('theater').innerText;
            const date = document.getElementById('date_booked').innerText;
            const tickets = document.getElementById('tickets_booked').innerText;
            const totalPrice = document.getElementById('total_price_view').innerText;

            fetch('/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}`
                },
                body: JSON.stringify({
                    movie,
                    theater,
                    date,
                    tickets,
                    totalPrice,
                    email: user.email
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Invoice telah dikirim ke email Anda.');
                    location.reload();
                } else {
                    alert('Gagal mengirim invoice.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error mengirim invoice.');
            });
        });
    } else {
        alert('Anda harus login untuk memesan tiket.');
    }
}

// Fungsi untuk mengganti gambar film (opsional, sesuaikan jika ada)
function changeMovie_Img() {
    // Implementasi jika diperlukan
}
