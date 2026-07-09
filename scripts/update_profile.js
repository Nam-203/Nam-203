const fs = require('fs');
const path = require('path');

const QUOTES = [
    { quote: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { quote: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { quote: "Software is a great combination between artistry and engineering.", author: "Bill Gates" },
    { quote: "AI will not replace humans, but humans who use AI will replace humans who don't.", author: "Unknown" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
    { quote: "Make it simple, but significant.", author: "Don Draper" },
    { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" }
];

function updateSection(content, startTag, endTag, replacement) {
    const escapedStart = startTag.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const escapedEnd = endTag.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${escapedStart})([\\s\\S]*?)(${escapedEnd})`);
    return content.replace(regex, `$1\n${replacement}\n$3`);
}

function main() {
    const readmePath = path.join(__dirname, '..', 'README.md');
    
    if (!fs.existsSync(readmePath)) {
        console.error(`Error: README.md not found at ${readmePath}`);
        process.exit(1);
    }

    let content = fs.readFileSync(readmePath, 'utf8');

    // Get a random quote
    const quoteItem = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    const quoteStr = `> "${quoteItem.quote}"\n>\n> *— ${quoteItem.author}*`;

    // Current date and time
    const now = new Date();
    const dateStr = `📅 *Last updated: ${now.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })} at ${now.toLocaleTimeString('en-US', { hour12: false })}*`;

    // Update sections
    let updatedContent = updateSection(content, '<!-- DYNAMIC_QUOTE_START -->', '<!-- DYNAMIC_QUOTE_END -->', quoteStr);
    updatedContent = updateSection(updatedContent, '<!-- LAST_UPDATED_START -->', '<!-- LAST_UPDATED_END -->', dateStr);

    fs.writeFileSync(readmePath, updatedContent, 'utf8');
    console.log('Successfully updated README.md with latest quote and timestamp.');
}

main();
