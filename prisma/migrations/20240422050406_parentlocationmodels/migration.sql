/*
  Warnings:

  - You are about to drop the column `country` on the `mt_organizations` table. All the data in the column will be lost.
  - You are about to drop the column `sub_state` on the `mt_organizations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[country_id]` on the table `mt_organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[state_id]` on the table `mt_organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sub_state_id]` on the table `mt_organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country_id` to the `mt_organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `mt_organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_state_id` to the `mt_organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "mt_organizations_contact_email_key";

-- DropIndex
DROP INDEX "mt_organizations_contact_msisdn_key";

-- DropIndex
DROP INDEX "mt_organizations_contact_person_key";

-- DropIndex
DROP INDEX "mt_organizations_country_key";

-- DropIndex
DROP INDEX "mt_organizations_created_at_key";

-- DropIndex
DROP INDEX "mt_organizations_created_by_key";

-- DropIndex
DROP INDEX "mt_organizations_main_email_key";

-- DropIndex
DROP INDEX "mt_organizations_org_name_key";

-- DropIndex
DROP INDEX "mt_organizations_org_type_key";

-- DropIndex
DROP INDEX "mt_organizations_sub_state_key";

-- DropIndex
DROP INDEX "mt_organizations_updated_at_key";

-- DropIndex
DROP INDEX "mt_organizations_updated_by_key";

-- DropIndex
DROP INDEX "mt_organizations_website_key";

-- AlterTable
ALTER TABLE "mt_organizations" DROP COLUMN "country",
DROP COLUMN "sub_state",
ADD COLUMN     "country_id" INTEGER NOT NULL,
ADD COLUMN     "state_id" INTEGER NOT NULL,
ADD COLUMN     "sub_state_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "mt_countries" (
    "id" SERIAL NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "country_2_iso_Code" TEXT NOT NULL,
    "country_3_iso_code" TEXT NOT NULL,
    "msisdn_country_code" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "mt_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mt_states" (
    "id" SERIAL NOT NULL,
    "country_id" INTEGER NOT NULL,
    "state_name" TEXT NOT NULL,

    CONSTRAINT "mt_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mt_substates" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL,
    "sub_state_name" TEXT NOT NULL,

    CONSTRAINT "mt_substates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mt_currencies" (
    "id" SERIAL NOT NULL,
    "currency_symbol" TEXT NOT NULL,
    "currency_abbreviation" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "mt_currencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_country_id_key" ON "mt_organizations"("country_id");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_state_id_key" ON "mt_organizations"("state_id");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_sub_state_id_key" ON "mt_organizations"("sub_state_id");

-- AddForeignKey
ALTER TABLE "mt_organizations" ADD CONSTRAINT "mt_organizations_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "mt_countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_organizations" ADD CONSTRAINT "mt_organizations_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "mt_states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_organizations" ADD CONSTRAINT "mt_organizations_sub_state_id_fkey" FOREIGN KEY ("sub_state_id") REFERENCES "mt_substates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_countries" ADD CONSTRAINT "mt_countries_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "mt_currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_states" ADD CONSTRAINT "mt_states_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "mt_countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_substates" ADD CONSTRAINT "mt_substates_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "mt_states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
