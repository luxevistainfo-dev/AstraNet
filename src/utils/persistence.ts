# Overwrite the file with the correct TypeScript code
cat > src/utils/persistence.ts <<'EOF'
import * as fs from "fs";
import * as path from "path";

export function saveJSON(filePath: string, data: any): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function loadJSON<T = any>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

// Convenience wrappers for blockchain persistence
const CHAIN_PATH = "data/chain.json";

export function saveChain(chainData: any): void {
  saveJSON(CHAIN_PATH, chainData);
}

export function loadChain(): { chain?: any[]; pending?: any[] } | null {
  return loadJSON(CHAIN_PATH);
}
EOF
