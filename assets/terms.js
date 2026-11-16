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
      "الشرط المادي",
      "الشرط"
    ]
  },
  "antecedent": {
    "ar": "المقدّم",
    "en": "Antecedent",
    "definition": "الجزء الذي يأتي بعد «إذا» في العبارة الشرطية؛ وهو P في ⁦P → Q⁩.",
    "lesson": "lessons/02-conditional-reasoning.html#l2-conditional",
    "aliases": [
      "المقدّم"
    ]
  },
  "consequent": {
    "ar": "التالي",
    "en": "Consequent",
    "definition": "الجزء الذي يأتي بعد «فإن» في العبارة الشرطية؛ وهو Q في ⁦P → Q⁩.",
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
    "definition": "المقابل النقيض لـ ⁦P → Q⁩ هو ⁦¬Q → ¬P⁩. العبارتان متكافئتان في المنطق الكلاسيكي.",
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
    "definition": "عكس ⁦P → Q⁩ هو ⁦Q → P⁩. صدق الشرط الأصلي لا يضمن صدق عكسه؛ فكون العدد زوجيًا لا يعني أنه من مضاعفات 4.",
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
    "definition": "العبارة ⁦P ∧ Q⁩ تصدق فقط عندما تصدق P وQ معًا.",
    "lesson": "lessons/05-connectives.html#l5-and",
    "aliases": [
      "العطف"
    ]
  },
  "disjunction": {
    "ar": "الفصل الشامل",
    "en": "Inclusive disjunction",
    "definition": "العبارة ⁦P ∨ Q⁩ تصدق إذا صدق طرف واحد على الأقل، وتسمح بصدق الطرفين معًا.",
    "lesson": "lessons/05-connectives.html#l5-or",
    "aliases": [
      "الفصل الشامل"
    ]
  },
  "xor": {
    "ar": "الفصل الحصري",
    "en": "Exclusive disjunction",
    "definition": "العبارة ⁦P ⊕ Q⁩ تصدق عندما يصدق أحد الطرفين فقط، وتكذب إذا اتفقت قيمتاهما.",
    "lesson": "lessons/05-connectives.html#l5-or",
    "aliases": [
      "الفصل الحصري"
    ]
  },
  "biconditional": {
    "ar": "شرط التكافؤ",
    "en": "Biconditional",
    "definition": "العبارة ⁦P ↔ Q⁩ تعني «P إذا وفقط إذا Q». تصدق عندما تتفق قيمتا الطرفين، ولا يثبت صدقها في صف واحد التكافؤ المنطقي في جميع الصفوف.",
    "lesson": "lessons/05-connectives.html#l5-conditional",
    "aliases": [
      "شرط التكافؤ"
    ]
  },
  "scope": {
    "ar": "نطاق الرابط",
    "en": "Scope",
    "definition": "الجزء الذي يعمل عليه الرابط داخل العبارة. تساعد الأقواس على تحديده؛ فنفي ⁦P ∧ Q⁩ كلها يختلف عن نفي كل طرف على حدة ثم عطفهما.",
    "lesson": "lessons/05-connectives.html#l5-brackets",
    "aliases": [
      "نطاق الرابط"
    ]
  },
  "tautology": {
    "ar": "الصدق المنطقي",
    "en": "Tautology",
    "definition": "عبارة تصدق في كل إسناد ممكن للقيم، مثل ⁦P ∨ ¬P⁩ في المنطق الكلاسيكي. ونسمي هذه الخاصية الصدق المنطقي.",
    "lesson": "lessons/05-connectives.html#l5-classification",
    "aliases": [
      "الصدق المنطقي"
    ]
  },
  "contradiction": {
    "ar": "التناقض",
    "en": "Contradiction",
    "definition": "عبارة تكذب في كل إسناد ممكن للقيم، مثل ⁦P ∧ ¬P⁩ في المنطق الكلاسيكي.",
    "lesson": "lessons/05-connectives.html#l5-classification",
    "aliases": [
      "التناقض",
      "تناقض"
    ]
  },
  "contingency": {
    "ar": "عبارة ممكنة الصدق والكذب",
    "en": "Contingent sentence",
    "definition": "عبارة تصدق في بعض إسنادات القيم وتكذب في غيرها، مثل ⁦P ∧ Q⁩.",
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
    "definition": "صفة قد تنطبق على فرد من المجال وقد لا تنطبق، مثل ⁦E(x)⁩ بمعنى «x زوجي». لا تصبح قضية حتى نحدد الفرد أو نستخدم مكممًا.",
    "lesson": "lessons/06-quantifiers.html#l6-domain",
    "aliases": [
      "المحمول"
    ]
  },
  "universal": {
    "ar": "المكمم الكلي",
    "en": "Universal quantifier",
    "definition": "⁦∀x⁩ تعني «لكل x في المجال». ونترجم «كل A هو B» إلى ⁦∀x (A(x) → B(x))⁩.",
    "lesson": "lessons/06-quantifiers.html#l6-universal",
    "aliases": [
      "المكمم الكلي"
    ]
  },
  "existential": {
    "ar": "المكمم الوجودي",
    "en": "Existential quantifier",
    "definition": "⁦∃x⁩ تعني «يوجد x واحد على الأقل في المجال». ونترجم «بعض A هو B» إلى ⁦∃x (A(x) ∧ B(x))⁩.",
    "lesson": "lessons/06-quantifiers.html#l6-existential",
    "aliases": [
      "المكمم الوجودي"
    ]
  },
  "vacuous-truth": {
    "ar": "الصدق بلا مضمون",
    "en": "Vacuous truth",
    "definition": "صدق عبارة كلية مثل ⁦∀x (A(x) → B(x))⁩ لأن لا شيء في المجال يحقق A. لا يوجد مثال مضاد، ولا يوجد شاهد أيضًا؛ فهو ليس دليلًا على B.",
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
    "definition": "من ⁦P → Q⁩ ومن ⁦Q → R⁩ نستنتج ⁦P → R⁩. قاعدة صالحة.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-rules",
    "aliases": [
      "تسلسل الشروط"
    ]
  },
  "disjunctive-syllogism": {
    "ar": "الاستدلال بالحذف",
    "en": "Disjunctive syllogism",
    "definition": "من ⁦P ∨ Q⁩ ومن ⁦¬P⁩ نستنتج Q. قاعدة صالحة تبدأ بنفي أحد البديلين؛ أما إثبات أحدهما فلا ينفي الآخر.",
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
    "definition": "استدلال على شكل غير صالح؛ أي يوجد لهذا الشكل مثال مضاد بصرف النظر عن موضوع الحجة، مثل إثبات التالي ونفي المقدّم.",
    "lesson": "lessons/07-proofs-fallacies.html#l7-formal",
    "aliases": [
      "المغالطة الشكلية",
      "مغالطة شكلية"
    ]
  },
  "informal-fallacy": {
    "ar": "المغالطة غير الشكلية",
    "en": "Informal fallacy",
    "definition": "خلل لا يكشفه الشكل وحده: كلمة يتغير معناها، أو مقدمة تفترض النتيجة، أو مقدمة كاذبة من نمط متكرر كالثنائية الزائفة، أو دليل لا يكفي. قد يكون الشكل صالحًا ومع ذلك تفشل الحجة.",
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
  },
  "knowledge": {
    "ar": "المعرفة",
    "en": "Knowledge",
    "definition": "نقصد هنا معرفة أن شيئًا ما صحيح. تتطلب على الأقل اعتقادًا صادقًا مبررًا، لكن حالات غيتييه تبيّن أن هذه الشروط الثلاثة لا تكفي.",
    "lesson": "lessons/08-knowledge-justification.html#l8-know",
    "aliases": [
      "المعرفة"
    ]
  },
  "belief": {
    "ar": "الاعتقاد",
    "en": "Belief",
    "definition": "أن تقبل قضية على أنها صادقة. قد يكون الاعتقاد صادقًا أو كاذبًا، ومبررًا أو غير مبرر.",
    "lesson": "lessons/08-knowledge-justification.html#l8-jtb",
    "aliases": [
      "الاعتقاد"
    ]
  },
  "justification": {
    "ar": "التبرير",
    "en": "Justification",
    "definition": "السبب الجيد الذي يجعل الاعتقاد معقولًا، مثل دليل أو قياس موثوق أو استدلال صالح. يأتي بدرجات، ولا يضمن الصدق.",
    "lesson": "lessons/08-knowledge-justification.html#l8-jtb",
    "aliases": [
      "التبرير"
    ]
  },
  "jtb": {
    "ar": "الاعتقاد الصادق المبرر",
    "en": "Justified true belief (JTB)",
    "definition": "التحليل الثلاثي للمعرفة: يعرف الشخص أن P إذا اعتقدها، وكانت صادقة، وكان اعتقاده مبررًا.",
    "lesson": "lessons/08-knowledge-justification.html#l8-jtb",
    "aliases": [
      "الاعتقاد الصادق المبرر",
      "اعتقاد صادق مبرر",
      "التحليل الثلاثي"
    ]
  },
  "gettier-case": {
    "ar": "حالة غيتييه",
    "en": "Gettier case",
    "definition": "حالة يكون فيها الاعتقاد صادقًا ومبررًا، لكن صدقه جاء مصادفة، فلا يعدّه أغلب الفلاسفة معرفة.",
    "lesson": "lessons/08-knowledge-justification.html#l8-gettier",
    "aliases": [
      "حالات غيتييه",
      "حالة غيتييه"
    ]
  },
  "testimony": {
    "ar": "الشهادة",
    "en": "Testimony",
    "definition": "ما ينقله لنا غيرنا من معلومات، من أشخاص أو كتب أو مقالات. مصدر تبرير معقول عندما يكون المصدر في تخصصه ويعرض أدلته، وقد يخطئ.",
    "lesson": "lessons/08-knowledge-justification.html#l8-grounds",
    "aliases": [
      "الشهادة"
    ]
  },
  "fallibilism": {
    "ar": "القابلية للخطأ",
    "en": "Fallibilism",
    "definition": "موقف يرى أن المعرفة لا تتطلب اليقين التام: يمكن أن نعرف مع بقاء الخطأ ممكنًا من حيث المبدأ. وهي لا تعني أن كل الآراء متساوية.",
    "lesson": "lessons/08-knowledge-justification.html#l8-fallible",
    "aliases": [
      "القابلية للخطأ"
    ]
  },
  "skepticism": {
    "ar": "النزعة الشكية",
    "en": "Skepticism",
    "definition": "موقف يشكك في إمكان المعرفة أصلًا، أو في مجال منها، لأننا لا نستطيع استبعاد كل احتمالات الخطأ.",
    "lesson": "lessons/08-knowledge-justification.html#l8-fallible",
    "aliases": [
      "النزعة الشكية"
    ]
  },
  "falsifiability": {
    "ar": "قابلية التكذيب",
    "en": "Falsifiability",
    "definition": "أن توجد ملاحظة ممكنة لو حدثت لكذّبت الفرضية. اقترحها بوبر معيارًا للعلم، وهو معيار مفيد لكنه موضع نقاش.",
    "lesson": "lessons/09-philosophy-of-science.html#l9-falsifiable",
    "aliases": [
      "قابلية التكذيب"
    ]
  },
  "corroboration": {
    "ar": "التعزيز",
    "en": "Corroboration",
    "definition": "وصف بوبر لفرضية اجتازت اختبارات جريئة كان يمكن أن تفشل فيها. التعزيز ليس إثباتًا؛ تبقى الفرضية قابلة للتكذيب.",
    "lesson": "lessons/09-philosophy-of-science.html#l9-falsifiable",
    "aliases": [
      "التعزيز"
    ]
  },
  "auxiliary-hypothesis": {
    "ar": "الفرضية المساعدة",
    "en": "Auxiliary hypothesis",
    "definition": "افتراض نحتاج إليه مع الفرضية الأصلية لنستخرج تنبؤًا، مثل أن الأداة تعمل أو أن الدواء يحجب ما نظن. إذا فشل التنبؤ فقد تكون هي الكاذبة.",
    "lesson": "lessons/09-philosophy-of-science.html#l9-auxiliary",
    "aliases": [
      "الفرضيات المساعدة",
      "الفرضية المساعدة",
      "فرضية مساعدة"
    ]
  },
  "duhem-problem": {
    "ar": "مشكلة دوهيم",
    "en": "Duhem problem",
    "definition": "التجربة تختبر الفرضية مع فرضياتها المساعدة معًا. فشل التنبؤ يعني أن واحدة منها على الأقل كاذبة، دون أن يحدد المنطق أيها.",
    "lesson": "lessons/09-philosophy-of-science.html#l9-auxiliary",
    "aliases": [
      "مشكلة دوهيم"
    ]
  },
  "ad-hoc": {
    "ar": "الفرضية المخصصة",
    "en": "Ad hoc hypothesis",
    "definition": "تعديل يضاف لتفسير فشل تنبؤ فقط، ولا يعطي تنبؤًا جديدًا يمكن اختباره بطريقة مستقلة.",
    "lesson": "lessons/09-philosophy-of-science.html#l9-adhoc",
    "aliases": [
      "الفرضية المخصصة",
      "فرضية مخصصة",
      "التعديلات المخصصة"
    ]
  },
  "scientific-model": {
    "ar": "النموذج العلمي",
    "en": "Scientific model",
    "definition": "تمثيل مبسط لنظام ما نستعمله لنفهمه ونتنبأ بسلوكه. يُقيَّم بحسب غرضه ونطاقه، لا بأنه صادق أو كاذب ببساطة.",
    "lesson": "lessons/09-philosophy-of-science.html#l9-models",
    "aliases": [
      "النموذج العلمي"
    ]
  },
  "idealization": {
    "ar": "التبسيط المثالي",
    "en": "Idealization",
    "definition": "تجاهل مقصود لعوامل نعرف أنها موجودة، مثل الاحتكاك، لنجعل النموذج قابلًا للحساب والفهم.",
    "lesson": "lessons/09-philosophy-of-science.html#l9-models",
    "aliases": [
      "التبسيط المثالي"
    ]
  },
  "probability": {
    "ar": "الاحتمال",
    "en": "Probability",
    "definition": "رقم بين 0 (مستحيل) و1 (مؤكد) يعبّر عن تكرار حدث في مجموعة، أو عن درجة الاعتقاد. نكتبه ⁦P(A)⁩.",
    "lesson": "lessons/10-probability-bayes.html#l10-probability",
    "aliases": [
      "الاحتمال"
    ]
  },
  "conditional-probability": {
    "ar": "الاحتمال الشرطي",
    "en": "Conditional probability",
    "definition": "⁦P(A | B)⁩: احتمال A إذا عرفنا أن B حدث. نحسبه داخل الحالات التي حدث فيها B فقط. يختلف عادة عن ⁦P(B | A)⁩.",
    "lesson": "lessons/10-probability-bayes.html#l10-conditional",
    "aliases": [
      "الاحتمال الشرطي"
    ]
  },
  "base-rate": {
    "ar": "معدل الأساس",
    "en": "Base rate",
    "definition": "نسبة الحالة في المجموعة قبل أي دليل، مثل نسبة المصابين بين من نفحصهم. يؤثر كثيرًا في معنى نتيجة الاختبار.",
    "lesson": "lessons/10-probability-bayes.html#l10-base-rate",
    "aliases": [
      "معدل الأساس"
    ]
  },
  "sensitivity": {
    "ar": "الحساسية",
    "en": "Sensitivity",
    "definition": "نسبة المصابين الذين يعطيهم الاختبار نتيجة إيجابية: ⁦P(إيجابية | مصاب)⁩.",
    "lesson": "lessons/10-probability-bayes.html#l10-base-rate",
    "aliases": [
      "الحساسية"
    ]
  },
  "false-positive-rate": {
    "ar": "معدل الإيجابية الكاذبة",
    "en": "False positive rate",
    "definition": "نسبة السليمين الذين يعطيهم الاختبار نتيجة إيجابية: ⁦P(إيجابية | سليم)⁩. يساوي 1 ناقص النوعية (Specificity).",
    "lesson": "lessons/10-probability-bayes.html#l10-base-rate",
    "aliases": [
      "معدل الإيجابية الكاذبة",
      "معدل إيجابيته الكاذبة"
    ]
  },
  "natural-frequencies": {
    "ar": "التكرارات الطبيعية",
    "en": "Natural frequencies",
    "definition": "عرض الاحتمالات بأعداد من مجموعة متخيلة، مثل «90 من 100 مصاب»، بدل النسب. يسهّل حساب الاحتمال الشرطي.",
    "lesson": "lessons/10-probability-bayes.html#l10-base-rate",
    "aliases": [
      "التكرارات الطبيعية",
      "بالتكرارات الطبيعية"
    ]
  },
  "base-rate-neglect": {
    "ar": "إهمال معدل الأساس",
    "en": "Base-rate neglect",
    "definition": "الحكم على معنى دليل من دقة الاختبار وحدها، دون النظر إلى ندرة الحالة أو شيوعها.",
    "lesson": "lessons/10-probability-bayes.html#l10-base-rate",
    "aliases": [
      "إهمال معدل الأساس"
    ]
  },
  "bayes-theorem": {
    "ar": "قاعدة بايز",
    "en": "Bayes' theorem",
    "definition": "قاعدة لتحديث الاحتمال بعد الدليل: ⁦P(H | E) = P(E | H) · P(H) / P(E)⁩. وبصيغة الحظوظ: الحظوظ بعد الدليل = الحظوظ قبله × نسبة الترجيح.",
    "lesson": "lessons/10-probability-bayes.html#l10-bayes",
    "aliases": [
      "قاعدة بايز"
    ]
  },
  "odds": {
    "ar": "الحظوظ",
    "en": "Odds",
    "definition": "مقارنة احتمال الشيء باحتمال عكسه، وتسمى أيضًا الأرجحية. حظوظ a إلى b تقابل احتمالًا قدره ⁦a / (a + b)⁩. احتمال 1% يقابل حظوظًا 1 إلى 99.",
    "lesson": "lessons/10-probability-bayes.html#l10-bayes",
    "aliases": [
      "الحظوظ"
    ]
  },
  "likelihood-ratio": {
    "ar": "نسبة الترجيح",
    "en": "Likelihood ratio",
    "definition": "⁦P(E | H) ÷ P(E | ¬H)⁩: كم مرة يكون الدليل أرجح إذا صدقت الفرضية منه إذا كذبت. وتسمى أيضًا نسبة الإمكان. تقيس قوة الدليل؛ القيمة 1 لا تغيّر شيئًا.",
    "lesson": "lessons/10-probability-bayes.html#l10-bayes",
    "aliases": [
      "نسبة الترجيح",
      "نسبة ترجيحه"
    ]
  },
  "prosecutor-fallacy": {
    "ar": "مغالطة المدعي العام",
    "en": "Prosecutor's fallacy",
    "definition": "الخلط بين احتمال الدليل إذا كان المتهم بريئًا واحتمال البراءة إذا ظهر الدليل، مع إهمال معدل الأساس.",
    "lesson": "lessons/10-probability-bayes.html#l10-fallacies",
    "aliases": [
      "مغالطة المدعي العام"
    ]
  },
  "correlation": {
    "ar": "الارتباط",
    "en": "Correlation",
    "definition": "أن يميل متغيران إلى التغير معًا. لا يكفي وحده لإثبات أن أحدهما يسبب الآخر.",
    "lesson": "lessons/11-causal-inference.html#l11-correlation",
    "aliases": [
      "الارتباط"
    ]
  },
  "reverse-causation": {
    "ar": "السببية العكسية",
    "en": "Reverse causation",
    "definition": "أن يكون B هو الذي يسبب A، مع أننا افترضنا أن A يسبب B.",
    "lesson": "lessons/11-causal-inference.html#l11-correlation",
    "aliases": [
      "السببية العكسية"
    ]
  },
  "confounder": {
    "ar": "المتغير المربك",
    "en": "Confounder",
    "definition": "عامل يؤثر في السبب المفترض وفي النتيجة معًا، فيصنع ارتباطًا بينهما أو يغيّره. نضبطه لنقدّر الأثر السببي.",
    "lesson": "lessons/11-causal-inference.html#l11-correlation",
    "aliases": [
      "المتغير المربك",
      "المتغيرات المربكة",
      "المربك",
      "المربكات"
    ]
  },
  "causal-diagram": {
    "ar": "الرسم السببي",
    "en": "Causal diagram (DAG)",
    "definition": "رسم فيه كل متغير في صندوق، وكل سهم يعني تأثيرًا مباشرًا، دون دوائر مغلقة. يكتب افتراضاتنا السببية لنفحصها ونختار ما نضبطه.",
    "lesson": "lessons/11-causal-inference.html#l11-dag",
    "aliases": [
      "الرسم السببي",
      "رسم سببي",
      "رسمًا سببيًا",
      "الرسوم السببية"
    ]
  },
  "mediator": {
    "ar": "المتغير الوسيط",
    "en": "Mediator",
    "definition": "متغير يمر عبره جزء من أثر السبب في النتيجة. ضبطه يقطع هذا الجزء، فيبقى الأثر الذي لا يمر عبره، إن لم يكن بين الوسيط والنتيجة مربك.",
    "lesson": "lessons/11-causal-inference.html#l11-dag",
    "aliases": [
      "المتغير الوسيط",
      "الوسيط"
    ]
  },
  "collider": {
    "ar": "المتغير المصادم",
    "en": "Collider",
    "definition": "متغير يتأثر بمتغيرين معًا. ضبطه أو اختيار العينة بحسبه يصنع ارتباطًا زائفًا بينهما.",
    "lesson": "lessons/11-causal-inference.html#l11-dag",
    "aliases": [
      "المتغير المصادم",
      "المصادم"
    ]
  },
  "simpson-paradox": {
    "ar": "مفارقة سيمبسون",
    "en": "Simpson's paradox",
    "definition": "أن تظهر علاقة في كل مجموعة فرعية، وتنعكس أو تختفي عند جمع المجموعات. الرسم السببي يحدد أي المقارنتين نثق بها.",
    "lesson": "lessons/11-causal-inference.html#l11-confounder",
    "aliases": [
      "مفارقة سيمبسون"
    ]
  },
  "selection-bias": {
    "ar": "انحياز الاختيار",
    "en": "Selection bias",
    "definition": "خطأ ينشأ من طريقة اختيار العينة، مثل اختيارها بحسب أثر مشترك، فيظهر فيها ارتباط لا يوجد في المجتمع.",
    "lesson": "lessons/11-causal-inference.html#l11-collider",
    "aliases": [
      "انحياز الاختيار"
    ]
  },
  "intervention": {
    "ar": "التدخل",
    "en": "Intervention",
    "definition": "أن يحدد الباحث قيمة المتغير بنفسه بدل أن يلاحظها. في الرسم السببي يقطع التدخل كل الأسهم الداخلة إلى المتغير.",
    "lesson": "lessons/11-causal-inference.html#l11-intervention",
    "aliases": [
      "التدخل"
    ]
  },
  "randomization": {
    "ar": "التوزيع العشوائي",
    "en": "Randomization",
    "definition": "تحديد من يتلقى العلاج بالقرعة. لأن القرعة لا تتأثر بأي عامل آخر، لا تبقى أسهم من المربكات إلى العلاج، وتتوازن المربكات بين المجموعتين في المتوسط، وقد يختل التوازن بالمصادفة في العينات الصغيرة.",
    "lesson": "lessons/11-causal-inference.html#l11-intervention",
    "aliases": [
      "التوزيع العشوائي"
    ]
  },
  "control-group": {
    "ar": "المجموعة الضابطة",
    "en": "Control group",
    "definition": "مجموعة تمر بكل ما تمر به المجموعة المعالجة، إلا العامل الذي نختبره، لنقارن بها.",
    "lesson": "lessons/12-experimental-design.html#l12-control",
    "aliases": [
      "المجموعة الضابطة",
      "مجموعة ضابطة"
    ]
  },
  "placebo": {
    "ar": "الدواء الوهمي",
    "en": "Placebo",
    "definition": "علاج لا مادة فعالة فيه، تتلقاه المجموعة الضابطة ليُفصل أثر المادة الفعالة عن أثر تلقي العلاج وتوقع التحسن.",
    "lesson": "lessons/12-experimental-design.html#l12-control",
    "aliases": [
      "الدواء الوهمي",
      "دواءً وهميًا"
    ]
  },
  "random-sampling": {
    "ar": "الاختيار العشوائي للعينة",
    "en": "Random sampling",
    "definition": "اختيار المشاركين بالقرعة من المجتمع الذي نريد التعميم عليه. يجعل العينة ممثلة، لكنه لا يجيب وحده عن السؤال السببي.",
    "lesson": "lessons/12-experimental-design.html#l12-random",
    "aliases": [
      "الاختيار العشوائي للعينة",
      "الاختيار العشوائي"
    ]
  },
  "blinding": {
    "ar": "التعمية",
    "en": "Blinding",
    "definition": "إخفاء مجموعة كل مشارك عمن قد تتأثر أحكامه بمعرفتها. في التعمية المزدوجة لا يعرف المشارك ولا الباحث الذي يتعامل معه.",
    "lesson": "lessons/12-experimental-design.html#l12-blinding",
    "aliases": [
      "التعمية المزدوجة",
      "التعمية"
    ]
  },
  "margin-of-error": {
    "ar": "هامش الخطأ",
    "en": "Margin of error",
    "definition": "عدد نضيفه إلى التقدير ونطرحه منه فنحصل على مجال؛ لو كررنا التجربة كثيرًا، لاحتوت نحو 95% من هذه المجالات الأثر الحقيقي. يتناسب عكسيًا مع الجذر التربيعي لحجم العينة.",
    "lesson": "lessons/12-experimental-design.html#l12-sample",
    "aliases": [
      "هامش الخطأ",
      "هامش خطئه"
    ]
  },
  "sample-size": {
    "ar": "حجم العينة",
    "en": "Sample size",
    "definition": "عدد المشاركين أو الحالات في الدراسة. كلما زاد، قل تفاوت النتيجة بين التكرارات وزادت القوة الإحصائية.",
    "lesson": "lessons/12-experimental-design.html#l12-sample",
    "aliases": [
      "حجم العينة"
    ]
  },
  "statistical-significance": {
    "ar": "الدلالة الإحصائية",
    "en": "Statistical significance",
    "definition": "أن يكون الفرق أكبر مما تعطيه المصادفة وحدها عادة؛ بالحد المعتاد: لو لم يوجد أثر، لظهر فرق بهذا الحجم أو أكبر في أقل من 5 من كل 100 تجربة. لا تعني أن الأثر كبير أو مهم.",
    "lesson": "lessons/12-experimental-design.html#l12-sample",
    "aliases": [
      "الدلالة الإحصائية",
      "دال إحصائيًا",
      "دالًا إحصائيًا",
      "دالة إحصائيًا"
    ]
  },
  "statistical-power": {
    "ar": "القوة الإحصائية",
    "en": "Statistical power",
    "definition": "احتمال أن تُظهر التجربة فرقًا دالًا إحصائيًا عندما يوجد أثر حقيقي بحجم محدد. تزيد مع حجم العينة وحجم الأثر، والهدف المعتاد 80%.",
    "lesson": "lessons/12-experimental-design.html#l12-sample",
    "aliases": [
      "القوة الإحصائية",
      "قوتها الإحصائية"
    ]
  },
  "replication": {
    "ar": "التكرار",
    "en": "Replication",
    "definition": "أن يعيد فريق آخر التجربة ويصل إلى نتيجة مشابهة. يحمي من أخطاء المصادفة والظروف الخاصة بتجربة واحدة.",
    "lesson": "lessons/12-experimental-design.html#l12-replication",
    "aliases": [
      "التكرار"
    ]
  },
  "publication-bias": {
    "ar": "انحياز النشر",
    "en": "Publication bias",
    "definition": "نشر الدراسات ذات النتائج الدالة أكثر من غيرها، فتبدو الآثار في المقالات المنشورة أكبر مما هي.",
    "lesson": "lessons/12-experimental-design.html#l12-replication",
    "aliases": [
      "انحياز النشر"
    ]
  },
  "preregistration": {
    "ar": "التسجيل المسبق",
    "en": "Preregistration",
    "definition": "نشر الفرضية وطريقة القياس والتحليل بتاريخ قبل جمع البيانات، حتى لا يُختار التحليل بعد رؤية النتائج.",
    "lesson": "lessons/12-experimental-design.html#l12-replication",
    "aliases": [
      "التسجيل المسبق"
    ]
  },
  "backdoor-path": {
    "ar": "المسار الخلفي",
    "en": "Backdoor path",
    "definition": "مسار في الرسم السببي يصل بين المعالجة والحصيلة ويبدأ بسهم داخل إلى المعالجة، مثل المسار عبر مربك مشترك. ما دام مفتوحًا يختلط الارتباط بالأثر؛ ويغلقه ضبط متغير مناسب عليه، لا مصادم.",
    "lesson": "lessons/11-causal-inference.html#l11-confounder",
    "aliases": [
      "المسار الخلفي",
      "مسار خلفي",
      "مسارًا خلفيًا",
      "المسارات الخلفية"
    ]
  },
  "total-effect": {
    "ar": "الأثر الكلي",
    "en": "Total effect",
    "definition": "كل أثر السبب في الحصيلة، المباشر منه والمار عبر الوسائط. هو ما تقيسه تجربة تغيّر السبب وحده بالتوزيع العشوائي.",
    "lesson": "lessons/11-causal-inference.html#l11-mediator",
    "aliases": [
      "الأثر الكلي"
    ]
  },
  "direct-effect": {
    "ar": "الأثر المباشر",
    "en": "Direct effect",
    "definition": "الجزء من أثر السبب الذي لا يمر عبر وسيط محدد. معناه نسبي: يتوقف على الوسائط التي نثبتها.",
    "lesson": "lessons/11-causal-inference.html#l11-mediator",
    "aliases": [
      "الأثر المباشر"
    ]
  },
  "positive-control": {
    "ar": "الضابط الإيجابي",
    "en": "Positive control",
    "definition": "حالة نعرف أنها يجب أن تُظهر الأثر، نضيفها لنتأكد أن طريقة القياس قادرة على كشفه. إن لم يظهر فيها، فالخلل في التجربة لا في الفرضية.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-controls",
    "aliases": [
      "الضابط الإيجابي",
      "ضابط إيجابي",
      "ضابطًا إيجابيًا"
    ]
  },
  "standard-deviation": {
    "ar": "الانحراف المعياري",
    "en": "Standard deviation",
    "definition": "مقياس لمقدار تفاوت القيم حول متوسطها، بوحدة القياس نفسها. كلما كبر احتجنا إلى عينة أكبر لنقدّر الفرق بالدقة نفسها.",
    "lesson": "lessons/12-experimental-design.html#l12-lab",
    "aliases": [
      "الانحراف المعياري",
      "انحرافها المعياري"
    ]
  },
  "multiple-comparisons": {
    "ar": "المقارنات المتعددة",
    "en": "Multiple comparisons",
    "definition": "اختبار فروق كثيرة في الدراسة نفسها. لو لم يوجد أي أثر، لظهر فرق دال واحد تقريبًا من كل 20 مقارنة بالمصادفة؛ لذلك تُصحَّح العتبة، أو يُحدَّد المقياس الأساسي مسبقًا.",
    "lesson": "lessons/12-experimental-design.html#l12-replication",
    "aliases": [
      "المقارنات المتعددة",
      "تعدد المقارنات"
    ]
  },
  "independent-variable": {
    "ar": "المتغير المستقل",
    "en": "Independent variable",
    "definition": "ما يغيّره الباحث عمدًا في التجربة، ليرى أثره في متغير آخر.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-variables",
    "aliases": [
      "المتغير المستقل",
      "المتغيرات المستقلة"
    ]
  },
  "dependent-variable": {
    "ar": "المتغير التابع",
    "en": "Dependent variable",
    "definition": "ما نقيسه لنرى أثر تغيير المتغير المستقل.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-variables",
    "aliases": [
      "المتغير التابع",
      "المتغيرات التابعة"
    ]
  },
  "controlled-variable": {
    "ar": "المتغير المضبوط",
    "en": "Controlled variable",
    "definition": "عامل نبقيه ثابتًا في التجربة لأنه قد يغيّر المتغير التابع، مثل الحرارة أو تركيب المحلول.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-variables",
    "aliases": [
      "المتغيرات المضبوطة",
      "المتغير المضبوط",
      "متغير مضبوط"
    ]
  },
  "operational-definition": {
    "ar": "التعريف الإجرائي",
    "en": "Operational definition",
    "definition": "قاعدة تحوّل مفهومًا إلى قياس محدد، مثل تعريف قوة الرنين بنسبة الممانعة عند القمة إلى الممانعة عند تردد منخفض. نكتبه قبل التجربة.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-variables",
    "aliases": [
      "التعريف الإجرائي",
      "تعريف إجرائي",
      "تعريفًا إجرائيًا"
    ]
  },
  "measurement-validity": {
    "ar": "صدق القياس",
    "en": "Measurement validity",
    "definition": "أن يقيس القياس المفهوم الذي نقصده فعلًا. يختلف عن صلاحية الحجة رغم أن الكلمة الإنجليزية Validity تُستعمل للمعنيين.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-variables",
    "aliases": [
      "صدق القياس"
    ]
  },
  "reliability": {
    "ar": "ثبات القياس",
    "en": "Reliability",
    "definition": "أن يعطي القياس القيمة نفسها تقريبًا إذا كررناه على الحالة نفسها.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-variables",
    "aliases": [
      "ثبات القياس"
    ]
  },
  "negative-control": {
    "ar": "الضابط السلبي",
    "en": "Negative control",
    "definition": "حالة تمر بكل خطوات الإجراء ولا نتوقع فيها الأثر. إن ظهر فيها، فالإجراء نفسه يُحدثه. يحمي من الإيجابية الكاذبة.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-controls",
    "aliases": [
      "الضابط السلبي",
      "ضابط سلبي",
      "ضابطًا سلبيًا"
    ]
  },
  "vehicle-control": {
    "ar": "ضابط المذيب",
    "en": "Vehicle control",
    "definition": "ضابط سلبي يتلقى المادة التي يُذاب فيها الدواء، بالتركيز نفسه، دون الدواء.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-controls",
    "aliases": [
      "ضابط المذيب"
    ]
  },
  "sham": {
    "ar": "الإجراء الصوري",
    "en": "Sham procedure",
    "definition": "ضابط سلبي يمر بكل خطوات العملية عدا الخطوة المختبرة، كجراحة لا يُزال فيها النسيج.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-controls",
    "aliases": [
      "الإجراء الصوري"
    ]
  },
  "time-matched-control": {
    "ar": "الضابط الزمني",
    "en": "Time-matched control",
    "definition": "حالات تُقاس المدة نفسها دون المعالجة، لنعرف ما يتغير بمرور الزمن وحده.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-controls",
    "aliases": [
      "الضابط الزمني"
    ]
  },
  "manipulation-check": {
    "ar": "التحقق من التدخل",
    "en": "Manipulation check",
    "definition": "قياس يبيّن أن التدخل حدث كما أردنا، مثل التأكد من أن الحاجب حجب التيار فعلًا.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-controls",
    "aliases": [
      "التحقق من التدخل"
    ]
  },
  "mill-methods": {
    "ar": "طرق ميل",
    "en": "Mill's methods",
    "definition": "طرق وصفها جون ستيوارت ميل عام 1843 لعزل الأسباب بالمقارنة، منها الاتفاق والاختلاف والتغير المصاحب. تفترض معرفة العوامل المرشحة، ونتائجها مؤقتة.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-mill",
    "aliases": [
      "طرق ميل"
    ]
  },
  "method-of-agreement": {
    "ar": "طريقة الاتفاق",
    "en": "Method of agreement",
    "definition": "إذا ظهر الأثر في حالات مختلفة لا يجمعها إلا عامل واحد، فهذا العامل مرشح للسبب.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-mill",
    "aliases": [
      "طريقة الاتفاق"
    ]
  },
  "method-of-difference": {
    "ar": "طريقة الاختلاف",
    "en": "Method of difference",
    "definition": "إذا تشابهت حالتان في كل شيء إلا عاملًا واحدًا، وظهر الأثر في إحداهما فقط، فالعامل جزء من السبب. هي منطق المجموعة الضابطة.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-mill",
    "aliases": [
      "طريقة الاختلاف"
    ]
  },
  "concomitant-variation": {
    "ar": "طريقة التغير المصاحب",
    "en": "Method of concomitant variation",
    "definition": "إذا تغير الأثر بانتظام مع تغير العامل، فبينهما صلة سببية محتملة.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-mill",
    "aliases": [
      "طريقة التغير المصاحب",
      "التغير المصاحب"
    ]
  },
  "dose-response": {
    "ar": "العلاقة بين الجرعة والاستجابة",
    "en": "Dose–response relationship",
    "definition": "تغيّر الأثر بانتظام مع مقدار المعالجة. تقوّي الاستنتاج السببي، لكنها لا تميّز وحدها الأثر المقصود من أثر جانبي يزداد مع الجرعة أيضًا.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-mill",
    "aliases": [
      "العلاقة بين الجرعة والاستجابة"
    ]
  },
  "between-subject": {
    "ar": "تصميم بين المجموعات",
    "en": "Between-subject design",
    "definition": "تصميم يتلقى فيه كل فرد حالة واحدة، ونقارن المجموعات.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-designs",
    "aliases": [
      "تصميم بين المجموعات"
    ]
  },
  "within-subject": {
    "ar": "تصميم داخل الأفراد",
    "en": "Within-subject design",
    "definition": "تصميم يُقاس فيه الفرد نفسه في كل الحالات. يزيل الفروق الثابتة بين الأفراد، لكن عليه أن يراعي أثر الزمن والترتيب.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-designs",
    "aliases": [
      "تصميم داخل الأفراد"
    ]
  },
  "baseline": {
    "ar": "القياس الأساسي",
    "en": "Baseline",
    "definition": "قياس قبل المعالجة نقارن به ما بعدها.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-designs",
    "aliases": [
      "القياس الأساسي"
    ]
  },
  "washout": {
    "ar": "الغسل",
    "en": "Washout",
    "definition": "إزالة المعالجة ثم القياس مرة أخرى. عودة القيمة الأولى تضعف تفسير التغير بمرور الزمن.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-designs",
    "aliases": [
      "الغسل"
    ]
  },
  "counterbalancing": {
    "ar": "الموازنة",
    "en": "Counterbalancing",
    "definition": "تغيير ترتيب الحالات بين المشاركين، كأن يبدأ نصفهم بالعلاج ونصفهم بالضابط، حتى لا يختلط أثر الترتيب بأثر العلاج.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-designs",
    "aliases": [
      "الموازنة"
    ]
  },
  "technical-replicate": {
    "ar": "التكرار التقني",
    "en": "Technical replicate",
    "definition": "قياس العيّنة نفسها مرة أخرى. يخبرنا عن دقة الجهاز والإجراء، لا عن التفاوت بين الأفراد.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-replicates",
    "aliases": [
      "التكرار التقني"
    ]
  },
  "biological-replicate": {
    "ar": "التكرار الحيوي",
    "en": "Biological replicate",
    "definition": "فرد مستقل آخر، كحيوان أو مزرعة أو مريض آخر. يخبرنا عن التفاوت الطبيعي الذي نريد التعميم عليه.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-replicates",
    "aliases": [
      "التكرار الحيوي"
    ]
  },
  "pseudoreplication": {
    "ar": "التكرار الزائف",
    "en": "Pseudoreplication",
    "definition": "معاملة مشاهدات غير مستقلة كأنها مستقلة، كعدّ 30 خلية من 3 فئران عينةً من 30. يجعل هامش الخطأ أضيق من الحقيقة.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-replicates",
    "aliases": [
      "التكرار الزائف"
    ]
  },
  "off-target": {
    "ar": "الآثار خارج الهدف",
    "en": "Off-target effects",
    "definition": "آثار أداة أو دواء في أهداف غير المقصودة، وتزداد غالبًا بالتراكيز العالية.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-converging",
    "aliases": [
      "آثارًا خارج الهدف",
      "آثار خارج الهدف",
      "الآثار خارج الهدف"
    ]
  },
  "converging-evidence": {
    "ar": "تقارب الأدلة",
    "en": "Converging evidence",
    "definition": "اتفاق أدلة من طرق مستقلة تختلف نقاط ضعفها، فيضعف تفسير النتيجة بخطأ أداة واحدة.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-converging",
    "aliases": [
      "تقارب الأدلة"
    ]
  },
  "regression-to-mean": {
    "ar": "الانحدار نحو المتوسط",
    "en": "Regression to the mean",
    "definition": "القياس المتطرف يتبعه غالبًا قياس أقرب إلى المتوسط، لأن جزءًا من التطرف مصادفة. يقوى حين نختار الحالات بسبب قيمتها الأولى.",
    "lesson": "lessons/13-controls-lab-reasoning.html#l13-regression",
    "aliases": [
      "الانحدار نحو المتوسط"
    ]
  }
};
  if(typeof module !== 'undefined' && module.exports) module.exports=terms;
  else root.CourseTerms=terms;
})(globalThis);
