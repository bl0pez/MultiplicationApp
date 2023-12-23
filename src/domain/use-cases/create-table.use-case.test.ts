import { CreateTable } from "./create-table.use-case";

describe("CreateTableUseCase", () => {
  test("should create table with default values", () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 2 });
    const rows = table.split("\n").length;

    // Verifica si se creo la instancia de la clase
    expect(createTable).toBeInstanceOf(CreateTable);
    // Verifica si la tabla contiene los valores esperados
    expect(table).toContain("2 x 1 = 2");
    expect(table).toContain("2 x 10 = 20");
    // Verifica si la tabla contiene el numero de filas esperadas
    expect(rows).toBe(10);
  });

  test("should create table with custom values", () => {
    const options = { base: 3, limit: 20 };

    const table = new CreateTable().execute(options);
    const rows = table.split("\n").length;

    expect(table).toContain("3 x 1 = 3");
    expect(table).toContain("3 x 20 = 60");
    expect(rows).toBe(options.limit);
  });
});
