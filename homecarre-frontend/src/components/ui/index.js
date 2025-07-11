//layout components
export { default as ClTable } from "./layouts/layoutTablePage";

//overlay components
export { default as CoAlert } from "./overlays/alertModal";
export { default as CoModal } from "./overlays/baseModal";
export { default as CoConfirm } from "./overlays/confirmModal";

//#region  element components

export { default as CtTable } from "./elements/tempTable";
export { default as CtSelect } from "./elements/tempSelect";
export { default as CtSearch } from "./elements/tempSearch";
export { default as CtPagination } from "./elements/tempPagination";

export { default as CeFmRequest } from "./elements/ManageRequest";
export { default as CeFcPayment } from "./elements/CreateFromPayment";

//#endregion element components

//#region input

//select
export { default as CeIsBank } from "./elements/BankSelect";
export { default as CeIsPropertyTypes } from "./elements/SelectPropertyTypes";

//autocomplete
export { default as CeIac } from "./elements/InputAutoComplete";
export { default as CeIacHcNo } from "./elements/HcNoAutoComplete";
export { default as CeIacClient } from "./elements/ClientAutoComplete";

//#endregion input
