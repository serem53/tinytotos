/*
  Warnings:

  - You are about to drop the `tt_organizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tt_user_roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tt_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tt_users" DROP CONSTRAINT "tt_users_created_by_fkey";

-- DropForeignKey
ALTER TABLE "tt_users" DROP CONSTRAINT "tt_users_role_id_fkey";

-- DropForeignKey
ALTER TABLE "tt_users" DROP CONSTRAINT "tt_users_updated_by_fkey";

-- DropTable
DROP TABLE "tt_organizations";

-- DropTable
DROP TABLE "tt_user_roles";

-- DropTable
DROP TABLE "tt_users";

-- CreateTable
CREATE TABLE "mt_users" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "employee_names" TEXT NOT NULL,
    "msisdn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "status" BOOLEAN NOT NULL,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mt_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mt_organizations" (
    "id" SERIAL NOT NULL,
    "org_name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "org_type" INTEGER NOT NULL,
    "main_email" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "contact_msisdn" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "sub_state" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_by" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mt_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mt_roles" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "mt_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mt_permissions" (
    "id" SERIAL NOT NULL,
    "permission_name" TEXT NOT NULL,

    CONSTRAINT "mt_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mt_user_roles" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "mt_user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mt_user_permissions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "mt_user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mt_users_msisdn_key" ON "mt_users"("msisdn");

-- CreateIndex
CREATE UNIQUE INDEX "mt_users_email_key" ON "mt_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mt_users_created_by_key" ON "mt_users"("created_by");

-- CreateIndex
CREATE UNIQUE INDEX "mt_users_updated_by_key" ON "mt_users"("updated_by");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_org_name_key" ON "mt_organizations"("org_name");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_website_key" ON "mt_organizations"("website");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_org_type_key" ON "mt_organizations"("org_type");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_main_email_key" ON "mt_organizations"("main_email");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_contact_email_key" ON "mt_organizations"("contact_email");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_contact_person_key" ON "mt_organizations"("contact_person");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_contact_msisdn_key" ON "mt_organizations"("contact_msisdn");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_country_key" ON "mt_organizations"("country");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_sub_state_key" ON "mt_organizations"("sub_state");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_address_key" ON "mt_organizations"("address");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_created_by_key" ON "mt_organizations"("created_by");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_created_at_key" ON "mt_organizations"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_updated_by_key" ON "mt_organizations"("updated_by");

-- CreateIndex
CREATE UNIQUE INDEX "mt_organizations_updated_at_key" ON "mt_organizations"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "mt_roles_role_name_key" ON "mt_roles"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "mt_permissions_permission_name_key" ON "mt_permissions"("permission_name");

-- AddForeignKey
ALTER TABLE "mt_users" ADD CONSTRAINT "mt_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "mt_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_users" ADD CONSTRAINT "mt_users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "mt_organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_users" ADD CONSTRAINT "mt_users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "mt_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_users" ADD CONSTRAINT "mt_users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "mt_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_organizations" ADD CONSTRAINT "mt_organizations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "mt_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_organizations" ADD CONSTRAINT "mt_organizations_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "mt_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_user_roles" ADD CONSTRAINT "mt_user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "mt_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_user_roles" ADD CONSTRAINT "mt_user_roles_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "mt_permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_user_permissions" ADD CONSTRAINT "mt_user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "mt_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mt_user_permissions" ADD CONSTRAINT "mt_user_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "mt_permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
