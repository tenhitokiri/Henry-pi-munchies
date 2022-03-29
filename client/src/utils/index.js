export const trimInput = (input) => {
    return input.replace(/^\s*|\s*$/g, '');
}

export const orderBy = (a, b) => {
    return a < b ? -1 : a > b ? 1 : 0
}