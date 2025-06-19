// namespace: @homecarre-api

// authorization & authentication service
export * as hcAuthentication from "@services/Auth";

// application service
export { default as hcContract } from "./contract/contractsService";
export * as hcContacts from "./contract";
export { default as hcPayment } from "./payment/paymentService";
export * as hcPayments from "./payment";
export { default as hcRequest } from "./request/requestService";
export { default as hcClients } from "./client/clientService";
