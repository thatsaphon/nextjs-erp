import {
  AccountPayable,
  Inventory,
  Transaction,
  TransactionItem,
} from "@prisma/client";

export type PurchaseTableModel = {
  date?: Date;
  documentNumber?: string;
  ap?: AccountPayable | null;
  purchaseItem?: Partial<TransactionItem> & { inventory: Inventory };
  children?: PurchaseTableModel[];
  amount?: number;
};

export function transformToPurchaseTableModel(
  transaction: Transaction & {
    transactionItems: (TransactionItem & {
      inventory: Inventory | null;
      accountPayable: AccountPayable | null;
    })[];
  }
) {
  const purchaseTable: PurchaseTableModel = {
    ap: transaction.transactionItems.find((item) => item.accountPayableId)
      ?.accountPayable,
    documentNumber: transaction.documentNumber,
    date: transaction.date,
    amount: transaction.transactionItems.find((item) => item.accountPayableId)
      ?.creditAmount,
  };

  const children = transaction.transactionItems
    .filter((item) => item.inventory)
    .map((item) => {
      const purchaseItem: Partial<TransactionItem> & { inventory: Inventory } =
        {
          ...item,
          inventory: item.inventory!,
        };
      return { purchaseItem };
    });

  purchaseTable.children = children;
  return purchaseTable;
}
