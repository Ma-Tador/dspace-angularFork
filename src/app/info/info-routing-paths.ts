import { getInfoModulePath } from '../app-routing-paths';

export const END_USER_AGREEMENT_PATH = 'end-user-agreement';
export const PRIVACY_PATH = 'privacy';
export const FEEDBACK_PATH = 'feedback';
export const FAQ_PATH = 'faq';
export const ACCESSIBILITY_PATH = 'accessibility';
export const IMPRESSUM_PATH = 'impressum';
export const CONTACT_PATH = 'contact';


export function getEndUserAgreementPath() {
    return getSubPath(END_USER_AGREEMENT_PATH);
}

export function getPrivacyPath() {
    return getSubPath(PRIVACY_PATH);
}

export function getFeedbackPath() {
    return getSubPath(FEEDBACK_PATH);
}

function getSubPath(path: string) {
    return `${getInfoModulePath()}/${path}`;
}
