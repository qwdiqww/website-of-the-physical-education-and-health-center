window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
});
async function loadContacts() {
    try {
        const response = await fetch('contacts.xml');
        if (!response.ok) throw new Error('XML не найден');

        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        const contacts = xmlDoc.getElementsByTagName("contact");
        const container = document.getElementById('footer-contacts');

        if (!container) return;

        let html = '<h2>Контакты</h2>';

        for (let contact of contacts) {
            const type = contact.getElementsByTagName('type')[0].textContent.trim();
            const value = contact.getElementsByTagName('value')[0].textContent.trim();

            const label = getLabel(type);
            html += `<p><strong>${label}:</strong> ${value}</p>`;
        }

        container.innerHTML = html;

    } catch (error) {
        console.error('Ошибка загрузки контактов:', error);
        document.getElementById('footer-contacts').innerHTML = `
            <h2>Контакты</h2>
            <p>Не удалось загрузить контакты</p>
        `;
    }
}

// Функция с подписями
function getLabel(type) {
    const labels = {
        'phone': 'Телефон',
        'email': 'Email',
        'instagram': 'Instagram'
    };
    return labels[type] || type;
}

document.addEventListener('DOMContentLoaded', loadContacts);