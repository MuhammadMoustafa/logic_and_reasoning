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
    /* Quantified statements over a finite domain of {a, b} individuals.
       index points to the witness (true existential) or counterexample (false universal); -1 when none. */
    quantify: (mode, domain) => {
      const find = test => domain.findIndex(test);
      switch(mode) {
        case 'all': { const i = find(x => x.a && !x.b); return {value:i < 0, index:i}; }
        case 'some': { const i = find(x => x.a && x.b); return {value:i >= 0, index:i}; }
        case 'none': { const i = find(x => x.a && x.b); return {value:i < 0, index:i}; }
        case 'notall': { const i = find(x => x.a && !x.b); return {value:i >= 0, index:i}; }
        default: throw new Error('Unknown quantifier mode');
      }
    },
    /* Argument forms for the lesson 7 checker: search every assignment for true premises and a false conclusion. */
    forms: {
      mp: {vars:['P','Q'], premises:[v => !v.P || v.Q, v => v.P], conclusion:v => v.Q},
      mt: {vars:['P','Q'], premises:[v => !v.P || v.Q, v => !v.Q], conclusion:v => !v.P},
      hs: {vars:['P','Q','R'], premises:[v => !v.P || v.Q, v => !v.Q || v.R], conclusion:v => !v.P || v.R},
      ds: {vars:['P','Q'], premises:[v => v.P || v.Q, v => !v.P], conclusion:v => v.Q},
      ac: {vars:['P','Q'], premises:[v => !v.P || v.Q, v => v.Q], conclusion:v => v.P},
      da: {vars:['P','Q'], premises:[v => !v.P || v.Q, v => !v.P], conclusion:v => !v.Q},
      ad: {vars:['P','Q'], premises:[v => v.P || v.Q, v => v.P], conclusion:v => !v.Q}
    },
    checkForm(name) {
      const form = api.forms[name];
      if (!form) throw new Error('Unknown argument form');
      const rows = 2 ** form.vars.length;
      for (let i = 0; i < rows; i++) {
        // Rows run from all-true to all-false, matching the course's truth tables.
        const v = Object.fromEntries(form.vars.map((name, k) => [name, !((i >> (form.vars.length - 1 - k)) & 1)]));
        if (form.premises.every(premise => premise(v)) && !form.conclusion(v)) return {valid:false, rows, counterexample:v};
      }
      return {valid:true, rows, counterexample:null};
    },
    /* Lesson 8: the tripartite analysis plus a no-luck condition. A teaching simplification: philosophers do not agree how to state that condition. */
    knowledgeCheck: ({belief, truth, justified, luck}) => {
      const missing = [['belief', belief], ['truth', truth], ['justified', justified]].filter(([, held]) => !held).map(([name]) => name);
      const gettier = missing.length === 0 && luck;
      return {knowledge: missing.length === 0 && !luck, gettier, missing};
    },
    /* Lesson 9: (H ∧ A1 ∧ … ∧ An) → O. A failed prediction only shows ¬H ∨ ¬A1 ∨ … ; auxiliaries checked independently drop out of suspicion. */
    testOutcome: (observed, checks) => {
      if (observed) return {verdict:'passed', suspects:[]};
      const suspects = checks.map((checked, i) => checked ? -1 : i).filter(i => i >= 0);
      return {verdict: suspects.length ? 'open' : 'against-h', suspects};
    },
    implies: (p, q) => !p || q,
    classify: (p, q) => ({ violatesNecessity: q && !p, violatesSufficiency: p && !q })
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CourseLogic = api;
})(typeof globalThis === 'undefined' ? this : globalThis);
