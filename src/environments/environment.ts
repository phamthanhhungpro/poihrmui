const apiUrl = 'http://api.poi.vn:1118/';
const idFrontEndUrl = 'https://id.vercel.app/';
const hrmFrontEndUrl = 'https://hrm.vercel.app';

export const environment = {
    production: true,
    signInUrl: idFrontEndUrl + 'sign-in',
    hrmFeUrl: hrmFrontEndUrl,
    apiUrl: apiUrl,
    idApiUrl: apiUrl + 'id/api/',
    idApiUrlWithOutEndding: apiUrl + 'id',
    hrmApiUrl: apiUrl + 'hrm/api/',
    idFrontEndUrl: idFrontEndUrl,
};
