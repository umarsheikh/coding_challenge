import { Controller } from "@hotwired/stimulus";
import ovenChannel from "../channels/oven_channel";

export default class extends Controller {
  connect() {
    console.log("Stimulus controller connected!!");

    // Subscribe to the OvenChannel and store the channel object for future use
    this.channel = ovenChannel.subscribe(this.ovenId);
  }

  disconnect() {
    // Unsubscribe from the OvenChannel when the controller disconnects
    if (this.channel) {
      this.channel.unsubscribe();
    }
  }

  get ovenId() {
    return this.data.get("id");
  }
}
