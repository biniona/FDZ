import fs from "fs";

export default async (filePath: string, content: string) => {
    fs.writeFile(filePath, content, () => {
        return true;
    });
};
