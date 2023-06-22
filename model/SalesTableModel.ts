import {
  AccountReceivable,
  Inventory,
  Transaction,
  TransactionItem,
} from "@prisma/client";

export type SalesTableModel = {
  date?: Date;
  documentNumber?: string;
  ar?: AccountReceivable | null;
  salesItem?: Partial<TransactionItem> & { inventory: Inventory };
  children?: SalesTableModel[];
  amount?: number;
};

export function transformToSalesTableModel(
  transaction: Transaction & {
    transactionItems: (TransactionItem & {
      inventory: Inventory | null;
      accountReceivable: AccountReceivable | null;
    })[];
  }
) {
  const salesTable: SalesTableModel = {
    ar: transaction.transactionItems.find((item) => item.accountReceivableId)
      ?.accountReceivable,
    documentNumber: transaction.documentNumber,
    date: transaction.date,
    amount: transaction.transactionItems.find(
      (item) => item.accountReceivableId
    )?.debitAmount,
  };

  const children = transaction.transactionItems
    .filter((item) => item.inventory)
    .map((item) => {
      const salesItem: Partial<TransactionItem> & { inventory: Inventory } = {
        ...item,
        inventory: item.inventory!,
      };
      return { salesItem };
    });

  salesTable.children = children;
  return salesTable;
}
