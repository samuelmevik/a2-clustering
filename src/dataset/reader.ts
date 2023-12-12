import { BunFile } from "bun";

type HeatMapReaderOptions = {
  delimiter?: string;
  skipRows?: number;
  skipColumns?: number;
};

export default async function heatMapReader(
  file: BunFile,
  options: HeatMapReaderOptions = {},
) {
  const { delimiter = '\t', skipRows = 0, skipColumns = 0 } = options;

  const text = await file.text();
  const lines = text.split(/\r\n|\n/);

  const data = lines
    .slice(skipRows)
    .map((line) => line.split(delimiter).slice(skipColumns));

  return data
}