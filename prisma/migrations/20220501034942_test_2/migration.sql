/*
  Warnings:

  - You are about to drop the column `parentId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_parentId_fkey";

-- DropIndex
DROP INDEX "Item_parentId_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "parentId",
ADD COLUMN     "itemId" INTEGER;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
