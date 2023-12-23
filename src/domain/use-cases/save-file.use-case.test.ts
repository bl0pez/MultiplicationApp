import fs from "fs";
import { Options, SaveFile } from "./save-file.use-case";

describe("SaveFileUseCase", () => {
  //Se ejecuta antes de cada test
  // beforeEach(() => {
  //   fs.rmSync("outputs", { recursive: true, force: true });
  // });

  const options: Options = {
    fileContent: "custom content",
    fileDestination: "outputs/custom-destination",
    fileName: "custom-table-name",
  };

  const filePath = `${options.fileDestination}/${options.fileName}.txt`;

  // Se ejecuta despues de cada test
  afterEach(() => {
    const isExistFolder = fs.existsSync("outputs");
    if (isExistFolder) fs.rmSync("outputs", { recursive: true, force: true });

    const isExistCustomFolder = fs.existsSync(
      options.fileDestination as string
    );
    if (isExistCustomFolder)
      fs.rmSync(options.fileDestination as string, {
        recursive: true,
        force: true,
      });
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };
    const result = saveFile.execute(options);
    expect(result).toBe(true);
    // Puede dar un false positive si el archivo existe
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Esperamos que el archivo exista
    expect(checkFile).toBe(true);
    // Esperamos que el contenido del archivo sea el mismo que el que guardamos
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save file with custom values", () => {
    // Se crea una instancia de la clase SaveFile
    const saveFile = new SaveFile();
    const result = saveFile.execute(options);
    expect(result).toBe(true);

    const isExistFile = fs.existsSync(filePath);
    expect(isExistFile).toBe(true);

    const fileContent = fs.readFileSync(filePath, "utf-8");
    expect(fileContent).toBe(options.fileContent);
  });
});
