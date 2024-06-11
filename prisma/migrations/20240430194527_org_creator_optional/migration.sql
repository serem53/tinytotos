-- DropForeignKey
ALTER TABLE "mt_organizations" DROP CONSTRAINT "mt_organizations_created_by_fkey";

-- DropForeignKey
ALTER TABLE "mt_organizations" DROP CONSTRAINT "mt_organizations_updated_by_fkey";

-- AlterTable
ALTER TABLE "mt_organizations" ALTER COLUMN "created_by" DROP NOT NULL,
ALTER COLUMN "updated_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "mt_organizations" ADD CONSTRAINT "mt_organizations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "mt_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_organizations" ADD CONSTRAINT "mt_organizations_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "mt_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
