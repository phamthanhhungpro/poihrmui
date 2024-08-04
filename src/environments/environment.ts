const apiUrl = 'http://poi.vn:1118/';
const idFrontEndUrl = 'http://poi.vn:1122/';
const hrmFrontEndUrl = 'http://poi.vn:1124';

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
