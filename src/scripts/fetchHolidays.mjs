import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STATES = ['BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'];
const YEARS = [2024, 2025, 2026];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 5, baseDelay = 15000) {
  let retries = 0;
  let lastError = null;
  
  while (true) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      lastError = error;
      retries++;
      
      if (retries > maxRetries) {
        console.error('Max retries reached. Last error:', error);
        throw new Error(`Failed after ${maxRetries} retries: ${error.message}`);
      }

      const exponentialDelay = baseDelay * Math.pow(2, retries - 1);
      const jitter = Math.random() * 5000;
      const delay = exponentialDelay + jitter;
      
      console.log(`Request failed. Retrying in ${Math.round(delay/1000)} seconds... (Attempt ${retries}/${maxRetries})`);
      console.log('Error details:', error.message);
      await sleep(delay);
    }
  }
}

async function fetchSchoolHolidays() {
  const schoolHolidays = {};

  try {
    console.log('Fetching all holiday data...');
    const allHolidays = await fetchWithRetry('https://ferien-api.de/api/v1/holidays/');
    
    // Initialize the data structure
    for (const year of YEARS) {
      schoolHolidays[year] = {};
      for (const state of STATES) {
        schoolHolidays[year][state] = [];
      }
    }

    // Process all holidays
    for (const holiday of allHolidays) {
      const year = new Date(holiday.start).getFullYear();
      if (YEARS.includes(year) && STATES.includes(holiday.stateCode)) {
        schoolHolidays[year][holiday.stateCode].push({
          name: holiday.name,
          start: holiday.start,
          end: holiday.end
        });
      }
    }
  } catch (error) {
    console.error('Error fetching holidays:', error);
    throw error;
  }

  return schoolHolidays;
}

async function main() {
  try {
    console.log('Starting holiday data fetch...');
    const schoolHolidays = await fetchSchoolHolidays();

    if (!schoolHolidays || Object.keys(schoolHolidays).length === 0) {
      throw new Error('No holiday data was fetched');
    }

    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write the data to a JSON file
    const jsonPath = path.join(dataDir, 'holidays.json');
    fs.writeFileSync(
      jsonPath,
      JSON.stringify({ schoolHolidays }, null, 2)
    );
    console.log(`JSON data written to ${jsonPath}`);

    // Generate TypeScript file
    const tsContent = `// This file is auto-generated. Do not edit manually.
import { GermanState } from '../types/germanState';

export interface SchoolHoliday {
  name: string;
  start: string;
  end: string;
}

export interface HolidayData {
  schoolHolidays: Record<number, Record<GermanState, SchoolHoliday[]>>;
}

export const holidays: HolidayData = ${JSON.stringify({ schoolHolidays }, null, 2)} as const;
`;

    const tsPath = path.join(dataDir, 'holidays.ts');
    fs.writeFileSync(tsPath, tsContent);
    console.log(`TypeScript data written to ${tsPath}`);

    console.log('Holiday data generated successfully!');
  } catch (error) {
    console.error('Fatal error in main():', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
  process.exit(1);
});

main().catch((error) => {
  console.error('Error in main:', error);
  process.exit(1);
}); 