import chalk from 'chalk';

    export const validateRouteName = (routeName: string): boolean => {
        const isValid = /^[a-zA-Z0-9-()\/]+$/.test(routeName);
        if (!isValid) {
            console.log(chalk.red(`Error: Route name "${routeName}" is invalid. Only letters, numbers, hyphens, parentheses, and slashes are allowed.`));
        }
        return isValid;
    };