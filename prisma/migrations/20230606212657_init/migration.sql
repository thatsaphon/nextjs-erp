-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('GoodsPurchase', 'CashSales', 'CreditSales', 'Received', 'Paid', 'Expense');

-- CreateEnum
CREATE TYPE "TransactionItemType" AS ENUM ('Inventory', 'AP', 'AR', 'Cash');

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "remark" TEXT,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cost" (
    "id" TEXT NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "latestQuantity" DOUBLE PRECISION NOT NULL,
    "latestCost" DOUBLE PRECISION NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "remark" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionItem" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "type" "TransactionItemType" NOT NULL,
    "inventoryId" INTEGER,
    "inventoryBarcode" TEXT,
    "inventoryUnit" TEXT,
    "inventoryUnitQuantity" DOUBLE PRECISION,
    "inventoryPricePerUnit" DOUBLE PRECISION,
    "accountPayableId" INTEGER,
    "accountReceivableId" INTEGER,
    "cashId" INTEGER,
    "quantity" DOUBLE PRECISION,
    "debitAmount" DOUBLE PRECISION NOT NULL,
    "creditAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TransactionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountPayable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "taxId" TEXT,
    "remark" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountPayable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountReceivable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "taxId" TEXT,
    "remark" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountReceivable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cash" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "inventoryId" INTEGER,
    "transactionId" TEXT,
    "cashId" INTEGER,
    "arId" INTEGER,
    "apId" INTEGER,
    "imageUrl" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InventoryToProductCategory" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_code_key" ON "Inventory"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_name_key" ON "ProductCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Price_barcode_key" ON "Price"("barcode");

-- CreateIndex
CREATE INDEX "Price_inventoryId_idx" ON "Price"("inventoryId");

-- CreateIndex
CREATE INDEX "Cost_inventoryId_idx" ON "Cost"("inventoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_documentNumber_key" ON "Transaction"("documentNumber");

-- CreateIndex
CREATE INDEX "TransactionItem_inventoryId_idx" ON "TransactionItem"("inventoryId");

-- CreateIndex
CREATE INDEX "TransactionItem_transactionId_idx" ON "TransactionItem"("transactionId");

-- CreateIndex
CREATE INDEX "TransactionItem_accountPayableId_idx" ON "TransactionItem"("accountPayableId");

-- CreateIndex
CREATE INDEX "TransactionItem_accountReceivableId_idx" ON "TransactionItem"("accountReceivableId");

-- CreateIndex
CREATE INDEX "TransactionItem_cashId_idx" ON "TransactionItem"("cashId");

-- CreateIndex
CREATE INDEX "Image_inventoryId_idx" ON "Image"("inventoryId");

-- CreateIndex
CREATE INDEX "Image_transactionId_idx" ON "Image"("transactionId");

-- CreateIndex
CREATE INDEX "Image_cashId_idx" ON "Image"("cashId");

-- CreateIndex
CREATE INDEX "Image_arId_idx" ON "Image"("arId");

-- CreateIndex
CREATE INDEX "Image_apId_idx" ON "Image"("apId");

-- CreateIndex
CREATE UNIQUE INDEX "_InventoryToProductCategory_AB_unique" ON "_InventoryToProductCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_InventoryToProductCategory_B_index" ON "_InventoryToProductCategory"("B");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionItem" ADD CONSTRAINT "TransactionItem_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionItem" ADD CONSTRAINT "TransactionItem_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionItem" ADD CONSTRAINT "TransactionItem_accountPayableId_fkey" FOREIGN KEY ("accountPayableId") REFERENCES "AccountPayable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionItem" ADD CONSTRAINT "TransactionItem_accountReceivableId_fkey" FOREIGN KEY ("accountReceivableId") REFERENCES "AccountReceivable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionItem" ADD CONSTRAINT "TransactionItem_cashId_fkey" FOREIGN KEY ("cashId") REFERENCES "Cash"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_cashId_fkey" FOREIGN KEY ("cashId") REFERENCES "Cash"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_arId_fkey" FOREIGN KEY ("arId") REFERENCES "AccountReceivable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_apId_fkey" FOREIGN KEY ("apId") REFERENCES "AccountPayable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryToProductCategory" ADD CONSTRAINT "_InventoryToProductCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryToProductCategory" ADD CONSTRAINT "_InventoryToProductCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
