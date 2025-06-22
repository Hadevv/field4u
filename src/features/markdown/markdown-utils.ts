import fs from "fs";
import path from "path";

export const readMdxFile = (filePath: string): string => {
  const rootPath = path.join(process.cwd(), filePath);

  try {
    if (fs.existsSync(rootPath)) {
      return fs.readFileSync(rootPath, "utf8");
    }

    const publicPath = path.join(process.cwd(), "public", filePath);
    if (fs.existsSync(publicPath)) {
      return fs.readFileSync(publicPath, "utf8");
    }

    console.error(
      `Fichier non trouvé: ${filePath}, ni dans ${rootPath}, ni dans ${publicPath}`,
    );
    return "";
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, error);
    return "";
  }
};

export const readContentFile = (fileName: string): string => {
  let content = readMdxFile(`content/${fileName}`);

  if (!content) {
    content = readMdxFile(`public/content/${fileName}`);
  }

  return content;
};
