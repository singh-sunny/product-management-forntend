const config = {
    env: {
        development: {
            serviceBaseURL: 'http://localhost:3001/api/'
        },
        production: {

        },
        qa: {

        }
    }
}

const currentEbv = 'development';

const currentConfig = config.env[currentEbv];

export {currentConfig as config};