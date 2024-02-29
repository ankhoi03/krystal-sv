/*
  Warnings:

  - You are about to drop the column `used` on the `otps` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `otps` table. All the data in the column will be lost.
  - Added the required column `email` to the `otps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "otps" DROP CONSTRAINT "otps_userId_fkey";

-- AlterTable
ALTER TABLE "otps" DROP COLUMN "used",
DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "otps" ADD CONSTRAINT "otps_email_fkey" FOREIGN KEY ("email") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
