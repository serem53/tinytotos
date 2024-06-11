import { PrismaClient } from '@prisma/client';

async function seedRoles() {
  const prisma = new PrismaClient();

  try {
    // Roles to be seeded
    const rolesData: { id: number; role_name: string }[] = [
      { id: 1, role_name: 'Admin' },
      { id: 2, role_name: 'Normal User' },
      { id: 3, role_name: 'Daycare Manager' },
      { id: 4, role_name: 'Daycare Helper' },
      { id: 5, role_name: 'Parent' },
      { id: 6, role_name: 'Viewer' },
    ];

    // Insert the roles into the database
    await prisma.roles.createMany({
      data: rolesData,
    });

    console.log('Roles seeded successfully.');
  } catch (error) {
    console.log('Error seeding roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRoles();
