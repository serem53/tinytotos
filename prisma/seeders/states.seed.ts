import { PrismaClient } from '@prisma/client';

async function seedStates() {
  const prisma = new PrismaClient();

  try {
    // States to be seeded
    const statesData: {
      id: number;
      country_id: number;
      state_name: string;
    }[] = [
      { id: 1, country_id: 1, state_name: 'Narok' },
      { id: 2, country_id: 1, state_name: 'Turkana' },
      { id: 3, country_id: 1, state_name: 'Nyeri' },
      { id: 4, country_id: 1, state_name: 'Kericho' },
      { id: 5, country_id: 1, state_name: 'Migori' },
      { id: 6, country_id: 1, state_name: 'Mombasa' },
      { id: 7, country_id: 1, state_name: 'Kitui' },
      { id: 8, country_id: 1, state_name: 'Nandi' },
      { id: 9, country_id: 1, state_name: 'Kilifi' },
      { id: 10, country_id: 1, state_name: 'Machakos' },
      { id: 11, country_id: 1, state_name: 'Mandera' },
      { id: 12, country_id: 1, state_name: 'Lamu' },
      { id: 13, country_id: 1, state_name: 'Uasin Gishu' },
      { id: 14, country_id: 1, state_name: 'Baringo' },
      { id: 15, country_id: 1, state_name: 'Bungoma' },
      { id: 16, country_id: 1, state_name: 'Tana River' },
      { id: 17, country_id: 1, state_name: 'Kiambu' },
      { id: 18, country_id: 1, state_name: 'Busia' },
      { id: 19, country_id: 1, state_name: 'Makueni' },
      { id: 20, country_id: 1, state_name: 'Siaya' },
      { id: 21, country_id: 1, state_name: 'Kwale' },
      { id: 22, country_id: 1, state_name: 'Vihiga' },
      { id: 23, country_id: 1, state_name: "Murang'a" },
      { id: 24, country_id: 1, state_name: 'Laikipia' },
      { id: 25, country_id: 1, state_name: 'Samburu' },
      { id: 26, country_id: 1, state_name: 'Nyamira' },
      { id: 27, country_id: 1, state_name: 'West Pokot' },
      { id: 28, country_id: 1, state_name: 'Marsabit' },
      { id: 29, country_id: 1, state_name: 'Nyandarua' },
      { id: 30, country_id: 1, state_name: 'Taita Taveta' },
      { id: 31, country_id: 1, state_name: 'Nairobi' },
      { id: 32, country_id: 1, state_name: 'Elgeyo Marakwet' },
      { id: 33, country_id: 1, state_name: 'Kakamega' },
      { id: 34, country_id: 1, state_name: 'Embu' },
      { id: 35, country_id: 1, state_name: 'Bomet' },
      { id: 36, country_id: 1, state_name: 'Nakuru' },
      { id: 37, country_id: 1, state_name: 'Trans Nzoia' },
      { id: 38, country_id: 1, state_name: 'Kisii' },
      { id: 39, country_id: 1, state_name: 'Tharaka Nithi' },
      { id: 40, country_id: 1, state_name: 'Kirinyaga' },
      { id: 41, country_id: 1, state_name: 'Isiolo' },
      { id: 42, country_id: 1, state_name: 'Kajiado' },
      { id: 43, country_id: 1, state_name: 'Homa Bay' },
      { id: 44, country_id: 1, state_name: 'Meru' },
      { id: 45, country_id: 1, state_name: 'Kisumu' },
      { id: 46, country_id: 1, state_name: 'Garissa' },
      { id: 47, country_id: 1, state_name: 'Wajir' },
    ];

    // Insert the states into the database
    await prisma.states.createMany({
      data: statesData,
    });

    console.log('states seeded successfully.');
  } catch (error) {
    console.log('Error seeding states:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedStates();
