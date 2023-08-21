import { TextLoader } from "./text.js";
export class CSVLoader extends TextLoader {
    constructor(filePathOrBlob, options) {
        super(filePathOrBlob);
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        if (typeof options === "string") {
            this.options = { column: options };
        }
        else {
            this.options = options ?? this.options;
        }
    }
    async parse(raw) {
        const { column, separator = "," } = this.options;
        const { dsvFormat } = await CSVLoaderImports();
        const psv = dsvFormat(separator);
        const parsed = psv.parse(raw.trim());
        if (column !== undefined) {
            if (!parsed.columns.includes(column)) {
                throw new Error(`Column ${column} not found in CSV file.`);
            }
            // Note TextLoader will raise an exception if the value is null.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return parsed.map((row) => row[column]);
        }
        return parsed.map((row) => Object.keys(row)
            .map((key) => `${key.trim()}: ${row[key]?.trim()}`)
            .join("\n"));
    }
}
async function CSVLoaderImports() {
    try {
        const { dsvFormat } = await import("d3-dsv");
        return { dsvFormat };
    }
    catch (e) {
        console.error(e);
        throw new Error("Please install d3-dsv as a dependency with, e.g. `yarn add d3-dsv@2`");
    }
}
