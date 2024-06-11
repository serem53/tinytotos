import { PrismaClient } from '@prisma/client';

async function seedPermissions() {
  const prisma = new PrismaClient();

  try {
    // Permissions to be seeded
    const permissionData: { id: number; permission_name: string }[] = [
      { id: 1, permission_name: 'can_create_user' },
      { id: 2, permission_name: 'can_view_users' },
      { id: 3, permission_name: 'can_update_users' },
      { id: 4, permission_name: 'can_create_organizations' },
      { id: 5, permission_name: 'can_view_organizations' },
      { id: 6, permission_name: 'can_update_organizations' },
      { id: 7, permission_name: 'can_create_daycare' },
      { id: 8, permission_name: 'can_view_daycare' },
      { id: 9, permission_name: 'can_update_daycare' },
      { id: 10, permission_name: 'can_map_role_to_permission' },
      { id: 11, permission_name: 'can_view_user_permissions' },
      { id: 12, permission_name: 'can_create_roles' },
      { id: 13, permission_name: 'can_read_roles' },
      { id: 14, permission_name: 'can_update_roles' },
      { id: 15, permission_name: 'can_create_permissions' },
      { id: 16, permission_name: 'can_read_permissions' },
      { id: 17, permission_name: 'can_update_permissions' },
      { id: 18, permission_name: 'can_assign_roles' },
      { id: 19, permission_name: 'can_assign_permission' },
      { id: 20, permission_name: 'can_unassign_permissions' },
      { id: 21, permission_name: 'can_unassign_roles' },
    ];

    // Insert the permissions into the database
    await prisma.permissions.createMany({
      data: permissionData,
    });

    console.log('Permissions seeded successfully.');
  } catch (error) {
    console.log('Error seeding roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPermissions();
