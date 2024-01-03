// rolesToPages.js
const rolesToPages = {
  Ceo: ['Ceo-page', 'ceo-page', 'hr-page', 'home'],
  developer: ['developer-page', 'ceo-page'],
  hr: ['hr-page'],
};
export const userRole = ['Ceo', 'developer', 'hr'] as const;

export default rolesToPages;
