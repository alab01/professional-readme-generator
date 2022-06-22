// const inquirer = require('inquirer');
// const fs = require('fs');

import inquirer from 'inquirer';
import fs from 'fs';

function getLicenseKeyword(license) {
    let licenseKey = {};
  
    if (license === 'Apache') {
      licenseKey = {
        badgeKey: 'Apache%202.0-blue.svg',
        linkKey: 'Apache-2.0',
      }
    }
    else if (license === 'Eclipse') {
      licenseKey = {
        badgeKey: 'EPL%201.0-red.svg',
        linkKey: 'EPL-1.0',
      }
    }
    else if (license === 'IBM') {
      licenseKey = {
        badgeKey: 'IPL%201.0-blue.svg',
        linkKey: 'IPL-1.0',
      }
    }
    else if (license === 'ISC') {
      licenseKey = {
        badgeKey: 'ISC-blue.svg',
        linkKey: 'IPL',
      }
    }
    else if (license === 'MIT') {
      licenseKey = {
        badgeKey: 'MIT-yellow.svg',
        linkKey: 'MIT',
      }
    }
    else if (license === 'Mozilla') {
      licenseKey = {
        badgeKey: 'MPL%202.0-brightgreen.svg',
        linkKey: 'MPL-2.0',
      }
    }
  
    return licenseKey;
}

function renderLicenseBadgeLink(license) {

    if (license === '') {
      return;
    }
  
    const licenseKey = getLicenseKeyword(license);
  
    return `[![License](https://img.shields.io/badge/License-${licenseKey.badgeKey})](https://opensource.org/licenses/${licenseKey.linkKey})`;
}

const generateREADME = function ({title, description, installation, usage, licenses, contributors, instructions, github, email}) {
  
     
    return  ` # ${title}

        ${renderLicenseBadgeLink(licenses)}

        ## Table of Contents
        - [**Description**](#description)
        - [**Installation**](#installation)
        - [**Usage**](#usage)
        - [**License**](#license)
        - [**Contributing**](#contributing)
        - [**Tests**](#tests)
        - [**Questions**](#questions)

        ## Description
        📑 ${description}

        ## Installation
        💾 ${installation} 

        ## Usage
        💻 ${usage}

        ## License
        ${renderLicenseSection(licenses)}

        ## Contributing
        🔥 ${contributors}

        ## Instructions
        📌 ${instructions}

        ## Questions
        🖐 If you have any question about me or my project, feel free to contact me!  
        - My **Github** Link: [**${github}**](https://github.com/${github})  
        - My **Email**: **${email}**`;
}

const questions = [
  {
    type: 'input',
    message: 'the title of my project?',
    name: 'title',
  },
  {
    type: 'input',
    message: 'Discriptions?',
    name: 'description',
  },
  {
    type: 'list',
    message: 'What license?',
    name: 'licenses',
    choices: ['MIT', 'Mozilla', 'ISC', 'IBM', 'Eclipse', 'Apache'],
  },
  {
    type: 'input',
    message: 'What is the usage?',
    name: 'usage',
  },
  {
    type: 'input',
    message: 'Are there any other contributors?',
    name: 'contributors',
  },
  {
    type: 'input',
    message: 'What are ther instruction?',
    name: 'instructions',
  },
  {
    type: 'input',
    message: 'What are the installations?',
    name: 'installation',
  },
  {
    type: 'input',
    message: 'What is your GitHub URL?',
    name: 'GitHub',
  },
  {
    type: 'input',
    message: 'What is your email?',
    name: 'email',
  },

]

function renderLicenseSection(license) {
    return `this project uses ${license} license`

}

inquirer.prompt(questions).then((data) => {
    console.log(data);
    const readmeContent = generateREADME(data);
    console.log(readmeContent);

    fs.writeFile('./sample/README.md', readmeContent, (err) =>
      err ? console.log(err) : console.log('Success!')
    );
  });
