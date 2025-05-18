const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
    });
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorization.split(' ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userEmail = decodedToken.email;

        const { movie, theater, date, tickets, totalPrice } = req.body;

        const msg = {
            to: userEmail,
            from: 'your-verified-sender@example.com', // Ganti dengan email terverifikasi di SendGrid
            subject: 'Invoice Reservasi Tiket Film Anda',
            text: `Terima kasih telah memesan!\n\nFilm: ${movie}\nBioskop: ${theater}\nTanggal: ${date}\nJumlah Tiket: ${tickets}\nTotal Harga: ${totalPrice}`,
            html: `<p>Terima kasih telah memesan!</p><p><strong>Film:</strong> ${movie}</p><p><strong>Bioskop:</strong> ${theater}</p><p><strong>Tanggal:</strong> ${date}</p><p><strong>Jumlah Tiket:</strong> ${tickets}</p><p><strong>Total Harga:</strong> ${totalPrice}</p>`,
        };

        await sgMail.send(msg);
        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};