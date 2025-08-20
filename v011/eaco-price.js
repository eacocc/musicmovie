function updateEACOPrice() {
  fetch("https://api.meteora.ag/public/pool/6ZfCi3qzhgDN1ygHVYXvfsfrwz8ZhQ7hD5mJtjeuUDyE")
    .then(r => r.json()).then(data => {
      document.getElementById('eaco-usdt-price').textContent = data.price || 'N/A';
    });
}
document.addEventListener('DOMContentLoaded', updateEACOPrice);
setInterval(updateEACOPrice, 60 * 60 * 1000);
