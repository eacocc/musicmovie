// EACO实时价格自动获取与分批轮询，支持 Meteora (E-USDT)、Orca (E-USDC)、Raydium (E-SOL)、CoinMarketCap、DexScreener

const EACO_PRICE_API = {
  meteora: "https://api.meteora.ag/public/pool/6ZfCi3qzhgDN1ygHVYXvfsfrwz8ZhQ7hD5mJtjeuUDyE",
  orca: [
    "https://api.orca.so/v1/pools/Cm6EkxcYNfvxeYDBQ3TGXFqa9NCWvrFKHz4Cfju91dhr", // E-USDC
    "https://api.orca.so/v1/pools?tokens=DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH"
  ],
  raydium: "https://api.raydium.io/v1/swap/price?inputMint=DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH&outputMint=sol",
  coinmarketcap: "https://dex.coinmarketcap.com/api/v1/solana/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH",
  dexscreener: "https://api.dexscreener.com/latest/dex/tokens/DqfoyZH96RnvZusSp3Cdncjpyp3C74ZmJzGhjmHnDHRH"
};

// 主3个，备用2个分批轮询
const EACO_PRICE_APIS_MAIN = [
  { name: "Meteora", url: EACO_PRICE_API.meteora },                              // E-USDT
  { name: "Orca", url: EACO_PRICE_API.orca[0] },                                 // E-USDC
  { name: "Raydium", url: EACO_PRICE_API.raydium }                               // E-SOL
];
const EACO_PRICE_APIS_BACKUP = [
  { name: "CoinMarketCap", url: EACO_PRICE_API.coinmarketcap },
  { name: "DexScreener", url: EACO_PRICE_API.dexscreener }
];

// 价格信息缓存
window.eacoPriceCache = {};

function fetchEACOPrices(callback) {
  let batchIndex = 0;
  function doBatch() {
    const batch = batchIndex === 0 ? EACO_PRICE_APIS_MAIN : EACO_PRICE_APIS_BACKUP;
    batch.forEach(api => {
      fetch(api.url)
        .then(r => r.json())
        .then(data => {
          window.eacoPriceCache[api.name] = data;
          if (callback) callback(api.name, data);
        })
        .catch(e => {
          // 主API失败时备用
          if (batchIndex === 0) {
            const backupApi = EACO_PRICE_APIS_BACKUP[batch.indexOf(api)];
            if (backupApi) {
              fetch(backupApi.url)
                .then(r => r.json())
                .then(data => {
                  window.eacoPriceCache[backupApi.name] = data;
                  if (callback) callback(backupApi.name, data);
                });
            }
          }
        });
    });
    batchIndex = (batchIndex + 1) % 2; // 每次换批次
  }
  doBatch();
  setInterval(doBatch, 10 * 60 * 1000); // 每10分钟轮询一次
}

// 获取支付价格（usdt/usdc/sol/cmc/dexscreener）
function getEACOPriceFor(paymentType = "usdt") {
  if (paymentType === "usdt") {
    // Meteora
    return window.eacoPriceCache["Meteora"]?.price || null;
  }
  if (paymentType === "usdc") {
    // Orca
    return window.eacoPriceCache["Orca"]?.price || null;
  }
  if (paymentType === "sol") {
    // Raydium
    return window.eacoPriceCache["Raydium"]?.price || null;
  }
  if (paymentType === "cmc") {
    return window.eacoPriceCache["CoinMarketCap"]?.price || null;
  }
  if (paymentType === "dexscreener") {
    return window.eacoPriceCache["DexScreener"]?.price || null;
  }
  return null;
}

// 页面可调用此函数展示价格
function updateEACOPriceUI() {
  const usdt = getEACOPriceFor("usdt");
  const usdc = getEACOPriceFor("usdc");
  const sol = getEACOPriceFor("sol");
  if (document.getElementById('eaco-usdt-price')) {
    document.getElementById('eaco-usdt-price').textContent = usdt || 'N/A';
  }
  if (document.getElementById('eaco-usdc-price')) {
    document.getElementById('eaco-usdc-price').textContent = usdc || 'N/A';
  }
  if (document.getElementById('eaco-sol-price')) {
    document.getElementById('eaco-sol-price').textContent = sol || 'N/A';
  }
}

// 初始化和定时刷新
document.addEventListener('DOMContentLoaded', () => {
  fetchEACOPrices(updateEACOPriceUI);
});
setInterval(updateEACOPriceUI, 5 * 60 * 1000);
