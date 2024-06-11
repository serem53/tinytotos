-- CreateTable
CREATE TABLE "tt_users" (
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

    CONSTRAINT "tt_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tt_user_roles" (
    "id" SERIAL NOT NULL,
    "department_name" TEXT NOT NULL,

    CONSTRAINT "tt_user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tt_organizations" (
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
    "created_by" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,

    CONSTRAINT "tt_organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tt_users_msisdn_key" ON "tt_users"("msisdn");

-- CreateIndex
CREATE UNIQUE INDEX "tt_users_email_key" ON "tt_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tt_users_created_by_key" ON "tt_users"("created_by");

-- CreateIndex
CREATE UNIQUE INDEX "tt_users_updated_by_key" ON "tt_users"("updated_by");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_org_name_key" ON "tt_organizations"("org_name");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_website_key" ON "tt_organizations"("website");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_org_type_key" ON "tt_organizations"("org_type");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_main_email_key" ON "tt_organizations"("main_email");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_contact_email_key" ON "tt_organizations"("contact_email");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_contact_person_key" ON "tt_organizations"("contact_person");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_contact_msisdn_key" ON "tt_organizations"("contact_msisdn");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_country_key" ON "tt_organizations"("country");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_sub_state_key" ON "tt_organizations"("sub_state");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_address_key" ON "tt_organizations"("address");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_created_by_key" ON "tt_organizations"("created_by");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_created_at_key" ON "tt_organizations"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_updated_by_key" ON "tt_organizations"("updated_by");

-- CreateIndex
CREATE UNIQUE INDEX "tt_organizations_updated_at_key" ON "tt_organizations"("updated_at");

-- AddForeignKey
ALTER TABLE "tt_users" ADD CONSTRAINT "tt_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "tt_user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tt_users" ADD CONSTRAINT "tt_users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "tt_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tt_users" ADD CONSTRAINT "tt_users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "tt_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
