const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const bannerPath = path.join(__dirname, '../assets/banner.svg');
const content = fs.readFileSync(bannerPath, 'utf8');

try {
    const dom = new JSDOM(content, { contentType: 'image/svg+xml' });
    const errors = dom.window.document.querySelector('parsererror');
    if (errors) {
        console.error('XML Parser Error:', errors.textContent);
    } else {
        console.log('SVG XML is perfectly valid!');
    }
} catch (err) {
    console.error('Failed to parse XML:', err.message);
}
