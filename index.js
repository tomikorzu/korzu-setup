const { execSync } = require("child_process");
const prompts = require("prompts");
const kleur = require("kleur");
const fs = require("fs-extra");
const path = require("path");

async function setupProject() {
  const response = await prompts([
    {
      type: "text",
      name: "projectName",
      message: "Enter a project name:",
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
  ]);

  const { projectName, framework } = response;

  const projectDir = path.join(process.cwd(), projectName);

  try {
    fs.mkdirSync(projectDir);

    const backendDir = path.join(projectDir, "backend");
    fs.mkdirSync(backendDir);

    console.log("Setting up the backend...");

    const localBackendDir = path.join(__dirname, "./backend");
    fs.copySync(localBackendDir, backendDir);

    console.log("Installing backend dependencies...");
    execSync("npm install", { cwd: backendDir, stdio: "inherit" });

    const frontendDir = path.join(projectDir, "frontend");

    console.log("Setting up the frontend...");

    fs.mkdirSync(frontendDir);

    const localFrontendDir = path.join(__dirname, `./${framework}`);
    fs.copySync(localFrontendDir, frontendDir);

    console.log("Installing frontend dependencies...");
    execSync("npm install", { cwd: frontendDir, stdio: "inherit" });

    console.log("Project setup completed successfully!");
  } catch (error) {
    console.error("There was an error creating the setup:", error);
  }
}

setupProject();
