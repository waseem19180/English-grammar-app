export interface WordItem {
  id: string;
  word: string;
  wordClean: string;
  fullWordDisplay: string;
  meaningEn: string;
  meaningEnAccepted: string[]; // Variations accepted in typing practice
  meaningAr: string;
  category: 'word' | 'fixed_phrase';
  // Clever tricky misspelled versions (swapped e/i, scrambled letters, common traps)
  scrambledTraps: string[];
  // Hilarious phonetic sound-alike & English-to-English wordplay mnemonic story
  comicStory: string;
  comicHook: string;
}

export const VOCABULARY_LIST: WordItem[] = [
  {
    id: 'optional',
    word: 'optional',
    wordClean: 'optional',
    fullWordDisplay: 'optional',
    meaningEn: 'not compulsory',
    meaningEnAccepted: ['not compulsory', 'not compulsory.', 'optional'],
    meaningAr: 'اختياري',
    category: 'word',
    scrambledTraps: ['optuonal', 'optionel', 'optinal', 'opshional'],
    comicStory: 'اربط باللفظ الإنجليزي: كلمة Option فيها (شنطة)، والـ Compulsory بتنلفظ زي (كم بلوزة سوري)! لما تفتح الشنطة وتلاقي بلوزة ما بدك اياها بتقول: Not compulsory مش رح ألبسها، أنا اللي بختار براحتي ومش سوري (Not compulsory)!',
    comicHook: 'لفظ Option ➔ Not compulsory (مش مجبر ولا سوري!)'
  },
  {
    id: 'like-minded',
    word: 'like-minded',
    wordClean: 'like-minded',
    fullWordDisplay: 'like-minded (adj)',
    meaningEn: 'with similar attitude',
    meaningEnAccepted: ['with similar attitude', 'similar attitude', 'with similar attitudes'],
    meaningAr: 'عقلية متشابهة',
    category: 'word',
    scrambledTraps: ['like-mended', 'lik-minded', 'like-mainded', 'like-meinded'],
    comicStory: 'اربط باللفظ الإنجليزي: عندك Like للـ Mind وعاملين مع بعض (Similar Attitude)! كلمة Attitude بتشبه (قاعد بتوت وبشرب توت)! انت وصاحبك نفس الـ Mind وقاعدين نفس القعدة وبتاكلوا نفس التوت وعاملين Similar attitude!',
    comicHook: 'Like-Mind ➔ Similar Attitude (نفس العقل ونفس التيود!)'
  },
  {
    id: 'participate',
    word: 'participate',
    wordClean: 'participate',
    fullWordDisplay: 'participate (in)',
    meaningEn: 'take part (in)',
    meaningEnAccepted: ['take part (in)', 'take part in', 'take part', 'take-part'],
    meaningAr: 'يشارك في',
    category: 'word',
    scrambledTraps: ['particapate', 'particpate', 'particepate', 'perticipate'],
    comicStory: 'أسهل ربط لفظي بالتاريخ: اسمع الصوت! كلمة (Part-ici-pate) أولها كلمة PART! والـ Meaning بالإنجليزي فيه TAKE PART! يعني الكلمتين توأم فيهم كلمة PART صريحة! بتشوف Participate بتاخد Part فوراً!',
    comicHook: 'Part-icipate فيها PART ➔ والمعنى Take PART!'
  },
  {
    id: 'field',
    word: 'field',
    wordClean: 'field',
    fullWordDisplay: 'field',
    meaningEn: 'area of interest',
    meaningEnAccepted: ['area of interest', 'area of interests', 'an area of interest'],
    meaningAr: 'مجال',
    category: 'word',
    scrambledTraps: ['feild', 'feald', 'fileld', 'feeld'],
    comicStory: 'اربط لفظ Field بـ (فيل)، وكلمة Area بـ (حارة)! تخيل فيل ضخم نزل بنص الـ Area وعنده Interest (اهتمام شديد) يرقص بالملعب! سألوه: شو بتسوي يا فيل؟ قالهم: هذا الـ Field هو الـ Area of interest تبعي!',
    comicHook: 'Field (فيل) ➔ بالـ Area وعنده Interest باللعب!'
  },
  {
    id: 'on-show',
    word: 'on show',
    wordClean: 'on show',
    fullWordDisplay: 'on show',
    meaningEn: 'able to be seen',
    meaningEnAccepted: ['able to be seen', 'able to be seen.', 'can be seen'],
    meaningAr: 'معروض للجمهور',
    category: 'word',
    scrambledTraps: ['on shoe', 'on shaw', 'in show', 'on shoow'],
    comicStory: 'اربط بالإنجليزي: كلمة Show يعني عرض مسرحي! وإذا طلعت على المسرح بالـ Show، مستحيل تتخبى، رح تكون Able to be SEEN والكل شايفك من حرف الـ S لـ N! شو (Show) يعني سين (Seen)!',
    comicHook: 'في الـ Show ➔ لازم تكون Able to be SEEN!'
  },
  {
    id: 'set',
    word: 'set',
    wordClean: 'set',
    fullWordDisplay: 'set',
    meaningEn: 'a complete group',
    meaningEnAccepted: ['a complete group', 'complete group'],
    meaningAr: 'مجموعة متكاملة / طقم',
    category: 'word',
    scrambledTraps: ['sit', 'sat', 'sett', 'cet'],
    comicStory: 'اربط بالصوت: كلمة Set بتشبه صوت (يا ست) أو رقم (6)! والـ Group يعني جروب واتساب! الست عملت Complete Group على الواتس وجمعت الستة كلهم بطقم واحد وسكرت الجروب! Set يعني Complete Group!',
    comicHook: 'Set سوت Complete Group كامل وما فيه نقص!'
  },
  {
    id: 'routines',
    word: 'routines',
    wordClean: 'routines',
    fullWordDisplay: 'routines',
    meaningEn: 'everyday activities',
    meaningEnAccepted: ['everyday activities', 'daily activities', 'every day activities'],
    meaningAr: 'أنشطة يومية / رتابة',
    category: 'word',
    scrambledTraps: ['routins', 'routienes', 'rootines', 'routenes'],
    comicStory: 'اربط بالإنجليزي: كلمة Routines فيها (Rout) زي طريق كل يوم، والمعنى Everyday activities! كل يوم Everyday بتسوي نفس الـ Activity السخيفة: تفتح التلفون وتسكر التلفون! روتينك = Everyday activities!',
    comicHook: 'Routine ➔ Everyday activities (أنشطة كل يوم بالمللي)!'
  },
  {
    id: 'confident',
    word: 'confident',
    wordClean: 'confident',
    fullWordDisplay: 'confident',
    meaningEn: 'sure',
    meaningEnAccepted: ['sure', 'sure.', 'certain'],
    meaningAr: 'واثق',
    category: 'word',
    scrambledTraps: ['confidant', 'confidint', 'confindent', 'confedent'],
    comicStory: 'اربط باللفظ الإنجليزي: كلمة Confident كلمة طويلة كشخة، وجوابها أقصر كلمة بالإنجليزي: SURE (شور)! تخيل واقف على شاطئ البحر (Shore) بكل شياكة، سألوك خايف من القرش؟ قلتلهم بكل Confident: أنا SURE ما رح يقرب!',
    comicHook: 'كن Confident على الـ Shore واحكي بثقة: SURE!'
  },
  {
    id: 'factor',
    word: 'factor',
    wordClean: 'factor',
    fullWordDisplay: 'factor',
    meaningEn: 'part of the reason',
    meaningEnAccepted: ['part of the reason', 'a part of the reason', 'part of reason'],
    meaningAr: 'عامل / سبب',
    category: 'word',
    scrambledTraps: ['facter', 'factore', 'facktor', 'faktar'],
    comicStory: 'اربط بالصوت: Factor بتشبه (تراكتور أو فاكتوري Factory مصنع)! المصنع خربان ومطلع دخنة، لما سألنا المدير شو الـ Reason؟ قال: انكسر Part (جزء) صغير من الماكينة! فصار الـ Factor هو Part of the reason!',
    comicHook: 'Factor المصنع خربان ➔ بسبب Part of the reason!'
  },
  {
    id: 'potential',
    word: 'potential',
    wordClean: 'potential',
    fullWordDisplay: 'potential',
    meaningEn: 'possibilities for the future',
    meaningEnAccepted: ['possibilities for the future', 'possibility for the future', 'future possibilities'],
    meaningAr: 'طموح / احتمالي / مرتقب',
    category: 'word',
    scrambledTraps: ['potensial', 'potentiel', 'potencial', 'potantial'],
    comicStory: 'اربط بالحروف والأصوات: كلمة Po-tential تبدأ بـ P! والمعنى Po-ssibilities يبدأ بـ P! وبعدها كلمة Future! تخيل بوتين (Po-ten) لابس شال وطالع بصاروخ للمستقبل (Future) وعنده ألف احتمال (Possibilities)!',
    comicHook: 'حرف الـ P في Potential ➔ مع الـ P في Possibilities for the future!'
  },
  {
    id: 'creative',
    word: 'creative',
    wordClean: 'creative',
    fullWordDisplay: 'creative',
    meaningEn: 'good at doing artistic things',
    meaningEnAccepted: ['good at doing artistic things', 'artistic', 'good at artistic things'],
    meaningAr: 'مبدع',
    category: 'word',
    scrambledTraps: ['creativ', 'kreative', 'craetive', 'creativa'],
    comicStory: 'اربط بالإنجليزي: كلمة Creat-ive بتعمل كريمة كيك، وكلمة Art-istic رسم وفن! لما ترسم لوحة فنية بعلبة الكريمة الكل بقلك: You are so creative and good at doing artistic things! فن الكريمة الفني!',
    comicHook: 'Creative بالكيك والرسم ➔ Good at doing ARTISTIC things!'
  },
  {
    id: 'stuck',
    word: 'stuck',
    wordClean: 'stuck',
    fullWordDisplay: 'stuck',
    meaningEn: 'unable to move',
    meaningEnAccepted: ['unable to move', 'cannot move', 'cant move'],
    meaningAr: 'عالق / متعثر',
    category: 'word',
    scrambledTraps: ['stock', 'stuk', 'stak', 'stucke'],
    comicStory: 'اربط بالصوت: كلمة Stuck زي صوت العجلة لما تعلق بالوحل وتعمل (تك تك تك)! والمعنى Unable to MOVE! كلمة Move يعني حركة، فلما تكون Stuck ما في أي Move بتتحرك لو شو ما صار!',
    comicHook: 'صوت Stuck علّق ➔ صار Unable to MOVE!'
  },
  {
    id: 'excuse',
    word: 'excuse',
    wordClean: 'excuse',
    fullWordDisplay: 'excuse (for)',
    meaningEn: 'untrue reason',
    meaningEnAccepted: ['untrue reason', 'an untrue reason', 'fake reason', 'not true reason'],
    meaningAr: 'عذر',
    category: 'word',
    scrambledTraps: ['exuse', 'excuce', 'exciuse', 'excusee'],
    comicStory: 'اربط باللفظ الإنجليزي: أول ما تحكي للأستاذ Excuse me عندي عذر، بقلك بنص وجهك: هذا Untrue reason مش حقيقي وكذاب! اسمع النغمة: Excuse me ➔ هذا Untrue reason وما بمشي علي!',
    comicHook: 'Excuse me ➔ أستاذك برد عليك: Untrue reason كذب!'
  },
  // Fixed Phrases from image
  {
    id: 'societies-fair',
    word: 'societies fair',
    wordClean: 'societies fair',
    fullWordDisplay: 'societies fair',
    meaningEn: 'clubs and societies exhibition',
    meaningEnAccepted: ['clubs and societies exhibition', 'societies exhibition', 'clubs exhibition', 'exhibition of clubs'],
    meaningAr: 'معارض الجمعيات',
    category: 'fixed_phrase',
    scrambledTraps: ['societys fair', 'societies fare', 'society fair', 'societes fair'],
    comicStory: 'اربط بالكلمات الإنجليزية المشتركة: كلمة Societies موجودة بالاسم وموجودة بالمعنى Clubs and societies! وكلمة Fair يعني معرض Exhibition! جمعهم مع بعض: Societies Fair = Clubs and societies exhibition!',
    comicHook: 'Societies مكررة بالاسم والمعنى + كلمة Exhibition!'
  },
  {
    id: 'comfort-zone',
    word: 'comfort zone',
    wordClean: 'comfort zone',
    fullWordDisplay: 'Comfort zone',
    meaningEn: 'situation where one feels safe',
    meaningEnAccepted: ['situation where one feels safe', 'safe situation', 'safe zone', 'where one feels safe'],
    meaningAr: 'منطقة الراحة',
    category: 'fixed_phrase',
    scrambledTraps: ['confort zone', 'comfert zone', 'comfort sone', 'comfort zon'],
    comicStory: 'اربط باللفظ الإنجليزي: Comfort ريحة كومفورت بالبطانية، وZone منطقة! بتدخلك بـ Situation (موقف) بخليك Feels SAFE بأمان وراحة وما بدك تقوم! Comfort Zone ➔ Situation feels SAFE!',
    comicHook: 'Comfort Zone ➔ Situation feels SAFE (أمان كامل)!'
  },
  {
    id: 'foundation-course',
    word: 'foundation course',
    wordClean: 'foundation course',
    fullWordDisplay: 'Foundation course',
    meaningEn: 'preparatory course',
    meaningEnAccepted: ['preparatory course', 'preparatory study course', 'introductory course'],
    meaningAr: 'دورة تأسيسية',
    category: 'fixed_phrase',
    scrambledTraps: ['fundation course', 'foundacion course', 'foundation corse', 'foundashun course'],
    comicStory: 'اربط بالإنجليزي: الكلمتين بنتهوا بكلمة COURSE! والـ Foundation يعني فاونديشن بيجهز وبحضر (Preparatory)! يعني كورس تحضيري: Foundation course ➔ Preparatory course، التنتين فيهم Course!',
    comicHook: 'Foundation بحضر ➔ Preparatory COURSE (Course مع Course)!'
  },
  {
    id: 'optional-extra',
    word: 'optional extra',
    wordClean: 'optional extra',
    fullWordDisplay: 'Optional extra',
    meaningEn: 'additional non-compulsory item',
    meaningEnAccepted: ['additional non-compulsory item', 'extra non-compulsory item', 'additional item that is not compulsory'],
    meaningAr: 'إضافة اختيارية',
    category: 'fixed_phrase',
    scrambledTraps: ['optionel extra', 'optional extre', 'optinal extra', 'optional exstra'],
    comicStory: 'معادلة إنجليزية ذكية وسهلة: Optional أخذناها فوق يعني Non-compulsory! وكلمة Extra يعني Additional (زيادة)! ركّبهم جنب بعض: Extra = Additional، و Optional = Non-compulsory item!',
    comicHook: 'Extra يعني Additional + Optional يعني Non-compulsory!'
  },
  {
    id: 'be-get-used-to',
    word: 'be/get used to',
    wordClean: 'be used to',
    fullWordDisplay: 'be/get used to',
    meaningEn: 'accustomed to',
    meaningEnAccepted: ['accustomed to', 'accustomed to.', 'used to'],
    meaningAr: 'معتاد على شيء ما',
    category: 'fixed_phrase',
    scrambledTraps: ['be used for', 'get use to', 'be use to', 'get used of'],
    comicStory: 'اربط بالنغمة واللفظ الإنجليزي: اسمع القافية الموسيقية: Used TO تشبه نغمة Accustomed TO! التنتين فيهم حرف الجر TO بنفس النغمة: Get used to ➔ Accustomed to! تو مع تو، مستحيل تنساها!',
    comicHook: 'Used TO ➔ Accustomed TO (نفس القافية بحرف الـ TO)!'
  }
];
