async function fetchStreamData() {
    const url = 'http://tv.dominiotv.xyz:2095/player_api.php?username=IPTVTOC20&password=Venus020&action=get_live_streams';
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayStreamData(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function displayStreamData(data) {
    const contentDiv = document.getElementById('content');

    data.forEach(stream => {
        const streamLink = document.createElement('a');
        streamLink.href = `player.html?stream_id=${stream.stream_id}`;
        streamLink.className = 'stream-info';

        streamLink.innerHTML = `
            <img src="${stream.stream_icon}" alt="${stream.name}">
            <div>
                <h2>${stream.name}</h2>
                <p><strong>Número:</strong> ${stream.num}</p>
                <p><strong>Tipo de Stream:</strong> ${stream.stream_type}</p>
                <p><strong>ID de Stream:</strong> ${stream.stream_id}</p>
                <p><strong>ID del Canal EPG:</strong> ${stream.epg_channel_id}</p>
                <p><strong>Añadido:</strong> ${new Date(stream.added * 1000).toLocaleString()}</p>
                <p><strong>ID de Categoría:</strong> ${stream.category_id}</p>
                <p><strong>IDs de Categorías:</strong> ${stream.category_ids.join(', ')}</p>
            </div>
        `;

        contentDiv.appendChild(streamLink);
    });
}

fetchStreamData();