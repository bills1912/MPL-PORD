# MPL-PORD: Multi-Platform Palm Oil Detector

## Getting started

This is a web application that is built using Next.js, intergrated with Flask in API side and redis-posgresql on the database side, and all of that is bounded in docker.

Follow all of this instruction to run the application well.

## Installation Docker

For docker installation, you can start to install Docker Desktop version by clicking this [link](https://www.docker.com/). After installation, check if docker is installed well by run this command on your CMD

```bash 
docker --version
```

## Clone The MPL-PORD Repository

After installing Docker well, the next step is cloning the MPL-PORD web application on your main directory by run this command

```bash
git clone https://gitlab.com/billsar1912/palm-oil-detector.git
```

> [!TIP]
> If the command is not running and give error statement, you must install Git on your computer.

## Open The MPL-PORD Project on Code Editor

> [!TIP]
> Before open the project, make sure that you have installed npm (node package manager) on your computer, by run `npm --version` on your command prompt. If the command is not running and give the error statement, you must install npm first

After cloning the project, open MPL-PORD project in any code editor in your computer. After that, open the code editor terminal using `ctrl + ~ ` shortcut on your keyobard. After that, run the following command

```bash
npm install
```

> [!WARNING]
> Make sure that the command is running well with no error in the terminal.

## Run The Application

After the previous step is running well, then run the application with docker, with the following step:
1. Open the Docker Desktop.
2. Run the following docker command.
   ```bash
   docker compose up -d --build
   ```
3. Make sure that the command is run well, with no error.