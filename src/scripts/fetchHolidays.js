import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATES = ['BW', 'BY', 'BE', 'BB', 'HB', 'HH', 'HE', 'MV', 'NI', 'NW', 'RP', 'SL', 'SN', 'ST', 'SH', 'TH'];
const YEARS = [2024, 2025, 2026];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 5, baseDelay = 15000) {
  let retries = 0;
  
  while (true) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      retries++;
      
      if (retries > maxRetries) {
        throw new Error(`Failed after ${maxRetries} retries: ${error.message}`);
      }

      const exponentialDelay = baseDelay * Math.pow(2, retries - 1);
      const jitter = Math.random() * 5000;
      const delay = exponentialDelay + jitter;
      
      console.log(`Request failed. Retrying in ${Math.round(delay/1000)} seconds... (Attempt ${retries}/${maxRetries})`);
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
  }

  return schoolHolidays;
}

async function main() {
  try {
    console.log('Fetching holiday data...');
    const schoolHolidays = await fetchSchoolHolidays();

    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write the data to a JSON file
    fs.writeFileSync(
      path.join(dataDir, 'holidays.json'),
      JSON.stringify({ schoolHolidays }, null, 2)
    );

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

    fs.writeFileSync(
      path.join(dataDir, 'holidays.ts'),
      tsContent
    );

    console.log('Holiday data generated successfully!');
  } catch (error) {
    console.error('Error generating holiday data:', error);
  }
}

main(); 