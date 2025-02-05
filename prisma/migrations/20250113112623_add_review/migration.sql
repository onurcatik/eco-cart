/*
  Warnings:

  - You are about to drop the column `userId` on the `OrderItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_userId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "isFeatured" SET DEFAULT false;
