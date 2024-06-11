import { PrismaClient } from '@prisma/client';

async function seedOrganizations() {
  const prisma = new PrismaClient();

  try {
    // Organizations to be seeded
    const organizationsData: {
      id: number;
      org_name: string;
      website: string;
      main_email: string;
      contact_email: string;
      contact_person: string;
      contact_msisdn: string;
      country_id: number;
      state_id: number;
      sub_state_id: number;
      address: string;
    }[] = [
      {
        id: 0,
        org_name: 'Tiny Totos',
        website: 'tinytotos.com',
        main_email: 'info@tinytotos.com',
        contact_email: 'bkimiri@tinytotos.com',
        contact_person: 'Bernard Kimiri',
        contact_msisdn: '254787654321',
        country_id: 1,
        state_id: 31,
        sub_state_id: 224,
        address: 'Westlands',
      },
    ];

    // Insert the Organizations into the database
    await prisma.organizations.createMany({
      data: organizationsData,
    });

    console.log('Organizations seeded successfully.');
  } catch (error) {
    console.log('Error seeding organizations:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedOrganizations();
