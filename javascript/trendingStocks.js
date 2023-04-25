const SYMBOLS_API_URL = "https://api.frontendexpert.io/api/fe/stock-symbols";
const MARKET_CAPS_API_URL =
  "https://api.frontendexpert.io/api/fe/stock-market-caps";
const PRICES_API_URL = "https://api.frontendexpert.io/api/fe/stock-prices";

async function trendingStocks(n) {
  const [symbolsResponse, marketCapsResponse] = await Promise.all([
    fetch(SYMBOLS_API_URL),
    fetch(MARKET_CAPS_API_URL),
  ]);

  const [symbols, marketCaps] = await Promise.all([
    symbolsResponse.json(),
    marketCapsResponse.json(),
  ]);

  const requestedSymbols = marketCaps
    .sort((stockA, stockB) => {
      return stockB["market-cap"] - stockA["market-cap"];
    })
    .slice(0, n)
    .map((marketCapObj) => marketCapObj.symbol);

  const pricesUrl = new URL(PRICES_API_URL);
  pricesUrl.searchParams.set("symbols", JSON.stringify(requestedSymbols));
  const pricesResponse = await fetch(pricesUrl);
  const prices = await pricesResponse.json();

  const namesAndMarketCapsBySymbol = getNamesAndMarketCapsBySymbol(
    symbols,
    marketCaps
  );

  const stockData = prices.map(({ symbol, ...rest }) => ({
    symbol,
    ...namesAndMarketCapsBySymbol[symbol],
    ...rest,
  }));

  return stockData;
}

function getNamesAndMarketCapsBySymbol(symbols, marketCaps) {
  const namesAndMarketCapsBySymbol = {};
  symbols.forEach(({ symbol, name }) => {
    namesAndMarketCapsBySymbol[symbol] = { name };
  });

  marketCaps.forEach(({ symbol, "market-cap": marketCap }) => {
    namesAndMarketCapsBySymbol[symbol]["market-cap"] = marketCap;
  });

  return namesAndMarketCapsBySymbol;
}

// all data output
trendingStocks().then((data) => console.log(data));

// // for each data
// trendingStocks().then((data) => {
//   const symbolsData = data.symbolsData;
//   const marketCapsData = data.marketCapsData;
//   const pricesData = data.pricesData;
// });

// Do not edit the line below.
exports.trendingStocks = trendingStocks;
