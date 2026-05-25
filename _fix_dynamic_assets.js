const fs = require('fs');
const files = ['data/course-data.js', 'data/blog-data.js'];
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  text = text.replace(/(image:\s*"|bannerImagem:\s*"|src=\"|src=')assets\/img\//g, (match, prefix) => prefix + '../assets/img/');
  fs.writeFileSync(file, text, 'utf8');
}
console.log('updated');
