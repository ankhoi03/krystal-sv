-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("id");
