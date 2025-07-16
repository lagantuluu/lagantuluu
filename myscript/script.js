  async function fetchTop7Crypto() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=7&page=1&sparkline=true";
    
    const response = await fetch(url);
    const data = await response.json();

    const container = document.getElementById("crypto-container");
    container.innerHTML = "";

    data.forEach(crypto => {
      const name = crypto.name;
      const symbol = crypto.symbol.toUpperCase();
      const logo = crypto.image;
      const price = crypto.current_price.toLocaleString();
      const history = crypto.sparkline_in_7d.price;

      // Simple sparkline rendering (text-based)
      const miniChart = history.slice(-20).map(p => "▇".repeat(Math.round(p / history[0]))).join(" ");

      const itemHTML = `
        <div style="border:1px solid #ccc;padding:10px;margin-bottom:10px;border-radius:8px;">
          <img src="${logo}" alt="${name}" style="width:32px;height:32px;vertical-align:middle;">
          <strong>${name} (${symbol})</strong><br>
          💰 $${price}<br>
          📈 7D Sparkline:<br>
          <pre style="font-size:10px;white-space:nowrap;overflow-x:auto;">${miniChart}</pre>
        </div>
      `;
      container.innerHTML += itemHTML;
    });
  }

  document.addEventListener("DOMContentLoaded", fetchTop7Crypto);
