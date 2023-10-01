"use server";

export type Company = {
  _id: string;
  IDs13: string;
  IDs10: string;
  Id13: string;
  titleName: string;
  Name: string;
  Surname: string;
  BranchTitleName: string;
  BranchName: string;
  CompanyName: string;
  BranchNumber: string;
  TotalBranch?: null;
  BuildingName: string;
  RoomNumber: string;
  FloorNumber: string;
  VillageName: string;
  HouseNumber: string;
  MooNumber: string;
  SoiName: string;
  StreetName: string;
  Thambol: string;
  Amphur: string;
  Province: string;
  Address: string;
  PostCode: string;
  BusinessFirstDate: string;
  msgerr: string;
};

export const searchFromVat = async (search: string) => {
  const res = await fetch(
    `https://service.on.lk/api/APISearchCompany/GetVat?OptionSelected=all&branchNumber=0&taxId=${search}`
  );
  return res.json();
};
