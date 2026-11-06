/* Shared glossary: definitions and lesson links. */
(function(root){
  const terms = {
  "argument": {
    "ar": "الحجة",
    "en": "Argument",
    "definition": "مجموعة من المقدمات نعرضها لتأييد نتيجة. نفحص العلاقة بينها، لا مجرد صدق كل جملة على حدة.",
    "lesson": "lessons/01-arguments.html#l1-argument",
    "aliases": [
      "الحجة",
      "حجة"
    ]
  },
  "premise": {
    "ar": "المقدمة",
    "en": "Premise",
    "definition": "قضية ننطلق منها في الاستدلال. قد تكون صادقة أو كاذبة، ولذلك نفحصها إلى جانب فحص طريقة الاستدلال.",
    "lesson": "lessons/01-arguments.html#l1-argument",
    "aliases": [
      "المقدمات",
      "مقدمات",
      "المقدمة"
    ]
  },
  "conclusion": {
    "ar": "النتيجة",
    "en": "Conclusion",
    "definition": "القضية التي نحاول الوصول إليها أو تأييدها اعتمادًا على المقدمات.",
    "lesson": "lessons/01-arguments.html#l1-argument",
    "aliases": [
      "النتيجة"
    ]
  },
  "inference": {
    "ar": "الاستدلال",
    "en": "Inference",
    "definition": "الانتقال من مقدمات أو أدلة إلى نتيجة، سواء أكانت النتيجة لازمة أم مرجحة.",
    "lesson": "lessons/01-arguments.html#l1-argument",
    "aliases": [
      "الاستدلال"
    ]
  },
  "proposition": {
    "ar": "القضية",
    "en": "Proposition",
    "definition": "معنى خبري يمكن أن يكون صادقًا أو كاذبًا؛ مثل «العدد 6 زوجي». السؤال والأمر ليسا قضيتين بهذا المعنى.",
    "lesson": "lessons/01-arguments.html#l1-proposition",
    "aliases": [
      "القضية",
      "قضية"
    ]
  },
  "validity": {
    "ar": "الصلاحية",
    "en": "Validity",
    "definition": "تكون الحجة الاستنباطية صالحة إذا استحال أن تصدق جميع مقدماتها وتكون نتيجتها كاذبة. الصلاحية وحدها لا تضمن صدق المقدمات.",
    "lesson": "lessons/01-arguments.html#l1-validity",
    "aliases": [
      "الصلاحية",
      "صلاحية",
      "Valid",
      "Validity"
    ]
  },
  "soundness": {
    "ar": "السلامة",
    "en": "Soundness",
    "definition": "تكون الحجة سليمة إذا كانت صالحة وكانت جميع مقدماتها صادقة فعلًا؛ وعندئذ تكون نتيجتها صادقة أيضًا.",
    "lesson": "lessons/01-arguments.html#l1-soundness",
    "aliases": [
      "السلامة",
      "Soundness",
      "Sound"
    ]
  },
  "counterexample": {
    "ar": "المثال المضاد",
    "en": "Counterexample",
    "definition": "حالة تصدق فيها جميع مقدمات الحجة وتكون النتيجة كاذبة؛ تكفي حالة كهذه لإثبات أن الحجة غير صالحة.",
    "lesson": "lessons/01-arguments.html#l1-counterexample",
    "aliases": [
      "المثال المضاد",
      "مثال مضاد"
    ]
  },
  "conditional": {
    "ar": "الشرط المادي",
    "en": "Material conditional",
    "definition": "عبارة «إذا كانت P فإن Q» في المنطق الكلاسيكي. تكون كاذبة فقط إذا صدقت P وكذبت Q، ولا تعني وحدها وجود علاقة سببية.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-conditional",
    "aliases": [
      "الشرط المادي"
    ]
  },
  "antecedent": {
    "ar": "المقدّم",
    "en": "Antecedent",
    "definition": "الجزء الذي يأتي بعد «إذا» في العبارة الشرطية؛ وهو P في P → Q.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-conditional",
    "aliases": [
      "المقدّم"
    ]
  },
  "consequent": {
    "ar": "التالي",
    "en": "Consequent",
    "definition": "الجزء الذي يأتي بعد «فإن» في العبارة الشرطية؛ وهو Q في P → Q.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-conditional",
    "aliases": []
  },
  "truth-table": {
    "ar": "جدول الصدق",
    "en": "Truth table",
    "definition": "جدول يعرض جميع القيم الممكنة للقضايا البسيطة، وقيمة العبارة المركبة في كل حالة.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-truth-table",
    "aliases": [
      "جدول الصدق"
    ]
  },
  "mp": {
    "ar": "إثبات المقدّم",
    "en": "Modus Ponens",
    "definition": "من «إذا كانت P فإن Q» ومن P نستنتج Q. هذا استدلال صالح.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-forms",
    "aliases": [
      "إثبات المقدّم",
      "Modus Ponens"
    ]
  },
  "mt": {
    "ar": "نفي التالي",
    "en": "Modus Tollens",
    "definition": "من «إذا كانت P فإن Q» ومن نفي Q نستنتج نفي P. هذا استدلال صالح.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-forms",
    "aliases": [
      "نفي التالي",
      "Modus Tollens"
    ]
  },
  "ac": {
    "ar": "إثبات التالي",
    "en": "Affirming the Consequent",
    "definition": "من «إذا كانت P فإن Q» ومن Q نستنتج P. هذا الشكل غير صالح؛ فقد تتحقق Q دون P.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-forms",
    "aliases": [
      "إثبات التالي",
      "Affirming the Consequent"
    ]
  },
  "da": {
    "ar": "نفي المقدّم",
    "en": "Denying the Antecedent",
    "definition": "من «إذا كانت P فإن Q» ومن نفي P نستنتج نفي Q. هذا الشكل غير صالح؛ فغياب P لا يمنع تحقق Q بسبب آخر.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-forms",
    "aliases": [
      "نفي المقدّم",
      "Denying the Antecedent"
    ]
  },
  "contrapositive": {
    "ar": "المقابل النقيض",
    "en": "Contrapositive",
    "definition": "المقابل النقيض لـ P → Q هو ¬Q → ¬P. العبارتان متكافئتان في المنطق الكلاسيكي.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-converse",
    "aliases": [
      "المقابل النقيض"
    ]
  },
  "necessary": {
    "ar": "الشرط الضروري",
    "en": "Necessary condition",
    "definition": "شرط لا تتحقق الظاهرة من دونه، ضمن الظروف المحددة. إذا كانت P ضرورية لـ Q، فإن تحقق Q يستلزم تحقق P.",
    "lesson": "lessons/03-necessary-sufficient.html#l3-necessary",
    "aliases": [
      "الشرط الضروري",
      "الضرورة"
    ]
  },
  "sufficient": {
    "ar": "الشرط الكافي",
    "en": "Sufficient condition",
    "definition": "شرط يكفي تحققه لضمان تحقق الظاهرة، ضمن الظروف المحددة. إذا كانت P كافية لـ Q، فإن تحقق P يستلزم تحقق Q.",
    "lesson": "lessons/03-necessary-sufficient.html#l3-sufficient",
    "aliases": [
      "الشرط الكافي",
      "الكفاية"
    ]
  },
  "resonance": {
    "ar": "الرنين",
    "en": "Resonance",
    "definition": "المقصود هنا رنين الممانعة تحت العتبة: تكون استجابة الغشاء الكهربائية أقوى عند تردد غير صفري، وفق قياس محدد. لا يساوي ذلك مجرد الإطلاق الدوري لجهود الفعل.",
    "lesson": "lessons/03-necessary-sufficient.html#l3-hcn",
    "aliases": [
      "الرنين",
      "رنين"
    ]
  },
  "hcn": {
    "ar": "قنوات HCN",
    "en": "Hyperpolarization-activated cyclic nucleotide-gated channels",
    "definition": "عائلة من القنوات الأيونية يمر عبرها التيار Ih. قد تسهم في الرنين، لكن دورها يعتمد على الخلية وجهد الغشاء والتيارات الأخرى.",
    "lesson": "lessons/03-necessary-sufficient.html#l3-hcn",
    "aliases": [
      "HCN"
    ]
  },
  "rescue": {
    "ar": "تجربة الإنقاذ",
    "en": "Rescue experiment",
    "definition": "محاولة استعادة الوظيفة التي عُطلت، ثم فحص عودة الاستجابة. تقوي تفسيرًا سببيًا عند ضبط العوامل الأخرى، ولا تثبت وحدها أن التفسير فريد.",
    "lesson": "lessons/03-necessary-sufficient.html#l3-experiment",
    "aliases": [
      "تجربة إنقاذ",
      "تجربة الإنقاذ"
    ]
  },
  "deduction": {
    "ar": "الاستنباط",
    "en": "Deduction",
    "definition": "استدلال يُراد فيه أن تلزم النتيجة عن المقدمات. نقيّم نجاحه بالصلاحية؛ وليس تعريفه مجرد الانتقال من العام إلى الخاص.",
    "lesson": "lessons/04-types-of-inference.html#l4-deduction",
    "aliases": [
      "الاستنباط",
      "استنباط",
      "Deduction"
    ]
  },
  "induction": {
    "ar": "الاستقراء",
    "en": "Induction",
    "definition": "الاستناد إلى مشاهدات أو انتظامات لتأييد تعميم أو توقع يتجاوز ما لوحظ مباشرة. قد تكون النتيجة خاطئة رغم صدق المشاهدات.",
    "lesson": "lessons/04-types-of-inference.html#l4-induction",
    "aliases": [
      "الاستقراء",
      "استقراء",
      "Induction"
    ]
  },
  "abduction": {
    "ar": "الاستدلال لأفضل تفسير",
    "en": "Abduction / Inference to the Best Explanation",
    "definition": "ترجيح فرضية لأنها تفسر الأدلة أفضل من البدائل المتاحة. يظل الترجيح قابلًا للمراجعة، وقد لا تكفي الأدلة لاختيار تفسير واحد.",
    "lesson": "lessons/04-types-of-inference.html#l4-abduction",
    "aliases": [
      "الاستدلال لأفضل تفسير",
      "استدلال لأفضل تفسير",
      "Abduction"
    ]
  },
  "sample": {
    "ar": "العينة",
    "en": "Sample",
    "definition": "الحالات التي ندرسها فعليًا. مدى تمثيلها للمجتمع أو الظروف المقصودة يؤثر في قوة التعميم منها.",
    "lesson": "lessons/04-types-of-inference.html#l4-induction",
    "aliases": [
      "العينة",
      "عينة"
    ]
  },
  "hypothesis": {
    "ar": "الفرضية",
    "en": "Hypothesis",
    "definition": "تفسير أو ادعاء نقترحه للفحص. نستخرج منه تنبؤات مع افتراضات محددة، ثم نقارنها بالملاحظات.",
    "lesson": "lessons/04-types-of-inference.html#l4-research",
    "aliases": [
      "الفرضية",
      "فرضية"
    ]
  },
  "prediction": {
    "ar": "التنبؤ",
    "en": "Prediction",
    "definition": "ما نتوقع ملاحظته إذا صحت الفرضية وافتراضاتها المساعدة. تحقق التنبؤ لا يثبت الفرضية وحدها.",
    "lesson": "lessons/04-types-of-inference.html#l4-research",
    "aliases": [
      "التنبؤ",
      "تنبؤ"
    ]
  },
  "converse": {
    "ar": "العكس",
    "en": "Converse",
    "definition": "عكس P → Q هو Q → P. صدق الشرط الأصلي لا يضمن صدق عكسه؛ فكون العدد زوجيًا لا يعني أنه من مضاعفات 4.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-converse",
    "aliases": [
      "العكس"
    ]
  },
  "equivalence": {
    "ar": "التكافؤ المنطقي",
    "en": "Logical equivalence",
    "definition": "تكون عبارتان متكافئتين منطقيًا إذا كانت لهما قيمة الصدق نفسها في كل الحالات الممكنة.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-converse",
    "aliases": [
      "متكافئتان",
      "التكافؤ"
    ]
  },
  "negation": {
    "ar": "النفي",
    "en": "Negation",
    "definition": "نفي القضية يكون صادقًا عندما تكون القضية كاذبة، وكاذبًا عندما تكون صادقة. نرمز إليه بـ ¬.",
    "lesson": "lessons/05-connectives.html#l5-negation",
    "aliases": [
      "النفي"
    ]
  },
  "causality": {
    "ar": "السببية",
    "en": "Causality",
    "definition": "علاقة يكون فيها لعامل دور في إحداث تغير في عامل آخر. التلازم أو العبارة الشرطية وحدهما لا يثبتان هذه العلاقة.",
    "lesson": "lessons/03-necessary-sufficient.html#l3-experiment",
    "aliases": [
      "السببية"
    ]
  },
  "control": {
    "ar": "التجربة الضابطة",
    "en": "Control experiment",
    "definition": "تجربة للمقارنة تساعد على معرفة هل التغير مرتبط بالتدخل الذي نختبره أم بعوامل أخرى، مثل المذيب أو مرور الوقت.",
    "lesson": "lessons/03-necessary-sufficient.html#l3-experiment",
    "aliases": [
      "الضوابط",
      "تجارب ضابطة"
    ]
  },
  "membrane-potential": {
    "ar": "جهد الغشاء",
    "en": "Membrane potential",
    "definition": "فرق الجهد الكهربائي بين داخل الخلية وخارجها. يهم تحديده عند دراسة الرنين لأن استجابة الخلية قد تتغير معه.",
    "lesson": "lessons/03-necessary-sufficient.html#l3-hcn",
    "aliases": [
      "جهد الغشاء"
    ]
  },
  "impedance": {
    "ar": "الممانعة",
    "en": "Impedance",
    "definition": "مقياس يربط استجابة الجهد بالتيار المتغير مع الزمن، ويعتمد على التردد. نستخدمه هنا لوصف استجابة غشاء الخلية في قياس الرنين.",
    "lesson": "lessons/03-necessary-sufficient.html#l3-hcn",
    "aliases": [
      "الممانعة"
    ]
  },
  "connective": {
    "ar": "الرابط المنطقي",
    "en": "Logical connective",
    "definition": "أداة لبناء قضية مركبة من قضية أو أكثر. نحدد بها كيف تعتمد قيمة العبارة المركبة على قيم أجزائها.",
    "lesson": "lessons/05-connectives.html#l5-connectives",
    "aliases": [
      "الرابط المنطقي",
      "الروابط المنطقية"
    ]
  },
  "conjunction": {
    "ar": "العطف",
    "en": "Conjunction",
    "definition": "العبارة P ∧ Q تصدق فقط عندما تصدق P وQ معًا.",
    "lesson": "lessons/05-connectives.html#l5-and",
    "aliases": [
      "العطف"
    ]
  },
  "disjunction": {
    "ar": "الفصل الشامل",
    "en": "Inclusive disjunction",
    "definition": "العبارة P ∨ Q تصدق إذا صدق طرف واحد على الأقل، وتسمح بصدق الطرفين معًا.",
    "lesson": "lessons/05-connectives.html#l5-or",
    "aliases": [
      "الفصل الشامل"
    ]
  },
  "xor": {
    "ar": "الفصل الحصري",
    "en": "Exclusive disjunction",
    "definition": "العبارة P ⊕ Q تصدق عندما يصدق أحد الطرفين فقط، وتكذب إذا اتفقت قيمتاهما.",
    "lesson": "lessons/05-connectives.html#l5-or",
    "aliases": [
      "الفصل الحصري"
    ]
  },
  "biconditional": {
    "ar": "شرط التكافؤ",
    "en": "Biconditional",
    "definition": "العبارة P ↔ Q تعني «P إذا وفقط إذا Q». تصدق عندما تتفق قيمتا الطرفين، ولا يثبت صدقها في صف واحد التكافؤ المنطقي في جميع الصفوف.",
    "lesson": "lessons/05-connectives.html#l5-conditional",
    "aliases": [
      "شرط التكافؤ"
    ]
  },
  "scope": {
    "ar": "نطاق الرابط",
    "en": "Scope",
    "definition": "الجزء الذي يعمل عليه الرابط داخل العبارة. تساعد الأقواس على تحديده؛ فنفي P ∧ Q كلها يختلف عن نفي كل طرف على حدة ثم عطفهما.",
    "lesson": "lessons/05-connectives.html#l5-brackets",
    "aliases": [
      "نطاق الرابط"
    ]
  },
  "tautology": {
    "ar": "الصدق المنطقي",
    "en": "Tautology",
    "definition": "عبارة تصدق في كل إسناد ممكن للقيم، مثل P ∨ ¬P في المنطق الكلاسيكي. ونسمي هذه الخاصية الصدق المنطقي.",
    "lesson": "lessons/05-connectives.html#l5-classification",
    "aliases": [
      "الصدق المنطقي"
    ]
  },
  "contradiction": {
    "ar": "التناقض",
    "en": "Contradiction",
    "definition": "عبارة تكذب في كل إسناد ممكن للقيم، مثل P ∧ ¬P في المنطق الكلاسيكي.",
    "lesson": "lessons/05-connectives.html#l5-classification",
    "aliases": [
      "التناقض",
      "تناقض"
    ]
  },
  "contingency": {
    "ar": "عبارة ممكنة الصدق والكذب",
    "en": "Contingent sentence",
    "definition": "عبارة تصدق في بعض إسنادات القيم وتكذب في غيرها، مثل P ∧ Q.",
    "lesson": "lessons/05-connectives.html#l5-classification",
    "aliases": [
      "عبارة ممكنة الصدق والكذب"
    ]
  },
  "quantifier": {
    "ar": "المكمم",
    "en": "Quantifier",
    "definition": "أداة تحدد عن كم من أفراد المجال نتحدث: عن كلهم (∀)، أم عن واحد على الأقل (∃).",
    "lesson": "lessons/06-quantifiers.html#l6-why",
    "aliases": [
      "المكممات",
      "المكمم"
    ]
  },
  "domain": {
    "ar": "مجال الخطاب",
    "en": "Domain of discourse",
    "definition": "مجموعة الأفراد التي تتحدث عنها العبارات. تغييره قد يغيّر قيمة العبارة، وهو يحدد ما الذي يُعد مثالًا مضادًا.",
    "lesson": "lessons/06-quantifiers.html#l6-domain",
    "aliases": [
      "مجال الخطاب"
    ]
  },
  "predicate": {
    "ar": "المحمول",
    "en": "Predicate",
    "definition": "صفة قد تنطبق على فرد من المجال وقد لا تنطبق، مثل E(x) بمعنى «x زوجي». لا تصبح قضية حتى نحدد الفرد أو نستخدم مكممًا.",
    "lesson": "lessons/06-quantifiers.html#l6-domain",
    "aliases": [
      "المحمول"
    ]
  },
  "universal": {
    "ar": "المكمم الكلي",
    "en": "Universal quantifier",
    "definition": "∀x تعني «لكل x في المجال». ونترجم «كل A هو B» إلى ∀x (A(x) → B(x)).",
    "lesson": "lessons/06-quantifiers.html#l6-universal",
    "aliases": [
      "المكمم الكلي"
    ]
  },
  "existential": {
    "ar": "المكمم الوجودي",
    "en": "Existential quantifier",
    "definition": "∃x تعني «يوجد x واحد على الأقل في المجال». ونترجم «بعض A هو B» إلى ∃x (A(x) ∧ B(x)).",
    "lesson": "lessons/06-quantifiers.html#l6-existential",
    "aliases": [
      "المكمم الوجودي"
    ]
  },
  "vacuous-truth": {
    "ar": "الصدق بلا مضمون",
    "en": "Vacuous truth",
    "definition": "صدق عبارة كلية مثل ∀x (A(x) → B(x)) لأن لا شيء في المجال يحقق A. لا يوجد مثال مضاد، ولا يوجد شاهد أيضًا؛ فهو ليس دليلًا على B.",
    "lesson": "lessons/06-quantifiers.html#l6-empty",
    "aliases": [
      "صدقًا بلا مضمون",
      "صدق بلا مضمون"
    ]
  },
  "proof": {
    "ar": "البرهان",
    "en": "Proof",
    "definition": "سلسلة أسطر تبدأ من المقدمات، ويُبرَّر كل سطر جديد بقاعدة استدلال صالحة، حتى نصل إلى النتيجة. يثبت البرهان صلاحية الحجة، لا صدق مقدماتها.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-why",
    "aliases": [
      "البرهان"
    ]
  },
  "rule-of-inference": {
    "ar": "قاعدة الاستدلال",
    "en": "Rule of inference",
    "definition": "شكل صالح قصير نستخدمه خطوةً واحدة في البرهان، مثل إثبات المقدّم ونفي التالي.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-rules",
    "aliases": [
      "قاعدة الاستدلال",
      "قواعد الاستدلال"
    ]
  },
  "hypothetical-syllogism": {
    "ar": "تسلسل الشروط",
    "en": "Hypothetical syllogism",
    "definition": "من P → Q ومن Q → R نستنتج P → R. قاعدة صالحة.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-rules",
    "aliases": [
      "تسلسل الشروط"
    ]
  },
  "disjunctive-syllogism": {
    "ar": "الاستدلال بالحذف",
    "en": "Disjunctive syllogism",
    "definition": "من P ∨ Q ومن ¬P نستنتج Q. قاعدة صالحة تبدأ بنفي أحد البديلين؛ أما إثبات أحدهما فلا ينفي الآخر.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-rules",
    "aliases": [
      "الاستدلال بالحذف"
    ]
  },
  "implicit-premise": {
    "ar": "المقدمة الضمنية",
    "en": "Implicit premise",
    "definition": "مقدمة لا يصرّح بها القائل، لكن الحجة تحتاج إليها لتصبح صالحة. بعد إضافتها نفحص صدقها؛ فهناك يختبئ الضعف غالبًا.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-implicit",
    "aliases": [
      "المقدمة الضمنية",
      "المقدمات الضمنية"
    ]
  },
  "formal-fallacy": {
    "ar": "المغالطة الشكلية",
    "en": "Formal fallacy",
    "definition": "استدلال بشكل غير صالح؛ فله مثال مضاد مهما كان المحتوى، مثل إثبات التالي ونفي المقدّم.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-formal",
    "aliases": [
      "المغالطة الشكلية",
      "مغالطة شكلية"
    ]
  },
  "informal-fallacy": {
    "ar": "المغالطة غير الشكلية",
    "en": "Informal fallacy",
    "definition": "خلل في محتوى الحجة لا في شكلها: مقدمة كاذبة، أو كلمة يتغير معناها، أو دليل لا يكفي. قد يكون الشكل صالحًا ومع ذلك تفشل الحجة.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-informal",
    "aliases": [
      "المغالطة غير الشكلية",
      "المغالطات غير الشكلية",
      "مغالطات غير شكلية"
    ]
  },
  "equivocation": {
    "ar": "اشتراك اللفظ",
    "en": "Equivocation",
    "definition": "استعمال كلمة واحدة بمعنيين مختلفين في حجة واحدة، فتبدو صالحة. إذا ثبّتنا معنى واحدًا كذبت إحدى المقدمات.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-informal",
    "aliases": [
      "اشتراك اللفظ"
    ]
  },
  "begging-question": {
    "ar": "المصادرة على المطلوب",
    "en": "Begging the question",
    "definition": "حجة تفترض نتيجتها في مقدماتها، فلا تقدم سببًا مستقلًا لقبولها، حتى لو كان شكلها صالحًا.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-informal",
    "aliases": [
      "المصادرة على المطلوب"
    ]
  },
  "hasty-generalization": {
    "ar": "التعميم المتسرع",
    "en": "Hasty generalization",
    "definition": "تعميم على مجال واسع من عينة صغيرة أو غير ممثلة.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-informal",
    "aliases": [
      "التعميم المتسرع"
    ]
  },
  "false-dilemma": {
    "ar": "الثنائية الزائفة",
    "en": "False dilemma",
    "definition": "مقدمة تعرض بديلين فقط كأنهما كل الاحتمالات، مع وجود بدائل أخرى. الاستدلال بالحذف بعدها صالح الشكل، لكن المقدمة كاذبة.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-informal",
    "aliases": [
      "الثنائية الزائفة"
    ]
  }
};
  if(typeof module !== 'undefined' && module.exports) module.exports=terms;
  else root.CourseTerms=terms;
})(globalThis);
