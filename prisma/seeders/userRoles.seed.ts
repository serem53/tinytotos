import { PrismaClient } from '@prisma/client';

// Data to seed UserRoles table with foreign keys
const userRolesData: { roleId: number; permissionId: number }[] = [
  { roleId: 1, permissionId: 1 }, // Admin
  { roleId: 1, permissionId: 2 },
  { roleId: 1, permissionId: 3 },
  { roleId: 1, permissionId: 4 },
  { roleId: 1, permissionId: 5 },
  { roleId: 1, permissionId: 6 },
  { roleId: 1, permissionId: 7 },
  { roleId: 1, permissionId: 8 },
  { roleId: 1, permissionId: 9 },
  { roleId: 1, permissionId: 10 },
  { roleId: 1, permissionId: 11 },
  { roleId: 1, permissionId: 12 },
  { roleId: 1, permissionId: 13 },
  { roleId: 1, permissionId: 14 },
  { roleId: 1, permissionId: 15 },
  { roleId: 1, permissionId: 16 },
  { roleId: 1, permissionId: 17 },
  { roleId: 1, permissionId: 18 },
  { roleId: 1, permissionId: 20 },
  { roleId: 1, permissionId: 21 },
  { roleId: 2, permissionId: 2 }, // Normal
  { roleId: 2, permissionId: 5 },
  { roleId: 2, permissionId: 8 },
  { roleId: 2, permissionId: 16 },
  { roleId: 2, permissionId: 13 },
];

// Function to seed UserRoles table
async function seedUserRoles() {
  const prisma = new PrismaClient();

  for (const data of userRolesData) {
    console.log('entering', data);
    await prisma.userRoles.create({
      data: {
        role_id: data.roleId,
        permission_id: data.permissionId,
      },
    });
  }
}

// Call the seeding function
seedUserRoles()
  .then(() => {
    console.log('UserRoles seeded successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.log('Error seeding UserRoles:', error);
    process.exit(1);
  });
