import { PrismaClient } from '@prisma/client';

async function seedCurrencies() {
  const prisma = new PrismaClient();

  try {
    // Currencies to be seeded
    const CurrenciesData: {
      id: number;
      currency_symbol: string;
      currency_abbreviation: string;
      currency: string;
    }[] = [
      {
        id: 1,
        currency_symbol: '',
        currency_abbreviation: 'KSH',
        currency: 'Kenyan Shilling',
      },
      {
        id: 2,
        currency_symbol: '',
        currency_abbreviation: 'ETB',
        currency: 'Ethiopian Birr',
      },
      {
        id: 3,
        currency_symbol: '',
        currency_abbreviation: 'UGX',
        currency: 'Ugandan Shilling',
      },
      {
        id: 4,
        currency_symbol: '',
        currency_abbreviation: 'TZS',
        currency: 'Tanzanian Shilling',
      },
      {
        id: 5,
        currency_symbol: '$',
        currency_abbreviation: 'COP',
        currency: 'Colombian Peso',
      },
    ];

    // Insert the countries into the database
    await prisma.currencies.createMany({
      data: CurrenciesData,
    });

    console.log('Currencies seeded successfully.');
  } catch (error) {
    console.log('Error seeding currencies:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCurrencies();
