// 파일 시스템을 사용하여 JSON 파일을 읽고 쓰는 ts
import {promises as fs} from 'fs';

export const readFile = async (filePath: string): Promise<any> => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

export const WriteFile = async (filePath: string, data: any): Promise<void> => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));    
};