import { NextResponse } from "next/server";

const contracts = [
  {
    id: "000000001",
    address: "Empire Sawatdi302, Sukhumvit 31, Bangkok 10110",
    owner: "John Doe",
    tenant: "Alexander Yakir",
    contractStart: "2024-12-20",
    contractEnd: "2025-12-19",
    rent: 7500000,
    status: "Active",
  },
  {
    id: "000000002",
    address: "D.S. Tower 293/174, Sukhumvit 39, Bangkok 10110",
    owner: "Rajno Saomo (Lilly)",
    tenant: "Anandan Thangavel",
    contractStart: "2025-01-31",
    contractEnd: "2027-01-30",
    rent: 45000000,
    status: "Pending",
  },
  {
    id: "0fdahsfjj02",
    address: "6, Phetchaburi, Yuen Yong, Bangkok 10320",
    owner: "Thun Krisanamis",
    tenant: "Veerapat Sirilertvorakul (Gos)",
    contractStart: "2025-01-15",
    contractEnd: "2027-01-14",
    rent: 3400000,
    status: "Terminated",
  },
  {
    id: "dshafehah2",
    address: "Domus 1619/22, Sukhumvit 16, Bangkok 10110",
    owner: "Benjamanee Phetchara",
    tenant: "Kuei Yeh-Chin",
    contractStart: "2023-08-01",
    contractEnd: "2024-08-31",
    rent: 45000000,
    status: "Completed",
  },
];

const isWithinDateRange = (contract, startDate, endDate) => {
  if (!startDate || !endDate) return true; // ถ้าไม่ได้ส่งช่วงเวลา ให้ผ่านทั้งหมด

  const contractStart = new Date(contract.contractStart);
  const contractEnd = new Date(contract.contractEnd);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return contractStart >= start && contractEnd <= end;
};

const searchContracts = (searchTerm, startDate, endDate) => {
  return contracts.filter((contract) => {
    const matchesSearch =
      !searchTerm ||
      contract.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = isWithinDateRange(contract, startDate, endDate);

    return matchesSearch && matchesDate;
  });
};

export async function GET() {
  return NextResponse.json(contracts);
}

export async function POST(req) {
  try {
    const { search, dateRange } = await req.json();

    const startDate = dateRange?.[0] || null;
    const endDate = dateRange?.[1] || null;

    const filteredContracts = searchContracts(search, startDate, endDate);

    return NextResponse.json(filteredContracts);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
