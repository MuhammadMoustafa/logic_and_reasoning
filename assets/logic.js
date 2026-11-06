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
    /* Lesson 10: a diagnostic test in natural frequencies. Counts may be fractional; the lab rounds them for display. */
    bayes: ({prior, sensitivity, falsePositive}, population = 10000) => {
      const sick = prior * population, healthy = population - sick;
      const truePos = sick * sensitivity, falsePos = healthy * falsePositive;
      const posterior = prior * sensitivity / (prior * sensitivity + (1 - prior) * falsePositive);
      return {sick, healthy, truePos, falsePos, posterior, likelihoodRatio: sensitivity / falsePositive};
    },
    /* Lesson 11: a fixed, hypothetical linear causal model, variables in causal order C, T, M, Y, S, unit noise.
       C → T, C → Y (confounder); T → M → Y (mediator); T → Y (direct); T → S ← Y (collider).
       causalEstimate returns the population regression coefficient of T when predicting Y from T plus the adjusted variables. */
    causalModel: {names:['C','T','M','Y','S'], edges:{T:{C:0.8}, M:{T:0.5}, Y:{T:0.2, M:0.6, C:0.7}, S:{T:0.7, Y:0.7}}, totalEffect:0.5, directEffect:0.2},
    causalEstimate: adjust => {
      const {names, edges} = api.causalModel, n = names.length, index = Object.fromEntries(names.map((name, i) => [name, i]));
      // Each variable as a weighted sum of the independent noise terms: row i of (I − B)^-1.
      const weights = [];
      names.forEach((name, i) => {
        const row = names.map((_, k) => k === i ? 1 : 0);
        for (const [parent, b] of Object.entries(edges[name] || {})) weights[index[parent]].forEach((w, k) => { row[k] += b * w; });
        weights.push(row);
      });
      const cov = (i, j) => weights[i].reduce((sum, w, k) => sum + w * weights[j][k], 0);
      const predictors = ['T', ...['C', 'M', 'S'].filter(name => adjust[name.toLowerCase()])].map(name => index[name]);
      // Solve cov(X, X) β = cov(X, Y) by Gaussian elimination; β[0] is the coefficient of T.
      const m = predictors.map(i => [...predictors.map(j => cov(i, j)), cov(i, index.Y)]);
      for (let col = 0; col < m.length; col++) {
        for (let row = col + 1; row < m.length; row++) {
          const f = m[row][col] / m[col][col];
          for (let k = col; k <= m.length; k++) m[row][k] -= f * m[col][k];
        }
      }
      const beta = [];
      for (let row = m.length - 1; row >= 0; row--) beta[row] = (m[row][m.length] - m[row].slice(row + 1, m.length).reduce((sum, v, k) => sum + v * beta[row + 1 + k], 0)) / m[row][row];
      return {estimate: beta[0], problems: [!adjust.c && 'confounder', adjust.m && 'mediator', adjust.s && 'collider'].filter(Boolean)};
    },
    implies: (p, q) => !p || q,
    classify: (p, q) => ({ violatesNecessity: q && !p, violatesSufficiency: p && !q })
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CourseLogic = api;
})(typeof globalThis === 'undefined' ? this : globalThis);
