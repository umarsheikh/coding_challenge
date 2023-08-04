import consumer from "./consumer"

export default {
  subscribe: (ovenId) => {
  consumer.subscriptions.create({ channel: 'OvenChannel', oven_id: ovenId }, {
      connected() {
        console.log('Connected to Oven Channel');
      },

      disconnected() {},

      received(data) {
        const cookies = data.cookies;
        cookies.forEach(cookie => {
          const cookieElement = document.getElementById(`cookie-${cookie.id}`);
          if (cookie.baked) {
            cookieElement.innerText = `1 cookie with ${cookie.fillings || "no fillings"} (Your Cookie is Ready)`;
          } else {
            cookieElement.innerText = `1 cookie with ${cookie.fillings || "no fillings"} (Your Cookie is being baked)`;
          }
        });
      }
    });
  }
}
