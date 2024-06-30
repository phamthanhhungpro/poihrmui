const apiUrl = 'https://api.poi.vn:1118/';
const idFrontEndUrl = 'https://id.poi.vn/';
const hrmFrontEndUrl = 'https://hrm.poi.vn';

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
