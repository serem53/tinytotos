-- AlterTable
ALTER TABLE "mt_organizations" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" DROP NOT NULL;
