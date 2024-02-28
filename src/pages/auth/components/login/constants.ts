export const requestsStatus: { [key: number]: string } = {
    200: '/main',
    400: '/result/error-login',
    401: '/result/error-login',
    404: '/result/error-check-email-no-exist',
    409: '/result/error-check-email-no-exist',
};

export const getServerMessage = (errorCode: number): string => {
    return requestsStatus[errorCode];
}
