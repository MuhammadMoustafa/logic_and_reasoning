/* Pure classical two-valued logic, shared by the labs and tests. */
(function (root) {
  'use strict';
  const api = {
    implies: (p, q) => !p || q,
    classify: (p, q) => ({ violatesNecessity: q && !p, violatesSufficiency: p && !q })
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CourseLogic = api;
})(typeof globalThis === 'undefined' ? this : globalThis);
