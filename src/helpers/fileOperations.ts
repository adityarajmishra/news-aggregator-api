import fs from 'fs';
import path from 'path';

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

