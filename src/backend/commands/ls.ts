const fs = require('fs');
const path = require('path');

function listFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error reading file stats:', err);
          return;
        }

        const fileInfo = {
          name: file,
          isDirectory: stats.isDirectory(),
          size: stats.size,
          modifiedAt: stats.mtime,
        };

        console.log(fileInfo);
      });
    });
  });
}

export default async (args): Promise<any> => {
  console.log('ls', { args });
  const directoryPath = './'; // Change this to the desired directory path
  listFiles(directoryPath);
};
