/*
  Warnings:

  - You are about to drop the column `createdId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `createrId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "createdId",
ADD COLUMN     "createrId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "profileImage" DROP NOT NULL;
