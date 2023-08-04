import consumer from "./consumer"

export default {
  subscribe: (ovenId) => {
  consumer.subscriptions.create({ channel: 'OvenChannel', oven_id: ovenId }, {
      connected() {
        console.log('Connected to Oven Channel');
      },

      disconnected() {},

      received(data) {
        const cookieElement = document.getElementById(`cookie-baking-info`);
        if (data.cookies_baked) {
          cookieElement.innerText = `(Your Cookies are Ready)`;
        } else {
          cookieElement.innerText = `(Your Cookies are being baked)`;
        }
      }
    });
  }
}
