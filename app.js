const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

const idArray = [];

function app() {
  function createManager() {
    console.log("Build Your Team");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "Your Managers Name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Must Type At Least One Character";
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "Your Managers Id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Enter A Number Greater than 0";
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "Your Managers Email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {return true;}
            return "Enter Valid Email Address"; 
            
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "Your Managers Office Number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Enter A Number Greater than 0";
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Wate Type Of TeamMember Are You Adding?",
          choices: ["Engineer", "Intern", "No More Team Members To Add"],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Egineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "Your Engineers Name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
          },
        },
        {
          type: "input",
          name: "engineerId",
          message: "Your Engineers Id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "ID is TAKEN, Choose Another Number";
              } else {
                return true;
              }
            }
            return "Enter A Number Greater than 0";
          },
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "Your Engineers Email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Enter Valid Email Address";
          },
        },
        {
          type: "input",
          name: "engineerGitHub",
          message: "Your Engineer's GitHub Username?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Must Type At Least One Character";
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.egineerName,
          answers.egineerId,
          answers.engineerEmail,
          answers.egineerGitHub
        );
        teamMembers.push(engineer);
        idArray.push(answers.egineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "Your Interns Name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Must Type At Least One Character";
          },
        },
        {
          type: "input",
          name: "internId",
          message: "Your Interns Id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              if (idArray.includes(answer)) {
                return "ID is TAKEN, Choose Another Number";
              } else {
                return true;
              }
            }
            return "Enter A Number Greater than 0";
          },
        },
        {
          type: "input",
          name: "internEmail",
          message: "Your Intern's Email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Enter Valid Email Address";
          },
        },
        {
          type: "input",
          name: "internSchool",
          message: "Your Intern's School?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Must Type At Least One Character";
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        createTeam();
      });
  }

  function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();
}
app();
