import { PrismaClient } from '@prisma/client';

async function seedUsers() {
  const prisma = new PrismaClient();

  try {
    // user to be seeded
    const usersData: {
      id: number;
      role_id: number;
      user_names: string;
      msisdn: string;
      email: string;
      password: string;
      refresh_token: string;
      status: boolean;
      organization_id: number;
      created_by: number;
      updated_by: number;
    }[] = [
      {
        id: 0,
        role_id: 1,
        user_names: 'Sys Admin',
        msisdn: '254700000000',
        email: 'info@mtoto.com',
        password: '',
        refresh_token: '',
        status: true,
        organization_id: 0,
        created_by: 0,
        updated_by: 0,
      },
    ];

    // Insert the user into the database
    await prisma.users.createMany({
      data: usersData,
    });

    console.log('System User seeded successfully.');
  } catch (error) {
    console.log('Error seeding System User:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedUsers();
