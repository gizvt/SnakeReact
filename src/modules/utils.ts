export const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

export const capitalise = (string: string) =>
    string[0].toUpperCase() + string.substring(1);
