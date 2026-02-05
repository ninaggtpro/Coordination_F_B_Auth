/*
  Warnings:

  - You are about to drop the column `login` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Account_login_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "login",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
