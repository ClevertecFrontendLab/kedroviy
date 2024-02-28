export const errorRedirect: { [key: number]: string } = {
    401: '/result/error-login',
    409: '/result/error-user-exist',
    404: '/result/error-check-email',
    429: '/result/error',
    500: '/result/error',
};

export const getErrorMessage = (errorCode: number): string => {
    return errorRedirect[errorCode];
}