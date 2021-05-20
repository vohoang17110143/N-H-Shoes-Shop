import { HubConnectionBuilder } from "@microsoft/signalr";

export let connection = new HubConnectionBuilder()
    .withUrl("https://localhost:5001/hubs/shopshoe")
    .withAutomaticReconnect()
    .build();
