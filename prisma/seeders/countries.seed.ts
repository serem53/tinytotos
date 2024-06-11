import { PrismaClient } from '@prisma/client';

async function seedCountries() {
  const prisma = new PrismaClient();

  try {
    // Countries to be seeded
    const countriesData: {
      id: number;
      currency_id: number;
      country_2_iso_code: string;
      country_3_iso_code: string;
      msisdn_country_code: string;
      nationality: string;
      country: string;
    }[] = [
      {
        id: 1,
        currency_id: 1,
        country_2_iso_code: 'KE',
        country_3_iso_code: 'KEN',
        msisdn_country_code: '254',
        nationality: 'Kenyan',
        country: 'Kenya',
      },
      {
        id: 2,
        currency_id: 2,
        country_2_iso_code: 'ET',
        country_3_iso_code: 'ETH',
        msisdn_country_code: '251',
        nationality: 'Ethiopian',
        country: 'Ethiopia',
      },
      {
        id: 3,
        currency_id: 3,
        country_2_iso_code: 'UG',
        country_3_iso_code: 'UGA',
        msisdn_country_code: '256',
        nationality: 'Ugandan',
        country: 'Uganda',
      },
      {
        id: 4,
        currency_id: 4,
        country_2_iso_code: 'TZ',
        country_3_iso_code: 'TZA',
        msisdn_country_code: '255',
        nationality: 'Tanzanian',
        country: 'Tanzania',
      },
      {
        id: 5,
        currency_id: 5,
        country_2_iso_code: 'CO',
        country_3_iso_code: 'COL',
        msisdn_country_code: '57',
        nationality: 'Colombian',
        country: 'Colombia',
      },
    ];

    // Insert the countries into the database
    await prisma.countries.createMany({
      data: countriesData,
    });

    console.log('Countries seeded successfully.');
  } catch (error) {
    console.log('Error seeding countries:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCountries();
