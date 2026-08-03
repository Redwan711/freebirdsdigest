/**
 * Utility helper function to generate CSS classes for the header logo.
 * Automatically inverts the header logo to white when the user's
 * phone or PC has system Dark Mode enabled.
 *
 * @param {string} baseClass - Existing CSS class string for the header logo.
 * @returns {string} Combined CSS class string including dark-mode invert filters.
 */
export function getHeaderLogoClass(baseClass = "") {
  const darkInvertClass = "header-logo-dark-invert transition-all duration-300";
  return baseClass ? `${baseClass} ${darkInvertClass}`.trim() : darkInvertClass;
}
