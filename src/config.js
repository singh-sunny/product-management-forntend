const config = {
    env: {
        development: {
            serviceBaseURL: 'http://localhost:3000/api/'
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