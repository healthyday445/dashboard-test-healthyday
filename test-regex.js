const link = 'https://www.youtube.com/watch?v=A0BhX6wwScw';
const match = link.match(/(?:v=|youtu\.be\/|\/live\/)([a-zA-Z0-9_-]{11})/);
console.log(match ? match[1] : 'FALLBACK');
