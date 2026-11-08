import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";

console.log("\x1b[35m%s\x1b[0m", "=================================================");
console.log("\x1b[35m%s\x1b[0m", "   🚀 KHỞI ĐỘNG HAPPI FULLSTACK (BACKEND + FRONTEND)");
console.log("\x1b[35m%s\x1b[0m", "=================================================");

// 1. Khởi động Backend
const backend = spawn(npmCmd, ["run", "dev"], {
  cwd: path.join(__dirname, "backend"),
  shell: true,
  env: { ...process.env, FORCE_COLOR: "1" },
});

backend.stdout.on("data", (data) => {
  process.stdout.write(`\x1b[36m[BACKEND:5001]\x1b[0m ${data}`);
});

backend.stderr.on("data", (data) => {
  process.stderr.write(`\x1b[31m[BACKEND ERR]\x1b[0m ${data}`);
});

// 2. Khởi động Frontend
const frontend = spawn(npmCmd, ["run", "dev"], {
  cwd: path.join(__dirname, "frontend"),
  shell: true,
  env: { ...process.env, FORCE_COLOR: "1" },
});

frontend.stdout.on("data", (data) => {
  process.stdout.write(`\x1b[32m[FRONTEND:5173]\x1b[0m ${data}`);
});

frontend.stderr.on("data", (data) => {
  process.stderr.write(`\x1b[33m[FRONTEND ERR]\x1b[0m ${data}`);
});

function cleanup() {
  console.log("\n\x1b[35m%s\x1b[0m", "Đang dừng toàn bộ dịch vụ...");
  backend.kill();
  frontend.kill();
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
