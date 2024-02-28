export const requestsStatus: { [key: number]: string } = {
    400: '/result/error-change-password',
    401: '/result/error-change-password',
    404: '/result/error-change-password',
    429: '/result/error-change-password',
    500: '/result/error-change-password',
};

export const getServerMessage = (errorCode: number): string => {
    return requestsStatus[errorCode];
}