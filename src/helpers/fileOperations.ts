import fs from 'fs';
import path from 'path';

/**
 * Function to write data to a file
 * @param {Data to write to file} newData
 * @param {news or user} type
 * @returns {status: !status, message: `${type} added successfully`}
 */
export function writeToFile(newData: any, type: string): { status: boolean; message: string } {
  const writePath = path.join(__dirname, '../db', `${type}-db.json`);
  try {
    fs.writeFileSync(writePath, JSON.stringify(newData), { encoding: 'utf-8', flag: 'w' });
    return {
      status: true,
      message: `${type} added successfully`,
    };
  } catch (err) {
    return {
      status: false,
      message: 'Something went wrong',
    };
  }
}

