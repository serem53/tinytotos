// Import necessary modules
import { exec } from 'child_process';

// Function to execute a seed file
function runSeed(seedFile: string) {
  return new Promise<void>((resolve, reject) => {
    exec(`ts-node ${seedFile}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${seedFile}:`, error);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

// Function to run all seed files sequentially
async function seedAll() {
  try {
    // Run permissions seed file first
    await runSeed('./permissions.seed.ts');

    // Then run roles seed file
    await runSeed('./roles.seed.ts');

    // Finally, run userRoles seed file
    await runSeed('./userRoles.seed.ts');

    // seed the currencies
    await runSeed('./currencies.seed.ts');

    // seed the countries
    await runSeed('./countries.seed.ts');

    // seed the states
    await runSeed('./states.seed.ts');

    // seed the substates
    await runSeed('./subStates.seed.ts');

    // seed the organizations
    await runSeed('./organizations.seed.ts');

    // seed the users
    await runSeed('./users.seed.ts');

    console.log('All seed scripts executed successfully.');
  } catch (error) {
    console.error('Error executing seed scripts:', error);
  }
}

// Execute the function to run all seed files
seedAll();
