/* Pure classical two-valued logic, shared by the labs and tests. */
(function (root) {
  'use strict';
  const api = {
    and: (p,q) => p && q,
    or: (p,q) => p || q,
    xor: (p,q) => p !== q,
    iff: (p,q) => p === q,
    compound: (mode,p,q,r) => {
      switch(mode) {
        case 'grouped-or': return {step:p||q,result:(p||q)&&r};
        case 'grouped-and': return {step:q&&r,result:p||(q&&r)};
        case 'conditional-and': return {step:p&&q,result:!(p&&q)||r};
        default: throw new Error('Unknown compound mode');
      }
    },
    implies: (p, q) => !p || q,
    classify: (p, q) => ({ violatesNecessity: q && !p, violatesSufficiency: p && !q })
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CourseLogic = api;
})(typeof globalThis === 'undefined' ? this : globalThis);
