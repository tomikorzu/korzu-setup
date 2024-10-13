const { execSync } = require("child_process");
const prompts = require("prompts");
const kleur = require("kleur");
const fs = require("fs");
const path = require("path");

async function setupProject() {
  const response = await prompts([
    {
      type: "text",
      name: "projectName",
      message: "Name of the project?:",
    },
    {
      type: "select",
      name: "framework",
      message: "Select a FrameWork:",
      choices: [
        { title: kleur.yellow("Vanilla"), value: "vanilla" },
        { title: kleur.cyan("React"), value: "react" },
      ],
    },
    {
      type: "select",
      name: "variant",
      message: "Select a variant:",
      choices: [
        kleur.blue("TypeScript"),
        kleur.blue("TypeScript + SWC"),
        kleur.yellow("JavaScript"),
        kleur.yellow("JavaScript + SWC"),
      ],
    },
  ]);

  const { projectName, framework, variant } = response;

  const projectDir = path.join(process.cwd(), projectName);

  try {
    fs.mkdirSync(projectDir);

    const backendDir = path.join(projectDir, "backend");
    fs.mkdirSync(backendDir);

    console.log("Setting up the backend...");
    execSync("npm init -y", { cwd: backendDir, stdio: "inherit" });
    execSync("npm install express mysql2 dotenv cors", {
      cwd: backendDir,
      stdio: "inherit",
    });

    const packageJsonPath = path.join(backendDir, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    packageJson.type = "module";
    packageJson.scripts = {
      start: "node index.js",
      ...packageJson.scripts,
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    fs.writeFileSync(
      path.join(backendDir, "index.js"),
      fs.readFileSync(path.join(__dirname, "backend", "index.js"))
    );
    fs.writeFileSync(
      path.join(backendDir, ".env"),
      fs.readFileSync(path.join(__dirname, "backend", ".env"))
    );

    const configDir = path.join(backendDir, "config");
    fs.mkdirSync(configDir);

    fs.writeFileSync(
      path.join(configDir, "db.js"),
      fs.readFileSync(path.join(__dirname, "backend", "config", "db.js"))
    );

    const frontendDir = path.join(projectDir, "frontend");

    console.log("Setting up the frontend...");

    execSync(
      `npm create vite@latest frontend -- --template ${framework} -- --variant ${variant}`,
      { stdio: "inherit" }
    );
    changeViteConfig(frontendDir);
  } catch (error) {
    console.error("There was an error creating the setup:", error);
  }
}

setupProject();
