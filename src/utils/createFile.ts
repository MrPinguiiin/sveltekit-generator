
    import shell from 'shelljs';

    export const createFile = (filePath: string, content: string) => {
        shell.ShellString(content).to(filePath);
    };