document.addEventListener("DOMContentLoaded", function() {
    const user_name = document.querySelector('.user-name');
    const user_email = document.querySelector('.user-email');
    const user_phone = document.querySelector('.user-phone');
    const generateCodeButton = document.querySelector('.generate-qr-code');
    const downloadButton = document.querySelector('.download-qr-code');
    let qrImage = document.querySelector('.qr-image');
    const loading = document.querySelector('.loading');

    generateCodeButton.onclick = async () => {
        qrImage.src = '';
        let name = user_name.value;
        let email = user_email.value;
        let phone = user_phone.value;
        let userData = `Name: ${name} Email: ${email} Phone: ${phone}`;
        let imgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userData}`;

        loading.style.display = 'block';
        if (name !== '' || email !== '' || phone !== '') {
            let response = await fetch(imgSrc);
            let data = await response.blob();
            qrImage.src = URL.createObjectURL(data);
            loading.style.display = 'none';

            // Enable the download button after the QR code is generated
            downloadButton.style.display = 'inline-block';
            downloadButton.onclick = () => {
                // Create a temporary anchor element for downloading
                const link = document.createElement('a');
                link.href = qrImage.src; // Set the generated QR code as the href
                link.download = 'qr-code.png'; // Set the default filename
                link.click(); // Programmatically trigger the download
            };
        } else {
            alert('Please enter valid field data!!!');
            loading.style.display = 'none';
        }

        URL.revokeObjectURL(data);
    };
});
