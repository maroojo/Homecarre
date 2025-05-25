import Information from "./Information";
import Agreement from "./Agreement";
import Document from "./Document";

const InformationTabs = [
  { key: "1", label: "Information", children: <Information /> },
  { key: "2", label: "Agreement", children: <Agreement /> },
  { key: "3", label: "Document", children: <Document /> },
  { key: "4", label: "Request", children: <div>Request</div> },
  { key: "5", label: "Payment", children: <div>Payment</div> },
];

export default InformationTabs;
