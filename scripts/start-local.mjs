import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile, writeFile, readdir } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const projectDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const windows = process.platform === "win32";
const environment = { ...process.env, NEXT_TELEMETRY_DISABLED: "1" };
const nextCli = path.join(
  projectDir,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);
const installStamp = path.join(
  projectDir,
  "node_modules",
  ".cqc-preview-dependencies",
);

function run(
  command,
  args,
  phase = "Dependency installation",
  env = environment,
) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectDir,
      env,
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) resolve();
      else
        reject(
          new Error(
            `${phase} stopped (exit ${code ?? "interrupted"}). Read the message above and try start.bat again.`,
          ),
        );
    });
  });
}

async function installDependencies() {
  const lock = await readFile(path.join(projectDir, "package-lock.json"));
  const manifest = await readFile(path.join(projectDir, "package.json"));
  const fingerprint = createHash("sha256")
    .update(lock)
    .update(manifest)
    .update(
      `${process.platform}:${process.arch}:${process.versions.node.split(".")[0]}`,
    )
    .digest("hex");
  const previous = await readFile(installStamp, "utf8").catch(() => "");
  if (existsSync(nextCli) && previous === fingerprint) return;

  console.log(
    "Installing the website dependencies. The first run needs internet access.",
  );
  console.log("This can take a few minutes. No website files are uploaded.\n");
  if (windows) {
    // npm.cmd requires cmd.exe on Windows. This command contains no user input.
    await run("cmd.exe", [
      "/d",
      "/s",
      "/c",
      "npm ci --include=dev --no-audit --no-fund",
    ]);
  } else {
    await run("npm", ["ci", "--include=dev", "--no-audit", "--no-fund"]);
  }
  await writeFile(installStamp, fingerprint, "utf8");
}

async function buildPreview() {
  const hash = createHash("sha256").update(
    `${process.platform}:${process.arch}:${process.version}`,
  );
  async function include(relative) {
    const full = path.join(projectDir, relative);
    hash.update(relative).update(await readFile(full));
  }
  async function directory(relative) {
    const entries = await readdir(path.join(projectDir, relative), {
      withFileTypes: true,
    });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      const next = path.join(relative, entry.name);
      if (entry.isDirectory()) await directory(next);
      else if (entry.isFile()) await include(next);
    }
  }
  for (const folder of ["app", "components", "lib", "public"])
    await directory(folder);
  for (const file of [
    "package.json",
    "package-lock.json",
    "next.config.ts",
    "proxy.ts",
    "postcss.config.mjs",
    "tsconfig.json",
    ".env",
    ".env.local",
    ".env.production",
    ".env.production.local",
  ]) {
    if (existsSync(path.join(projectDir, file))) await include(file);
  }
  // Configuration can also be passed through the process environment. Only the hash is saved.
  hash
    .update(process.env.NEXT_PUBLIC_SITE_URL || "")
    .update(process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL || "");
  const fingerprint = hash.digest("hex");
  const stamp = path.join(projectDir, ".next", ".cqc-preview-build");
  const previous = await readFile(stamp, "utf8").catch(() => "");
  if (
    previous === fingerprint &&
    existsSync(path.join(projectDir, ".next", "BUILD_ID"))
  )
    return;
  console.log(
    "Preparing your local preview. This runs once, and again after website files change.\n",
  );
  await run(
    process.execPath,
    [nextCli, "build", "--webpack"],
    "Preview preparation",
    { ...environment, NODE_ENV: "production" },
  );
  await writeFile(stamp, fingerprint, "utf8");
}

function portAvailable(port) {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once("error", (error) => {
      if (error.code === "EADDRINUSE" || error.code === "EACCES")
        resolve(false);
      else reject(error);
    });
    probe.listen({ host: "127.0.0.1", port }, () =>
      probe.close(() => resolve(true)),
    );
  });
}

async function choosePort() {
  for (let port = 3000; port <= 3020; port++) {
    if (await portAvailable(port)) return port;
  }
  throw new Error(
    "Ports 3000 to 3020 are busy. Close another local preview and try again.",
  );
}

function openBrowser(url) {
  const command = windows
    ? "cmd.exe"
    : process.platform === "darwin"
      ? "open"
      : "xdg-open";
  const args = windows ? ["/d", "/c", "start", "", url] : [url];
  const opener = spawn(command, args, { stdio: "ignore", windowsHide: true });
  const manual = () => console.log(`Open this address in your browser: ${url}`);
  opener.once("error", manual);
  opener.once("exit", (code) => {
    if (code !== 0) manual();
  });
}

async function main() {
  if (Number(process.versions.node.split(".")[0]) < 22) {
    throw new Error(
      "Please install Node.js 22 or newer (the current LTS version) from https://nodejs.org/ and then run start.bat again.",
    );
  }
  await installDependencies();
  const development = process.argv.includes("--dev");
  if (!development) await buildPreview();
  const port = await choosePort();
  const url = `http://127.0.0.1:${port}`;
  console.log(`\nLocal preview: ${url}`);
  console.log(
    "The website is available on this computer only. It is not published.",
  );
  console.log("Keep this window open while browsing. Press Ctrl+C to stop.\n");

  const server = spawn(
    process.execPath,
    [
      nextCli,
      ...(development ? ["dev", "--webpack"] : ["start"]),
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      cwd: projectDir,
      env: {
        ...environment,
        NODE_ENV: development ? "development" : "production",
      },
      stdio: "inherit",
    },
  );
  let stopped = false;
  let stopping = false;
  const done = new Promise((resolve, reject) => {
    server.once("error", (error) => {
      stopped = true;
      reject(error);
    });
    server.once("exit", (code) => {
      stopped = true;
      if (code && !stopping)
        reject(
          new Error(
            `The preview server exited with code ${code}. Check the message above.`,
          ),
        );
      else resolve();
    });
  });
  // Attach a handler immediately, even while the readiness check is running.
  done.catch(() => {});
  const stop = () => {
    if (stopping || stopped) return;
    stopping = true;
    console.log("\nStopping your local preview...");
    if (windows && server.pid) {
      const terminator = spawn(
        "taskkill",
        ["/PID", String(server.pid), "/T", "/F"],
        { stdio: "ignore", windowsHide: true },
      );
      terminator.once("error", () => server.kill());
    } else server.kill("SIGINT");
  };
  process.once("SIGINT", stop);
  process.once("SIGTERM", stop);

  let ready = false;
  for (let attempt = 0; attempt < 180 && !stopped && !stopping; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
      await response.body?.cancel();
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {
      /* Next.js may still be starting or compiling. */
    }
    await delay(1000);
  }
  if (ready && !stopped && !stopping) {
    console.log(`\nYour website is ready: ${url}\n`);
    if (!process.argv.includes("--no-browser")) openBrowser(url);
  } else if (!stopped && !stopping) {
    console.log(
      `The server is taking longer to start. Once it is ready, open ${url}.`,
    );
  }
  await done;
  process.removeListener("SIGINT", stop);
  process.removeListener("SIGTERM", stop);
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exitCode = 1;
});
