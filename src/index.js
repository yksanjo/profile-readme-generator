#!/usr/bin/env node
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');

const statsBadge = (user) => `![Stats](https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&count_private=true)`;

const topLangsBadge = (user) => `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact)`;

const streakBadge = (user) => `![Streak](https://github-readme-streak-stats.herokuapp.com/?user=${user})`;

const profileTemplate = (data) => `# 👋 Hi, I'm ${data.name}!

${data.bio}

## 📊 GitHub Stats
${statsBadge(data.user)}
${topLangsBadge(data.user)}
${data.streak ? streakBadge(data.user) : ''}

## 🌐 Connect with Me
${data.socials}

---
*Generated with profile-readme-generator*`;

async function main() {
  console.log(chalk.cyan('\n👤 Profile README Generator\n'));
  
  const { name, bio, user, streak, socials } = await inquirer.prompt([
    { name: 'name', type: 'input', message: 'Your name:', default: 'Your Name' },
    { name: 'bio', type: 'input', message: 'Short bio:', default: 'Developer & Creator' },
    { name: 'user', type: 'input', message: 'GitHub username:', default: 'yksanjo' },
    { name: 'streak', type: 'confirm', message: 'Include streak stats?', default: true },
    { name: 'socials', type: 'input', message: 'Social links:', default: '- [Twitter](https://twitter.com)' }
  ]);
  
  const content = profileTemplate({ name, bio, user, streak, socials });
  fs.writeFileSync('README.md', content);
  console.log(chalk.green('\n✅ Profile README.md generated!'));
}
if (require.main === module) main().catch(console.error);
module.exports = { main };
