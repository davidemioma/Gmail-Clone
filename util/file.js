const readFileContents = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export const readAllFiles = async (files) => {
  const results = await Promise.all(
    files.map(async (file) => {
      const fileContents = await readFileContents(file);

      return {
        name: file.name,
        size: file.size,
        dataUrl: fileContents,
      };
    })
  );

  return results;
};
