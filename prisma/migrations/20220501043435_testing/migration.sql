/*
  Warnings:

  - You are about to drop the column `itemId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_itemId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "itemId",
ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
