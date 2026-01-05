-- AlterTable
ALTER TABLE "Agreement" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Assets" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "HappinessMessage" ALTER COLUMN "userId" DROP NOT NULL;
