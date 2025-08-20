async function connectWallet() {
  if(window.solana) {
    const resp = await window.solana.connect();
    alert('Phantom connected: ' + resp.publicKey.toString());
  } else if(window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    alert('MetaMask connected: ' + accounts[0]);
  } else {
    alert('请安装钱包插件');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('wallet-connect').onclick = connectWallet;
});
