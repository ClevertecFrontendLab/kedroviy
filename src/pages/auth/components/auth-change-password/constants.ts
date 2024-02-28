export const requestsStatus: { [key: number]: string } = {
    400: '/result/error-login',
    401: '/result/error-login',
    404: '/result/error-check-email-no-exist',
};

export const getServerMessage = (errorCode: number): string => {
    return requestsStatus[errorCode] || '/result/error-check-email';
}