/*
  Warnings:

  - Added the required column `age` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departments` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "departments" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "salary" TEXT NOT NULL;
