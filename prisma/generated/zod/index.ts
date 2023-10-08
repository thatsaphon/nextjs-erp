import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const InventoryScalarFieldEnumSchema = z.enum(['id','code','name','remark','price','quantity','createdDate','updatedDate']);

export const ProductCategoryScalarFieldEnumSchema = z.enum(['id','name']);

export const PriceScalarFieldEnumSchema = z.enum(['id','inventoryId','barcode','quantity','unit','price','createdDate','updatedDate']);

export const CostScalarFieldEnumSchema = z.enum(['id','inventoryId','date','quantity','pricePerUnit','totalPrice','latestQuantity','latestCost','createdDate','updatedDate']);

export const TransactionScalarFieldEnumSchema = z.enum(['id','date','documentNumber','type','remark']);

export const TransactionItemScalarFieldEnumSchema = z.enum(['id','transactionId','type','inventoryId','inventoryBarcode','inventoryUnit','inventoryUnitQuantity','inventoryPricePerUnit','accountPayableId','accountReceivableId','cashId','unitQuantity','quantity','debitAmount','creditAmount']);

export const AccountPayableScalarFieldEnumSchema = z.enum(['id','name','address','phone','taxId','remark','createdDate','updatedDate']);

export const AccountReceivableScalarFieldEnumSchema = z.enum(['id','name','address','phone','taxId','remark','createdDate','updatedDate']);

export const CashScalarFieldEnumSchema = z.enum(['id','name','accountId','createdDate','updatedDate']);

export const ImageScalarFieldEnumSchema = z.enum(['id','inventoryId','transactionId','cashId','arId','apId','imageUrl','createdDate','updatedDate']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const TransactionTypeSchema = z.enum(['GoodsPurchase','CashSales','CreditSales','Received','Paid','Expense']);

export type TransactionTypeType = `${z.infer<typeof TransactionTypeSchema>}`

export const TransactionItemTypeSchema = z.enum(['Inventory','AP','AR','Cash']);

export type TransactionItemTypeType = `${z.infer<typeof TransactionItemTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// INVENTORY SCHEMA
/////////////////////////////////////////

export const InventorySchema = z.object({
  id: z.number().int(),
  code: z.string(),
  name: z.string(),
  remark: z.string().nullable(),
  price: z.number(),
  quantity: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
})

export type Inventory = z.infer<typeof InventorySchema>

/////////////////////////////////////////
// INVENTORY PARTIAL SCHEMA
/////////////////////////////////////////

export const InventoryPartialSchema = InventorySchema.partial()

export type InventoryPartial = z.infer<typeof InventoryPartialSchema>

// INVENTORY RELATION SCHEMA
//------------------------------------------------------

export type InventoryRelations = {
  prices: PriceWithRelations[];
  costs: CostWithRelations[];
  transactionItems: TransactionItemWithRelations[];
  categories: ProductCategoryWithRelations[];
  images: ImageWithRelations[];
};

export type InventoryWithRelations = z.infer<typeof InventorySchema> & InventoryRelations

export const InventoryWithRelationsSchema: z.ZodType<InventoryWithRelations> = InventorySchema.merge(z.object({
  prices: z.lazy(() => PriceWithRelationsSchema).array(),
  costs: z.lazy(() => CostWithRelationsSchema).array(),
  transactionItems: z.lazy(() => TransactionItemWithRelationsSchema).array(),
  categories: z.lazy(() => ProductCategoryWithRelationsSchema).array(),
  images: z.lazy(() => ImageWithRelationsSchema).array(),
}))

// INVENTORY PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type InventoryPartialRelations = {
  prices?: PricePartialWithRelations[];
  costs?: CostPartialWithRelations[];
  transactionItems?: TransactionItemPartialWithRelations[];
  categories?: ProductCategoryPartialWithRelations[];
  images?: ImagePartialWithRelations[];
};

export type InventoryPartialWithRelations = z.infer<typeof InventoryPartialSchema> & InventoryPartialRelations

export const InventoryPartialWithRelationsSchema: z.ZodType<InventoryPartialWithRelations> = InventoryPartialSchema.merge(z.object({
  prices: z.lazy(() => PricePartialWithRelationsSchema).array(),
  costs: z.lazy(() => CostPartialWithRelationsSchema).array(),
  transactionItems: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  categories: z.lazy(() => ProductCategoryPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
})).partial()

export type InventoryWithPartialRelations = z.infer<typeof InventorySchema> & InventoryPartialRelations

export const InventoryWithPartialRelationsSchema: z.ZodType<InventoryWithPartialRelations> = InventorySchema.merge(z.object({
  prices: z.lazy(() => PricePartialWithRelationsSchema).array(),
  costs: z.lazy(() => CostPartialWithRelationsSchema).array(),
  transactionItems: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  categories: z.lazy(() => ProductCategoryPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// PRODUCT CATEGORY SCHEMA
/////////////////////////////////////////

export const ProductCategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
})

export type ProductCategory = z.infer<typeof ProductCategorySchema>

/////////////////////////////////////////
// PRODUCT CATEGORY PARTIAL SCHEMA
/////////////////////////////////////////

export const ProductCategoryPartialSchema = ProductCategorySchema.partial()

export type ProductCategoryPartial = z.infer<typeof ProductCategoryPartialSchema>

// PRODUCT CATEGORY RELATION SCHEMA
//------------------------------------------------------

export type ProductCategoryRelations = {
  inventoryIds: InventoryWithRelations[];
};

export type ProductCategoryWithRelations = z.infer<typeof ProductCategorySchema> & ProductCategoryRelations

export const ProductCategoryWithRelationsSchema: z.ZodType<ProductCategoryWithRelations> = ProductCategorySchema.merge(z.object({
  inventoryIds: z.lazy(() => InventoryWithRelationsSchema).array(),
}))

// PRODUCT CATEGORY PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ProductCategoryPartialRelations = {
  inventoryIds?: InventoryPartialWithRelations[];
};

export type ProductCategoryPartialWithRelations = z.infer<typeof ProductCategoryPartialSchema> & ProductCategoryPartialRelations

export const ProductCategoryPartialWithRelationsSchema: z.ZodType<ProductCategoryPartialWithRelations> = ProductCategoryPartialSchema.merge(z.object({
  inventoryIds: z.lazy(() => InventoryPartialWithRelationsSchema).array(),
})).partial()

export type ProductCategoryWithPartialRelations = z.infer<typeof ProductCategorySchema> & ProductCategoryPartialRelations

export const ProductCategoryWithPartialRelationsSchema: z.ZodType<ProductCategoryWithPartialRelations> = ProductCategorySchema.merge(z.object({
  inventoryIds: z.lazy(() => InventoryPartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// PRICE SCHEMA
/////////////////////////////////////////

export const PriceSchema = z.object({
  id: z.string().cuid(),
  inventoryId: z.number().int(),
  barcode: z.string(),
  quantity: z.number(),
  unit: z.string(),
  price: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
})

export type Price = z.infer<typeof PriceSchema>

/////////////////////////////////////////
// PRICE PARTIAL SCHEMA
/////////////////////////////////////////

export const PricePartialSchema = PriceSchema.partial()

export type PricePartial = z.infer<typeof PricePartialSchema>

// PRICE RELATION SCHEMA
//------------------------------------------------------

export type PriceRelations = {
  inventory: InventoryWithRelations;
};

export type PriceWithRelations = z.infer<typeof PriceSchema> & PriceRelations

export const PriceWithRelationsSchema: z.ZodType<PriceWithRelations> = PriceSchema.merge(z.object({
  inventory: z.lazy(() => InventoryWithRelationsSchema),
}))

// PRICE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type PricePartialRelations = {
  inventory?: InventoryPartialWithRelations;
};

export type PricePartialWithRelations = z.infer<typeof PricePartialSchema> & PricePartialRelations

export const PricePartialWithRelationsSchema: z.ZodType<PricePartialWithRelations> = PricePartialSchema.merge(z.object({
  inventory: z.lazy(() => InventoryPartialWithRelationsSchema),
})).partial()

export type PriceWithPartialRelations = z.infer<typeof PriceSchema> & PricePartialRelations

export const PriceWithPartialRelationsSchema: z.ZodType<PriceWithPartialRelations> = PriceSchema.merge(z.object({
  inventory: z.lazy(() => InventoryPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// COST SCHEMA
/////////////////////////////////////////

export const CostSchema = z.object({
  id: z.string().cuid(),
  inventoryId: z.number().int(),
  date: z.coerce.date(),
  quantity: z.number(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  latestQuantity: z.number(),
  latestCost: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
})

export type Cost = z.infer<typeof CostSchema>

/////////////////////////////////////////
// COST PARTIAL SCHEMA
/////////////////////////////////////////

export const CostPartialSchema = CostSchema.partial()

export type CostPartial = z.infer<typeof CostPartialSchema>

// COST RELATION SCHEMA
//------------------------------------------------------

export type CostRelations = {
  inventory: InventoryWithRelations;
};

export type CostWithRelations = z.infer<typeof CostSchema> & CostRelations

export const CostWithRelationsSchema: z.ZodType<CostWithRelations> = CostSchema.merge(z.object({
  inventory: z.lazy(() => InventoryWithRelationsSchema),
}))

// COST PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CostPartialRelations = {
  inventory?: InventoryPartialWithRelations;
};

export type CostPartialWithRelations = z.infer<typeof CostPartialSchema> & CostPartialRelations

export const CostPartialWithRelationsSchema: z.ZodType<CostPartialWithRelations> = CostPartialSchema.merge(z.object({
  inventory: z.lazy(() => InventoryPartialWithRelationsSchema),
})).partial()

export type CostWithPartialRelations = z.infer<typeof CostSchema> & CostPartialRelations

export const CostWithPartialRelationsSchema: z.ZodType<CostWithPartialRelations> = CostSchema.merge(z.object({
  inventory: z.lazy(() => InventoryPartialWithRelationsSchema),
}).partial())

/////////////////////////////////////////
// TRANSACTION SCHEMA
/////////////////////////////////////////

export const TransactionSchema = z.object({
  type: TransactionTypeSchema,
  id: z.string().cuid(),
  date: z.coerce.date(),
  documentNumber: z.string(),
  remark: z.string(),
})

export type Transaction = z.infer<typeof TransactionSchema>

/////////////////////////////////////////
// TRANSACTION PARTIAL SCHEMA
/////////////////////////////////////////

export const TransactionPartialSchema = TransactionSchema.partial()

export type TransactionPartial = z.infer<typeof TransactionPartialSchema>

// TRANSACTION RELATION SCHEMA
//------------------------------------------------------

export type TransactionRelations = {
  transactionItems: TransactionItemWithRelations[];
  images: ImageWithRelations[];
};

export type TransactionWithRelations = z.infer<typeof TransactionSchema> & TransactionRelations

export const TransactionWithRelationsSchema: z.ZodType<TransactionWithRelations> = TransactionSchema.merge(z.object({
  transactionItems: z.lazy(() => TransactionItemWithRelationsSchema).array(),
  images: z.lazy(() => ImageWithRelationsSchema).array(),
}))

// TRANSACTION PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TransactionPartialRelations = {
  transactionItems?: TransactionItemPartialWithRelations[];
  images?: ImagePartialWithRelations[];
};

export type TransactionPartialWithRelations = z.infer<typeof TransactionPartialSchema> & TransactionPartialRelations

export const TransactionPartialWithRelationsSchema: z.ZodType<TransactionPartialWithRelations> = TransactionPartialSchema.merge(z.object({
  transactionItems: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
})).partial()

export type TransactionWithPartialRelations = z.infer<typeof TransactionSchema> & TransactionPartialRelations

export const TransactionWithPartialRelationsSchema: z.ZodType<TransactionWithPartialRelations> = TransactionSchema.merge(z.object({
  transactionItems: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// TRANSACTION ITEM SCHEMA
/////////////////////////////////////////

export const TransactionItemSchema = z.object({
  type: TransactionItemTypeSchema,
  id: z.string().cuid(),
  transactionId: z.string(),
  inventoryId: z.number().int().nullable(),
  inventoryBarcode: z.string().nullable(),
  inventoryUnit: z.string().nullable(),
  inventoryUnitQuantity: z.number().nullable(),
  inventoryPricePerUnit: z.number().nullable(),
  accountPayableId: z.number().int().nullable(),
  accountReceivableId: z.number().int().nullable(),
  cashId: z.number().int().nullable(),
  unitQuantity: z.number().nullable(),
  quantity: z.number().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number(),
})

export type TransactionItem = z.infer<typeof TransactionItemSchema>

/////////////////////////////////////////
// TRANSACTION ITEM PARTIAL SCHEMA
/////////////////////////////////////////

export const TransactionItemPartialSchema = TransactionItemSchema.partial()

export type TransactionItemPartial = z.infer<typeof TransactionItemPartialSchema>

// TRANSACTION ITEM RELATION SCHEMA
//------------------------------------------------------

export type TransactionItemRelations = {
  transaction: TransactionWithRelations;
  inventory?: InventoryWithRelations | null;
  accountPayable?: AccountPayableWithRelations | null;
  accountReceivable?: AccountReceivableWithRelations | null;
  cash?: CashWithRelations | null;
};

export type TransactionItemWithRelations = z.infer<typeof TransactionItemSchema> & TransactionItemRelations

export const TransactionItemWithRelationsSchema: z.ZodType<TransactionItemWithRelations> = TransactionItemSchema.merge(z.object({
  transaction: z.lazy(() => TransactionWithRelationsSchema),
  inventory: z.lazy(() => InventoryWithRelationsSchema).nullable(),
  accountPayable: z.lazy(() => AccountPayableWithRelationsSchema).nullable(),
  accountReceivable: z.lazy(() => AccountReceivableWithRelationsSchema).nullable(),
  cash: z.lazy(() => CashWithRelationsSchema).nullable(),
}))

// TRANSACTION ITEM PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TransactionItemPartialRelations = {
  transaction?: TransactionPartialWithRelations;
  inventory?: InventoryPartialWithRelations | null;
  accountPayable?: AccountPayablePartialWithRelations | null;
  accountReceivable?: AccountReceivablePartialWithRelations | null;
  cash?: CashPartialWithRelations | null;
};

export type TransactionItemPartialWithRelations = z.infer<typeof TransactionItemPartialSchema> & TransactionItemPartialRelations

export const TransactionItemPartialWithRelationsSchema: z.ZodType<TransactionItemPartialWithRelations> = TransactionItemPartialSchema.merge(z.object({
  transaction: z.lazy(() => TransactionPartialWithRelationsSchema),
  inventory: z.lazy(() => InventoryPartialWithRelationsSchema).nullable(),
  accountPayable: z.lazy(() => AccountPayablePartialWithRelationsSchema).nullable(),
  accountReceivable: z.lazy(() => AccountReceivablePartialWithRelationsSchema).nullable(),
  cash: z.lazy(() => CashPartialWithRelationsSchema).nullable(),
})).partial()

export type TransactionItemWithPartialRelations = z.infer<typeof TransactionItemSchema> & TransactionItemPartialRelations

export const TransactionItemWithPartialRelationsSchema: z.ZodType<TransactionItemWithPartialRelations> = TransactionItemSchema.merge(z.object({
  transaction: z.lazy(() => TransactionPartialWithRelationsSchema),
  inventory: z.lazy(() => InventoryPartialWithRelationsSchema).nullable(),
  accountPayable: z.lazy(() => AccountPayablePartialWithRelationsSchema).nullable(),
  accountReceivable: z.lazy(() => AccountReceivablePartialWithRelationsSchema).nullable(),
  cash: z.lazy(() => CashPartialWithRelationsSchema).nullable(),
}).partial())

/////////////////////////////////////////
// ACCOUNT PAYABLE SCHEMA
/////////////////////////////////////////

export const AccountPayableSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  taxId: z.string().nullable(),
  remark: z.string().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
})

export type AccountPayable = z.infer<typeof AccountPayableSchema>

/////////////////////////////////////////
// ACCOUNT PAYABLE PARTIAL SCHEMA
/////////////////////////////////////////

export const AccountPayablePartialSchema = AccountPayableSchema.partial()

export type AccountPayablePartial = z.infer<typeof AccountPayablePartialSchema>

// ACCOUNT PAYABLE RELATION SCHEMA
//------------------------------------------------------

export type AccountPayableRelations = {
  transactions: TransactionItemWithRelations[];
  images: ImageWithRelations[];
};

export type AccountPayableWithRelations = z.infer<typeof AccountPayableSchema> & AccountPayableRelations

export const AccountPayableWithRelationsSchema: z.ZodType<AccountPayableWithRelations> = AccountPayableSchema.merge(z.object({
  transactions: z.lazy(() => TransactionItemWithRelationsSchema).array(),
  images: z.lazy(() => ImageWithRelationsSchema).array(),
}))

// ACCOUNT PAYABLE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccountPayablePartialRelations = {
  transactions?: TransactionItemPartialWithRelations[];
  images?: ImagePartialWithRelations[];
};

export type AccountPayablePartialWithRelations = z.infer<typeof AccountPayablePartialSchema> & AccountPayablePartialRelations

export const AccountPayablePartialWithRelationsSchema: z.ZodType<AccountPayablePartialWithRelations> = AccountPayablePartialSchema.merge(z.object({
  transactions: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
})).partial()

export type AccountPayableWithPartialRelations = z.infer<typeof AccountPayableSchema> & AccountPayablePartialRelations

export const AccountPayableWithPartialRelationsSchema: z.ZodType<AccountPayableWithPartialRelations> = AccountPayableSchema.merge(z.object({
  transactions: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// ACCOUNT RECEIVABLE SCHEMA
/////////////////////////////////////////

export const AccountReceivableSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  taxId: z.string().nullable(),
  remark: z.string().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
})

export type AccountReceivable = z.infer<typeof AccountReceivableSchema>

/////////////////////////////////////////
// ACCOUNT RECEIVABLE PARTIAL SCHEMA
/////////////////////////////////////////

export const AccountReceivablePartialSchema = AccountReceivableSchema.partial()

export type AccountReceivablePartial = z.infer<typeof AccountReceivablePartialSchema>

// ACCOUNT RECEIVABLE RELATION SCHEMA
//------------------------------------------------------

export type AccountReceivableRelations = {
  transactions: TransactionItemWithRelations[];
  images: ImageWithRelations[];
};

export type AccountReceivableWithRelations = z.infer<typeof AccountReceivableSchema> & AccountReceivableRelations

export const AccountReceivableWithRelationsSchema: z.ZodType<AccountReceivableWithRelations> = AccountReceivableSchema.merge(z.object({
  transactions: z.lazy(() => TransactionItemWithRelationsSchema).array(),
  images: z.lazy(() => ImageWithRelationsSchema).array(),
}))

// ACCOUNT RECEIVABLE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type AccountReceivablePartialRelations = {
  transactions?: TransactionItemPartialWithRelations[];
  images?: ImagePartialWithRelations[];
};

export type AccountReceivablePartialWithRelations = z.infer<typeof AccountReceivablePartialSchema> & AccountReceivablePartialRelations

export const AccountReceivablePartialWithRelationsSchema: z.ZodType<AccountReceivablePartialWithRelations> = AccountReceivablePartialSchema.merge(z.object({
  transactions: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
})).partial()

export type AccountReceivableWithPartialRelations = z.infer<typeof AccountReceivableSchema> & AccountReceivablePartialRelations

export const AccountReceivableWithPartialRelationsSchema: z.ZodType<AccountReceivableWithPartialRelations> = AccountReceivableSchema.merge(z.object({
  transactions: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// CASH SCHEMA
/////////////////////////////////////////

export const CashSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  accountId: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
})

export type Cash = z.infer<typeof CashSchema>

/////////////////////////////////////////
// CASH PARTIAL SCHEMA
/////////////////////////////////////////

export const CashPartialSchema = CashSchema.partial()

export type CashPartial = z.infer<typeof CashPartialSchema>

// CASH RELATION SCHEMA
//------------------------------------------------------

export type CashRelations = {
  transactions: TransactionItemWithRelations[];
  images: ImageWithRelations[];
};

export type CashWithRelations = z.infer<typeof CashSchema> & CashRelations

export const CashWithRelationsSchema: z.ZodType<CashWithRelations> = CashSchema.merge(z.object({
  transactions: z.lazy(() => TransactionItemWithRelationsSchema).array(),
  images: z.lazy(() => ImageWithRelationsSchema).array(),
}))

// CASH PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type CashPartialRelations = {
  transactions?: TransactionItemPartialWithRelations[];
  images?: ImagePartialWithRelations[];
};

export type CashPartialWithRelations = z.infer<typeof CashPartialSchema> & CashPartialRelations

export const CashPartialWithRelationsSchema: z.ZodType<CashPartialWithRelations> = CashPartialSchema.merge(z.object({
  transactions: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
})).partial()

export type CashWithPartialRelations = z.infer<typeof CashSchema> & CashPartialRelations

export const CashWithPartialRelationsSchema: z.ZodType<CashWithPartialRelations> = CashSchema.merge(z.object({
  transactions: z.lazy(() => TransactionItemPartialWithRelationsSchema).array(),
  images: z.lazy(() => ImagePartialWithRelationsSchema).array(),
}).partial())

/////////////////////////////////////////
// IMAGE SCHEMA
/////////////////////////////////////////

export const ImageSchema = z.object({
  id: z.string().cuid(),
  inventoryId: z.number().int().nullable(),
  transactionId: z.string().nullable(),
  cashId: z.number().int().nullable(),
  arId: z.number().int().nullable(),
  apId: z.number().int().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
})

export type Image = z.infer<typeof ImageSchema>

/////////////////////////////////////////
// IMAGE PARTIAL SCHEMA
/////////////////////////////////////////

export const ImagePartialSchema = ImageSchema.partial()

export type ImagePartial = z.infer<typeof ImagePartialSchema>

// IMAGE RELATION SCHEMA
//------------------------------------------------------

export type ImageRelations = {
  inventory?: InventoryWithRelations | null;
  transaction?: TransactionWithRelations | null;
  cash?: CashWithRelations | null;
  ar?: AccountReceivableWithRelations | null;
  ap?: AccountPayableWithRelations | null;
};

export type ImageWithRelations = z.infer<typeof ImageSchema> & ImageRelations

export const ImageWithRelationsSchema: z.ZodType<ImageWithRelations> = ImageSchema.merge(z.object({
  inventory: z.lazy(() => InventoryWithRelationsSchema).nullable(),
  transaction: z.lazy(() => TransactionWithRelationsSchema).nullable(),
  cash: z.lazy(() => CashWithRelationsSchema).nullable(),
  ar: z.lazy(() => AccountReceivableWithRelationsSchema).nullable(),
  ap: z.lazy(() => AccountPayableWithRelationsSchema).nullable(),
}))

// IMAGE PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ImagePartialRelations = {
  inventory?: InventoryPartialWithRelations | null;
  transaction?: TransactionPartialWithRelations | null;
  cash?: CashPartialWithRelations | null;
  ar?: AccountReceivablePartialWithRelations | null;
  ap?: AccountPayablePartialWithRelations | null;
};

export type ImagePartialWithRelations = z.infer<typeof ImagePartialSchema> & ImagePartialRelations

export const ImagePartialWithRelationsSchema: z.ZodType<ImagePartialWithRelations> = ImagePartialSchema.merge(z.object({
  inventory: z.lazy(() => InventoryPartialWithRelationsSchema).nullable(),
  transaction: z.lazy(() => TransactionPartialWithRelationsSchema).nullable(),
  cash: z.lazy(() => CashPartialWithRelationsSchema).nullable(),
  ar: z.lazy(() => AccountReceivablePartialWithRelationsSchema).nullable(),
  ap: z.lazy(() => AccountPayablePartialWithRelationsSchema).nullable(),
})).partial()

export type ImageWithPartialRelations = z.infer<typeof ImageSchema> & ImagePartialRelations

export const ImageWithPartialRelationsSchema: z.ZodType<ImageWithPartialRelations> = ImageSchema.merge(z.object({
  inventory: z.lazy(() => InventoryPartialWithRelationsSchema).nullable(),
  transaction: z.lazy(() => TransactionPartialWithRelationsSchema).nullable(),
  cash: z.lazy(() => CashPartialWithRelationsSchema).nullable(),
  ar: z.lazy(() => AccountReceivablePartialWithRelationsSchema).nullable(),
  ap: z.lazy(() => AccountPayablePartialWithRelationsSchema).nullable(),
}).partial())

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// INVENTORY
//------------------------------------------------------

export const InventoryIncludeSchema: z.ZodType<Prisma.InventoryInclude> = z.object({
  prices: z.union([z.boolean(),z.lazy(() => PriceFindManyArgsSchema)]).optional(),
  costs: z.union([z.boolean(),z.lazy(() => CostFindManyArgsSchema)]).optional(),
  transactionItems: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  categories: z.union([z.boolean(),z.lazy(() => ProductCategoryFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InventoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const InventoryArgsSchema: z.ZodType<Prisma.InventoryDefaultArgs> = z.object({
  select: z.lazy(() => InventorySelectSchema).optional(),
  include: z.lazy(() => InventoryIncludeSchema).optional(),
}).strict();

export const InventoryCountOutputTypeArgsSchema: z.ZodType<Prisma.InventoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => InventoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const InventoryCountOutputTypeSelectSchema: z.ZodType<Prisma.InventoryCountOutputTypeSelect> = z.object({
  prices: z.boolean().optional(),
  costs: z.boolean().optional(),
  transactionItems: z.boolean().optional(),
  categories: z.boolean().optional(),
  images: z.boolean().optional(),
}).strict();

export const InventorySelectSchema: z.ZodType<Prisma.InventorySelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  name: z.boolean().optional(),
  remark: z.boolean().optional(),
  price: z.boolean().optional(),
  quantity: z.boolean().optional(),
  createdDate: z.boolean().optional(),
  updatedDate: z.boolean().optional(),
  prices: z.union([z.boolean(),z.lazy(() => PriceFindManyArgsSchema)]).optional(),
  costs: z.union([z.boolean(),z.lazy(() => CostFindManyArgsSchema)]).optional(),
  transactionItems: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  categories: z.union([z.boolean(),z.lazy(() => ProductCategoryFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => InventoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT CATEGORY
//------------------------------------------------------

export const ProductCategoryIncludeSchema: z.ZodType<Prisma.ProductCategoryInclude> = z.object({
  inventoryIds: z.union([z.boolean(),z.lazy(() => InventoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProductCategoryArgsSchema: z.ZodType<Prisma.ProductCategoryDefaultArgs> = z.object({
  select: z.lazy(() => ProductCategorySelectSchema).optional(),
  include: z.lazy(() => ProductCategoryIncludeSchema).optional(),
}).strict();

export const ProductCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCategoryCountOutputTypeSelect> = z.object({
  inventoryIds: z.boolean().optional(),
}).strict();

export const ProductCategorySelectSchema: z.ZodType<Prisma.ProductCategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  inventoryIds: z.union([z.boolean(),z.lazy(() => InventoryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRICE
//------------------------------------------------------

export const PriceIncludeSchema: z.ZodType<Prisma.PriceInclude> = z.object({
  inventory: z.union([z.boolean(),z.lazy(() => InventoryArgsSchema)]).optional(),
}).strict()

export const PriceArgsSchema: z.ZodType<Prisma.PriceDefaultArgs> = z.object({
  select: z.lazy(() => PriceSelectSchema).optional(),
  include: z.lazy(() => PriceIncludeSchema).optional(),
}).strict();

export const PriceSelectSchema: z.ZodType<Prisma.PriceSelect> = z.object({
  id: z.boolean().optional(),
  inventoryId: z.boolean().optional(),
  barcode: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unit: z.boolean().optional(),
  price: z.boolean().optional(),
  createdDate: z.boolean().optional(),
  updatedDate: z.boolean().optional(),
  inventory: z.union([z.boolean(),z.lazy(() => InventoryArgsSchema)]).optional(),
}).strict()

// COST
//------------------------------------------------------

export const CostIncludeSchema: z.ZodType<Prisma.CostInclude> = z.object({
  inventory: z.union([z.boolean(),z.lazy(() => InventoryArgsSchema)]).optional(),
}).strict()

export const CostArgsSchema: z.ZodType<Prisma.CostDefaultArgs> = z.object({
  select: z.lazy(() => CostSelectSchema).optional(),
  include: z.lazy(() => CostIncludeSchema).optional(),
}).strict();

export const CostSelectSchema: z.ZodType<Prisma.CostSelect> = z.object({
  id: z.boolean().optional(),
  inventoryId: z.boolean().optional(),
  date: z.boolean().optional(),
  quantity: z.boolean().optional(),
  pricePerUnit: z.boolean().optional(),
  totalPrice: z.boolean().optional(),
  latestQuantity: z.boolean().optional(),
  latestCost: z.boolean().optional(),
  createdDate: z.boolean().optional(),
  updatedDate: z.boolean().optional(),
  inventory: z.union([z.boolean(),z.lazy(() => InventoryArgsSchema)]).optional(),
}).strict()

// TRANSACTION
//------------------------------------------------------

export const TransactionIncludeSchema: z.ZodType<Prisma.TransactionInclude> = z.object({
  transactionItems: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TransactionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TransactionArgsSchema: z.ZodType<Prisma.TransactionDefaultArgs> = z.object({
  select: z.lazy(() => TransactionSelectSchema).optional(),
  include: z.lazy(() => TransactionIncludeSchema).optional(),
}).strict();

export const TransactionCountOutputTypeArgsSchema: z.ZodType<Prisma.TransactionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TransactionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TransactionCountOutputTypeSelectSchema: z.ZodType<Prisma.TransactionCountOutputTypeSelect> = z.object({
  transactionItems: z.boolean().optional(),
  images: z.boolean().optional(),
}).strict();

export const TransactionSelectSchema: z.ZodType<Prisma.TransactionSelect> = z.object({
  id: z.boolean().optional(),
  date: z.boolean().optional(),
  documentNumber: z.boolean().optional(),
  type: z.boolean().optional(),
  remark: z.boolean().optional(),
  transactionItems: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TransactionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TRANSACTION ITEM
//------------------------------------------------------

export const TransactionItemIncludeSchema: z.ZodType<Prisma.TransactionItemInclude> = z.object({
  transaction: z.union([z.boolean(),z.lazy(() => TransactionArgsSchema)]).optional(),
  inventory: z.union([z.boolean(),z.lazy(() => InventoryArgsSchema)]).optional(),
  accountPayable: z.union([z.boolean(),z.lazy(() => AccountPayableArgsSchema)]).optional(),
  accountReceivable: z.union([z.boolean(),z.lazy(() => AccountReceivableArgsSchema)]).optional(),
  cash: z.union([z.boolean(),z.lazy(() => CashArgsSchema)]).optional(),
}).strict()

export const TransactionItemArgsSchema: z.ZodType<Prisma.TransactionItemDefaultArgs> = z.object({
  select: z.lazy(() => TransactionItemSelectSchema).optional(),
  include: z.lazy(() => TransactionItemIncludeSchema).optional(),
}).strict();

export const TransactionItemSelectSchema: z.ZodType<Prisma.TransactionItemSelect> = z.object({
  id: z.boolean().optional(),
  transactionId: z.boolean().optional(),
  type: z.boolean().optional(),
  inventoryId: z.boolean().optional(),
  inventoryBarcode: z.boolean().optional(),
  inventoryUnit: z.boolean().optional(),
  inventoryUnitQuantity: z.boolean().optional(),
  inventoryPricePerUnit: z.boolean().optional(),
  accountPayableId: z.boolean().optional(),
  accountReceivableId: z.boolean().optional(),
  cashId: z.boolean().optional(),
  unitQuantity: z.boolean().optional(),
  quantity: z.boolean().optional(),
  debitAmount: z.boolean().optional(),
  creditAmount: z.boolean().optional(),
  transaction: z.union([z.boolean(),z.lazy(() => TransactionArgsSchema)]).optional(),
  inventory: z.union([z.boolean(),z.lazy(() => InventoryArgsSchema)]).optional(),
  accountPayable: z.union([z.boolean(),z.lazy(() => AccountPayableArgsSchema)]).optional(),
  accountReceivable: z.union([z.boolean(),z.lazy(() => AccountReceivableArgsSchema)]).optional(),
  cash: z.union([z.boolean(),z.lazy(() => CashArgsSchema)]).optional(),
}).strict()

// ACCOUNT PAYABLE
//------------------------------------------------------

export const AccountPayableIncludeSchema: z.ZodType<Prisma.AccountPayableInclude> = z.object({
  transactions: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountPayableCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AccountPayableArgsSchema: z.ZodType<Prisma.AccountPayableDefaultArgs> = z.object({
  select: z.lazy(() => AccountPayableSelectSchema).optional(),
  include: z.lazy(() => AccountPayableIncludeSchema).optional(),
}).strict();

export const AccountPayableCountOutputTypeArgsSchema: z.ZodType<Prisma.AccountPayableCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AccountPayableCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AccountPayableCountOutputTypeSelectSchema: z.ZodType<Prisma.AccountPayableCountOutputTypeSelect> = z.object({
  transactions: z.boolean().optional(),
  images: z.boolean().optional(),
}).strict();

export const AccountPayableSelectSchema: z.ZodType<Prisma.AccountPayableSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  phone: z.boolean().optional(),
  taxId: z.boolean().optional(),
  remark: z.boolean().optional(),
  createdDate: z.boolean().optional(),
  updatedDate: z.boolean().optional(),
  transactions: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountPayableCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT RECEIVABLE
//------------------------------------------------------

export const AccountReceivableIncludeSchema: z.ZodType<Prisma.AccountReceivableInclude> = z.object({
  transactions: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountReceivableCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const AccountReceivableArgsSchema: z.ZodType<Prisma.AccountReceivableDefaultArgs> = z.object({
  select: z.lazy(() => AccountReceivableSelectSchema).optional(),
  include: z.lazy(() => AccountReceivableIncludeSchema).optional(),
}).strict();

export const AccountReceivableCountOutputTypeArgsSchema: z.ZodType<Prisma.AccountReceivableCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => AccountReceivableCountOutputTypeSelectSchema).nullish(),
}).strict();

export const AccountReceivableCountOutputTypeSelectSchema: z.ZodType<Prisma.AccountReceivableCountOutputTypeSelect> = z.object({
  transactions: z.boolean().optional(),
  images: z.boolean().optional(),
}).strict();

export const AccountReceivableSelectSchema: z.ZodType<Prisma.AccountReceivableSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  phone: z.boolean().optional(),
  taxId: z.boolean().optional(),
  remark: z.boolean().optional(),
  createdDate: z.boolean().optional(),
  updatedDate: z.boolean().optional(),
  transactions: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => AccountReceivableCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CASH
//------------------------------------------------------

export const CashIncludeSchema: z.ZodType<Prisma.CashInclude> = z.object({
  transactions: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CashCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CashArgsSchema: z.ZodType<Prisma.CashDefaultArgs> = z.object({
  select: z.lazy(() => CashSelectSchema).optional(),
  include: z.lazy(() => CashIncludeSchema).optional(),
}).strict();

export const CashCountOutputTypeArgsSchema: z.ZodType<Prisma.CashCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CashCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CashCountOutputTypeSelectSchema: z.ZodType<Prisma.CashCountOutputTypeSelect> = z.object({
  transactions: z.boolean().optional(),
  images: z.boolean().optional(),
}).strict();

export const CashSelectSchema: z.ZodType<Prisma.CashSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  accountId: z.boolean().optional(),
  createdDate: z.boolean().optional(),
  updatedDate: z.boolean().optional(),
  transactions: z.union([z.boolean(),z.lazy(() => TransactionItemFindManyArgsSchema)]).optional(),
  images: z.union([z.boolean(),z.lazy(() => ImageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CashCountOutputTypeArgsSchema)]).optional(),
}).strict()

// IMAGE
//------------------------------------------------------

export const ImageIncludeSchema: z.ZodType<Prisma.ImageInclude> = z.object({
  inventory: z.union([z.boolean(),z.lazy(() => InventoryArgsSchema)]).optional(),
  transaction: z.union([z.boolean(),z.lazy(() => TransactionArgsSchema)]).optional(),
  cash: z.union([z.boolean(),z.lazy(() => CashArgsSchema)]).optional(),
  ar: z.union([z.boolean(),z.lazy(() => AccountReceivableArgsSchema)]).optional(),
  ap: z.union([z.boolean(),z.lazy(() => AccountPayableArgsSchema)]).optional(),
}).strict()

export const ImageArgsSchema: z.ZodType<Prisma.ImageDefaultArgs> = z.object({
  select: z.lazy(() => ImageSelectSchema).optional(),
  include: z.lazy(() => ImageIncludeSchema).optional(),
}).strict();

export const ImageSelectSchema: z.ZodType<Prisma.ImageSelect> = z.object({
  id: z.boolean().optional(),
  inventoryId: z.boolean().optional(),
  transactionId: z.boolean().optional(),
  cashId: z.boolean().optional(),
  arId: z.boolean().optional(),
  apId: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  createdDate: z.boolean().optional(),
  updatedDate: z.boolean().optional(),
  inventory: z.union([z.boolean(),z.lazy(() => InventoryArgsSchema)]).optional(),
  transaction: z.union([z.boolean(),z.lazy(() => TransactionArgsSchema)]).optional(),
  cash: z.union([z.boolean(),z.lazy(() => CashArgsSchema)]).optional(),
  ar: z.union([z.boolean(),z.lazy(() => AccountReceivableArgsSchema)]).optional(),
  ap: z.union([z.boolean(),z.lazy(() => AccountPayableArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const InventoryWhereInputSchema: z.ZodType<Prisma.InventoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InventoryWhereInputSchema),z.lazy(() => InventoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventoryWhereInputSchema),z.lazy(() => InventoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  remark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prices: z.lazy(() => PriceListRelationFilterSchema).optional(),
  costs: z.lazy(() => CostListRelationFilterSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  categories: z.lazy(() => ProductCategoryListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict();

export const InventoryOrderByWithRelationInputSchema: z.ZodType<Prisma.InventoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  remark: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  prices: z.lazy(() => PriceOrderByRelationAggregateInputSchema).optional(),
  costs: z.lazy(() => CostOrderByRelationAggregateInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemOrderByRelationAggregateInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryOrderByRelationAggregateInputSchema).optional(),
  images: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const InventoryWhereUniqueInputSchema: z.ZodType<Prisma.InventoryWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    code: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
    code: z.string(),
  }),
  z.object({
    id: z.number().int(),
    name: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    code: z.string(),
    name: z.string(),
  }),
  z.object({
    code: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  code: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => InventoryWhereInputSchema),z.lazy(() => InventoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventoryWhereInputSchema),z.lazy(() => InventoryWhereInputSchema).array() ]).optional(),
  remark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  prices: z.lazy(() => PriceListRelationFilterSchema).optional(),
  costs: z.lazy(() => CostListRelationFilterSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  categories: z.lazy(() => ProductCategoryListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict());

export const InventoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.InventoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  remark: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InventoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => InventoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InventoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InventoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => InventorySumOrderByAggregateInputSchema).optional()
}).strict();

export const InventoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InventoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InventoryScalarWhereWithAggregatesInputSchema),z.lazy(() => InventoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventoryScalarWhereWithAggregatesInputSchema),z.lazy(() => InventoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  remark: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProductCategoryWhereInputSchema: z.ZodType<Prisma.ProductCategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductCategoryWhereInputSchema),z.lazy(() => ProductCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductCategoryWhereInputSchema),z.lazy(() => ProductCategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inventoryIds: z.lazy(() => InventoryListRelationFilterSchema).optional()
}).strict();

export const ProductCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductCategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  inventoryIds: z.lazy(() => InventoryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProductCategoryWhereUniqueInputSchema: z.ZodType<Prisma.ProductCategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ProductCategoryWhereInputSchema),z.lazy(() => ProductCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductCategoryWhereInputSchema),z.lazy(() => ProductCategoryWhereInputSchema).array() ]).optional(),
  inventoryIds: z.lazy(() => InventoryListRelationFilterSchema).optional()
}).strict());

export const ProductCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductCategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductCategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductCategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProductCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductCategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PriceWhereInputSchema: z.ZodType<Prisma.PriceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  barcode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inventory: z.union([ z.lazy(() => InventoryRelationFilterSchema),z.lazy(() => InventoryWhereInputSchema) ]).optional(),
}).strict();

export const PriceOrderByWithRelationInputSchema: z.ZodType<Prisma.PriceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  barcode: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  inventory: z.lazy(() => InventoryOrderByWithRelationInputSchema).optional()
}).strict();

export const PriceWhereUniqueInputSchema: z.ZodType<Prisma.PriceWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    barcode: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    barcode: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  barcode: z.string().optional(),
  AND: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceWhereInputSchema),z.lazy(() => PriceWhereInputSchema).array() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inventory: z.union([ z.lazy(() => InventoryRelationFilterSchema),z.lazy(() => InventoryWhereInputSchema) ]).optional(),
}).strict());

export const PriceOrderByWithAggregationInputSchema: z.ZodType<Prisma.PriceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  barcode: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PriceCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PriceAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PriceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PriceMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PriceSumOrderByAggregateInputSchema).optional()
}).strict();

export const PriceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PriceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PriceScalarWhereWithAggregatesInputSchema),z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceScalarWhereWithAggregatesInputSchema),z.lazy(() => PriceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  barcode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CostWhereInputSchema: z.ZodType<Prisma.CostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CostWhereInputSchema),z.lazy(() => CostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CostWhereInputSchema),z.lazy(() => CostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  pricePerUnit: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  latestQuantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  latestCost: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inventory: z.union([ z.lazy(() => InventoryRelationFilterSchema),z.lazy(() => InventoryWhereInputSchema) ]).optional(),
}).strict();

export const CostOrderByWithRelationInputSchema: z.ZodType<Prisma.CostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  pricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  latestQuantity: z.lazy(() => SortOrderSchema).optional(),
  latestCost: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  inventory: z.lazy(() => InventoryOrderByWithRelationInputSchema).optional()
}).strict();

export const CostWhereUniqueInputSchema: z.ZodType<Prisma.CostWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CostWhereInputSchema),z.lazy(() => CostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CostWhereInputSchema),z.lazy(() => CostWhereInputSchema).array() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  pricePerUnit: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  latestQuantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  latestCost: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inventory: z.union([ z.lazy(() => InventoryRelationFilterSchema),z.lazy(() => InventoryWhereInputSchema) ]).optional(),
}).strict());

export const CostOrderByWithAggregationInputSchema: z.ZodType<Prisma.CostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  pricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  latestQuantity: z.lazy(() => SortOrderSchema).optional(),
  latestCost: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CostCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CostAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CostMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CostSumOrderByAggregateInputSchema).optional()
}).strict();

export const CostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CostScalarWhereWithAggregatesInputSchema),z.lazy(() => CostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CostScalarWhereWithAggregatesInputSchema),z.lazy(() => CostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  pricePerUnit: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  totalPrice: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  latestQuantity: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  latestCost: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TransactionWhereInputSchema: z.ZodType<Prisma.TransactionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  documentNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  remark: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transactionItems: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict();

export const TransactionOrderByWithRelationInputSchema: z.ZodType<Prisma.TransactionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentNumber: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemOrderByRelationAggregateInputSchema).optional(),
  images: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TransactionWhereUniqueInputSchema: z.ZodType<Prisma.TransactionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    documentNumber: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    documentNumber: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  documentNumber: z.string().optional(),
  AND: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionWhereInputSchema),z.lazy(() => TransactionWhereInputSchema).array() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  remark: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transactionItems: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict());

export const TransactionOrderByWithAggregationInputSchema: z.ZodType<Prisma.TransactionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentNumber: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TransactionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TransactionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TransactionMinOrderByAggregateInputSchema).optional()
}).strict();

export const TransactionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TransactionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  documentNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionTypeWithAggregatesFilterSchema),z.lazy(() => TransactionTypeSchema) ]).optional(),
  remark: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TransactionItemWhereInputSchema: z.ZodType<Prisma.TransactionItemWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionItemWhereInputSchema),z.lazy(() => TransactionItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionItemWhereInputSchema),z.lazy(() => TransactionItemWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transactionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionItemTypeFilterSchema),z.lazy(() => TransactionItemTypeSchema) ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  inventoryBarcode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inventoryUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  accountPayableId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  accountReceivableId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  cashId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  unitQuantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  debitAmount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  creditAmount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  transaction: z.union([ z.lazy(() => TransactionRelationFilterSchema),z.lazy(() => TransactionWhereInputSchema) ]).optional(),
  inventory: z.union([ z.lazy(() => InventoryNullableRelationFilterSchema),z.lazy(() => InventoryWhereInputSchema) ]).optional().nullable(),
  accountPayable: z.union([ z.lazy(() => AccountPayableNullableRelationFilterSchema),z.lazy(() => AccountPayableWhereInputSchema) ]).optional().nullable(),
  accountReceivable: z.union([ z.lazy(() => AccountReceivableNullableRelationFilterSchema),z.lazy(() => AccountReceivableWhereInputSchema) ]).optional().nullable(),
  cash: z.union([ z.lazy(() => CashNullableRelationFilterSchema),z.lazy(() => CashWhereInputSchema) ]).optional().nullable(),
}).strict();

export const TransactionItemOrderByWithRelationInputSchema: z.ZodType<Prisma.TransactionItemOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventoryUnit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventoryUnitQuantity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventoryPricePerUnit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accountPayableId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accountReceivableId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cashId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  unitQuantity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  quantity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  debitAmount: z.lazy(() => SortOrderSchema).optional(),
  creditAmount: z.lazy(() => SortOrderSchema).optional(),
  transaction: z.lazy(() => TransactionOrderByWithRelationInputSchema).optional(),
  inventory: z.lazy(() => InventoryOrderByWithRelationInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableOrderByWithRelationInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableOrderByWithRelationInputSchema).optional(),
  cash: z.lazy(() => CashOrderByWithRelationInputSchema).optional()
}).strict();

export const TransactionItemWhereUniqueInputSchema: z.ZodType<Prisma.TransactionItemWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => TransactionItemWhereInputSchema),z.lazy(() => TransactionItemWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionItemWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionItemWhereInputSchema),z.lazy(() => TransactionItemWhereInputSchema).array() ]).optional(),
  transactionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionItemTypeFilterSchema),z.lazy(() => TransactionItemTypeSchema) ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  inventoryBarcode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inventoryUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  accountPayableId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  accountReceivableId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  cashId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  unitQuantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  debitAmount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  creditAmount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  transaction: z.union([ z.lazy(() => TransactionRelationFilterSchema),z.lazy(() => TransactionWhereInputSchema) ]).optional(),
  inventory: z.union([ z.lazy(() => InventoryNullableRelationFilterSchema),z.lazy(() => InventoryWhereInputSchema) ]).optional().nullable(),
  accountPayable: z.union([ z.lazy(() => AccountPayableNullableRelationFilterSchema),z.lazy(() => AccountPayableWhereInputSchema) ]).optional().nullable(),
  accountReceivable: z.union([ z.lazy(() => AccountReceivableNullableRelationFilterSchema),z.lazy(() => AccountReceivableWhereInputSchema) ]).optional().nullable(),
  cash: z.union([ z.lazy(() => CashNullableRelationFilterSchema),z.lazy(() => CashWhereInputSchema) ]).optional().nullable(),
}).strict());

export const TransactionItemOrderByWithAggregationInputSchema: z.ZodType<Prisma.TransactionItemOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventoryUnit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventoryUnitQuantity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  inventoryPricePerUnit: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accountPayableId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accountReceivableId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cashId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  unitQuantity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  quantity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  debitAmount: z.lazy(() => SortOrderSchema).optional(),
  creditAmount: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TransactionItemCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TransactionItemAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TransactionItemMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TransactionItemMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TransactionItemSumOrderByAggregateInputSchema).optional()
}).strict();

export const TransactionItemScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TransactionItemScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionItemScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionItemScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionItemScalarWhereWithAggregatesInputSchema),z.lazy(() => TransactionItemScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  transactionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionItemTypeWithAggregatesFilterSchema),z.lazy(() => TransactionItemTypeSchema) ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  inventoryBarcode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  inventoryUnit: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  accountPayableId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  accountReceivableId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  cashId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  unitQuantity: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  quantity: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  debitAmount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  creditAmount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const AccountPayableWhereInputSchema: z.ZodType<Prisma.AccountPayableWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountPayableWhereInputSchema),z.lazy(() => AccountPayableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountPayableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountPayableWhereInputSchema),z.lazy(() => AccountPayableWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  taxId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  remark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transactions: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict();

export const AccountPayableOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountPayableOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  taxId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  remark: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  transactions: z.lazy(() => TransactionItemOrderByRelationAggregateInputSchema).optional(),
  images: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AccountPayableWhereUniqueInputSchema: z.ZodType<Prisma.AccountPayableWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AccountPayableWhereInputSchema),z.lazy(() => AccountPayableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountPayableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountPayableWhereInputSchema),z.lazy(() => AccountPayableWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  taxId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  remark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transactions: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict());

export const AccountPayableOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountPayableOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  taxId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  remark: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountPayableCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountPayableAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountPayableMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountPayableMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountPayableSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountPayableScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountPayableScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountPayableScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountPayableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountPayableScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountPayableScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountPayableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  taxId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  remark: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const AccountReceivableWhereInputSchema: z.ZodType<Prisma.AccountReceivableWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountReceivableWhereInputSchema),z.lazy(() => AccountReceivableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountReceivableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountReceivableWhereInputSchema),z.lazy(() => AccountReceivableWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  taxId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  remark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transactions: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict();

export const AccountReceivableOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountReceivableOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  taxId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  remark: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  transactions: z.lazy(() => TransactionItemOrderByRelationAggregateInputSchema).optional(),
  images: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const AccountReceivableWhereUniqueInputSchema: z.ZodType<Prisma.AccountReceivableWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => AccountReceivableWhereInputSchema),z.lazy(() => AccountReceivableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountReceivableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountReceivableWhereInputSchema),z.lazy(() => AccountReceivableWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  taxId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  remark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transactions: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict());

export const AccountReceivableOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountReceivableOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  taxId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  remark: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountReceivableCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountReceivableAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountReceivableMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountReceivableMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountReceivableSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountReceivableScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountReceivableScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountReceivableScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountReceivableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountReceivableScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountReceivableScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountReceivableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  taxId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  remark: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CashWhereInputSchema: z.ZodType<Prisma.CashWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CashWhereInputSchema),z.lazy(() => CashWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CashWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CashWhereInputSchema),z.lazy(() => CashWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transactions: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict();

export const CashOrderByWithRelationInputSchema: z.ZodType<Prisma.CashOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  transactions: z.lazy(() => TransactionItemOrderByRelationAggregateInputSchema).optional(),
  images: z.lazy(() => ImageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CashWhereUniqueInputSchema: z.ZodType<Prisma.CashWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CashWhereInputSchema),z.lazy(() => CashWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CashWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CashWhereInputSchema),z.lazy(() => CashWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  transactions: z.lazy(() => TransactionItemListRelationFilterSchema).optional(),
  images: z.lazy(() => ImageListRelationFilterSchema).optional()
}).strict());

export const CashOrderByWithAggregationInputSchema: z.ZodType<Prisma.CashOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CashCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CashAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CashMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CashMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CashSumOrderByAggregateInputSchema).optional()
}).strict();

export const CashScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CashScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CashScalarWhereWithAggregatesInputSchema),z.lazy(() => CashScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CashScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CashScalarWhereWithAggregatesInputSchema),z.lazy(() => CashScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ImageWhereInputSchema: z.ZodType<Prisma.ImageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  transactionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cashId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  arId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  apId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inventory: z.union([ z.lazy(() => InventoryNullableRelationFilterSchema),z.lazy(() => InventoryWhereInputSchema) ]).optional().nullable(),
  transaction: z.union([ z.lazy(() => TransactionNullableRelationFilterSchema),z.lazy(() => TransactionWhereInputSchema) ]).optional().nullable(),
  cash: z.union([ z.lazy(() => CashNullableRelationFilterSchema),z.lazy(() => CashWhereInputSchema) ]).optional().nullable(),
  ar: z.union([ z.lazy(() => AccountReceivableNullableRelationFilterSchema),z.lazy(() => AccountReceivableWhereInputSchema) ]).optional().nullable(),
  ap: z.union([ z.lazy(() => AccountPayableNullableRelationFilterSchema),z.lazy(() => AccountPayableWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ImageOrderByWithRelationInputSchema: z.ZodType<Prisma.ImageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  transactionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cashId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  arId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  apId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  inventory: z.lazy(() => InventoryOrderByWithRelationInputSchema).optional(),
  transaction: z.lazy(() => TransactionOrderByWithRelationInputSchema).optional(),
  cash: z.lazy(() => CashOrderByWithRelationInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableOrderByWithRelationInputSchema).optional(),
  ap: z.lazy(() => AccountPayableOrderByWithRelationInputSchema).optional()
}).strict();

export const ImageWhereUniqueInputSchema: z.ZodType<Prisma.ImageWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageWhereInputSchema),z.lazy(() => ImageWhereInputSchema).array() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  transactionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cashId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  arId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  apId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inventory: z.union([ z.lazy(() => InventoryNullableRelationFilterSchema),z.lazy(() => InventoryWhereInputSchema) ]).optional().nullable(),
  transaction: z.union([ z.lazy(() => TransactionNullableRelationFilterSchema),z.lazy(() => TransactionWhereInputSchema) ]).optional().nullable(),
  cash: z.union([ z.lazy(() => CashNullableRelationFilterSchema),z.lazy(() => CashWhereInputSchema) ]).optional().nullable(),
  ar: z.union([ z.lazy(() => AccountReceivableNullableRelationFilterSchema),z.lazy(() => AccountReceivableWhereInputSchema) ]).optional().nullable(),
  ap: z.union([ z.lazy(() => AccountPayableNullableRelationFilterSchema),z.lazy(() => AccountPayableWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ImageOrderByWithAggregationInputSchema: z.ZodType<Prisma.ImageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  transactionId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cashId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  arId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  apId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ImageCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ImageAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ImageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ImageMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ImageSumOrderByAggregateInputSchema).optional()
}).strict();

export const ImageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ImageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageScalarWhereWithAggregatesInputSchema),z.lazy(() => ImageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  transactionId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  cashId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  arId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  apId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InventoryCreateInputSchema: z.ZodType<Prisma.InventoryCreateInput> = z.object({
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutInventoryInputSchema).optional(),
  costs: z.lazy(() => CostCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryCreateNestedManyWithoutInventoryIdsInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryUncheckedCreateInputSchema: z.ZodType<Prisma.InventoryUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  costs: z.lazy(() => CostUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutInventoryIdsInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryUpdateInputSchema: z.ZodType<Prisma.InventoryUpdateInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutInventoryNestedInputSchema).optional(),
  costs: z.lazy(() => CostUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUpdateManyWithoutInventoryIdsNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const InventoryUncheckedUpdateInputSchema: z.ZodType<Prisma.InventoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  costs: z.lazy(() => CostUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutInventoryIdsNestedInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const InventoryCreateManyInputSchema: z.ZodType<Prisma.InventoryCreateManyInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const InventoryUpdateManyMutationInputSchema: z.ZodType<Prisma.InventoryUpdateManyMutationInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InventoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InventoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductCategoryCreateInputSchema: z.ZodType<Prisma.ProductCategoryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  inventoryIds: z.lazy(() => InventoryCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict();

export const ProductCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  inventoryIds: z.lazy(() => InventoryUncheckedCreateNestedManyWithoutCategoriesInputSchema).optional()
}).strict();

export const ProductCategoryUpdateInputSchema: z.ZodType<Prisma.ProductCategoryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryIds: z.lazy(() => InventoryUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict();

export const ProductCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryIds: z.lazy(() => InventoryUncheckedUpdateManyWithoutCategoriesNestedInputSchema).optional()
}).strict();

export const ProductCategoryCreateManyInputSchema: z.ZodType<Prisma.ProductCategoryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const ProductCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductCategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceCreateInputSchema: z.ZodType<Prisma.PriceCreateInput> = z.object({
  id: z.string().cuid().optional(),
  barcode: z.string(),
  quantity: z.number(),
  unit: z.string(),
  price: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutPricesInputSchema)
}).strict();

export const PriceUncheckedCreateInputSchema: z.ZodType<Prisma.PriceUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int(),
  barcode: z.string(),
  quantity: z.number(),
  unit: z.string(),
  price: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const PriceUpdateInputSchema: z.ZodType<Prisma.PriceUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  barcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventory: z.lazy(() => InventoryUpdateOneRequiredWithoutPricesNestedInputSchema).optional()
}).strict();

export const PriceUncheckedUpdateInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  barcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceCreateManyInputSchema: z.ZodType<Prisma.PriceCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int(),
  barcode: z.string(),
  quantity: z.number(),
  unit: z.string(),
  price: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const PriceUpdateManyMutationInputSchema: z.ZodType<Prisma.PriceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  barcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  barcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CostCreateInputSchema: z.ZodType<Prisma.CostCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  quantity: z.number(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  latestQuantity: z.number(),
  latestCost: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutCostsInputSchema)
}).strict();

export const CostUncheckedCreateInputSchema: z.ZodType<Prisma.CostUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int(),
  date: z.coerce.date(),
  quantity: z.number(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  latestQuantity: z.number(),
  latestCost: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const CostUpdateInputSchema: z.ZodType<Prisma.CostUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricePerUnit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestQuantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestCost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventory: z.lazy(() => InventoryUpdateOneRequiredWithoutCostsNestedInputSchema).optional()
}).strict();

export const CostUncheckedUpdateInputSchema: z.ZodType<Prisma.CostUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricePerUnit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestQuantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestCost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CostCreateManyInputSchema: z.ZodType<Prisma.CostCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int(),
  date: z.coerce.date(),
  quantity: z.number(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  latestQuantity: z.number(),
  latestCost: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const CostUpdateManyMutationInputSchema: z.ZodType<Prisma.CostUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricePerUnit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestQuantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestCost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricePerUnit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestQuantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestCost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionCreateInputSchema: z.ZodType<Prisma.TransactionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  documentNumber: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  remark: z.string(),
  transactionItems: z.lazy(() => TransactionItemCreateNestedManyWithoutTransactionInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutTransactionInputSchema).optional()
}).strict();

export const TransactionUncheckedCreateInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  documentNumber: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  remark: z.string(),
  transactionItems: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutTransactionInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutTransactionInputSchema).optional()
}).strict();

export const TransactionUpdateInputSchema: z.ZodType<Prisma.TransactionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionItems: z.lazy(() => TransactionItemUpdateManyWithoutTransactionNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutTransactionNestedInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionCreateManyInputSchema: z.ZodType<Prisma.TransactionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  documentNumber: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  remark: z.string()
}).strict();

export const TransactionUpdateManyMutationInputSchema: z.ZodType<Prisma.TransactionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemCreateInputSchema: z.ZodType<Prisma.TransactionItemCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutTransactionItemsInputSchema),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutTransactionItemsInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableCreateNestedOneWithoutTransactionsInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableCreateNestedOneWithoutTransactionsInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutTransactionsInputSchema).optional()
}).strict();

export const TransactionItemUncheckedCreateInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const TransactionItemUpdateInputSchema: z.ZodType<Prisma.TransactionItemUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transaction: z.lazy(() => TransactionUpdateOneRequiredWithoutTransactionItemsNestedInputSchema).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutTransactionItemsNestedInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableUpdateOneWithoutTransactionsNestedInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableUpdateOneWithoutTransactionsNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const TransactionItemUncheckedUpdateInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemCreateManyInputSchema: z.ZodType<Prisma.TransactionItemCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const TransactionItemUpdateManyMutationInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountPayableCreateInputSchema: z.ZodType<Prisma.AccountPayableCreateInput> = z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemCreateNestedManyWithoutAccountPayableInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutApInputSchema).optional()
}).strict();

export const AccountPayableUncheckedCreateInputSchema: z.ZodType<Prisma.AccountPayableUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutAccountPayableInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutApInputSchema).optional()
}).strict();

export const AccountPayableUpdateInputSchema: z.ZodType<Prisma.AccountPayableUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUpdateManyWithoutAccountPayableNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutApNestedInputSchema).optional()
}).strict();

export const AccountPayableUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountPayableUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutAccountPayableNestedInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutApNestedInputSchema).optional()
}).strict();

export const AccountPayableCreateManyInputSchema: z.ZodType<Prisma.AccountPayableCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const AccountPayableUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountPayableUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountPayableUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountPayableUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountReceivableCreateInputSchema: z.ZodType<Prisma.AccountReceivableCreateInput> = z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemCreateNestedManyWithoutAccountReceivableInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutArInputSchema).optional()
}).strict();

export const AccountReceivableUncheckedCreateInputSchema: z.ZodType<Prisma.AccountReceivableUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutAccountReceivableInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutArInputSchema).optional()
}).strict();

export const AccountReceivableUpdateInputSchema: z.ZodType<Prisma.AccountReceivableUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUpdateManyWithoutAccountReceivableNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutArNestedInputSchema).optional()
}).strict();

export const AccountReceivableUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountReceivableUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutAccountReceivableNestedInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutArNestedInputSchema).optional()
}).strict();

export const AccountReceivableCreateManyInputSchema: z.ZodType<Prisma.AccountReceivableCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const AccountReceivableUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountReceivableUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountReceivableUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountReceivableUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CashCreateInputSchema: z.ZodType<Prisma.CashCreateInput> = z.object({
  name: z.string(),
  accountId: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemCreateNestedManyWithoutCashInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutCashInputSchema).optional()
}).strict();

export const CashUncheckedCreateInputSchema: z.ZodType<Prisma.CashUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  accountId: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutCashInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutCashInputSchema).optional()
}).strict();

export const CashUpdateInputSchema: z.ZodType<Prisma.CashUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUpdateManyWithoutCashNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutCashNestedInputSchema).optional()
}).strict();

export const CashUncheckedUpdateInputSchema: z.ZodType<Prisma.CashUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutCashNestedInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutCashNestedInputSchema).optional()
}).strict();

export const CashCreateManyInputSchema: z.ZodType<Prisma.CashCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  accountId: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const CashUpdateManyMutationInputSchema: z.ZodType<Prisma.CashUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CashUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CashUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageCreateInputSchema: z.ZodType<Prisma.ImageCreateInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutImagesInputSchema).optional(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutImagesInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutImagesInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableCreateNestedOneWithoutImagesInputSchema).optional(),
  ap: z.lazy(() => AccountPayableCreateNestedOneWithoutImagesInputSchema).optional()
}).strict();

export const ImageUncheckedCreateInputSchema: z.ZodType<Prisma.ImageUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const ImageUpdateInputSchema: z.ZodType<Prisma.ImageUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutImagesNestedInputSchema).optional(),
  transaction: z.lazy(() => TransactionUpdateOneWithoutImagesNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutImagesNestedInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableUpdateOneWithoutImagesNestedInputSchema).optional(),
  ap: z.lazy(() => AccountPayableUpdateOneWithoutImagesNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageCreateManyInputSchema: z.ZodType<Prisma.ImageCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const ImageUpdateManyMutationInputSchema: z.ZodType<Prisma.ImageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const PriceListRelationFilterSchema: z.ZodType<Prisma.PriceListRelationFilter> = z.object({
  every: z.lazy(() => PriceWhereInputSchema).optional(),
  some: z.lazy(() => PriceWhereInputSchema).optional(),
  none: z.lazy(() => PriceWhereInputSchema).optional()
}).strict();

export const CostListRelationFilterSchema: z.ZodType<Prisma.CostListRelationFilter> = z.object({
  every: z.lazy(() => CostWhereInputSchema).optional(),
  some: z.lazy(() => CostWhereInputSchema).optional(),
  none: z.lazy(() => CostWhereInputSchema).optional()
}).strict();

export const TransactionItemListRelationFilterSchema: z.ZodType<Prisma.TransactionItemListRelationFilter> = z.object({
  every: z.lazy(() => TransactionItemWhereInputSchema).optional(),
  some: z.lazy(() => TransactionItemWhereInputSchema).optional(),
  none: z.lazy(() => TransactionItemWhereInputSchema).optional()
}).strict();

export const ProductCategoryListRelationFilterSchema: z.ZodType<Prisma.ProductCategoryListRelationFilter> = z.object({
  every: z.lazy(() => ProductCategoryWhereInputSchema).optional(),
  some: z.lazy(() => ProductCategoryWhereInputSchema).optional(),
  none: z.lazy(() => ProductCategoryWhereInputSchema).optional()
}).strict();

export const ImageListRelationFilterSchema: z.ZodType<Prisma.ImageListRelationFilter> = z.object({
  every: z.lazy(() => ImageWhereInputSchema).optional(),
  some: z.lazy(() => ImageWhereInputSchema).optional(),
  none: z.lazy(() => ImageWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const PriceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PriceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionItemOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TransactionItemOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductCategoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductCategoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ImageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.InventoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.InventoryAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InventoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.InventoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventorySumOrderByAggregateInputSchema: z.ZodType<Prisma.InventorySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const InventoryListRelationFilterSchema: z.ZodType<Prisma.InventoryListRelationFilter> = z.object({
  every: z.lazy(() => InventoryWhereInputSchema).optional(),
  some: z.lazy(() => InventoryWhereInputSchema).optional(),
  none: z.lazy(() => InventoryWhereInputSchema).optional()
}).strict();

export const InventoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InventoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InventoryRelationFilterSchema: z.ZodType<Prisma.InventoryRelationFilter> = z.object({
  is: z.lazy(() => InventoryWhereInputSchema).optional(),
  isNot: z.lazy(() => InventoryWhereInputSchema).optional()
}).strict();

export const PriceCountOrderByAggregateInputSchema: z.ZodType<Prisma.PriceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  barcode: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PriceAvgOrderByAggregateInput> = z.object({
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  barcode: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceMinOrderByAggregateInputSchema: z.ZodType<Prisma.PriceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  barcode: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceSumOrderByAggregateInputSchema: z.ZodType<Prisma.PriceSumOrderByAggregateInput> = z.object({
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CostCountOrderByAggregateInputSchema: z.ZodType<Prisma.CostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  pricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  latestQuantity: z.lazy(() => SortOrderSchema).optional(),
  latestCost: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CostAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CostAvgOrderByAggregateInput> = z.object({
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  pricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  latestQuantity: z.lazy(() => SortOrderSchema).optional(),
  latestCost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  pricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  latestQuantity: z.lazy(() => SortOrderSchema).optional(),
  latestCost: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CostMinOrderByAggregateInputSchema: z.ZodType<Prisma.CostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  pricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  latestQuantity: z.lazy(() => SortOrderSchema).optional(),
  latestCost: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CostSumOrderByAggregateInputSchema: z.ZodType<Prisma.CostSumOrderByAggregateInput> = z.object({
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  pricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  totalPrice: z.lazy(() => SortOrderSchema).optional(),
  latestQuantity: z.lazy(() => SortOrderSchema).optional(),
  latestCost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTransactionTypeFilterSchema: z.ZodType<Prisma.EnumTransactionTypeFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeFilterSchema) ]).optional(),
}).strict();

export const TransactionCountOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentNumber: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentNumber: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionMinOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  documentNumber: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTransactionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTransactionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional()
}).strict();

export const EnumTransactionItemTypeFilterSchema: z.ZodType<Prisma.EnumTransactionItemTypeFilter> = z.object({
  equals: z.lazy(() => TransactionItemTypeSchema).optional(),
  in: z.lazy(() => TransactionItemTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => NestedEnumTransactionItemTypeFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const TransactionRelationFilterSchema: z.ZodType<Prisma.TransactionRelationFilter> = z.object({
  is: z.lazy(() => TransactionWhereInputSchema).optional(),
  isNot: z.lazy(() => TransactionWhereInputSchema).optional()
}).strict();

export const InventoryNullableRelationFilterSchema: z.ZodType<Prisma.InventoryNullableRelationFilter> = z.object({
  is: z.lazy(() => InventoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => InventoryWhereInputSchema).optional().nullable()
}).strict();

export const AccountPayableNullableRelationFilterSchema: z.ZodType<Prisma.AccountPayableNullableRelationFilter> = z.object({
  is: z.lazy(() => AccountPayableWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AccountPayableWhereInputSchema).optional().nullable()
}).strict();

export const AccountReceivableNullableRelationFilterSchema: z.ZodType<Prisma.AccountReceivableNullableRelationFilter> = z.object({
  is: z.lazy(() => AccountReceivableWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AccountReceivableWhereInputSchema).optional().nullable()
}).strict();

export const CashNullableRelationFilterSchema: z.ZodType<Prisma.CashNullableRelationFilter> = z.object({
  is: z.lazy(() => CashWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CashWhereInputSchema).optional().nullable()
}).strict();

export const TransactionItemCountOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionItemCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  inventoryBarcode: z.lazy(() => SortOrderSchema).optional(),
  inventoryUnit: z.lazy(() => SortOrderSchema).optional(),
  inventoryUnitQuantity: z.lazy(() => SortOrderSchema).optional(),
  inventoryPricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  accountPayableId: z.lazy(() => SortOrderSchema).optional(),
  accountReceivableId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  unitQuantity: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  debitAmount: z.lazy(() => SortOrderSchema).optional(),
  creditAmount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionItemAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionItemAvgOrderByAggregateInput> = z.object({
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  inventoryUnitQuantity: z.lazy(() => SortOrderSchema).optional(),
  inventoryPricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  accountPayableId: z.lazy(() => SortOrderSchema).optional(),
  accountReceivableId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  unitQuantity: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  debitAmount: z.lazy(() => SortOrderSchema).optional(),
  creditAmount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionItemMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionItemMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  inventoryBarcode: z.lazy(() => SortOrderSchema).optional(),
  inventoryUnit: z.lazy(() => SortOrderSchema).optional(),
  inventoryUnitQuantity: z.lazy(() => SortOrderSchema).optional(),
  inventoryPricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  accountPayableId: z.lazy(() => SortOrderSchema).optional(),
  accountReceivableId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  unitQuantity: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  debitAmount: z.lazy(() => SortOrderSchema).optional(),
  creditAmount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionItemMinOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionItemMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  inventoryBarcode: z.lazy(() => SortOrderSchema).optional(),
  inventoryUnit: z.lazy(() => SortOrderSchema).optional(),
  inventoryUnitQuantity: z.lazy(() => SortOrderSchema).optional(),
  inventoryPricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  accountPayableId: z.lazy(() => SortOrderSchema).optional(),
  accountReceivableId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  unitQuantity: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  debitAmount: z.lazy(() => SortOrderSchema).optional(),
  creditAmount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionItemSumOrderByAggregateInputSchema: z.ZodType<Prisma.TransactionItemSumOrderByAggregateInput> = z.object({
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  inventoryUnitQuantity: z.lazy(() => SortOrderSchema).optional(),
  inventoryPricePerUnit: z.lazy(() => SortOrderSchema).optional(),
  accountPayableId: z.lazy(() => SortOrderSchema).optional(),
  accountReceivableId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  unitQuantity: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  debitAmount: z.lazy(() => SortOrderSchema).optional(),
  creditAmount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTransactionItemTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTransactionItemTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TransactionItemTypeSchema).optional(),
  in: z.lazy(() => TransactionItemTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => NestedEnumTransactionItemTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTransactionItemTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTransactionItemTypeFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const AccountPayableCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountPayableCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  taxId: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountPayableAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountPayableAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountPayableMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountPayableMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  taxId: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountPayableMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountPayableMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  taxId: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountPayableSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountPayableSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountReceivableCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountReceivableCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  taxId: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountReceivableAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountReceivableAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountReceivableMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountReceivableMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  taxId: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountReceivableMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountReceivableMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  taxId: z.lazy(() => SortOrderSchema).optional(),
  remark: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountReceivableSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountReceivableSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CashCountOrderByAggregateInputSchema: z.ZodType<Prisma.CashCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CashAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CashAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CashMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CashMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CashMinOrderByAggregateInputSchema: z.ZodType<Prisma.CashMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CashSumOrderByAggregateInputSchema: z.ZodType<Prisma.CashSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TransactionNullableRelationFilterSchema: z.ZodType<Prisma.TransactionNullableRelationFilter> = z.object({
  is: z.lazy(() => TransactionWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TransactionWhereInputSchema).optional().nullable()
}).strict();

export const ImageCountOrderByAggregateInputSchema: z.ZodType<Prisma.ImageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  arId: z.lazy(() => SortOrderSchema).optional(),
  apId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ImageAvgOrderByAggregateInput> = z.object({
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  arId: z.lazy(() => SortOrderSchema).optional(),
  apId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ImageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  arId: z.lazy(() => SortOrderSchema).optional(),
  apId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageMinOrderByAggregateInputSchema: z.ZodType<Prisma.ImageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  transactionId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  arId: z.lazy(() => SortOrderSchema).optional(),
  apId: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdDate: z.lazy(() => SortOrderSchema).optional(),
  updatedDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ImageSumOrderByAggregateInputSchema: z.ZodType<Prisma.ImageSumOrderByAggregateInput> = z.object({
  inventoryId: z.lazy(() => SortOrderSchema).optional(),
  cashId: z.lazy(() => SortOrderSchema).optional(),
  arId: z.lazy(() => SortOrderSchema).optional(),
  apId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PriceCreateNestedManyWithoutInventoryInputSchema: z.ZodType<Prisma.PriceCreateNestedManyWithoutInventoryInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutInventoryInputSchema),z.lazy(() => PriceCreateWithoutInventoryInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => PriceCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyInventoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CostCreateNestedManyWithoutInventoryInputSchema: z.ZodType<Prisma.CostCreateNestedManyWithoutInventoryInput> = z.object({
  create: z.union([ z.lazy(() => CostCreateWithoutInventoryInputSchema),z.lazy(() => CostCreateWithoutInventoryInputSchema).array(),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CostCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => CostCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CostCreateManyInventoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemCreateNestedManyWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemCreateNestedManyWithoutInventoryInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyInventoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductCategoryCreateNestedManyWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryCreateNestedManyWithoutInventoryIdsInput> = z.object({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema).array(),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCategoryCreateOrConnectWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryCreateOrConnectWithoutInventoryIdsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageCreateNestedManyWithoutInventoryInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutInventoryInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutInventoryInputSchema),z.lazy(() => ImageCreateWithoutInventoryInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => ImageCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyInventoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PriceUncheckedCreateNestedManyWithoutInventoryInputSchema: z.ZodType<Prisma.PriceUncheckedCreateNestedManyWithoutInventoryInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutInventoryInputSchema),z.lazy(() => PriceCreateWithoutInventoryInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => PriceCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyInventoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CostUncheckedCreateNestedManyWithoutInventoryInputSchema: z.ZodType<Prisma.CostUncheckedCreateNestedManyWithoutInventoryInput> = z.object({
  create: z.union([ z.lazy(() => CostCreateWithoutInventoryInputSchema),z.lazy(() => CostCreateWithoutInventoryInputSchema).array(),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CostCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => CostCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CostCreateManyInventoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedCreateNestedManyWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateNestedManyWithoutInventoryInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyInventoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductCategoryUncheckedCreateNestedManyWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedCreateNestedManyWithoutInventoryIdsInput> = z.object({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema).array(),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCategoryCreateOrConnectWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryCreateOrConnectWithoutInventoryIdsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedCreateNestedManyWithoutInventoryInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutInventoryInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutInventoryInputSchema),z.lazy(() => ImageCreateWithoutInventoryInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => ImageCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyInventoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const PriceUpdateManyWithoutInventoryNestedInputSchema: z.ZodType<Prisma.PriceUpdateManyWithoutInventoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutInventoryInputSchema),z.lazy(() => PriceCreateWithoutInventoryInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => PriceCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PriceUpsertWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => PriceUpsertWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyInventoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => PriceUpdateWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PriceUpdateManyWithWhereWithoutInventoryInputSchema),z.lazy(() => PriceUpdateManyWithWhereWithoutInventoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CostUpdateManyWithoutInventoryNestedInputSchema: z.ZodType<Prisma.CostUpdateManyWithoutInventoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => CostCreateWithoutInventoryInputSchema),z.lazy(() => CostCreateWithoutInventoryInputSchema).array(),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CostCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => CostCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CostUpsertWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => CostUpsertWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CostCreateManyInventoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CostUpdateWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => CostUpdateWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CostUpdateManyWithWhereWithoutInventoryInputSchema),z.lazy(() => CostUpdateManyWithWhereWithoutInventoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CostScalarWhereInputSchema),z.lazy(() => CostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUpdateManyWithoutInventoryNestedInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithoutInventoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyInventoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutInventoryInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutInventoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductCategoryUpdateManyWithoutInventoryIdsNestedInputSchema: z.ZodType<Prisma.ProductCategoryUpdateManyWithoutInventoryIdsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema).array(),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCategoryCreateOrConnectWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryCreateOrConnectWithoutInventoryIdsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductCategoryUpsertWithWhereUniqueWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUpsertWithWhereUniqueWithoutInventoryIdsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductCategoryUpdateWithWhereUniqueWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUpdateWithWhereUniqueWithoutInventoryIdsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductCategoryUpdateManyWithWhereWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUpdateManyWithWhereWithoutInventoryIdsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductCategoryScalarWhereInputSchema),z.lazy(() => ProductCategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUpdateManyWithoutInventoryNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutInventoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutInventoryInputSchema),z.lazy(() => ImageCreateWithoutInventoryInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => ImageCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyInventoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutInventoryInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutInventoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PriceUncheckedUpdateManyWithoutInventoryNestedInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyWithoutInventoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => PriceCreateWithoutInventoryInputSchema),z.lazy(() => PriceCreateWithoutInventoryInputSchema).array(),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PriceCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => PriceCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PriceUpsertWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => PriceUpsertWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PriceCreateManyInventoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PriceWhereUniqueInputSchema),z.lazy(() => PriceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PriceUpdateWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => PriceUpdateWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PriceUpdateManyWithWhereWithoutInventoryInputSchema),z.lazy(() => PriceUpdateManyWithWhereWithoutInventoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CostUncheckedUpdateManyWithoutInventoryNestedInputSchema: z.ZodType<Prisma.CostUncheckedUpdateManyWithoutInventoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => CostCreateWithoutInventoryInputSchema),z.lazy(() => CostCreateWithoutInventoryInputSchema).array(),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CostCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => CostCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CostUpsertWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => CostUpsertWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CostCreateManyInventoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CostWhereUniqueInputSchema),z.lazy(() => CostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CostUpdateWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => CostUpdateWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CostUpdateManyWithWhereWithoutInventoryInputSchema),z.lazy(() => CostUpdateManyWithWhereWithoutInventoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CostScalarWhereInputSchema),z.lazy(() => CostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutInventoryNestedInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutInventoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyInventoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutInventoryInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutInventoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductCategoryUncheckedUpdateManyWithoutInventoryIdsNestedInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateManyWithoutInventoryIdsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema).array(),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCategoryCreateOrConnectWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryCreateOrConnectWithoutInventoryIdsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductCategoryUpsertWithWhereUniqueWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUpsertWithWhereUniqueWithoutInventoryIdsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductCategoryWhereUniqueInputSchema),z.lazy(() => ProductCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductCategoryUpdateWithWhereUniqueWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUpdateWithWhereUniqueWithoutInventoryIdsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductCategoryUpdateManyWithWhereWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUpdateManyWithWhereWithoutInventoryIdsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductCategoryScalarWhereInputSchema),z.lazy(() => ProductCategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutInventoryNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutInventoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutInventoryInputSchema),z.lazy(() => ImageCreateWithoutInventoryInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutInventoryInputSchema),z.lazy(() => ImageCreateOrConnectWithoutInventoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyInventoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutInventoryInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutInventoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutInventoryInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutInventoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InventoryCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryCreateWithoutCategoriesInputSchema).array(),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventoryCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => InventoryCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InventoryUncheckedCreateNestedManyWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryUncheckedCreateNestedManyWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryCreateWithoutCategoriesInputSchema).array(),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventoryCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => InventoryCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InventoryUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.InventoryUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryCreateWithoutCategoriesInputSchema).array(),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventoryCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => InventoryCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InventoryUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => InventoryUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InventoryUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => InventoryUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InventoryUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => InventoryUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InventoryScalarWhereInputSchema),z.lazy(() => InventoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InventoryUncheckedUpdateManyWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.InventoryUncheckedUpdateManyWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryCreateWithoutCategoriesInputSchema).array(),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InventoryCreateOrConnectWithoutCategoriesInputSchema),z.lazy(() => InventoryCreateOrConnectWithoutCategoriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InventoryUpsertWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => InventoryUpsertWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InventoryWhereUniqueInputSchema),z.lazy(() => InventoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InventoryUpdateWithWhereUniqueWithoutCategoriesInputSchema),z.lazy(() => InventoryUpdateWithWhereUniqueWithoutCategoriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InventoryUpdateManyWithWhereWithoutCategoriesInputSchema),z.lazy(() => InventoryUpdateManyWithWhereWithoutCategoriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InventoryScalarWhereInputSchema),z.lazy(() => InventoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InventoryCreateNestedOneWithoutPricesInputSchema: z.ZodType<Prisma.InventoryCreateNestedOneWithoutPricesInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutPricesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutPricesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventoryCreateOrConnectWithoutPricesInputSchema).optional(),
  connect: z.lazy(() => InventoryWhereUniqueInputSchema).optional()
}).strict();

export const InventoryUpdateOneRequiredWithoutPricesNestedInputSchema: z.ZodType<Prisma.InventoryUpdateOneRequiredWithoutPricesNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutPricesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutPricesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventoryCreateOrConnectWithoutPricesInputSchema).optional(),
  upsert: z.lazy(() => InventoryUpsertWithoutPricesInputSchema).optional(),
  connect: z.lazy(() => InventoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InventoryUpdateToOneWithWhereWithoutPricesInputSchema),z.lazy(() => InventoryUpdateWithoutPricesInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutPricesInputSchema) ]).optional(),
}).strict();

export const InventoryCreateNestedOneWithoutCostsInputSchema: z.ZodType<Prisma.InventoryCreateNestedOneWithoutCostsInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutCostsInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventoryCreateOrConnectWithoutCostsInputSchema).optional(),
  connect: z.lazy(() => InventoryWhereUniqueInputSchema).optional()
}).strict();

export const InventoryUpdateOneRequiredWithoutCostsNestedInputSchema: z.ZodType<Prisma.InventoryUpdateOneRequiredWithoutCostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutCostsInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventoryCreateOrConnectWithoutCostsInputSchema).optional(),
  upsert: z.lazy(() => InventoryUpsertWithoutCostsInputSchema).optional(),
  connect: z.lazy(() => InventoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InventoryUpdateToOneWithWhereWithoutCostsInputSchema),z.lazy(() => InventoryUpdateWithoutCostsInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutCostsInputSchema) ]).optional(),
}).strict();

export const TransactionItemCreateNestedManyWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemCreateNestedManyWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutTransactionInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutTransactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyTransactionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageCreateNestedManyWithoutTransactionInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutTransactionInputSchema),z.lazy(() => ImageCreateWithoutTransactionInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutTransactionInputSchema),z.lazy(() => ImageCreateOrConnectWithoutTransactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyTransactionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedCreateNestedManyWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateNestedManyWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutTransactionInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutTransactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyTransactionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedCreateNestedManyWithoutTransactionInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutTransactionInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutTransactionInputSchema),z.lazy(() => ImageCreateWithoutTransactionInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutTransactionInputSchema),z.lazy(() => ImageCreateOrConnectWithoutTransactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyTransactionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumTransactionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTransactionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TransactionTypeSchema).optional()
}).strict();

export const TransactionItemUpdateManyWithoutTransactionNestedInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutTransactionInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutTransactionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutTransactionInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutTransactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyTransactionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutTransactionInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutTransactionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutTransactionInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutTransactionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUpdateManyWithoutTransactionNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutTransactionInputSchema),z.lazy(() => ImageCreateWithoutTransactionInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutTransactionInputSchema),z.lazy(() => ImageCreateOrConnectWithoutTransactionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutTransactionInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutTransactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyTransactionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutTransactionInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutTransactionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutTransactionInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutTransactionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutTransactionNestedInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutTransactionInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutTransactionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutTransactionInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutTransactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyTransactionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutTransactionInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutTransactionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutTransactionInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutTransactionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutTransactionNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutTransactionNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutTransactionInputSchema),z.lazy(() => ImageCreateWithoutTransactionInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutTransactionInputSchema),z.lazy(() => ImageCreateOrConnectWithoutTransactionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutTransactionInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutTransactionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyTransactionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutTransactionInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutTransactionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutTransactionInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutTransactionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionCreateNestedOneWithoutTransactionItemsInputSchema: z.ZodType<Prisma.TransactionCreateNestedOneWithoutTransactionItemsInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutTransactionItemsInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutTransactionItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TransactionCreateOrConnectWithoutTransactionItemsInputSchema).optional(),
  connect: z.lazy(() => TransactionWhereUniqueInputSchema).optional()
}).strict();

export const InventoryCreateNestedOneWithoutTransactionItemsInputSchema: z.ZodType<Prisma.InventoryCreateNestedOneWithoutTransactionItemsInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutTransactionItemsInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutTransactionItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventoryCreateOrConnectWithoutTransactionItemsInputSchema).optional(),
  connect: z.lazy(() => InventoryWhereUniqueInputSchema).optional()
}).strict();

export const AccountPayableCreateNestedOneWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountPayableCreateNestedOneWithoutTransactionsInput> = z.object({
  create: z.union([ z.lazy(() => AccountPayableCreateWithoutTransactionsInputSchema),z.lazy(() => AccountPayableUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountPayableCreateOrConnectWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => AccountPayableWhereUniqueInputSchema).optional()
}).strict();

export const AccountReceivableCreateNestedOneWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountReceivableCreateNestedOneWithoutTransactionsInput> = z.object({
  create: z.union([ z.lazy(() => AccountReceivableCreateWithoutTransactionsInputSchema),z.lazy(() => AccountReceivableUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountReceivableCreateOrConnectWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => AccountReceivableWhereUniqueInputSchema).optional()
}).strict();

export const CashCreateNestedOneWithoutTransactionsInputSchema: z.ZodType<Prisma.CashCreateNestedOneWithoutTransactionsInput> = z.object({
  create: z.union([ z.lazy(() => CashCreateWithoutTransactionsInputSchema),z.lazy(() => CashUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CashCreateOrConnectWithoutTransactionsInputSchema).optional(),
  connect: z.lazy(() => CashWhereUniqueInputSchema).optional()
}).strict();

export const EnumTransactionItemTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTransactionItemTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TransactionItemTypeSchema).optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const TransactionUpdateOneRequiredWithoutTransactionItemsNestedInputSchema: z.ZodType<Prisma.TransactionUpdateOneRequiredWithoutTransactionItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutTransactionItemsInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutTransactionItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TransactionCreateOrConnectWithoutTransactionItemsInputSchema).optional(),
  upsert: z.lazy(() => TransactionUpsertWithoutTransactionItemsInputSchema).optional(),
  connect: z.lazy(() => TransactionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateToOneWithWhereWithoutTransactionItemsInputSchema),z.lazy(() => TransactionUpdateWithoutTransactionItemsInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutTransactionItemsInputSchema) ]).optional(),
}).strict();

export const InventoryUpdateOneWithoutTransactionItemsNestedInputSchema: z.ZodType<Prisma.InventoryUpdateOneWithoutTransactionItemsNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutTransactionItemsInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutTransactionItemsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventoryCreateOrConnectWithoutTransactionItemsInputSchema).optional(),
  upsert: z.lazy(() => InventoryUpsertWithoutTransactionItemsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InventoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InventoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InventoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InventoryUpdateToOneWithWhereWithoutTransactionItemsInputSchema),z.lazy(() => InventoryUpdateWithoutTransactionItemsInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutTransactionItemsInputSchema) ]).optional(),
}).strict();

export const AccountPayableUpdateOneWithoutTransactionsNestedInputSchema: z.ZodType<Prisma.AccountPayableUpdateOneWithoutTransactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountPayableCreateWithoutTransactionsInputSchema),z.lazy(() => AccountPayableUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountPayableCreateOrConnectWithoutTransactionsInputSchema).optional(),
  upsert: z.lazy(() => AccountPayableUpsertWithoutTransactionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AccountPayableWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AccountPayableWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AccountPayableWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountPayableUpdateToOneWithWhereWithoutTransactionsInputSchema),z.lazy(() => AccountPayableUpdateWithoutTransactionsInputSchema),z.lazy(() => AccountPayableUncheckedUpdateWithoutTransactionsInputSchema) ]).optional(),
}).strict();

export const AccountReceivableUpdateOneWithoutTransactionsNestedInputSchema: z.ZodType<Prisma.AccountReceivableUpdateOneWithoutTransactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountReceivableCreateWithoutTransactionsInputSchema),z.lazy(() => AccountReceivableUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountReceivableCreateOrConnectWithoutTransactionsInputSchema).optional(),
  upsert: z.lazy(() => AccountReceivableUpsertWithoutTransactionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AccountReceivableWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AccountReceivableWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AccountReceivableWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountReceivableUpdateToOneWithWhereWithoutTransactionsInputSchema),z.lazy(() => AccountReceivableUpdateWithoutTransactionsInputSchema),z.lazy(() => AccountReceivableUncheckedUpdateWithoutTransactionsInputSchema) ]).optional(),
}).strict();

export const CashUpdateOneWithoutTransactionsNestedInputSchema: z.ZodType<Prisma.CashUpdateOneWithoutTransactionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CashCreateWithoutTransactionsInputSchema),z.lazy(() => CashUncheckedCreateWithoutTransactionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CashCreateOrConnectWithoutTransactionsInputSchema).optional(),
  upsert: z.lazy(() => CashUpsertWithoutTransactionsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CashWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CashWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CashWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CashUpdateToOneWithWhereWithoutTransactionsInputSchema),z.lazy(() => CashUpdateWithoutTransactionsInputSchema),z.lazy(() => CashUncheckedUpdateWithoutTransactionsInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const TransactionItemCreateNestedManyWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemCreateNestedManyWithoutAccountPayableInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutAccountPayableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyAccountPayableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageCreateNestedManyWithoutApInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutApInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutApInputSchema),z.lazy(() => ImageCreateWithoutApInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutApInputSchema),z.lazy(() => ImageCreateOrConnectWithoutApInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyApInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedCreateNestedManyWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateNestedManyWithoutAccountPayableInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutAccountPayableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyAccountPayableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedCreateNestedManyWithoutApInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutApInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutApInputSchema),z.lazy(() => ImageCreateWithoutApInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutApInputSchema),z.lazy(() => ImageCreateOrConnectWithoutApInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyApInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUpdateManyWithoutAccountPayableNestedInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithoutAccountPayableNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutAccountPayableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutAccountPayableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyAccountPayableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutAccountPayableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutAccountPayableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUpdateManyWithoutApNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutApNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutApInputSchema),z.lazy(() => ImageCreateWithoutApInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutApInputSchema),z.lazy(() => ImageCreateOrConnectWithoutApInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutApInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutApInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyApInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutApInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutApInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutApInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutApInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutAccountPayableNestedInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutAccountPayableNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutAccountPayableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutAccountPayableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyAccountPayableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutAccountPayableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutAccountPayableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutApNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutApNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutApInputSchema),z.lazy(() => ImageCreateWithoutApInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutApInputSchema),z.lazy(() => ImageCreateOrConnectWithoutApInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutApInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutApInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyApInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutApInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutApInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutApInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutApInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemCreateNestedManyWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemCreateNestedManyWithoutAccountReceivableInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutAccountReceivableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyAccountReceivableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageCreateNestedManyWithoutArInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutArInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutArInputSchema),z.lazy(() => ImageCreateWithoutArInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutArInputSchema),z.lazy(() => ImageCreateOrConnectWithoutArInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyArInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedCreateNestedManyWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateNestedManyWithoutAccountReceivableInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutAccountReceivableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyAccountReceivableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedCreateNestedManyWithoutArInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutArInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutArInputSchema),z.lazy(() => ImageCreateWithoutArInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutArInputSchema),z.lazy(() => ImageCreateOrConnectWithoutArInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyArInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUpdateManyWithoutAccountReceivableNestedInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithoutAccountReceivableNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutAccountReceivableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutAccountReceivableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyAccountReceivableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutAccountReceivableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutAccountReceivableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUpdateManyWithoutArNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutArNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutArInputSchema),z.lazy(() => ImageCreateWithoutArInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutArInputSchema),z.lazy(() => ImageCreateOrConnectWithoutArInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutArInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutArInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyArInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutArInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutArInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutArInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutArInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutAccountReceivableNestedInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutAccountReceivableNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutAccountReceivableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutAccountReceivableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyAccountReceivableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutAccountReceivableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutAccountReceivableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutArNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutArNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutArInputSchema),z.lazy(() => ImageCreateWithoutArInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutArInputSchema),z.lazy(() => ImageCreateOrConnectWithoutArInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutArInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutArInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyArInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutArInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutArInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutArInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutArInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemCreateNestedManyWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemCreateNestedManyWithoutCashInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutCashInputSchema),z.lazy(() => TransactionItemCreateWithoutCashInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutCashInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutCashInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyCashInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageCreateNestedManyWithoutCashInputSchema: z.ZodType<Prisma.ImageCreateNestedManyWithoutCashInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutCashInputSchema),z.lazy(() => ImageCreateWithoutCashInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutCashInputSchema),z.lazy(() => ImageCreateOrConnectWithoutCashInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyCashInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedCreateNestedManyWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateNestedManyWithoutCashInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutCashInputSchema),z.lazy(() => TransactionItemCreateWithoutCashInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutCashInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutCashInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyCashInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedCreateNestedManyWithoutCashInputSchema: z.ZodType<Prisma.ImageUncheckedCreateNestedManyWithoutCashInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutCashInputSchema),z.lazy(() => ImageCreateWithoutCashInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutCashInputSchema),z.lazy(() => ImageCreateOrConnectWithoutCashInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyCashInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUpdateManyWithoutCashNestedInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithoutCashNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutCashInputSchema),z.lazy(() => TransactionItemCreateWithoutCashInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutCashInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutCashInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutCashInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutCashInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyCashInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutCashInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutCashInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutCashInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutCashInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUpdateManyWithoutCashNestedInputSchema: z.ZodType<Prisma.ImageUpdateManyWithoutCashNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutCashInputSchema),z.lazy(() => ImageCreateWithoutCashInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutCashInputSchema),z.lazy(() => ImageCreateOrConnectWithoutCashInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutCashInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutCashInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyCashInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutCashInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutCashInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutCashInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutCashInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutCashNestedInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutCashNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutCashInputSchema),z.lazy(() => TransactionItemCreateWithoutCashInputSchema).array(),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TransactionItemCreateOrConnectWithoutCashInputSchema),z.lazy(() => TransactionItemCreateOrConnectWithoutCashInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutCashInputSchema),z.lazy(() => TransactionItemUpsertWithWhereUniqueWithoutCashInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TransactionItemCreateManyCashInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TransactionItemWhereUniqueInputSchema),z.lazy(() => TransactionItemWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutCashInputSchema),z.lazy(() => TransactionItemUpdateWithWhereUniqueWithoutCashInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TransactionItemUpdateManyWithWhereWithoutCashInputSchema),z.lazy(() => TransactionItemUpdateManyWithWhereWithoutCashInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutCashNestedInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutCashNestedInput> = z.object({
  create: z.union([ z.lazy(() => ImageCreateWithoutCashInputSchema),z.lazy(() => ImageCreateWithoutCashInputSchema).array(),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ImageCreateOrConnectWithoutCashInputSchema),z.lazy(() => ImageCreateOrConnectWithoutCashInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ImageUpsertWithWhereUniqueWithoutCashInputSchema),z.lazy(() => ImageUpsertWithWhereUniqueWithoutCashInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ImageCreateManyCashInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ImageWhereUniqueInputSchema),z.lazy(() => ImageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ImageUpdateWithWhereUniqueWithoutCashInputSchema),z.lazy(() => ImageUpdateWithWhereUniqueWithoutCashInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ImageUpdateManyWithWhereWithoutCashInputSchema),z.lazy(() => ImageUpdateManyWithWhereWithoutCashInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InventoryCreateNestedOneWithoutImagesInputSchema: z.ZodType<Prisma.InventoryCreateNestedOneWithoutImagesInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutImagesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventoryCreateOrConnectWithoutImagesInputSchema).optional(),
  connect: z.lazy(() => InventoryWhereUniqueInputSchema).optional()
}).strict();

export const TransactionCreateNestedOneWithoutImagesInputSchema: z.ZodType<Prisma.TransactionCreateNestedOneWithoutImagesInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutImagesInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TransactionCreateOrConnectWithoutImagesInputSchema).optional(),
  connect: z.lazy(() => TransactionWhereUniqueInputSchema).optional()
}).strict();

export const CashCreateNestedOneWithoutImagesInputSchema: z.ZodType<Prisma.CashCreateNestedOneWithoutImagesInput> = z.object({
  create: z.union([ z.lazy(() => CashCreateWithoutImagesInputSchema),z.lazy(() => CashUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CashCreateOrConnectWithoutImagesInputSchema).optional(),
  connect: z.lazy(() => CashWhereUniqueInputSchema).optional()
}).strict();

export const AccountReceivableCreateNestedOneWithoutImagesInputSchema: z.ZodType<Prisma.AccountReceivableCreateNestedOneWithoutImagesInput> = z.object({
  create: z.union([ z.lazy(() => AccountReceivableCreateWithoutImagesInputSchema),z.lazy(() => AccountReceivableUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountReceivableCreateOrConnectWithoutImagesInputSchema).optional(),
  connect: z.lazy(() => AccountReceivableWhereUniqueInputSchema).optional()
}).strict();

export const AccountPayableCreateNestedOneWithoutImagesInputSchema: z.ZodType<Prisma.AccountPayableCreateNestedOneWithoutImagesInput> = z.object({
  create: z.union([ z.lazy(() => AccountPayableCreateWithoutImagesInputSchema),z.lazy(() => AccountPayableUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountPayableCreateOrConnectWithoutImagesInputSchema).optional(),
  connect: z.lazy(() => AccountPayableWhereUniqueInputSchema).optional()
}).strict();

export const InventoryUpdateOneWithoutImagesNestedInputSchema: z.ZodType<Prisma.InventoryUpdateOneWithoutImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => InventoryCreateWithoutImagesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => InventoryCreateOrConnectWithoutImagesInputSchema).optional(),
  upsert: z.lazy(() => InventoryUpsertWithoutImagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => InventoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => InventoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => InventoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => InventoryUpdateToOneWithWhereWithoutImagesInputSchema),z.lazy(() => InventoryUpdateWithoutImagesInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutImagesInputSchema) ]).optional(),
}).strict();

export const TransactionUpdateOneWithoutImagesNestedInputSchema: z.ZodType<Prisma.TransactionUpdateOneWithoutImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TransactionCreateWithoutImagesInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => TransactionCreateOrConnectWithoutImagesInputSchema).optional(),
  upsert: z.lazy(() => TransactionUpsertWithoutImagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => TransactionWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => TransactionWhereInputSchema) ]).optional(),
  connect: z.lazy(() => TransactionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => TransactionUpdateToOneWithWhereWithoutImagesInputSchema),z.lazy(() => TransactionUpdateWithoutImagesInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutImagesInputSchema) ]).optional(),
}).strict();

export const CashUpdateOneWithoutImagesNestedInputSchema: z.ZodType<Prisma.CashUpdateOneWithoutImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CashCreateWithoutImagesInputSchema),z.lazy(() => CashUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CashCreateOrConnectWithoutImagesInputSchema).optional(),
  upsert: z.lazy(() => CashUpsertWithoutImagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CashWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CashWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CashWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CashUpdateToOneWithWhereWithoutImagesInputSchema),z.lazy(() => CashUpdateWithoutImagesInputSchema),z.lazy(() => CashUncheckedUpdateWithoutImagesInputSchema) ]).optional(),
}).strict();

export const AccountReceivableUpdateOneWithoutImagesNestedInputSchema: z.ZodType<Prisma.AccountReceivableUpdateOneWithoutImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountReceivableCreateWithoutImagesInputSchema),z.lazy(() => AccountReceivableUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountReceivableCreateOrConnectWithoutImagesInputSchema).optional(),
  upsert: z.lazy(() => AccountReceivableUpsertWithoutImagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AccountReceivableWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AccountReceivableWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AccountReceivableWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountReceivableUpdateToOneWithWhereWithoutImagesInputSchema),z.lazy(() => AccountReceivableUpdateWithoutImagesInputSchema),z.lazy(() => AccountReceivableUncheckedUpdateWithoutImagesInputSchema) ]).optional(),
}).strict();

export const AccountPayableUpdateOneWithoutImagesNestedInputSchema: z.ZodType<Prisma.AccountPayableUpdateOneWithoutImagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountPayableCreateWithoutImagesInputSchema),z.lazy(() => AccountPayableUncheckedCreateWithoutImagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountPayableCreateOrConnectWithoutImagesInputSchema).optional(),
  upsert: z.lazy(() => AccountPayableUpsertWithoutImagesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AccountPayableWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AccountPayableWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AccountPayableWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountPayableUpdateToOneWithWhereWithoutImagesInputSchema),z.lazy(() => AccountPayableUpdateWithoutImagesInputSchema),z.lazy(() => AccountPayableUncheckedUpdateWithoutImagesInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumTransactionTypeFilterSchema: z.ZodType<Prisma.NestedEnumTransactionTypeFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTransactionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTransactionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TransactionTypeSchema).optional(),
  in: z.lazy(() => TransactionTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => NestedEnumTransactionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTransactionTypeFilterSchema).optional()
}).strict();

export const NestedEnumTransactionItemTypeFilterSchema: z.ZodType<Prisma.NestedEnumTransactionItemTypeFilter> = z.object({
  equals: z.lazy(() => TransactionItemTypeSchema).optional(),
  in: z.lazy(() => TransactionItemTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => NestedEnumTransactionItemTypeFilterSchema) ]).optional(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumTransactionItemTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTransactionItemTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TransactionItemTypeSchema).optional(),
  in: z.lazy(() => TransactionItemTypeSchema).array().optional(),
  notIn: z.lazy(() => TransactionItemTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => NestedEnumTransactionItemTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTransactionItemTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTransactionItemTypeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const PriceCreateWithoutInventoryInputSchema: z.ZodType<Prisma.PriceCreateWithoutInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  barcode: z.string(),
  quantity: z.number(),
  unit: z.string(),
  price: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const PriceUncheckedCreateWithoutInventoryInputSchema: z.ZodType<Prisma.PriceUncheckedCreateWithoutInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  barcode: z.string(),
  quantity: z.number(),
  unit: z.string(),
  price: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const PriceCreateOrConnectWithoutInventoryInputSchema: z.ZodType<Prisma.PriceCreateOrConnectWithoutInventoryInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PriceCreateWithoutInventoryInputSchema),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema) ]),
}).strict();

export const PriceCreateManyInventoryInputEnvelopeSchema: z.ZodType<Prisma.PriceCreateManyInventoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PriceCreateManyInventoryInputSchema),z.lazy(() => PriceCreateManyInventoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CostCreateWithoutInventoryInputSchema: z.ZodType<Prisma.CostCreateWithoutInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  quantity: z.number(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  latestQuantity: z.number(),
  latestCost: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const CostUncheckedCreateWithoutInventoryInputSchema: z.ZodType<Prisma.CostUncheckedCreateWithoutInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  quantity: z.number(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  latestQuantity: z.number(),
  latestCost: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const CostCreateOrConnectWithoutInventoryInputSchema: z.ZodType<Prisma.CostCreateOrConnectWithoutInventoryInput> = z.object({
  where: z.lazy(() => CostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CostCreateWithoutInventoryInputSchema),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema) ]),
}).strict();

export const CostCreateManyInventoryInputEnvelopeSchema: z.ZodType<Prisma.CostCreateManyInventoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CostCreateManyInventoryInputSchema),z.lazy(() => CostCreateManyInventoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TransactionItemCreateWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemCreateWithoutInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutTransactionItemsInputSchema),
  accountPayable: z.lazy(() => AccountPayableCreateNestedOneWithoutTransactionsInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableCreateNestedOneWithoutTransactionsInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutTransactionsInputSchema).optional()
}).strict();

export const TransactionItemUncheckedCreateWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateWithoutInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const TransactionItemCreateOrConnectWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemCreateOrConnectWithoutInventoryInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema) ]),
}).strict();

export const TransactionItemCreateManyInventoryInputEnvelopeSchema: z.ZodType<Prisma.TransactionItemCreateManyInventoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionItemCreateManyInventoryInputSchema),z.lazy(() => TransactionItemCreateManyInventoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductCategoryCreateWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryCreateWithoutInventoryIdsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedCreateWithoutInventoryIdsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string()
}).strict();

export const ProductCategoryCreateOrConnectWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryCreateOrConnectWithoutInventoryIdsInput> = z.object({
  where: z.lazy(() => ProductCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema) ]),
}).strict();

export const ImageCreateWithoutInventoryInputSchema: z.ZodType<Prisma.ImageCreateWithoutInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutImagesInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutImagesInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableCreateNestedOneWithoutImagesInputSchema).optional(),
  ap: z.lazy(() => AccountPayableCreateNestedOneWithoutImagesInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutInventoryInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const ImageCreateOrConnectWithoutInventoryInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutInventoryInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutInventoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema) ]),
}).strict();

export const ImageCreateManyInventoryInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyInventoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyInventoryInputSchema),z.lazy(() => ImageCreateManyInventoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PriceUpsertWithWhereUniqueWithoutInventoryInputSchema: z.ZodType<Prisma.PriceUpsertWithWhereUniqueWithoutInventoryInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PriceUpdateWithoutInventoryInputSchema),z.lazy(() => PriceUncheckedUpdateWithoutInventoryInputSchema) ]),
  create: z.union([ z.lazy(() => PriceCreateWithoutInventoryInputSchema),z.lazy(() => PriceUncheckedCreateWithoutInventoryInputSchema) ]),
}).strict();

export const PriceUpdateWithWhereUniqueWithoutInventoryInputSchema: z.ZodType<Prisma.PriceUpdateWithWhereUniqueWithoutInventoryInput> = z.object({
  where: z.lazy(() => PriceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PriceUpdateWithoutInventoryInputSchema),z.lazy(() => PriceUncheckedUpdateWithoutInventoryInputSchema) ]),
}).strict();

export const PriceUpdateManyWithWhereWithoutInventoryInputSchema: z.ZodType<Prisma.PriceUpdateManyWithWhereWithoutInventoryInput> = z.object({
  where: z.lazy(() => PriceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PriceUpdateManyMutationInputSchema),z.lazy(() => PriceUncheckedUpdateManyWithoutInventoryInputSchema) ]),
}).strict();

export const PriceScalarWhereInputSchema: z.ZodType<Prisma.PriceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PriceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PriceScalarWhereInputSchema),z.lazy(() => PriceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  barcode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CostUpsertWithWhereUniqueWithoutInventoryInputSchema: z.ZodType<Prisma.CostUpsertWithWhereUniqueWithoutInventoryInput> = z.object({
  where: z.lazy(() => CostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CostUpdateWithoutInventoryInputSchema),z.lazy(() => CostUncheckedUpdateWithoutInventoryInputSchema) ]),
  create: z.union([ z.lazy(() => CostCreateWithoutInventoryInputSchema),z.lazy(() => CostUncheckedCreateWithoutInventoryInputSchema) ]),
}).strict();

export const CostUpdateWithWhereUniqueWithoutInventoryInputSchema: z.ZodType<Prisma.CostUpdateWithWhereUniqueWithoutInventoryInput> = z.object({
  where: z.lazy(() => CostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CostUpdateWithoutInventoryInputSchema),z.lazy(() => CostUncheckedUpdateWithoutInventoryInputSchema) ]),
}).strict();

export const CostUpdateManyWithWhereWithoutInventoryInputSchema: z.ZodType<Prisma.CostUpdateManyWithWhereWithoutInventoryInput> = z.object({
  where: z.lazy(() => CostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CostUpdateManyMutationInputSchema),z.lazy(() => CostUncheckedUpdateManyWithoutInventoryInputSchema) ]),
}).strict();

export const CostScalarWhereInputSchema: z.ZodType<Prisma.CostScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CostScalarWhereInputSchema),z.lazy(() => CostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CostScalarWhereInputSchema),z.lazy(() => CostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  pricePerUnit: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  totalPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  latestQuantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  latestCost: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TransactionItemUpsertWithWhereUniqueWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemUpsertWithWhereUniqueWithoutInventoryInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithoutInventoryInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutInventoryInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutInventoryInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutInventoryInputSchema) ]),
}).strict();

export const TransactionItemUpdateWithWhereUniqueWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithWhereUniqueWithoutInventoryInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateWithoutInventoryInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutInventoryInputSchema) ]),
}).strict();

export const TransactionItemUpdateManyWithWhereWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithWhereWithoutInventoryInput> = z.object({
  where: z.lazy(() => TransactionItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateManyMutationInputSchema),z.lazy(() => TransactionItemUncheckedUpdateManyWithoutInventoryInputSchema) ]),
}).strict();

export const TransactionItemScalarWhereInputSchema: z.ZodType<Prisma.TransactionItemScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TransactionItemScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TransactionItemScalarWhereInputSchema),z.lazy(() => TransactionItemScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  transactionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTransactionItemTypeFilterSchema),z.lazy(() => TransactionItemTypeSchema) ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  inventoryBarcode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inventoryUnit: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  accountPayableId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  accountReceivableId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  cashId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  unitQuantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  quantity: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  debitAmount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  creditAmount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const ProductCategoryUpsertWithWhereUniqueWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryUpsertWithWhereUniqueWithoutInventoryIdsInput> = z.object({
  where: z.lazy(() => ProductCategoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductCategoryUpdateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUncheckedUpdateWithoutInventoryIdsInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCategoryCreateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUncheckedCreateWithoutInventoryIdsInputSchema) ]),
}).strict();

export const ProductCategoryUpdateWithWhereUniqueWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryUpdateWithWhereUniqueWithoutInventoryIdsInput> = z.object({
  where: z.lazy(() => ProductCategoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductCategoryUpdateWithoutInventoryIdsInputSchema),z.lazy(() => ProductCategoryUncheckedUpdateWithoutInventoryIdsInputSchema) ]),
}).strict();

export const ProductCategoryUpdateManyWithWhereWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryUpdateManyWithWhereWithoutInventoryIdsInput> = z.object({
  where: z.lazy(() => ProductCategoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductCategoryUpdateManyMutationInputSchema),z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutInventoryIdsInputSchema) ]),
}).strict();

export const ProductCategoryScalarWhereInputSchema: z.ZodType<Prisma.ProductCategoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductCategoryScalarWhereInputSchema),z.lazy(() => ProductCategoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductCategoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductCategoryScalarWhereInputSchema),z.lazy(() => ProductCategoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ImageUpsertWithWhereUniqueWithoutInventoryInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutInventoryInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutInventoryInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutInventoryInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutInventoryInputSchema),z.lazy(() => ImageUncheckedCreateWithoutInventoryInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutInventoryInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutInventoryInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutInventoryInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutInventoryInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutInventoryInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutInventoryInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutInventoryInputSchema) ]),
}).strict();

export const ImageScalarWhereInputSchema: z.ZodType<Prisma.ImageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ImageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ImageScalarWhereInputSchema),z.lazy(() => ImageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  inventoryId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  transactionId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cashId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  arId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  apId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InventoryCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryCreateWithoutCategoriesInput> = z.object({
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutInventoryInputSchema).optional(),
  costs: z.lazy(() => CostCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemCreateNestedManyWithoutInventoryInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryUncheckedCreateWithoutCategoriesInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  costs: z.lazy(() => CostUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryCreateOrConnectWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryCreateOrConnectWithoutCategoriesInput> = z.object({
  where: z.lazy(() => InventoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InventoryCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict();

export const InventoryUpsertWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryUpsertWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => InventoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InventoryUpdateWithoutCategoriesInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => InventoryCreateWithoutCategoriesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict();

export const InventoryUpdateWithWhereUniqueWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryUpdateWithWhereUniqueWithoutCategoriesInput> = z.object({
  where: z.lazy(() => InventoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InventoryUpdateWithoutCategoriesInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutCategoriesInputSchema) ]),
}).strict();

export const InventoryUpdateManyWithWhereWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryUpdateManyWithWhereWithoutCategoriesInput> = z.object({
  where: z.lazy(() => InventoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InventoryUpdateManyMutationInputSchema),z.lazy(() => InventoryUncheckedUpdateManyWithoutCategoriesInputSchema) ]),
}).strict();

export const InventoryScalarWhereInputSchema: z.ZodType<Prisma.InventoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InventoryScalarWhereInputSchema),z.lazy(() => InventoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InventoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InventoryScalarWhereInputSchema),z.lazy(() => InventoryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  remark: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InventoryCreateWithoutPricesInputSchema: z.ZodType<Prisma.InventoryCreateWithoutPricesInput> = z.object({
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  costs: z.lazy(() => CostCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryCreateNestedManyWithoutInventoryIdsInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryUncheckedCreateWithoutPricesInputSchema: z.ZodType<Prisma.InventoryUncheckedCreateWithoutPricesInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  costs: z.lazy(() => CostUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutInventoryIdsInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryCreateOrConnectWithoutPricesInputSchema: z.ZodType<Prisma.InventoryCreateOrConnectWithoutPricesInput> = z.object({
  where: z.lazy(() => InventoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InventoryCreateWithoutPricesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutPricesInputSchema) ]),
}).strict();

export const InventoryUpsertWithoutPricesInputSchema: z.ZodType<Prisma.InventoryUpsertWithoutPricesInput> = z.object({
  update: z.union([ z.lazy(() => InventoryUpdateWithoutPricesInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutPricesInputSchema) ]),
  create: z.union([ z.lazy(() => InventoryCreateWithoutPricesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutPricesInputSchema) ]),
  where: z.lazy(() => InventoryWhereInputSchema).optional()
}).strict();

export const InventoryUpdateToOneWithWhereWithoutPricesInputSchema: z.ZodType<Prisma.InventoryUpdateToOneWithWhereWithoutPricesInput> = z.object({
  where: z.lazy(() => InventoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InventoryUpdateWithoutPricesInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutPricesInputSchema) ]),
}).strict();

export const InventoryUpdateWithoutPricesInputSchema: z.ZodType<Prisma.InventoryUpdateWithoutPricesInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  costs: z.lazy(() => CostUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUpdateManyWithoutInventoryIdsNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const InventoryUncheckedUpdateWithoutPricesInputSchema: z.ZodType<Prisma.InventoryUncheckedUpdateWithoutPricesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  costs: z.lazy(() => CostUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutInventoryIdsNestedInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const InventoryCreateWithoutCostsInputSchema: z.ZodType<Prisma.InventoryCreateWithoutCostsInput> = z.object({
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryCreateNestedManyWithoutInventoryIdsInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryUncheckedCreateWithoutCostsInputSchema: z.ZodType<Prisma.InventoryUncheckedCreateWithoutCostsInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutInventoryIdsInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryCreateOrConnectWithoutCostsInputSchema: z.ZodType<Prisma.InventoryCreateOrConnectWithoutCostsInput> = z.object({
  where: z.lazy(() => InventoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InventoryCreateWithoutCostsInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCostsInputSchema) ]),
}).strict();

export const InventoryUpsertWithoutCostsInputSchema: z.ZodType<Prisma.InventoryUpsertWithoutCostsInput> = z.object({
  update: z.union([ z.lazy(() => InventoryUpdateWithoutCostsInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutCostsInputSchema) ]),
  create: z.union([ z.lazy(() => InventoryCreateWithoutCostsInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutCostsInputSchema) ]),
  where: z.lazy(() => InventoryWhereInputSchema).optional()
}).strict();

export const InventoryUpdateToOneWithWhereWithoutCostsInputSchema: z.ZodType<Prisma.InventoryUpdateToOneWithWhereWithoutCostsInput> = z.object({
  where: z.lazy(() => InventoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InventoryUpdateWithoutCostsInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutCostsInputSchema) ]),
}).strict();

export const InventoryUpdateWithoutCostsInputSchema: z.ZodType<Prisma.InventoryUpdateWithoutCostsInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUpdateManyWithoutInventoryIdsNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const InventoryUncheckedUpdateWithoutCostsInputSchema: z.ZodType<Prisma.InventoryUncheckedUpdateWithoutCostsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutInventoryIdsNestedInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const TransactionItemCreateWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemCreateWithoutTransactionInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number(),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutTransactionItemsInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableCreateNestedOneWithoutTransactionsInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableCreateNestedOneWithoutTransactionsInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutTransactionsInputSchema).optional()
}).strict();

export const TransactionItemUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateWithoutTransactionInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const TransactionItemCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemCreateOrConnectWithoutTransactionInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const TransactionItemCreateManyTransactionInputEnvelopeSchema: z.ZodType<Prisma.TransactionItemCreateManyTransactionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionItemCreateManyTransactionInputSchema),z.lazy(() => TransactionItemCreateManyTransactionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ImageCreateWithoutTransactionInputSchema: z.ZodType<Prisma.ImageCreateWithoutTransactionInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutImagesInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutImagesInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableCreateNestedOneWithoutImagesInputSchema).optional(),
  ap: z.lazy(() => AccountPayableCreateNestedOneWithoutImagesInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutTransactionInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutTransactionInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const ImageCreateOrConnectWithoutTransactionInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutTransactionInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutTransactionInputSchema),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const ImageCreateManyTransactionInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyTransactionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyTransactionInputSchema),z.lazy(() => ImageCreateManyTransactionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TransactionItemUpsertWithWhereUniqueWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemUpsertWithWhereUniqueWithoutTransactionInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithoutTransactionInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutTransactionInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const TransactionItemUpdateWithWhereUniqueWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithWhereUniqueWithoutTransactionInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateWithoutTransactionInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutTransactionInputSchema) ]),
}).strict();

export const TransactionItemUpdateManyWithWhereWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithWhereWithoutTransactionInput> = z.object({
  where: z.lazy(() => TransactionItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateManyMutationInputSchema),z.lazy(() => TransactionItemUncheckedUpdateManyWithoutTransactionInputSchema) ]),
}).strict();

export const ImageUpsertWithWhereUniqueWithoutTransactionInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutTransactionInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutTransactionInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutTransactionInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutTransactionInputSchema),z.lazy(() => ImageUncheckedCreateWithoutTransactionInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutTransactionInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutTransactionInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutTransactionInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutTransactionInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutTransactionInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutTransactionInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutTransactionInputSchema) ]),
}).strict();

export const TransactionCreateWithoutTransactionItemsInputSchema: z.ZodType<Prisma.TransactionCreateWithoutTransactionItemsInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  documentNumber: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  remark: z.string(),
  images: z.lazy(() => ImageCreateNestedManyWithoutTransactionInputSchema).optional()
}).strict();

export const TransactionUncheckedCreateWithoutTransactionItemsInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutTransactionItemsInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  documentNumber: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  remark: z.string(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutTransactionInputSchema).optional()
}).strict();

export const TransactionCreateOrConnectWithoutTransactionItemsInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutTransactionItemsInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutTransactionItemsInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutTransactionItemsInputSchema) ]),
}).strict();

export const InventoryCreateWithoutTransactionItemsInputSchema: z.ZodType<Prisma.InventoryCreateWithoutTransactionItemsInput> = z.object({
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutInventoryInputSchema).optional(),
  costs: z.lazy(() => CostCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryCreateNestedManyWithoutInventoryIdsInputSchema).optional(),
  images: z.lazy(() => ImageCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryUncheckedCreateWithoutTransactionItemsInputSchema: z.ZodType<Prisma.InventoryUncheckedCreateWithoutTransactionItemsInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  costs: z.lazy(() => CostUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutInventoryIdsInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutInventoryInputSchema).optional()
}).strict();

export const InventoryCreateOrConnectWithoutTransactionItemsInputSchema: z.ZodType<Prisma.InventoryCreateOrConnectWithoutTransactionItemsInput> = z.object({
  where: z.lazy(() => InventoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InventoryCreateWithoutTransactionItemsInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutTransactionItemsInputSchema) ]),
}).strict();

export const AccountPayableCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountPayableCreateWithoutTransactionsInput> = z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  images: z.lazy(() => ImageCreateNestedManyWithoutApInputSchema).optional()
}).strict();

export const AccountPayableUncheckedCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountPayableUncheckedCreateWithoutTransactionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutApInputSchema).optional()
}).strict();

export const AccountPayableCreateOrConnectWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountPayableCreateOrConnectWithoutTransactionsInput> = z.object({
  where: z.lazy(() => AccountPayableWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountPayableCreateWithoutTransactionsInputSchema),z.lazy(() => AccountPayableUncheckedCreateWithoutTransactionsInputSchema) ]),
}).strict();

export const AccountReceivableCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountReceivableCreateWithoutTransactionsInput> = z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  images: z.lazy(() => ImageCreateNestedManyWithoutArInputSchema).optional()
}).strict();

export const AccountReceivableUncheckedCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountReceivableUncheckedCreateWithoutTransactionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutArInputSchema).optional()
}).strict();

export const AccountReceivableCreateOrConnectWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountReceivableCreateOrConnectWithoutTransactionsInput> = z.object({
  where: z.lazy(() => AccountReceivableWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountReceivableCreateWithoutTransactionsInputSchema),z.lazy(() => AccountReceivableUncheckedCreateWithoutTransactionsInputSchema) ]),
}).strict();

export const CashCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.CashCreateWithoutTransactionsInput> = z.object({
  name: z.string(),
  accountId: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  images: z.lazy(() => ImageCreateNestedManyWithoutCashInputSchema).optional()
}).strict();

export const CashUncheckedCreateWithoutTransactionsInputSchema: z.ZodType<Prisma.CashUncheckedCreateWithoutTransactionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  accountId: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  images: z.lazy(() => ImageUncheckedCreateNestedManyWithoutCashInputSchema).optional()
}).strict();

export const CashCreateOrConnectWithoutTransactionsInputSchema: z.ZodType<Prisma.CashCreateOrConnectWithoutTransactionsInput> = z.object({
  where: z.lazy(() => CashWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CashCreateWithoutTransactionsInputSchema),z.lazy(() => CashUncheckedCreateWithoutTransactionsInputSchema) ]),
}).strict();

export const TransactionUpsertWithoutTransactionItemsInputSchema: z.ZodType<Prisma.TransactionUpsertWithoutTransactionItemsInput> = z.object({
  update: z.union([ z.lazy(() => TransactionUpdateWithoutTransactionItemsInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutTransactionItemsInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutTransactionItemsInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutTransactionItemsInputSchema) ]),
  where: z.lazy(() => TransactionWhereInputSchema).optional()
}).strict();

export const TransactionUpdateToOneWithWhereWithoutTransactionItemsInputSchema: z.ZodType<Prisma.TransactionUpdateToOneWithWhereWithoutTransactionItemsInput> = z.object({
  where: z.lazy(() => TransactionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutTransactionItemsInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutTransactionItemsInputSchema) ]),
}).strict();

export const TransactionUpdateWithoutTransactionItemsInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutTransactionItemsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutTransactionItemsInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutTransactionItemsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutTransactionNestedInputSchema).optional()
}).strict();

export const InventoryUpsertWithoutTransactionItemsInputSchema: z.ZodType<Prisma.InventoryUpsertWithoutTransactionItemsInput> = z.object({
  update: z.union([ z.lazy(() => InventoryUpdateWithoutTransactionItemsInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutTransactionItemsInputSchema) ]),
  create: z.union([ z.lazy(() => InventoryCreateWithoutTransactionItemsInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutTransactionItemsInputSchema) ]),
  where: z.lazy(() => InventoryWhereInputSchema).optional()
}).strict();

export const InventoryUpdateToOneWithWhereWithoutTransactionItemsInputSchema: z.ZodType<Prisma.InventoryUpdateToOneWithWhereWithoutTransactionItemsInput> = z.object({
  where: z.lazy(() => InventoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InventoryUpdateWithoutTransactionItemsInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutTransactionItemsInputSchema) ]),
}).strict();

export const InventoryUpdateWithoutTransactionItemsInputSchema: z.ZodType<Prisma.InventoryUpdateWithoutTransactionItemsInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutInventoryNestedInputSchema).optional(),
  costs: z.lazy(() => CostUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUpdateManyWithoutInventoryIdsNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const InventoryUncheckedUpdateWithoutTransactionItemsInputSchema: z.ZodType<Prisma.InventoryUncheckedUpdateWithoutTransactionItemsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  costs: z.lazy(() => CostUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutInventoryIdsNestedInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const AccountPayableUpsertWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountPayableUpsertWithoutTransactionsInput> = z.object({
  update: z.union([ z.lazy(() => AccountPayableUpdateWithoutTransactionsInputSchema),z.lazy(() => AccountPayableUncheckedUpdateWithoutTransactionsInputSchema) ]),
  create: z.union([ z.lazy(() => AccountPayableCreateWithoutTransactionsInputSchema),z.lazy(() => AccountPayableUncheckedCreateWithoutTransactionsInputSchema) ]),
  where: z.lazy(() => AccountPayableWhereInputSchema).optional()
}).strict();

export const AccountPayableUpdateToOneWithWhereWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountPayableUpdateToOneWithWhereWithoutTransactionsInput> = z.object({
  where: z.lazy(() => AccountPayableWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountPayableUpdateWithoutTransactionsInputSchema),z.lazy(() => AccountPayableUncheckedUpdateWithoutTransactionsInputSchema) ]),
}).strict();

export const AccountPayableUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountPayableUpdateWithoutTransactionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutApNestedInputSchema).optional()
}).strict();

export const AccountPayableUncheckedUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountPayableUncheckedUpdateWithoutTransactionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutApNestedInputSchema).optional()
}).strict();

export const AccountReceivableUpsertWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountReceivableUpsertWithoutTransactionsInput> = z.object({
  update: z.union([ z.lazy(() => AccountReceivableUpdateWithoutTransactionsInputSchema),z.lazy(() => AccountReceivableUncheckedUpdateWithoutTransactionsInputSchema) ]),
  create: z.union([ z.lazy(() => AccountReceivableCreateWithoutTransactionsInputSchema),z.lazy(() => AccountReceivableUncheckedCreateWithoutTransactionsInputSchema) ]),
  where: z.lazy(() => AccountReceivableWhereInputSchema).optional()
}).strict();

export const AccountReceivableUpdateToOneWithWhereWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountReceivableUpdateToOneWithWhereWithoutTransactionsInput> = z.object({
  where: z.lazy(() => AccountReceivableWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountReceivableUpdateWithoutTransactionsInputSchema),z.lazy(() => AccountReceivableUncheckedUpdateWithoutTransactionsInputSchema) ]),
}).strict();

export const AccountReceivableUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountReceivableUpdateWithoutTransactionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutArNestedInputSchema).optional()
}).strict();

export const AccountReceivableUncheckedUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.AccountReceivableUncheckedUpdateWithoutTransactionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutArNestedInputSchema).optional()
}).strict();

export const CashUpsertWithoutTransactionsInputSchema: z.ZodType<Prisma.CashUpsertWithoutTransactionsInput> = z.object({
  update: z.union([ z.lazy(() => CashUpdateWithoutTransactionsInputSchema),z.lazy(() => CashUncheckedUpdateWithoutTransactionsInputSchema) ]),
  create: z.union([ z.lazy(() => CashCreateWithoutTransactionsInputSchema),z.lazy(() => CashUncheckedCreateWithoutTransactionsInputSchema) ]),
  where: z.lazy(() => CashWhereInputSchema).optional()
}).strict();

export const CashUpdateToOneWithWhereWithoutTransactionsInputSchema: z.ZodType<Prisma.CashUpdateToOneWithWhereWithoutTransactionsInput> = z.object({
  where: z.lazy(() => CashWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CashUpdateWithoutTransactionsInputSchema),z.lazy(() => CashUncheckedUpdateWithoutTransactionsInputSchema) ]),
}).strict();

export const CashUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.CashUpdateWithoutTransactionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutCashNestedInputSchema).optional()
}).strict();

export const CashUncheckedUpdateWithoutTransactionsInputSchema: z.ZodType<Prisma.CashUncheckedUpdateWithoutTransactionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutCashNestedInputSchema).optional()
}).strict();

export const TransactionItemCreateWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemCreateWithoutAccountPayableInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutTransactionItemsInputSchema),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutTransactionItemsInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableCreateNestedOneWithoutTransactionsInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutTransactionsInputSchema).optional()
}).strict();

export const TransactionItemUncheckedCreateWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateWithoutAccountPayableInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const TransactionItemCreateOrConnectWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemCreateOrConnectWithoutAccountPayableInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema) ]),
}).strict();

export const TransactionItemCreateManyAccountPayableInputEnvelopeSchema: z.ZodType<Prisma.TransactionItemCreateManyAccountPayableInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionItemCreateManyAccountPayableInputSchema),z.lazy(() => TransactionItemCreateManyAccountPayableInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ImageCreateWithoutApInputSchema: z.ZodType<Prisma.ImageCreateWithoutApInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutImagesInputSchema).optional(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutImagesInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutImagesInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableCreateNestedOneWithoutImagesInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutApInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutApInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const ImageCreateOrConnectWithoutApInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutApInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutApInputSchema),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema) ]),
}).strict();

export const ImageCreateManyApInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyApInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyApInputSchema),z.lazy(() => ImageCreateManyApInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TransactionItemUpsertWithWhereUniqueWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemUpsertWithWhereUniqueWithoutAccountPayableInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutAccountPayableInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountPayableInputSchema) ]),
}).strict();

export const TransactionItemUpdateWithWhereUniqueWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithWhereUniqueWithoutAccountPayableInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateWithoutAccountPayableInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutAccountPayableInputSchema) ]),
}).strict();

export const TransactionItemUpdateManyWithWhereWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithWhereWithoutAccountPayableInput> = z.object({
  where: z.lazy(() => TransactionItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateManyMutationInputSchema),z.lazy(() => TransactionItemUncheckedUpdateManyWithoutAccountPayableInputSchema) ]),
}).strict();

export const ImageUpsertWithWhereUniqueWithoutApInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutApInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutApInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutApInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutApInputSchema),z.lazy(() => ImageUncheckedCreateWithoutApInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutApInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutApInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutApInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutApInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutApInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutApInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutApInputSchema) ]),
}).strict();

export const TransactionItemCreateWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemCreateWithoutAccountReceivableInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutTransactionItemsInputSchema),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutTransactionItemsInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableCreateNestedOneWithoutTransactionsInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutTransactionsInputSchema).optional()
}).strict();

export const TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateWithoutAccountReceivableInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const TransactionItemCreateOrConnectWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemCreateOrConnectWithoutAccountReceivableInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema) ]),
}).strict();

export const TransactionItemCreateManyAccountReceivableInputEnvelopeSchema: z.ZodType<Prisma.TransactionItemCreateManyAccountReceivableInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionItemCreateManyAccountReceivableInputSchema),z.lazy(() => TransactionItemCreateManyAccountReceivableInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ImageCreateWithoutArInputSchema: z.ZodType<Prisma.ImageCreateWithoutArInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutImagesInputSchema).optional(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutImagesInputSchema).optional(),
  cash: z.lazy(() => CashCreateNestedOneWithoutImagesInputSchema).optional(),
  ap: z.lazy(() => AccountPayableCreateNestedOneWithoutImagesInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutArInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutArInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const ImageCreateOrConnectWithoutArInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutArInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutArInputSchema),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema) ]),
}).strict();

export const ImageCreateManyArInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyArInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyArInputSchema),z.lazy(() => ImageCreateManyArInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TransactionItemUpsertWithWhereUniqueWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemUpsertWithWhereUniqueWithoutAccountReceivableInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutAccountReceivableInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutAccountReceivableInputSchema) ]),
}).strict();

export const TransactionItemUpdateWithWhereUniqueWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithWhereUniqueWithoutAccountReceivableInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateWithoutAccountReceivableInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutAccountReceivableInputSchema) ]),
}).strict();

export const TransactionItemUpdateManyWithWhereWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithWhereWithoutAccountReceivableInput> = z.object({
  where: z.lazy(() => TransactionItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateManyMutationInputSchema),z.lazy(() => TransactionItemUncheckedUpdateManyWithoutAccountReceivableInputSchema) ]),
}).strict();

export const ImageUpsertWithWhereUniqueWithoutArInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutArInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutArInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutArInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutArInputSchema),z.lazy(() => ImageUncheckedCreateWithoutArInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutArInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutArInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutArInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutArInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutArInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutArInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutArInputSchema) ]),
}).strict();

export const TransactionItemCreateWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemCreateWithoutCashInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutTransactionItemsInputSchema),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutTransactionItemsInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableCreateNestedOneWithoutTransactionsInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableCreateNestedOneWithoutTransactionsInputSchema).optional()
}).strict();

export const TransactionItemUncheckedCreateWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemUncheckedCreateWithoutCashInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const TransactionItemCreateOrConnectWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemCreateOrConnectWithoutCashInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutCashInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema) ]),
}).strict();

export const TransactionItemCreateManyCashInputEnvelopeSchema: z.ZodType<Prisma.TransactionItemCreateManyCashInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TransactionItemCreateManyCashInputSchema),z.lazy(() => TransactionItemCreateManyCashInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ImageCreateWithoutCashInputSchema: z.ZodType<Prisma.ImageCreateWithoutCashInput> = z.object({
  id: z.string().cuid().optional(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  inventory: z.lazy(() => InventoryCreateNestedOneWithoutImagesInputSchema).optional(),
  transaction: z.lazy(() => TransactionCreateNestedOneWithoutImagesInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableCreateNestedOneWithoutImagesInputSchema).optional(),
  ap: z.lazy(() => AccountPayableCreateNestedOneWithoutImagesInputSchema).optional()
}).strict();

export const ImageUncheckedCreateWithoutCashInputSchema: z.ZodType<Prisma.ImageUncheckedCreateWithoutCashInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const ImageCreateOrConnectWithoutCashInputSchema: z.ZodType<Prisma.ImageCreateOrConnectWithoutCashInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ImageCreateWithoutCashInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema) ]),
}).strict();

export const ImageCreateManyCashInputEnvelopeSchema: z.ZodType<Prisma.ImageCreateManyCashInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ImageCreateManyCashInputSchema),z.lazy(() => ImageCreateManyCashInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TransactionItemUpsertWithWhereUniqueWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemUpsertWithWhereUniqueWithoutCashInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TransactionItemUpdateWithoutCashInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutCashInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionItemCreateWithoutCashInputSchema),z.lazy(() => TransactionItemUncheckedCreateWithoutCashInputSchema) ]),
}).strict();

export const TransactionItemUpdateWithWhereUniqueWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithWhereUniqueWithoutCashInput> = z.object({
  where: z.lazy(() => TransactionItemWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateWithoutCashInputSchema),z.lazy(() => TransactionItemUncheckedUpdateWithoutCashInputSchema) ]),
}).strict();

export const TransactionItemUpdateManyWithWhereWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemUpdateManyWithWhereWithoutCashInput> = z.object({
  where: z.lazy(() => TransactionItemScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TransactionItemUpdateManyMutationInputSchema),z.lazy(() => TransactionItemUncheckedUpdateManyWithoutCashInputSchema) ]),
}).strict();

export const ImageUpsertWithWhereUniqueWithoutCashInputSchema: z.ZodType<Prisma.ImageUpsertWithWhereUniqueWithoutCashInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ImageUpdateWithoutCashInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutCashInputSchema) ]),
  create: z.union([ z.lazy(() => ImageCreateWithoutCashInputSchema),z.lazy(() => ImageUncheckedCreateWithoutCashInputSchema) ]),
}).strict();

export const ImageUpdateWithWhereUniqueWithoutCashInputSchema: z.ZodType<Prisma.ImageUpdateWithWhereUniqueWithoutCashInput> = z.object({
  where: z.lazy(() => ImageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateWithoutCashInputSchema),z.lazy(() => ImageUncheckedUpdateWithoutCashInputSchema) ]),
}).strict();

export const ImageUpdateManyWithWhereWithoutCashInputSchema: z.ZodType<Prisma.ImageUpdateManyWithWhereWithoutCashInput> = z.object({
  where: z.lazy(() => ImageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ImageUpdateManyMutationInputSchema),z.lazy(() => ImageUncheckedUpdateManyWithoutCashInputSchema) ]),
}).strict();

export const InventoryCreateWithoutImagesInputSchema: z.ZodType<Prisma.InventoryCreateWithoutImagesInput> = z.object({
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceCreateNestedManyWithoutInventoryInputSchema).optional(),
  costs: z.lazy(() => CostCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryCreateNestedManyWithoutInventoryIdsInputSchema).optional()
}).strict();

export const InventoryUncheckedCreateWithoutImagesInputSchema: z.ZodType<Prisma.InventoryUncheckedCreateWithoutImagesInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  remark: z.string().optional().nullable(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  prices: z.lazy(() => PriceUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  costs: z.lazy(() => CostUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutInventoryInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedCreateNestedManyWithoutInventoryIdsInputSchema).optional()
}).strict();

export const InventoryCreateOrConnectWithoutImagesInputSchema: z.ZodType<Prisma.InventoryCreateOrConnectWithoutImagesInput> = z.object({
  where: z.lazy(() => InventoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InventoryCreateWithoutImagesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const TransactionCreateWithoutImagesInputSchema: z.ZodType<Prisma.TransactionCreateWithoutImagesInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  documentNumber: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  remark: z.string(),
  transactionItems: z.lazy(() => TransactionItemCreateNestedManyWithoutTransactionInputSchema).optional()
}).strict();

export const TransactionUncheckedCreateWithoutImagesInputSchema: z.ZodType<Prisma.TransactionUncheckedCreateWithoutImagesInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  documentNumber: z.string(),
  type: z.lazy(() => TransactionTypeSchema),
  remark: z.string(),
  transactionItems: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutTransactionInputSchema).optional()
}).strict();

export const TransactionCreateOrConnectWithoutImagesInputSchema: z.ZodType<Prisma.TransactionCreateOrConnectWithoutImagesInput> = z.object({
  where: z.lazy(() => TransactionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TransactionCreateWithoutImagesInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const CashCreateWithoutImagesInputSchema: z.ZodType<Prisma.CashCreateWithoutImagesInput> = z.object({
  name: z.string(),
  accountId: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemCreateNestedManyWithoutCashInputSchema).optional()
}).strict();

export const CashUncheckedCreateWithoutImagesInputSchema: z.ZodType<Prisma.CashUncheckedCreateWithoutImagesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  accountId: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutCashInputSchema).optional()
}).strict();

export const CashCreateOrConnectWithoutImagesInputSchema: z.ZodType<Prisma.CashCreateOrConnectWithoutImagesInput> = z.object({
  where: z.lazy(() => CashWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CashCreateWithoutImagesInputSchema),z.lazy(() => CashUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const AccountReceivableCreateWithoutImagesInputSchema: z.ZodType<Prisma.AccountReceivableCreateWithoutImagesInput> = z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemCreateNestedManyWithoutAccountReceivableInputSchema).optional()
}).strict();

export const AccountReceivableUncheckedCreateWithoutImagesInputSchema: z.ZodType<Prisma.AccountReceivableUncheckedCreateWithoutImagesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutAccountReceivableInputSchema).optional()
}).strict();

export const AccountReceivableCreateOrConnectWithoutImagesInputSchema: z.ZodType<Prisma.AccountReceivableCreateOrConnectWithoutImagesInput> = z.object({
  where: z.lazy(() => AccountReceivableWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountReceivableCreateWithoutImagesInputSchema),z.lazy(() => AccountReceivableUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const AccountPayableCreateWithoutImagesInputSchema: z.ZodType<Prisma.AccountPayableCreateWithoutImagesInput> = z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemCreateNestedManyWithoutAccountPayableInputSchema).optional()
}).strict();

export const AccountPayableUncheckedCreateWithoutImagesInputSchema: z.ZodType<Prisma.AccountPayableUncheckedCreateWithoutImagesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  remark: z.string().optional().nullable(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date(),
  transactions: z.lazy(() => TransactionItemUncheckedCreateNestedManyWithoutAccountPayableInputSchema).optional()
}).strict();

export const AccountPayableCreateOrConnectWithoutImagesInputSchema: z.ZodType<Prisma.AccountPayableCreateOrConnectWithoutImagesInput> = z.object({
  where: z.lazy(() => AccountPayableWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountPayableCreateWithoutImagesInputSchema),z.lazy(() => AccountPayableUncheckedCreateWithoutImagesInputSchema) ]),
}).strict();

export const InventoryUpsertWithoutImagesInputSchema: z.ZodType<Prisma.InventoryUpsertWithoutImagesInput> = z.object({
  update: z.union([ z.lazy(() => InventoryUpdateWithoutImagesInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutImagesInputSchema) ]),
  create: z.union([ z.lazy(() => InventoryCreateWithoutImagesInputSchema),z.lazy(() => InventoryUncheckedCreateWithoutImagesInputSchema) ]),
  where: z.lazy(() => InventoryWhereInputSchema).optional()
}).strict();

export const InventoryUpdateToOneWithWhereWithoutImagesInputSchema: z.ZodType<Prisma.InventoryUpdateToOneWithWhereWithoutImagesInput> = z.object({
  where: z.lazy(() => InventoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => InventoryUpdateWithoutImagesInputSchema),z.lazy(() => InventoryUncheckedUpdateWithoutImagesInputSchema) ]),
}).strict();

export const InventoryUpdateWithoutImagesInputSchema: z.ZodType<Prisma.InventoryUpdateWithoutImagesInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutInventoryNestedInputSchema).optional(),
  costs: z.lazy(() => CostUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUpdateManyWithoutInventoryIdsNestedInputSchema).optional()
}).strict();

export const InventoryUncheckedUpdateWithoutImagesInputSchema: z.ZodType<Prisma.InventoryUncheckedUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  costs: z.lazy(() => CostUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  categories: z.lazy(() => ProductCategoryUncheckedUpdateManyWithoutInventoryIdsNestedInputSchema).optional()
}).strict();

export const TransactionUpsertWithoutImagesInputSchema: z.ZodType<Prisma.TransactionUpsertWithoutImagesInput> = z.object({
  update: z.union([ z.lazy(() => TransactionUpdateWithoutImagesInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutImagesInputSchema) ]),
  create: z.union([ z.lazy(() => TransactionCreateWithoutImagesInputSchema),z.lazy(() => TransactionUncheckedCreateWithoutImagesInputSchema) ]),
  where: z.lazy(() => TransactionWhereInputSchema).optional()
}).strict();

export const TransactionUpdateToOneWithWhereWithoutImagesInputSchema: z.ZodType<Prisma.TransactionUpdateToOneWithWhereWithoutImagesInput> = z.object({
  where: z.lazy(() => TransactionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => TransactionUpdateWithoutImagesInputSchema),z.lazy(() => TransactionUncheckedUpdateWithoutImagesInputSchema) ]),
}).strict();

export const TransactionUpdateWithoutImagesInputSchema: z.ZodType<Prisma.TransactionUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionItems: z.lazy(() => TransactionItemUpdateManyWithoutTransactionNestedInputSchema).optional()
}).strict();

export const TransactionUncheckedUpdateWithoutImagesInputSchema: z.ZodType<Prisma.TransactionUncheckedUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  documentNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionTypeSchema),z.lazy(() => EnumTransactionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutTransactionNestedInputSchema).optional()
}).strict();

export const CashUpsertWithoutImagesInputSchema: z.ZodType<Prisma.CashUpsertWithoutImagesInput> = z.object({
  update: z.union([ z.lazy(() => CashUpdateWithoutImagesInputSchema),z.lazy(() => CashUncheckedUpdateWithoutImagesInputSchema) ]),
  create: z.union([ z.lazy(() => CashCreateWithoutImagesInputSchema),z.lazy(() => CashUncheckedCreateWithoutImagesInputSchema) ]),
  where: z.lazy(() => CashWhereInputSchema).optional()
}).strict();

export const CashUpdateToOneWithWhereWithoutImagesInputSchema: z.ZodType<Prisma.CashUpdateToOneWithWhereWithoutImagesInput> = z.object({
  where: z.lazy(() => CashWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CashUpdateWithoutImagesInputSchema),z.lazy(() => CashUncheckedUpdateWithoutImagesInputSchema) ]),
}).strict();

export const CashUpdateWithoutImagesInputSchema: z.ZodType<Prisma.CashUpdateWithoutImagesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUpdateManyWithoutCashNestedInputSchema).optional()
}).strict();

export const CashUncheckedUpdateWithoutImagesInputSchema: z.ZodType<Prisma.CashUncheckedUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutCashNestedInputSchema).optional()
}).strict();

export const AccountReceivableUpsertWithoutImagesInputSchema: z.ZodType<Prisma.AccountReceivableUpsertWithoutImagesInput> = z.object({
  update: z.union([ z.lazy(() => AccountReceivableUpdateWithoutImagesInputSchema),z.lazy(() => AccountReceivableUncheckedUpdateWithoutImagesInputSchema) ]),
  create: z.union([ z.lazy(() => AccountReceivableCreateWithoutImagesInputSchema),z.lazy(() => AccountReceivableUncheckedCreateWithoutImagesInputSchema) ]),
  where: z.lazy(() => AccountReceivableWhereInputSchema).optional()
}).strict();

export const AccountReceivableUpdateToOneWithWhereWithoutImagesInputSchema: z.ZodType<Prisma.AccountReceivableUpdateToOneWithWhereWithoutImagesInput> = z.object({
  where: z.lazy(() => AccountReceivableWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountReceivableUpdateWithoutImagesInputSchema),z.lazy(() => AccountReceivableUncheckedUpdateWithoutImagesInputSchema) ]),
}).strict();

export const AccountReceivableUpdateWithoutImagesInputSchema: z.ZodType<Prisma.AccountReceivableUpdateWithoutImagesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUpdateManyWithoutAccountReceivableNestedInputSchema).optional()
}).strict();

export const AccountReceivableUncheckedUpdateWithoutImagesInputSchema: z.ZodType<Prisma.AccountReceivableUncheckedUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutAccountReceivableNestedInputSchema).optional()
}).strict();

export const AccountPayableUpsertWithoutImagesInputSchema: z.ZodType<Prisma.AccountPayableUpsertWithoutImagesInput> = z.object({
  update: z.union([ z.lazy(() => AccountPayableUpdateWithoutImagesInputSchema),z.lazy(() => AccountPayableUncheckedUpdateWithoutImagesInputSchema) ]),
  create: z.union([ z.lazy(() => AccountPayableCreateWithoutImagesInputSchema),z.lazy(() => AccountPayableUncheckedCreateWithoutImagesInputSchema) ]),
  where: z.lazy(() => AccountPayableWhereInputSchema).optional()
}).strict();

export const AccountPayableUpdateToOneWithWhereWithoutImagesInputSchema: z.ZodType<Prisma.AccountPayableUpdateToOneWithWhereWithoutImagesInput> = z.object({
  where: z.lazy(() => AccountPayableWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountPayableUpdateWithoutImagesInputSchema),z.lazy(() => AccountPayableUncheckedUpdateWithoutImagesInputSchema) ]),
}).strict();

export const AccountPayableUpdateWithoutImagesInputSchema: z.ZodType<Prisma.AccountPayableUpdateWithoutImagesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUpdateManyWithoutAccountPayableNestedInputSchema).optional()
}).strict();

export const AccountPayableUncheckedUpdateWithoutImagesInputSchema: z.ZodType<Prisma.AccountPayableUncheckedUpdateWithoutImagesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  taxId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transactions: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutAccountPayableNestedInputSchema).optional()
}).strict();

export const PriceCreateManyInventoryInputSchema: z.ZodType<Prisma.PriceCreateManyInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  barcode: z.string(),
  quantity: z.number(),
  unit: z.string(),
  price: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const CostCreateManyInventoryInputSchema: z.ZodType<Prisma.CostCreateManyInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  date: z.coerce.date(),
  quantity: z.number(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  latestQuantity: z.number(),
  latestCost: z.number(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const TransactionItemCreateManyInventoryInputSchema: z.ZodType<Prisma.TransactionItemCreateManyInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const ImageCreateManyInventoryInputSchema: z.ZodType<Prisma.ImageCreateManyInventoryInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const PriceUpdateWithoutInventoryInputSchema: z.ZodType<Prisma.PriceUpdateWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  barcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceUncheckedUpdateWithoutInventoryInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  barcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PriceUncheckedUpdateManyWithoutInventoryInputSchema: z.ZodType<Prisma.PriceUncheckedUpdateManyWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  barcode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CostUpdateWithoutInventoryInputSchema: z.ZodType<Prisma.CostUpdateWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricePerUnit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestQuantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestCost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CostUncheckedUpdateWithoutInventoryInputSchema: z.ZodType<Prisma.CostUncheckedUpdateWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricePerUnit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestQuantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestCost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CostUncheckedUpdateManyWithoutInventoryInputSchema: z.ZodType<Prisma.CostUncheckedUpdateManyWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  pricePerUnit: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  totalPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestQuantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  latestCost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemUpdateWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transaction: z.lazy(() => TransactionUpdateOneRequiredWithoutTransactionItemsNestedInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableUpdateOneWithoutTransactionsNestedInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableUpdateOneWithoutTransactionsNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const TransactionItemUncheckedUpdateWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutInventoryInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductCategoryUpdateWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryUpdateWithoutInventoryIdsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductCategoryUncheckedUpdateWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateWithoutInventoryIdsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductCategoryUncheckedUpdateManyWithoutInventoryIdsInputSchema: z.ZodType<Prisma.ProductCategoryUncheckedUpdateManyWithoutInventoryIdsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUpdateWithoutInventoryInputSchema: z.ZodType<Prisma.ImageUpdateWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  transaction: z.lazy(() => TransactionUpdateOneWithoutImagesNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutImagesNestedInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableUpdateOneWithoutImagesNestedInputSchema).optional(),
  ap: z.lazy(() => AccountPayableUpdateOneWithoutImagesNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutInventoryInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutInventoryInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutInventoryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InventoryUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryUpdateWithoutCategoriesInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUpdateManyWithoutInventoryNestedInputSchema).optional(),
  costs: z.lazy(() => CostUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUpdateManyWithoutInventoryNestedInputSchema).optional(),
  images: z.lazy(() => ImageUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const InventoryUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryUncheckedUpdateWithoutCategoriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  prices: z.lazy(() => PriceUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  costs: z.lazy(() => CostUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  transactionItems: z.lazy(() => TransactionItemUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional(),
  images: z.lazy(() => ImageUncheckedUpdateManyWithoutInventoryNestedInputSchema).optional()
}).strict();

export const InventoryUncheckedUpdateManyWithoutCategoriesInputSchema: z.ZodType<Prisma.InventoryUncheckedUpdateManyWithoutCategoriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  remark: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemCreateManyTransactionInputSchema: z.ZodType<Prisma.TransactionItemCreateManyTransactionInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const ImageCreateManyTransactionInputSchema: z.ZodType<Prisma.ImageCreateManyTransactionInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const TransactionItemUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutTransactionItemsNestedInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableUpdateOneWithoutTransactionsNestedInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableUpdateOneWithoutTransactionsNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const TransactionItemUncheckedUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutTransactionInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutTransactionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.ImageUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutImagesNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutImagesNestedInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableUpdateOneWithoutImagesNestedInputSchema).optional(),
  ap: z.lazy(() => AccountPayableUpdateOneWithoutImagesNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutTransactionInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutTransactionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutTransactionInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutTransactionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemCreateManyAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemCreateManyAccountPayableInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const ImageCreateManyApInputSchema: z.ZodType<Prisma.ImageCreateManyApInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const TransactionItemUpdateWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithoutAccountPayableInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transaction: z.lazy(() => TransactionUpdateOneRequiredWithoutTransactionItemsNestedInputSchema).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutTransactionItemsNestedInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableUpdateOneWithoutTransactionsNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const TransactionItemUncheckedUpdateWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateWithoutAccountPayableInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutAccountPayableInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutAccountPayableInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUpdateWithoutApInputSchema: z.ZodType<Prisma.ImageUpdateWithoutApInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutImagesNestedInputSchema).optional(),
  transaction: z.lazy(() => TransactionUpdateOneWithoutImagesNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutImagesNestedInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableUpdateOneWithoutImagesNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutApInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutApInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutApInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutApInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemCreateManyAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemCreateManyAccountReceivableInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const ImageCreateManyArInputSchema: z.ZodType<Prisma.ImageCreateManyArInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  cashId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const TransactionItemUpdateWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithoutAccountReceivableInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transaction: z.lazy(() => TransactionUpdateOneRequiredWithoutTransactionItemsNestedInputSchema).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutTransactionItemsNestedInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableUpdateOneWithoutTransactionsNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const TransactionItemUncheckedUpdateWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateWithoutAccountReceivableInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutAccountReceivableInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutAccountReceivableInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUpdateWithoutArInputSchema: z.ZodType<Prisma.ImageUpdateWithoutArInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutImagesNestedInputSchema).optional(),
  transaction: z.lazy(() => TransactionUpdateOneWithoutImagesNestedInputSchema).optional(),
  cash: z.lazy(() => CashUpdateOneWithoutImagesNestedInputSchema).optional(),
  ap: z.lazy(() => AccountPayableUpdateOneWithoutImagesNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutArInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutArInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutArInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutArInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cashId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemCreateManyCashInputSchema: z.ZodType<Prisma.TransactionItemCreateManyCashInput> = z.object({
  id: z.string().cuid().optional(),
  transactionId: z.string(),
  type: z.lazy(() => TransactionItemTypeSchema),
  inventoryId: z.number().int().optional().nullable(),
  inventoryBarcode: z.string().optional().nullable(),
  inventoryUnit: z.string().optional().nullable(),
  inventoryUnitQuantity: z.number().optional().nullable(),
  inventoryPricePerUnit: z.number().optional().nullable(),
  accountPayableId: z.number().int().optional().nullable(),
  accountReceivableId: z.number().int().optional().nullable(),
  unitQuantity: z.number().optional().nullable(),
  quantity: z.number().optional().nullable(),
  debitAmount: z.number(),
  creditAmount: z.number()
}).strict();

export const ImageCreateManyCashInputSchema: z.ZodType<Prisma.ImageCreateManyCashInput> = z.object({
  id: z.string().cuid().optional(),
  inventoryId: z.number().int().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  arId: z.number().int().optional().nullable(),
  apId: z.number().int().optional().nullable(),
  imageUrl: z.string(),
  createdDate: z.coerce.date(),
  updatedDate: z.coerce.date()
}).strict();

export const TransactionItemUpdateWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemUpdateWithoutCashInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transaction: z.lazy(() => TransactionUpdateOneRequiredWithoutTransactionItemsNestedInputSchema).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutTransactionItemsNestedInputSchema).optional(),
  accountPayable: z.lazy(() => AccountPayableUpdateOneWithoutTransactionsNestedInputSchema).optional(),
  accountReceivable: z.lazy(() => AccountReceivableUpdateOneWithoutTransactionsNestedInputSchema).optional()
}).strict();

export const TransactionItemUncheckedUpdateWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateWithoutCashInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TransactionItemUncheckedUpdateManyWithoutCashInputSchema: z.ZodType<Prisma.TransactionItemUncheckedUpdateManyWithoutCashInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  transactionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TransactionItemTypeSchema),z.lazy(() => EnumTransactionItemTypeFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryBarcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnit: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryUnitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  inventoryPricePerUnit: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountPayableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accountReceivableId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitQuantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  quantity: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  debitAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  creditAmount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUpdateWithoutCashInputSchema: z.ZodType<Prisma.ImageUpdateWithoutCashInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inventory: z.lazy(() => InventoryUpdateOneWithoutImagesNestedInputSchema).optional(),
  transaction: z.lazy(() => TransactionUpdateOneWithoutImagesNestedInputSchema).optional(),
  ar: z.lazy(() => AccountReceivableUpdateOneWithoutImagesNestedInputSchema).optional(),
  ap: z.lazy(() => AccountPayableUpdateOneWithoutImagesNestedInputSchema).optional()
}).strict();

export const ImageUncheckedUpdateWithoutCashInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateWithoutCashInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ImageUncheckedUpdateManyWithoutCashInputSchema: z.ZodType<Prisma.ImageUncheckedUpdateManyWithoutCashInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  transactionId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  arId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  apId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const InventoryFindFirstArgsSchema: z.ZodType<Prisma.InventoryFindFirstArgs> = z.object({
  select: InventorySelectSchema.optional(),
  include: InventoryIncludeSchema.optional(),
  where: InventoryWhereInputSchema.optional(),
  orderBy: z.union([ InventoryOrderByWithRelationInputSchema.array(),InventoryOrderByWithRelationInputSchema ]).optional(),
  cursor: InventoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventoryScalarFieldEnumSchema,InventoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const InventoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InventoryFindFirstOrThrowArgs> = z.object({
  select: InventorySelectSchema.optional(),
  include: InventoryIncludeSchema.optional(),
  where: InventoryWhereInputSchema.optional(),
  orderBy: z.union([ InventoryOrderByWithRelationInputSchema.array(),InventoryOrderByWithRelationInputSchema ]).optional(),
  cursor: InventoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventoryScalarFieldEnumSchema,InventoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const InventoryFindManyArgsSchema: z.ZodType<Prisma.InventoryFindManyArgs> = z.object({
  select: InventorySelectSchema.optional(),
  include: InventoryIncludeSchema.optional(),
  where: InventoryWhereInputSchema.optional(),
  orderBy: z.union([ InventoryOrderByWithRelationInputSchema.array(),InventoryOrderByWithRelationInputSchema ]).optional(),
  cursor: InventoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InventoryScalarFieldEnumSchema,InventoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const InventoryAggregateArgsSchema: z.ZodType<Prisma.InventoryAggregateArgs> = z.object({
  where: InventoryWhereInputSchema.optional(),
  orderBy: z.union([ InventoryOrderByWithRelationInputSchema.array(),InventoryOrderByWithRelationInputSchema ]).optional(),
  cursor: InventoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const InventoryGroupByArgsSchema: z.ZodType<Prisma.InventoryGroupByArgs> = z.object({
  where: InventoryWhereInputSchema.optional(),
  orderBy: z.union([ InventoryOrderByWithAggregationInputSchema.array(),InventoryOrderByWithAggregationInputSchema ]).optional(),
  by: InventoryScalarFieldEnumSchema.array(),
  having: InventoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const InventoryFindUniqueArgsSchema: z.ZodType<Prisma.InventoryFindUniqueArgs> = z.object({
  select: InventorySelectSchema.optional(),
  include: InventoryIncludeSchema.optional(),
  where: InventoryWhereUniqueInputSchema,
}).strict()

export const InventoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InventoryFindUniqueOrThrowArgs> = z.object({
  select: InventorySelectSchema.optional(),
  include: InventoryIncludeSchema.optional(),
  where: InventoryWhereUniqueInputSchema,
}).strict()

export const ProductCategoryFindFirstArgsSchema: z.ZodType<Prisma.ProductCategoryFindFirstArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ProductCategoryOrderByWithRelationInputSchema.array(),ProductCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductCategoryScalarFieldEnumSchema,ProductCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProductCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductCategoryFindFirstOrThrowArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ProductCategoryOrderByWithRelationInputSchema.array(),ProductCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductCategoryScalarFieldEnumSchema,ProductCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProductCategoryFindManyArgsSchema: z.ZodType<Prisma.ProductCategoryFindManyArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ProductCategoryOrderByWithRelationInputSchema.array(),ProductCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductCategoryScalarFieldEnumSchema,ProductCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProductCategoryAggregateArgsSchema: z.ZodType<Prisma.ProductCategoryAggregateArgs> = z.object({
  where: ProductCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ProductCategoryOrderByWithRelationInputSchema.array(),ProductCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductCategoryGroupByArgsSchema: z.ZodType<Prisma.ProductCategoryGroupByArgs> = z.object({
  where: ProductCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ProductCategoryOrderByWithAggregationInputSchema.array(),ProductCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: ProductCategoryScalarFieldEnumSchema.array(),
  having: ProductCategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProductCategoryFindUniqueArgsSchema: z.ZodType<Prisma.ProductCategoryFindUniqueArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereUniqueInputSchema,
}).strict()

export const ProductCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductCategoryFindUniqueOrThrowArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereUniqueInputSchema,
}).strict()

export const PriceFindFirstArgsSchema: z.ZodType<Prisma.PriceFindFirstArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriceScalarFieldEnumSchema,PriceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PriceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PriceFindFirstOrThrowArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriceScalarFieldEnumSchema,PriceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PriceFindManyArgsSchema: z.ZodType<Prisma.PriceFindManyArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PriceScalarFieldEnumSchema,PriceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const PriceAggregateArgsSchema: z.ZodType<Prisma.PriceAggregateArgs> = z.object({
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithRelationInputSchema.array(),PriceOrderByWithRelationInputSchema ]).optional(),
  cursor: PriceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PriceGroupByArgsSchema: z.ZodType<Prisma.PriceGroupByArgs> = z.object({
  where: PriceWhereInputSchema.optional(),
  orderBy: z.union([ PriceOrderByWithAggregationInputSchema.array(),PriceOrderByWithAggregationInputSchema ]).optional(),
  by: PriceScalarFieldEnumSchema.array(),
  having: PriceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const PriceFindUniqueArgsSchema: z.ZodType<Prisma.PriceFindUniqueArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
}).strict()

export const PriceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PriceFindUniqueOrThrowArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
}).strict()

export const CostFindFirstArgsSchema: z.ZodType<Prisma.CostFindFirstArgs> = z.object({
  select: CostSelectSchema.optional(),
  include: CostIncludeSchema.optional(),
  where: CostWhereInputSchema.optional(),
  orderBy: z.union([ CostOrderByWithRelationInputSchema.array(),CostOrderByWithRelationInputSchema ]).optional(),
  cursor: CostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CostScalarFieldEnumSchema,CostScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CostFindFirstOrThrowArgs> = z.object({
  select: CostSelectSchema.optional(),
  include: CostIncludeSchema.optional(),
  where: CostWhereInputSchema.optional(),
  orderBy: z.union([ CostOrderByWithRelationInputSchema.array(),CostOrderByWithRelationInputSchema ]).optional(),
  cursor: CostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CostScalarFieldEnumSchema,CostScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CostFindManyArgsSchema: z.ZodType<Prisma.CostFindManyArgs> = z.object({
  select: CostSelectSchema.optional(),
  include: CostIncludeSchema.optional(),
  where: CostWhereInputSchema.optional(),
  orderBy: z.union([ CostOrderByWithRelationInputSchema.array(),CostOrderByWithRelationInputSchema ]).optional(),
  cursor: CostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CostScalarFieldEnumSchema,CostScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CostAggregateArgsSchema: z.ZodType<Prisma.CostAggregateArgs> = z.object({
  where: CostWhereInputSchema.optional(),
  orderBy: z.union([ CostOrderByWithRelationInputSchema.array(),CostOrderByWithRelationInputSchema ]).optional(),
  cursor: CostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CostGroupByArgsSchema: z.ZodType<Prisma.CostGroupByArgs> = z.object({
  where: CostWhereInputSchema.optional(),
  orderBy: z.union([ CostOrderByWithAggregationInputSchema.array(),CostOrderByWithAggregationInputSchema ]).optional(),
  by: CostScalarFieldEnumSchema.array(),
  having: CostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CostFindUniqueArgsSchema: z.ZodType<Prisma.CostFindUniqueArgs> = z.object({
  select: CostSelectSchema.optional(),
  include: CostIncludeSchema.optional(),
  where: CostWhereUniqueInputSchema,
}).strict()

export const CostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CostFindUniqueOrThrowArgs> = z.object({
  select: CostSelectSchema.optional(),
  include: CostIncludeSchema.optional(),
  where: CostWhereUniqueInputSchema,
}).strict()

export const TransactionFindFirstArgsSchema: z.ZodType<Prisma.TransactionFindFirstArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TransactionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindFirstOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TransactionFindManyArgsSchema: z.ZodType<Prisma.TransactionFindManyArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionScalarFieldEnumSchema,TransactionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TransactionAggregateArgsSchema: z.ZodType<Prisma.TransactionAggregateArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithRelationInputSchema.array(),TransactionOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TransactionGroupByArgsSchema: z.ZodType<Prisma.TransactionGroupByArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
  orderBy: z.union([ TransactionOrderByWithAggregationInputSchema.array(),TransactionOrderByWithAggregationInputSchema ]).optional(),
  by: TransactionScalarFieldEnumSchema.array(),
  having: TransactionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TransactionFindUniqueArgsSchema: z.ZodType<Prisma.TransactionFindUniqueArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TransactionFindUniqueOrThrowArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionItemFindFirstArgsSchema: z.ZodType<Prisma.TransactionItemFindFirstArgs> = z.object({
  select: TransactionItemSelectSchema.optional(),
  include: TransactionItemIncludeSchema.optional(),
  where: TransactionItemWhereInputSchema.optional(),
  orderBy: z.union([ TransactionItemOrderByWithRelationInputSchema.array(),TransactionItemOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionItemScalarFieldEnumSchema,TransactionItemScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TransactionItemFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TransactionItemFindFirstOrThrowArgs> = z.object({
  select: TransactionItemSelectSchema.optional(),
  include: TransactionItemIncludeSchema.optional(),
  where: TransactionItemWhereInputSchema.optional(),
  orderBy: z.union([ TransactionItemOrderByWithRelationInputSchema.array(),TransactionItemOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionItemScalarFieldEnumSchema,TransactionItemScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TransactionItemFindManyArgsSchema: z.ZodType<Prisma.TransactionItemFindManyArgs> = z.object({
  select: TransactionItemSelectSchema.optional(),
  include: TransactionItemIncludeSchema.optional(),
  where: TransactionItemWhereInputSchema.optional(),
  orderBy: z.union([ TransactionItemOrderByWithRelationInputSchema.array(),TransactionItemOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TransactionItemScalarFieldEnumSchema,TransactionItemScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const TransactionItemAggregateArgsSchema: z.ZodType<Prisma.TransactionItemAggregateArgs> = z.object({
  where: TransactionItemWhereInputSchema.optional(),
  orderBy: z.union([ TransactionItemOrderByWithRelationInputSchema.array(),TransactionItemOrderByWithRelationInputSchema ]).optional(),
  cursor: TransactionItemWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TransactionItemGroupByArgsSchema: z.ZodType<Prisma.TransactionItemGroupByArgs> = z.object({
  where: TransactionItemWhereInputSchema.optional(),
  orderBy: z.union([ TransactionItemOrderByWithAggregationInputSchema.array(),TransactionItemOrderByWithAggregationInputSchema ]).optional(),
  by: TransactionItemScalarFieldEnumSchema.array(),
  having: TransactionItemScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const TransactionItemFindUniqueArgsSchema: z.ZodType<Prisma.TransactionItemFindUniqueArgs> = z.object({
  select: TransactionItemSelectSchema.optional(),
  include: TransactionItemIncludeSchema.optional(),
  where: TransactionItemWhereUniqueInputSchema,
}).strict()

export const TransactionItemFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TransactionItemFindUniqueOrThrowArgs> = z.object({
  select: TransactionItemSelectSchema.optional(),
  include: TransactionItemIncludeSchema.optional(),
  where: TransactionItemWhereUniqueInputSchema,
}).strict()

export const AccountPayableFindFirstArgsSchema: z.ZodType<Prisma.AccountPayableFindFirstArgs> = z.object({
  select: AccountPayableSelectSchema.optional(),
  include: AccountPayableIncludeSchema.optional(),
  where: AccountPayableWhereInputSchema.optional(),
  orderBy: z.union([ AccountPayableOrderByWithRelationInputSchema.array(),AccountPayableOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountPayableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountPayableScalarFieldEnumSchema,AccountPayableScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountPayableFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountPayableFindFirstOrThrowArgs> = z.object({
  select: AccountPayableSelectSchema.optional(),
  include: AccountPayableIncludeSchema.optional(),
  where: AccountPayableWhereInputSchema.optional(),
  orderBy: z.union([ AccountPayableOrderByWithRelationInputSchema.array(),AccountPayableOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountPayableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountPayableScalarFieldEnumSchema,AccountPayableScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountPayableFindManyArgsSchema: z.ZodType<Prisma.AccountPayableFindManyArgs> = z.object({
  select: AccountPayableSelectSchema.optional(),
  include: AccountPayableIncludeSchema.optional(),
  where: AccountPayableWhereInputSchema.optional(),
  orderBy: z.union([ AccountPayableOrderByWithRelationInputSchema.array(),AccountPayableOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountPayableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountPayableScalarFieldEnumSchema,AccountPayableScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountPayableAggregateArgsSchema: z.ZodType<Prisma.AccountPayableAggregateArgs> = z.object({
  where: AccountPayableWhereInputSchema.optional(),
  orderBy: z.union([ AccountPayableOrderByWithRelationInputSchema.array(),AccountPayableOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountPayableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountPayableGroupByArgsSchema: z.ZodType<Prisma.AccountPayableGroupByArgs> = z.object({
  where: AccountPayableWhereInputSchema.optional(),
  orderBy: z.union([ AccountPayableOrderByWithAggregationInputSchema.array(),AccountPayableOrderByWithAggregationInputSchema ]).optional(),
  by: AccountPayableScalarFieldEnumSchema.array(),
  having: AccountPayableScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountPayableFindUniqueArgsSchema: z.ZodType<Prisma.AccountPayableFindUniqueArgs> = z.object({
  select: AccountPayableSelectSchema.optional(),
  include: AccountPayableIncludeSchema.optional(),
  where: AccountPayableWhereUniqueInputSchema,
}).strict()

export const AccountPayableFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountPayableFindUniqueOrThrowArgs> = z.object({
  select: AccountPayableSelectSchema.optional(),
  include: AccountPayableIncludeSchema.optional(),
  where: AccountPayableWhereUniqueInputSchema,
}).strict()

export const AccountReceivableFindFirstArgsSchema: z.ZodType<Prisma.AccountReceivableFindFirstArgs> = z.object({
  select: AccountReceivableSelectSchema.optional(),
  include: AccountReceivableIncludeSchema.optional(),
  where: AccountReceivableWhereInputSchema.optional(),
  orderBy: z.union([ AccountReceivableOrderByWithRelationInputSchema.array(),AccountReceivableOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountReceivableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountReceivableScalarFieldEnumSchema,AccountReceivableScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountReceivableFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountReceivableFindFirstOrThrowArgs> = z.object({
  select: AccountReceivableSelectSchema.optional(),
  include: AccountReceivableIncludeSchema.optional(),
  where: AccountReceivableWhereInputSchema.optional(),
  orderBy: z.union([ AccountReceivableOrderByWithRelationInputSchema.array(),AccountReceivableOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountReceivableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountReceivableScalarFieldEnumSchema,AccountReceivableScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountReceivableFindManyArgsSchema: z.ZodType<Prisma.AccountReceivableFindManyArgs> = z.object({
  select: AccountReceivableSelectSchema.optional(),
  include: AccountReceivableIncludeSchema.optional(),
  where: AccountReceivableWhereInputSchema.optional(),
  orderBy: z.union([ AccountReceivableOrderByWithRelationInputSchema.array(),AccountReceivableOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountReceivableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountReceivableScalarFieldEnumSchema,AccountReceivableScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const AccountReceivableAggregateArgsSchema: z.ZodType<Prisma.AccountReceivableAggregateArgs> = z.object({
  where: AccountReceivableWhereInputSchema.optional(),
  orderBy: z.union([ AccountReceivableOrderByWithRelationInputSchema.array(),AccountReceivableOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountReceivableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountReceivableGroupByArgsSchema: z.ZodType<Prisma.AccountReceivableGroupByArgs> = z.object({
  where: AccountReceivableWhereInputSchema.optional(),
  orderBy: z.union([ AccountReceivableOrderByWithAggregationInputSchema.array(),AccountReceivableOrderByWithAggregationInputSchema ]).optional(),
  by: AccountReceivableScalarFieldEnumSchema.array(),
  having: AccountReceivableScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const AccountReceivableFindUniqueArgsSchema: z.ZodType<Prisma.AccountReceivableFindUniqueArgs> = z.object({
  select: AccountReceivableSelectSchema.optional(),
  include: AccountReceivableIncludeSchema.optional(),
  where: AccountReceivableWhereUniqueInputSchema,
}).strict()

export const AccountReceivableFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountReceivableFindUniqueOrThrowArgs> = z.object({
  select: AccountReceivableSelectSchema.optional(),
  include: AccountReceivableIncludeSchema.optional(),
  where: AccountReceivableWhereUniqueInputSchema,
}).strict()

export const CashFindFirstArgsSchema: z.ZodType<Prisma.CashFindFirstArgs> = z.object({
  select: CashSelectSchema.optional(),
  include: CashIncludeSchema.optional(),
  where: CashWhereInputSchema.optional(),
  orderBy: z.union([ CashOrderByWithRelationInputSchema.array(),CashOrderByWithRelationInputSchema ]).optional(),
  cursor: CashWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CashScalarFieldEnumSchema,CashScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CashFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CashFindFirstOrThrowArgs> = z.object({
  select: CashSelectSchema.optional(),
  include: CashIncludeSchema.optional(),
  where: CashWhereInputSchema.optional(),
  orderBy: z.union([ CashOrderByWithRelationInputSchema.array(),CashOrderByWithRelationInputSchema ]).optional(),
  cursor: CashWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CashScalarFieldEnumSchema,CashScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CashFindManyArgsSchema: z.ZodType<Prisma.CashFindManyArgs> = z.object({
  select: CashSelectSchema.optional(),
  include: CashIncludeSchema.optional(),
  where: CashWhereInputSchema.optional(),
  orderBy: z.union([ CashOrderByWithRelationInputSchema.array(),CashOrderByWithRelationInputSchema ]).optional(),
  cursor: CashWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CashScalarFieldEnumSchema,CashScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const CashAggregateArgsSchema: z.ZodType<Prisma.CashAggregateArgs> = z.object({
  where: CashWhereInputSchema.optional(),
  orderBy: z.union([ CashOrderByWithRelationInputSchema.array(),CashOrderByWithRelationInputSchema ]).optional(),
  cursor: CashWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CashGroupByArgsSchema: z.ZodType<Prisma.CashGroupByArgs> = z.object({
  where: CashWhereInputSchema.optional(),
  orderBy: z.union([ CashOrderByWithAggregationInputSchema.array(),CashOrderByWithAggregationInputSchema ]).optional(),
  by: CashScalarFieldEnumSchema.array(),
  having: CashScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const CashFindUniqueArgsSchema: z.ZodType<Prisma.CashFindUniqueArgs> = z.object({
  select: CashSelectSchema.optional(),
  include: CashIncludeSchema.optional(),
  where: CashWhereUniqueInputSchema,
}).strict()

export const CashFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CashFindUniqueOrThrowArgs> = z.object({
  select: CashSelectSchema.optional(),
  include: CashIncludeSchema.optional(),
  where: CashWhereUniqueInputSchema,
}).strict()

export const ImageFindFirstArgsSchema: z.ZodType<Prisma.ImageFindFirstArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImageScalarFieldEnumSchema,ImageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ImageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ImageFindFirstOrThrowArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImageScalarFieldEnumSchema,ImageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ImageFindManyArgsSchema: z.ZodType<Prisma.ImageFindManyArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ImageScalarFieldEnumSchema,ImageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ImageAggregateArgsSchema: z.ZodType<Prisma.ImageAggregateArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithRelationInputSchema.array(),ImageOrderByWithRelationInputSchema ]).optional(),
  cursor: ImageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ImageGroupByArgsSchema: z.ZodType<Prisma.ImageGroupByArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
  orderBy: z.union([ ImageOrderByWithAggregationInputSchema.array(),ImageOrderByWithAggregationInputSchema ]).optional(),
  by: ImageScalarFieldEnumSchema.array(),
  having: ImageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ImageFindUniqueArgsSchema: z.ZodType<Prisma.ImageFindUniqueArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict()

export const ImageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ImageFindUniqueOrThrowArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict()

export const InventoryCreateArgsSchema: z.ZodType<Prisma.InventoryCreateArgs> = z.object({
  select: InventorySelectSchema.optional(),
  include: InventoryIncludeSchema.optional(),
  data: z.union([ InventoryCreateInputSchema,InventoryUncheckedCreateInputSchema ]),
}).strict()

export const InventoryUpsertArgsSchema: z.ZodType<Prisma.InventoryUpsertArgs> = z.object({
  select: InventorySelectSchema.optional(),
  include: InventoryIncludeSchema.optional(),
  where: InventoryWhereUniqueInputSchema,
  create: z.union([ InventoryCreateInputSchema,InventoryUncheckedCreateInputSchema ]),
  update: z.union([ InventoryUpdateInputSchema,InventoryUncheckedUpdateInputSchema ]),
}).strict()

export const InventoryCreateManyArgsSchema: z.ZodType<Prisma.InventoryCreateManyArgs> = z.object({
  data: z.union([ InventoryCreateManyInputSchema,InventoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const InventoryDeleteArgsSchema: z.ZodType<Prisma.InventoryDeleteArgs> = z.object({
  select: InventorySelectSchema.optional(),
  include: InventoryIncludeSchema.optional(),
  where: InventoryWhereUniqueInputSchema,
}).strict()

export const InventoryUpdateArgsSchema: z.ZodType<Prisma.InventoryUpdateArgs> = z.object({
  select: InventorySelectSchema.optional(),
  include: InventoryIncludeSchema.optional(),
  data: z.union([ InventoryUpdateInputSchema,InventoryUncheckedUpdateInputSchema ]),
  where: InventoryWhereUniqueInputSchema,
}).strict()

export const InventoryUpdateManyArgsSchema: z.ZodType<Prisma.InventoryUpdateManyArgs> = z.object({
  data: z.union([ InventoryUpdateManyMutationInputSchema,InventoryUncheckedUpdateManyInputSchema ]),
  where: InventoryWhereInputSchema.optional(),
}).strict()

export const InventoryDeleteManyArgsSchema: z.ZodType<Prisma.InventoryDeleteManyArgs> = z.object({
  where: InventoryWhereInputSchema.optional(),
}).strict()

export const ProductCategoryCreateArgsSchema: z.ZodType<Prisma.ProductCategoryCreateArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  data: z.union([ ProductCategoryCreateInputSchema,ProductCategoryUncheckedCreateInputSchema ]),
}).strict()

export const ProductCategoryUpsertArgsSchema: z.ZodType<Prisma.ProductCategoryUpsertArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereUniqueInputSchema,
  create: z.union([ ProductCategoryCreateInputSchema,ProductCategoryUncheckedCreateInputSchema ]),
  update: z.union([ ProductCategoryUpdateInputSchema,ProductCategoryUncheckedUpdateInputSchema ]),
}).strict()

export const ProductCategoryCreateManyArgsSchema: z.ZodType<Prisma.ProductCategoryCreateManyArgs> = z.object({
  data: z.union([ ProductCategoryCreateManyInputSchema,ProductCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ProductCategoryDeleteArgsSchema: z.ZodType<Prisma.ProductCategoryDeleteArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  where: ProductCategoryWhereUniqueInputSchema,
}).strict()

export const ProductCategoryUpdateArgsSchema: z.ZodType<Prisma.ProductCategoryUpdateArgs> = z.object({
  select: ProductCategorySelectSchema.optional(),
  include: ProductCategoryIncludeSchema.optional(),
  data: z.union([ ProductCategoryUpdateInputSchema,ProductCategoryUncheckedUpdateInputSchema ]),
  where: ProductCategoryWhereUniqueInputSchema,
}).strict()

export const ProductCategoryUpdateManyArgsSchema: z.ZodType<Prisma.ProductCategoryUpdateManyArgs> = z.object({
  data: z.union([ ProductCategoryUpdateManyMutationInputSchema,ProductCategoryUncheckedUpdateManyInputSchema ]),
  where: ProductCategoryWhereInputSchema.optional(),
}).strict()

export const ProductCategoryDeleteManyArgsSchema: z.ZodType<Prisma.ProductCategoryDeleteManyArgs> = z.object({
  where: ProductCategoryWhereInputSchema.optional(),
}).strict()

export const PriceCreateArgsSchema: z.ZodType<Prisma.PriceCreateArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  data: z.union([ PriceCreateInputSchema,PriceUncheckedCreateInputSchema ]),
}).strict()

export const PriceUpsertArgsSchema: z.ZodType<Prisma.PriceUpsertArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
  create: z.union([ PriceCreateInputSchema,PriceUncheckedCreateInputSchema ]),
  update: z.union([ PriceUpdateInputSchema,PriceUncheckedUpdateInputSchema ]),
}).strict()

export const PriceCreateManyArgsSchema: z.ZodType<Prisma.PriceCreateManyArgs> = z.object({
  data: z.union([ PriceCreateManyInputSchema,PriceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const PriceDeleteArgsSchema: z.ZodType<Prisma.PriceDeleteArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  where: PriceWhereUniqueInputSchema,
}).strict()

export const PriceUpdateArgsSchema: z.ZodType<Prisma.PriceUpdateArgs> = z.object({
  select: PriceSelectSchema.optional(),
  include: PriceIncludeSchema.optional(),
  data: z.union([ PriceUpdateInputSchema,PriceUncheckedUpdateInputSchema ]),
  where: PriceWhereUniqueInputSchema,
}).strict()

export const PriceUpdateManyArgsSchema: z.ZodType<Prisma.PriceUpdateManyArgs> = z.object({
  data: z.union([ PriceUpdateManyMutationInputSchema,PriceUncheckedUpdateManyInputSchema ]),
  where: PriceWhereInputSchema.optional(),
}).strict()

export const PriceDeleteManyArgsSchema: z.ZodType<Prisma.PriceDeleteManyArgs> = z.object({
  where: PriceWhereInputSchema.optional(),
}).strict()

export const CostCreateArgsSchema: z.ZodType<Prisma.CostCreateArgs> = z.object({
  select: CostSelectSchema.optional(),
  include: CostIncludeSchema.optional(),
  data: z.union([ CostCreateInputSchema,CostUncheckedCreateInputSchema ]),
}).strict()

export const CostUpsertArgsSchema: z.ZodType<Prisma.CostUpsertArgs> = z.object({
  select: CostSelectSchema.optional(),
  include: CostIncludeSchema.optional(),
  where: CostWhereUniqueInputSchema,
  create: z.union([ CostCreateInputSchema,CostUncheckedCreateInputSchema ]),
  update: z.union([ CostUpdateInputSchema,CostUncheckedUpdateInputSchema ]),
}).strict()

export const CostCreateManyArgsSchema: z.ZodType<Prisma.CostCreateManyArgs> = z.object({
  data: z.union([ CostCreateManyInputSchema,CostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CostDeleteArgsSchema: z.ZodType<Prisma.CostDeleteArgs> = z.object({
  select: CostSelectSchema.optional(),
  include: CostIncludeSchema.optional(),
  where: CostWhereUniqueInputSchema,
}).strict()

export const CostUpdateArgsSchema: z.ZodType<Prisma.CostUpdateArgs> = z.object({
  select: CostSelectSchema.optional(),
  include: CostIncludeSchema.optional(),
  data: z.union([ CostUpdateInputSchema,CostUncheckedUpdateInputSchema ]),
  where: CostWhereUniqueInputSchema,
}).strict()

export const CostUpdateManyArgsSchema: z.ZodType<Prisma.CostUpdateManyArgs> = z.object({
  data: z.union([ CostUpdateManyMutationInputSchema,CostUncheckedUpdateManyInputSchema ]),
  where: CostWhereInputSchema.optional(),
}).strict()

export const CostDeleteManyArgsSchema: z.ZodType<Prisma.CostDeleteManyArgs> = z.object({
  where: CostWhereInputSchema.optional(),
}).strict()

export const TransactionCreateArgsSchema: z.ZodType<Prisma.TransactionCreateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
}).strict()

export const TransactionUpsertArgsSchema: z.ZodType<Prisma.TransactionUpsertArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
  create: z.union([ TransactionCreateInputSchema,TransactionUncheckedCreateInputSchema ]),
  update: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
}).strict()

export const TransactionCreateManyArgsSchema: z.ZodType<Prisma.TransactionCreateManyArgs> = z.object({
  data: z.union([ TransactionCreateManyInputSchema,TransactionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TransactionDeleteArgsSchema: z.ZodType<Prisma.TransactionDeleteArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionUpdateArgsSchema: z.ZodType<Prisma.TransactionUpdateArgs> = z.object({
  select: TransactionSelectSchema.optional(),
  include: TransactionIncludeSchema.optional(),
  data: z.union([ TransactionUpdateInputSchema,TransactionUncheckedUpdateInputSchema ]),
  where: TransactionWhereUniqueInputSchema,
}).strict()

export const TransactionUpdateManyArgsSchema: z.ZodType<Prisma.TransactionUpdateManyArgs> = z.object({
  data: z.union([ TransactionUpdateManyMutationInputSchema,TransactionUncheckedUpdateManyInputSchema ]),
  where: TransactionWhereInputSchema.optional(),
}).strict()

export const TransactionDeleteManyArgsSchema: z.ZodType<Prisma.TransactionDeleteManyArgs> = z.object({
  where: TransactionWhereInputSchema.optional(),
}).strict()

export const TransactionItemCreateArgsSchema: z.ZodType<Prisma.TransactionItemCreateArgs> = z.object({
  select: TransactionItemSelectSchema.optional(),
  include: TransactionItemIncludeSchema.optional(),
  data: z.union([ TransactionItemCreateInputSchema,TransactionItemUncheckedCreateInputSchema ]),
}).strict()

export const TransactionItemUpsertArgsSchema: z.ZodType<Prisma.TransactionItemUpsertArgs> = z.object({
  select: TransactionItemSelectSchema.optional(),
  include: TransactionItemIncludeSchema.optional(),
  where: TransactionItemWhereUniqueInputSchema,
  create: z.union([ TransactionItemCreateInputSchema,TransactionItemUncheckedCreateInputSchema ]),
  update: z.union([ TransactionItemUpdateInputSchema,TransactionItemUncheckedUpdateInputSchema ]),
}).strict()

export const TransactionItemCreateManyArgsSchema: z.ZodType<Prisma.TransactionItemCreateManyArgs> = z.object({
  data: z.union([ TransactionItemCreateManyInputSchema,TransactionItemCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const TransactionItemDeleteArgsSchema: z.ZodType<Prisma.TransactionItemDeleteArgs> = z.object({
  select: TransactionItemSelectSchema.optional(),
  include: TransactionItemIncludeSchema.optional(),
  where: TransactionItemWhereUniqueInputSchema,
}).strict()

export const TransactionItemUpdateArgsSchema: z.ZodType<Prisma.TransactionItemUpdateArgs> = z.object({
  select: TransactionItemSelectSchema.optional(),
  include: TransactionItemIncludeSchema.optional(),
  data: z.union([ TransactionItemUpdateInputSchema,TransactionItemUncheckedUpdateInputSchema ]),
  where: TransactionItemWhereUniqueInputSchema,
}).strict()

export const TransactionItemUpdateManyArgsSchema: z.ZodType<Prisma.TransactionItemUpdateManyArgs> = z.object({
  data: z.union([ TransactionItemUpdateManyMutationInputSchema,TransactionItemUncheckedUpdateManyInputSchema ]),
  where: TransactionItemWhereInputSchema.optional(),
}).strict()

export const TransactionItemDeleteManyArgsSchema: z.ZodType<Prisma.TransactionItemDeleteManyArgs> = z.object({
  where: TransactionItemWhereInputSchema.optional(),
}).strict()

export const AccountPayableCreateArgsSchema: z.ZodType<Prisma.AccountPayableCreateArgs> = z.object({
  select: AccountPayableSelectSchema.optional(),
  include: AccountPayableIncludeSchema.optional(),
  data: z.union([ AccountPayableCreateInputSchema,AccountPayableUncheckedCreateInputSchema ]),
}).strict()

export const AccountPayableUpsertArgsSchema: z.ZodType<Prisma.AccountPayableUpsertArgs> = z.object({
  select: AccountPayableSelectSchema.optional(),
  include: AccountPayableIncludeSchema.optional(),
  where: AccountPayableWhereUniqueInputSchema,
  create: z.union([ AccountPayableCreateInputSchema,AccountPayableUncheckedCreateInputSchema ]),
  update: z.union([ AccountPayableUpdateInputSchema,AccountPayableUncheckedUpdateInputSchema ]),
}).strict()

export const AccountPayableCreateManyArgsSchema: z.ZodType<Prisma.AccountPayableCreateManyArgs> = z.object({
  data: z.union([ AccountPayableCreateManyInputSchema,AccountPayableCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountPayableDeleteArgsSchema: z.ZodType<Prisma.AccountPayableDeleteArgs> = z.object({
  select: AccountPayableSelectSchema.optional(),
  include: AccountPayableIncludeSchema.optional(),
  where: AccountPayableWhereUniqueInputSchema,
}).strict()

export const AccountPayableUpdateArgsSchema: z.ZodType<Prisma.AccountPayableUpdateArgs> = z.object({
  select: AccountPayableSelectSchema.optional(),
  include: AccountPayableIncludeSchema.optional(),
  data: z.union([ AccountPayableUpdateInputSchema,AccountPayableUncheckedUpdateInputSchema ]),
  where: AccountPayableWhereUniqueInputSchema,
}).strict()

export const AccountPayableUpdateManyArgsSchema: z.ZodType<Prisma.AccountPayableUpdateManyArgs> = z.object({
  data: z.union([ AccountPayableUpdateManyMutationInputSchema,AccountPayableUncheckedUpdateManyInputSchema ]),
  where: AccountPayableWhereInputSchema.optional(),
}).strict()

export const AccountPayableDeleteManyArgsSchema: z.ZodType<Prisma.AccountPayableDeleteManyArgs> = z.object({
  where: AccountPayableWhereInputSchema.optional(),
}).strict()

export const AccountReceivableCreateArgsSchema: z.ZodType<Prisma.AccountReceivableCreateArgs> = z.object({
  select: AccountReceivableSelectSchema.optional(),
  include: AccountReceivableIncludeSchema.optional(),
  data: z.union([ AccountReceivableCreateInputSchema,AccountReceivableUncheckedCreateInputSchema ]),
}).strict()

export const AccountReceivableUpsertArgsSchema: z.ZodType<Prisma.AccountReceivableUpsertArgs> = z.object({
  select: AccountReceivableSelectSchema.optional(),
  include: AccountReceivableIncludeSchema.optional(),
  where: AccountReceivableWhereUniqueInputSchema,
  create: z.union([ AccountReceivableCreateInputSchema,AccountReceivableUncheckedCreateInputSchema ]),
  update: z.union([ AccountReceivableUpdateInputSchema,AccountReceivableUncheckedUpdateInputSchema ]),
}).strict()

export const AccountReceivableCreateManyArgsSchema: z.ZodType<Prisma.AccountReceivableCreateManyArgs> = z.object({
  data: z.union([ AccountReceivableCreateManyInputSchema,AccountReceivableCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const AccountReceivableDeleteArgsSchema: z.ZodType<Prisma.AccountReceivableDeleteArgs> = z.object({
  select: AccountReceivableSelectSchema.optional(),
  include: AccountReceivableIncludeSchema.optional(),
  where: AccountReceivableWhereUniqueInputSchema,
}).strict()

export const AccountReceivableUpdateArgsSchema: z.ZodType<Prisma.AccountReceivableUpdateArgs> = z.object({
  select: AccountReceivableSelectSchema.optional(),
  include: AccountReceivableIncludeSchema.optional(),
  data: z.union([ AccountReceivableUpdateInputSchema,AccountReceivableUncheckedUpdateInputSchema ]),
  where: AccountReceivableWhereUniqueInputSchema,
}).strict()

export const AccountReceivableUpdateManyArgsSchema: z.ZodType<Prisma.AccountReceivableUpdateManyArgs> = z.object({
  data: z.union([ AccountReceivableUpdateManyMutationInputSchema,AccountReceivableUncheckedUpdateManyInputSchema ]),
  where: AccountReceivableWhereInputSchema.optional(),
}).strict()

export const AccountReceivableDeleteManyArgsSchema: z.ZodType<Prisma.AccountReceivableDeleteManyArgs> = z.object({
  where: AccountReceivableWhereInputSchema.optional(),
}).strict()

export const CashCreateArgsSchema: z.ZodType<Prisma.CashCreateArgs> = z.object({
  select: CashSelectSchema.optional(),
  include: CashIncludeSchema.optional(),
  data: z.union([ CashCreateInputSchema,CashUncheckedCreateInputSchema ]),
}).strict()

export const CashUpsertArgsSchema: z.ZodType<Prisma.CashUpsertArgs> = z.object({
  select: CashSelectSchema.optional(),
  include: CashIncludeSchema.optional(),
  where: CashWhereUniqueInputSchema,
  create: z.union([ CashCreateInputSchema,CashUncheckedCreateInputSchema ]),
  update: z.union([ CashUpdateInputSchema,CashUncheckedUpdateInputSchema ]),
}).strict()

export const CashCreateManyArgsSchema: z.ZodType<Prisma.CashCreateManyArgs> = z.object({
  data: z.union([ CashCreateManyInputSchema,CashCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const CashDeleteArgsSchema: z.ZodType<Prisma.CashDeleteArgs> = z.object({
  select: CashSelectSchema.optional(),
  include: CashIncludeSchema.optional(),
  where: CashWhereUniqueInputSchema,
}).strict()

export const CashUpdateArgsSchema: z.ZodType<Prisma.CashUpdateArgs> = z.object({
  select: CashSelectSchema.optional(),
  include: CashIncludeSchema.optional(),
  data: z.union([ CashUpdateInputSchema,CashUncheckedUpdateInputSchema ]),
  where: CashWhereUniqueInputSchema,
}).strict()

export const CashUpdateManyArgsSchema: z.ZodType<Prisma.CashUpdateManyArgs> = z.object({
  data: z.union([ CashUpdateManyMutationInputSchema,CashUncheckedUpdateManyInputSchema ]),
  where: CashWhereInputSchema.optional(),
}).strict()

export const CashDeleteManyArgsSchema: z.ZodType<Prisma.CashDeleteManyArgs> = z.object({
  where: CashWhereInputSchema.optional(),
}).strict()

export const ImageCreateArgsSchema: z.ZodType<Prisma.ImageCreateArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  data: z.union([ ImageCreateInputSchema,ImageUncheckedCreateInputSchema ]),
}).strict()

export const ImageUpsertArgsSchema: z.ZodType<Prisma.ImageUpsertArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
  create: z.union([ ImageCreateInputSchema,ImageUncheckedCreateInputSchema ]),
  update: z.union([ ImageUpdateInputSchema,ImageUncheckedUpdateInputSchema ]),
}).strict()

export const ImageCreateManyArgsSchema: z.ZodType<Prisma.ImageCreateManyArgs> = z.object({
  data: z.union([ ImageCreateManyInputSchema,ImageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ImageDeleteArgsSchema: z.ZodType<Prisma.ImageDeleteArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  where: ImageWhereUniqueInputSchema,
}).strict()

export const ImageUpdateArgsSchema: z.ZodType<Prisma.ImageUpdateArgs> = z.object({
  select: ImageSelectSchema.optional(),
  include: ImageIncludeSchema.optional(),
  data: z.union([ ImageUpdateInputSchema,ImageUncheckedUpdateInputSchema ]),
  where: ImageWhereUniqueInputSchema,
}).strict()

export const ImageUpdateManyArgsSchema: z.ZodType<Prisma.ImageUpdateManyArgs> = z.object({
  data: z.union([ ImageUpdateManyMutationInputSchema,ImageUncheckedUpdateManyInputSchema ]),
  where: ImageWhereInputSchema.optional(),
}).strict()

export const ImageDeleteManyArgsSchema: z.ZodType<Prisma.ImageDeleteManyArgs> = z.object({
  where: ImageWhereInputSchema.optional(),
}).strict()