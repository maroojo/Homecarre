import React from "react";
import { Select } from "antd";

const { Option } = Select;

const banks = [
  { label: "Bangkok Bank (ธนาคารกรุงเทพ)", value: "BBL" },
  { label: "Kasikorn Bank (ธนาคารกสิกรไทย)", value: "KBANK" },
  { label: "Krung Thai Bank (ธนาคารกรุงไทย)", value: "KTB" },
  { label: "TMBThanachart Bank (ธนาคารทหารไทยธนชาต)", value: "TTB" },
  { label: "Siam Commercial Bank (ธนาคารไทยพาณิชย์)", value: "SCB" },
  { label: "Bank of Ayudhya (ธนาคารกรุงศรีอยุธยา)", value: "BAY" },
  { label: "Kiatnakin Phatra Bank (ธนาคารเกียรตินาคิน)", value: "KKP" },
  { label: "CIMB Thai Bank (ธนาคารซีไอเอ็มบีไทย)", value: "CIMBT" },
  { label: "TISCO Bank (ธนาคารทิสโก้)", value: "TISCO" },
  { label: "United Overseas Bank (ธนาคารยูโอบี)", value: "UOB" },
  {
    label: "Standard Chartered Bank (ธนาคารสแตนดาร์ดชาร์เตอร์ด)",
    value: "SCBT",
  },
  { label: "Land and Houses Bank (ธนาคารแลนด์ แอนด์ เฮาส์)", value: "LH" },
  { label: "BAAC (ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร)", value: "BAAC" },
  { label: "GSB (ธนาคารออมสิน)", value: "GSB" },
  { label: "GHB (ธนาคารอาคารสงเคราะห์)", value: "GHB" },
  {
    label: "Islamic Bank of Thailand (ธนาคารอิสลามแห่งประเทศไทย)",
    value: "IBANK",
  },
  { label: "HSBC Thailand (ธนาคารฮ่องกงและเซี้ยงไฮ้แบงกิ้ง)", value: "HSBC" },
];

const BankSelect = ({ value, onChange, dropdownStyle, ...props }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      dropdownStyle={dropdownStyle}
      showSearch
      optionFilterProp="children"
      {...props}
    >
      {banks.map((bank) => (
        <Select.Option key={bank.value} value={bank.value}>
          {bank.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default BankSelect;
