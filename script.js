async function convertVideo() {
    const videoLink = document.getElementById('videoLink').value.trim();
    if (videoLink) {
        const downloadContainer = document.getElementById('downloadContainer');
        downloadContainer.innerHTML = `<p>Conversion is in progress...</p>`;
        
        try {
            const response = await fetch('http://localhost:3000/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: videoLink })
            });
            
            if (response.ok) {
                const data = await response.json();
                const downloadLink = `http://localhost:3000/${data.file}`;
                downloadContainer.innerHTML = `<a href="${downloadLink}" download><button>Download MP3</button></a>`;
            } else {
                downloadContainer.innerHTML = `<p>Error converting video.</p>`;
            }
        } catch (error) {
            downloadContainer.innerHTML = `<p>Error connecting to server.</p>`;
        }
    } else {
        alert('Please enter a valid YouTube video link.');
    }
}
