# Brett Oberg Photography

![Production](https://github.com/bjoberg/bo-portfolio/workflows/Production/badge.svg)

Web application displaying images captured by Brett Oberg Photography.

## Installation

```bash
git clone https://github.com/bjoberg/bo-portfolio.git
npm install
```

Create `.env` file.

```txt
APP_ENV=local
BO_API_ENDPOINT=https://bo-portfolio-api-staging.herokuapp.com/api/v1
```

## Deploy

## v5

Create a [pull request](https://github.com/bjoberg/bo-portfolio/pulls) to the master branch, GitHub actions will handle the rest.

## v4

Download the source code for [version 4](https://github.com/bjoberg/bo-portfolio/releases) of the application.

```bash
# Log into Heroku CLI
heroku login

# Make sure local docer is running
docker ps

# Sign into Container Registry.
heroku container:login

# Build the Dockerfile in the current directory and push the Docker image.
heroku container:push web --app=bo-portfolio-v4

# Release the newly pushed images to deploy your app.
heroku container:release web --app=bo-portfolio-v4
```

## Report an Issue

[New bug report](https://github.com/bjoberg/bo-portfolio/issues)
