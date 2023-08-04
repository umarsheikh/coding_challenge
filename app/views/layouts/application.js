import Rails from "@rails/ujs";
import { Application } from "@hotwired/stimulus";
import OvenChannelController from "../../javascript/controllers/oven_channel_controller.js";

const application = Application.start();
application.register("oven-channel", OvenChannelController);

Rails.start();
