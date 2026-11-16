// 모의고사 답안지 (Claude 채점 결과). 날짜별로 추가한다. ★채점_지침서 기준, 점수는 추정.
// words: 출퇴근 표현 드릴에 "30 + @"로 붙는 암기 단어/문장 [영어, 한국어(|로 인정 답안)]
// 앱(index.html)은 오늘 날짜 이하의 가장 최근 답안지의 words를 그날 표현 30개 뒤에 붙인다.
const FEEDBACK = {
"2026-11-16": {
  title: "01일차 모의고사 (Day 2 세트)",
  total: "IM3~IH (약 130~140) 추정",
  urgent: "답을 끝까지 못 채우고 멈춤 → 주어+동사로 시작하는 짧은 완전한 문장 2~3개로 시간 채우기",
  retry: "Q11 → Q10 → Q5 → Q7 → Q9 → Q6 → Q3·Q4 → Q2·Q1",
  q: {
    1: { score:"발음 3 · 억양 2", fix:["문장 끝이 평평하게 끝남 → 마침표 앞에서 확실히 ↘", "\"today and get\" 빠뜨림 — 끝까지 읽기"],
         script:"Are you tired of spending hours in traffic every morning? ↗ / Then it's time to try City Bike Share. ↘ / With over three hundred stations / across the downtown area, / you can pick up a bike, ↗ ride to work, ↗ and drop it off near your office. ↘ / Monthly passes are available for students, ↗ seniors, ↗ and full-time employees. ↘ / Visit our website today / and get your first week free. ↘",
         words:["monthly (th)","employees"], grammar:"평서문 끝 ↘ · Yes/No 질문 끝 ↗ · 나열 A↗ B↗ and C↘" },
    2: { score:"발음 2 · 억양 2", fix:["delays·Exit Twelve·coastal이 다르게 들림", "마지막 문장(update in fifteen minutes, so stay tuned) 무너짐 — 같은 속도로 끝까지"],
         script:"Good morning, / and welcome to the seven o'clock traffic report / on City Radio. ↘ / Drivers heading north on Highway Nine / should expect delays / because of road construction near Exit Twelve. ↘ / If possible, / take Maple Avenue, ↗ Lake Road, ↗ or the coastal highway ↘ instead. / Traffic is moving smoothly / on all bridges into the city. ↘ / We'll have another update in fifteen minutes, / so stay tuned. ↘",
         words:["delays (d 또렷하게)","coastal (코우스틀)","exit (엑싯)"], grammar:"or 나열도 마지막 항목 ↘ · 숫자는 seven o'clock / Highway Nine 그대로" },
    3: { score:"2 (사진 미저장 — 내용 대조 못 함)", fix:["\"is sitting sit down\" → is sitting on a chair", "18초만 말하고 끝에 4초 침묵 → 느낌·추측 문장으로 30초 채우기"],
         script:"This picture was taken in a cozy café. In the middle, a man wearing glasses is pouring hot water into a cup behind the counter. On the right side, another man wearing a cap is sitting on a chair, waiting for his drink. Sunlight is coming in through the window, so it seems like a bright, relaxing afternoon.",
         words:["pour (붓다)","wearing a cap","waiting for"], grammar:"진행형은 is + ~ing 하나만 (is sitting) · 관사 a cap / a sunny day" },
    4: { score:"2 (사진 미저장)", fix:["\"the fruit or display\" → fruits are displayed", "뜻이 흐린 곳이 여러 군데 → 장소 → 가운데 → 왼쪽/오른쪽 → 느낌 순서 고정"],
         script:"This picture was taken in the produce section of a supermarket. In the middle, oranges are neatly displayed in wooden boxes. On the left side, there are some boxes of cherries, and they look fresh. Price tags are placed in front of each box, so it seems like the store has just restocked its fruit.",
         words:["produce section","be displayed","restock"], grammar:"물건이 놓여 있음 = 수동태 are displayed / are placed · there are + 복수" },
    5: { score:"2", fix:["15초 중 6초만 말함", "\"I did use my smartphone in one hour in day\" → 현재형 + for about ~ a day"],
         script:"I use my smartphone for about three hours a day. I mostly use it on my way to work and before I go to bed.",
         words:["for about ~ a day","on my way to work"], grammar:"습관 = 현재형 (I use) · 기간 for about three hours · 빈도 a day" },
    6: { score:"2", fix:["\"use carrying time\" → 이유를 because I can ~ 문장으로"],
         script:"My favorite app is YouTube, because I can relax by watching short videos before I go to sleep, and I also learn a lot from engineering channels.",
         words:["relax by ~ing","kill time"], grammar:"because + 주어 + 동사 (because I can relax)" },
    7: { score:"2", fix:["\"the young children to have smartphone is very good / it can to help\" 구조 깨짐", "30초 중 18초 — 예시 한 문장 추가", "learn이 run으로 들림"],
         script:"I think it's a good idea, as long as parents set some limits. First, children can learn anywhere and anytime with educational apps. Also, parents can contact them quickly in an emergency. For example, my nephew studies English words with an app every day, and his vocabulary has really improved.",
         words:["set limits","educational app","in an emergency","learn (l + 어)"], grammar:"It's a good idea for 사람 to 동사 · can + 동사원형 (can help, can to help ✘)" },
    8: { score:"3 ✅", fix:["정확함. \"is with Jason Choi\"처럼 with만 넣으면 더 자연스러움"],
         script:"The first interview is at 9:30 a.m. with Jason Choi, who is applying for the sales manager position.",
         words:["applicant","be applying for"], grammar:"interview is with + 사람 · at + 시각" },
    9: { score:"2", fix:["너무 짧고 3초 침묵 → 한 문장 더", "canceled 끝 -led 발음"],
         script:"Actually, I'm afraid that's not right. Kevin Moore's interview at 11:30 has been canceled, so you'll have some free time before the 1:30 interview.",
         words:["has been canceled","I'm afraid that's not right"], grammar:"정정: Actually, ~ has been canceled / changed (현재완료 수동태)" },
    10:{ score:"2", fix:["지원자 일부만 말함 → Sales Manager 지원자 전부 (Jason Choi, Brian Song + Kevin Moore 취소)", "Blue Mobile → room mobile로 들림"],
         script:"There are two applicants for the sales manager position. First, Jason Choi, who currently works at Blue Mobile, will be interviewed at 9:30 a.m. Second, Brian Song from Green Foods has an interview at 3:00 p.m. Kevin Moore also applied, but his interview has been canceled.",
         words:["current employer","be interviewed","also applied"], grammar:"There are two ~ · First, ~ Second, ~ · who currently works at ~" },
    11:{ score:"3 / 5", fix:["반복(\"running running\", \"I did so I did\") 없애기", "이유 하나 → 내 경험을 누가·언제·결과로", "learn → run으로 들림"],
         script:"I agree that students should start learning a foreign language in elementary school. The main reason is that young children pick up new sounds much more easily, so they can build natural pronunciation and confidence early. For example, in my case, I (내 경험: 처음 영어를 배운 시기와 어려웠던 점). Then, when I traveled abroad two years ago, I realized how much easier it is to talk to foreigners when you're not afraid of making mistakes, and that kind of confidence comes from starting early. On top of that, learning a language early helps children understand other cultures. That's why I believe foreign language education should begin in elementary school.",
         words:["build confidence","global society","on top of that","That's why I believe"], grammar:"의견(첫 10초) → The main reason is that ~ → For example, in my case ~ → That's why ~ · ⚠️ 통째 암기 금지, 예시는 내 경험으로" }
  },
  notes: [
    {"q": 3, "type": "문법", "said": "a man wearing cap is sitting sit down on the chair", "fix": "A man wearing a cap is sitting on a chair.", "why": "진행형은 be + ~ing 하나만 (is sitting). sit down 중복 ✘. 처음 말하는 물건엔 a (a cap, a chair)."},
    {"q": 3, "type": "문법", "said": "I think it seems like sunny day.", "fix": "It seems like a sunny day.", "why": "I think + it seems 둘 다 쓰면 중복. 셀 수 있는 명사 앞 관사 a."},
    {"q": 4, "type": "문법", "said": "picture was taken in the supermarket", "fix": "This picture was taken in a supermarket.", "why": "주어 This picture를 빼먹으면 문장이 아님. 처음 말하는 장소는 a supermarket."},
    {"q": 4, "type": "문법", "said": "the fruit or display on the boxes", "fix": "Some fruits are displayed in boxes.", "why": "물건이 '놓여 있다' = 수동태 are displayed. 상자 '안' = in boxes."},
    {"q": 4, "type": "문법", "said": "the orange or fruit in the boxes", "fix": "There are oranges in the boxes.", "why": "'~이 있다'는 There are + 복수명사."},
    {"q": 5, "type": "문법", "said": "I did use my smartphone in one hour in day", "fix": "I use my smartphone for about one hour a day.", "why": "습관은 현재형 I use (did use ✘). 기간은 for about ~, 빈도는 a day."},
    {"q": 6, "type": "표현", "said": "I usually use carrying time before I sleep", "fix": "I usually use it to kill time before I go to sleep.", "why": "use it to + 동사원형 (~하려고 쓴다). '시간 때우기' = kill time."},
    {"q": 7, "type": "문법", "said": "I think the young children to have smart phone is very good", "fix": "I think it's a good idea for young children to have smartphones.", "why": "긴 주어 대신 It's a good idea for 사람 to 동사. smartphones 복수."},
    {"q": 7, "type": "문법", "said": "it can to help run some internet", "fix": "They can help children learn on the internet.", "why": "can 뒤에는 동사원형 (can to ✘). help + 사람 + 동사원형."},
    {"q": 7, "type": "문법", "said": "they can run something and anywhere in any time", "fix": "They can learn anything, anywhere, anytime.", "why": "anything, anywhere, anytime 세 개를 나란히. 전치사 in ✘."},
    {"q": 7, "type": "문법", "said": "So it's very good to young children.", "fix": "So it's very good for young children.", "why": "'~에게 좋다' = good for."},
    {"q": 7, "type": "발음", "said": "learn → run 으로 들림", "fix": "learn", "why": "l은 혀끝을 윗잇몸에 붙이고 시작, 모음은 입을 덜 벌린 '얼'(ər). r처럼 혀를 말지 않기."},
    {"q": 8, "type": "문법", "said": "The first interview is Jason Choi and the time is 9:30 am.", "fix": "The first interview is with Jason Choi at 9:30 a.m.", "why": "면접은 사람이 아니라 '사람과 하는 것' → is with Jason Choi. 시각은 at 9:30 하나로 붙이기."},
    {"q": 9, "type": "문법", "said": "Now each round the Kevin Moore is canceled", "fix": "No, actually, Kevin Moore's interview has been canceled.", "why": "취소된 건 사람이 아니라 '면접' → Kevin Moore's interview. 이미 취소됨 = has been canceled. 이름 앞 the ✘."},
    {"q": 9, "type": "발음", "said": "canceled → cancer 로 들림", "fix": "canceled", "why": "끝의 -led(얼드)까지: 캔-썰드. d를 살짝이라도 내기."},
    {"q": 10, "type": "문법", "said": "every manager to see sir is Jensen Choi", "fix": "The applicants for the sales manager position are Jason Choi and Brian Song.", "why": "질문 그대로 받아서 주어 만들기: The applicants for ~ are A and B. 지원자 전부 말하기."},
    {"q": 10, "type": "표현", "said": "His current employee is Blue Mobile", "fix": "He currently works at Blue Mobile.", "why": "employee = 직원, employer = 고용주(회사). 가장 쉬운 말: He currently works at ~."},
    {"q": 10, "type": "문법", "said": "he interviews start at 9:30am", "fix": "His interview starts at 9:30 a.m.", "why": "소유격 his. 주어가 하나(interview)면 동사에 -s (starts)."},
    {"q": 11, "type": "문법", "said": "Students should run a foreign language start in elementary school", "fix": "Students should start learning a foreign language in elementary school.", "why": "start + ~ing (start learning). learn 발음 주의."},
    {"q": 11, "type": "문법", "said": "it's very hard to run English", "fix": "It was very hard to learn English.", "why": "지난 일은 과거형 was."},
    {"q": 11, "type": "표현", "said": "I did some trip two years ago", "fix": "I took a trip two years ago.", "why": "'여행 가다' = take a trip (과거 took). did ✘."},
    {"q": 11, "type": "문법", "said": "I can it can communication with others", "fix": "I could communicate with others.", "why": "communicate(동사) / communication(명사). can 뒤에는 동사. 지난 일이면 could."},
    {"q": 11, "type": "문법", "said": "I agreed with foreign statement", "fix": "That's why I agree with the statement.", "why": "지금 의견은 현재형 agree. 마무리는 That's why ~."}
  ],
  words: [
    ["delay","지연|지체|늦어짐"],["coastal","해안의|해안"],["exit","출구|나가는 곳"],["monthly pass","월 정기권|한 달 이용권|월정액"],
    ["learn","배우다|익히다"],["be canceled","취소되다"],["be displayed","진열되다|전시되다|진열돼 있다"],["produce section","농산물 코너|청과 코너|과일 코너"],
    ["restock","재입고하다|다시 채우다"],["pour","붓다|따르다"],["applicant","지원자"],["current employer","현재 직장|현재 고용주|지금 회사"],
    ["be interviewed","면접을 보다|면접 보다"],["educational app","교육용 앱|교육 앱"],["in an emergency","비상시에|긴급 상황에|위급할 때"],
    ["kill time","시간을 때우다"],["set limits","제한을 두다|한도를 정하다|제한하다"],["build confidence","자신감을 키우다|자신감을 기르다"],
    ["I use my smartphone for about three hours a day.","나는 하루에 스마트폰을 약 세 시간 써요|하루에 스마트폰을 세 시간쯤 써요"],
    ["Kevin Moore's interview has been canceled.","케빈 무어의 면접은 취소됐어요|케빈 무어 면접이 취소되었어요"],
    ["Some fruits are displayed in boxes.","과일이 상자에 진열되어 있어요|과일들이 상자에 진열돼 있어요"],
    ["A man is sitting on a chair.","한 남자가 의자에 앉아 있어요|남자가 의자에 앉아 있어요"],
    ["It's a good idea for children to have smartphones.","아이들이 스마트폰을 갖는 것은 좋은 생각이에요|아이들이 스마트폰을 가지는 건 좋은 생각이에요"]
  ]
},
"2026-11-16-2": {
 "title": "01일차 모의고사 2회차 (Day 2 세트 재응시)",
 "total": "IM3~IH (약 130~140) 추정 — 1회차와 원점수 같음, 시간 채우기는 확실히 좋아짐",
 "urgent": "Q3·Q4 사진 묘사가 단어 반복(wearing wearing watching…)으로 끊김 → 위치 + 사람 + be ~ing 한 문장씩 4개 고정 틀",
 "retry": "Q3 → Q4 → Q11 → Q2 → Q10 → Q7 → Q9 → Q5 → Q6",
 "q": {
  "1": {
   "score": "발음 3 · 억양 2",
   "fix": [
    "거의 완벽 ✅ — 1회차에서 빠뜨린 부분도 다 읽음",
    "work → walk, monthly → mostly, students → stunts 로 들림",
    "후반 1~2초 쉼 두 번 → 의미 단위(/)에서만 끊기",
    "나열·문장 끝 ↘가 아직 평평하거나 올라감"
   ],
   "script": "Are you tired of spending hours in traffic every morning? ↗ / Then it's time to try City Bike Share. ↘ / With over three hundred stations / across the downtown area, / you can pick up a bike, ↗ ride to work, ↗ and drop it off near your office. ↘ / Monthly passes are available for students, ↗ seniors, ↗ and full-time employees. ↘ / Visit our website today / and get your first week free. ↘",
   "words": [
    "work (워ㄹㅋ, 입 작게)",
    "monthly (먼th리)",
    "students (스튜-든츠)"
   ],
   "grammar": "나열 A↗ B↗ and C↘ · 마침표 앞은 반드시 ↘"
  },
  "2": {
   "score": "발음 2 · 억양 2",
   "fix": [
    "seven o'clock → 7th 로 읽음",
    "near Exit Twelve 통째로 무너짐 (East East Trev)",
    "If possible → Impossible",
    "coastal → Costa, Drivers → Drives",
    "마지막 so stay tuned 빠뜨림 + 'Good!' 혼잣말 ✘",
    "속도 86wpm으로 느림 → 끊김 줄이기"
   ],
   "script": "Good morning, ↘ and welcome to the seven o'clock traffic report / on City Radio. ↘ / Drivers heading north on Highway 9 / should expect delays / because of road construction / near Exit Twelve. ↘ / If possible, / take Maple Avenue, ↗ Lake Road, ↗ or the Coastal Highway instead. ↘ / Traffic is moving smoothly / on all bridges into the city. ↘ / We'll have another update in fifteen minutes, / so stay tuned. ↘",
   "words": [
    "Exit Twelve",
    "If possible",
    "coastal (코우스틀)",
    "drivers",
    "stay tuned"
   ],
   "grammar": "시각 seven o'clock (7th ✘) · 녹음 중 혼잣말 금지 — 끝나면 그냥 멈추기"
  },
  "3": {
   "score": "2",
   "fix": [
    "'wearing wearing watching watching watching' 반복 → 단어가 안 떠오르면 더 쉬운 동사(is standing / is holding)로 바꾸기",
    "30초 중 18초만 말함",
    "가운데 여자·계산대·컵 등 묘사 안 함"
   ],
   "script": "This picture was taken in a coffee shop. On the left, a man wearing a beanie is leaning on the counter and looking at his phone. In the middle, a woman with long hair is standing at the counter, waiting for her order. On the right, an older man and a woman in a plaid shirt are talking at the register. There are some cups on the counter, and it looks like a relaxed afternoon.",
   "words": [
    "beanie",
    "lean on the counter",
    "register",
    "waiting for her order",
    "plaid shirt"
   ],
   "grammar": "위치 + 사람 + be ~ing (On the left, a man is leaning on ~) · 모르는 단어는 버리고 쉬운 동사로"
  },
  "4": {
   "score": "2",
   "fix": [
    "shelves → sherbet 로 들림",
    "실내 시장인데 'sunny day' ✘ → 사진에 있는 것만",
    "headscarf 단어 대신 tissue → 모르면 a woman wearing a scarf",
    "The fruit are ✘ → Some fruits are"
   ],
   "script": "This picture was taken at an indoor market. In the front, some strawberries and blueberries are displayed in small boxes with price signs. Next to them, there are some lettuce and tomatoes. On the right, a woman wearing a headscarf is looking at the vegetables. In the background, some people are walking down the aisle under a glass roof.",
   "words": [
    "indoor market",
    "price sign",
    "shelves (셸브즈)",
    "headscarf",
    "aisle (아일)"
   ],
   "grammar": "진열 = are displayed (수동태) · There are + 복수 · fruit 셀 때는 fruits / some fruit"
  },
  "5": {
   "score": "2",
   "fix": [
    "6초 침묵 → 바로 시작 ✅ 크게 좋아짐",
    "at 3 hours in a day ✘ → for about three hours a day",
    "I mostly use watching ✘ → I mostly use it to watch"
   ],
   "script": "I use my smartphone for about three hours a day. I mostly use it to watch videos and to call my parents.",
   "words": [
    "for about ~ a day",
    "use it to + 동사"
   ],
   "grammar": "기간 for about · 빈도 a day · use it to 동사원형"
  },
  "6": {
   "score": "2",
   "fix": [
    "이유가 'so watching some video' 로 깨짐 → because I can ~",
    "before I got to sleep → before I go to sleep (습관은 현재형)"
   ],
   "script": "My favorite app is YouTube, because I can relax by watching short videos before I go to sleep. I also learn a lot from engineering channels.",
   "words": [
    "relax by ~ing",
    "before I go to sleep"
   ],
   "grammar": "because + 주어 + 동사 · 습관은 현재형 (go, got ✘)"
  },
  "7": {
   "score": "2",
   "fix": [
    "첫 문장 'It's a good idea for young children to have smartphones' ✅ 고친 틀 그대로 씀",
    "because because 반복",
    "'his vocabulary skill is very high for the me' 구조 깨짐",
    "끝이 'to have some'으로 잘림 → 마무리 한 문장"
   ],
   "script": "I think it's a good idea for young children to have smartphones. For example, my younger brother studies English words with an app on his smartphone, and his vocabulary is much better than mine was at his age. So I think smartphones can be really helpful for young children.",
   "words": [
    "younger brother",
    "much better than mine",
    "be helpful for"
   ],
   "grammar": "비교: better than mine (for the me ✘) · help + 사람 + 동사원형"
  },
  "8": {
   "score": "3 ✅",
   "fix": [
    "정답 정보는 다 맞음",
    "interviewer = 면접관 → 지원자는 the first interview is with ~",
    "Jason → Johnson 으로 들림"
   ],
   "script": "The first interview is at 9:30 a.m. with Jason Choi, who currently works at Blue Mobile.",
   "words": [
    "interviewer(면접관) vs applicant(지원자)",
    "Jason (제이슨)"
   ],
   "grammar": "The first interview is with + 사람 · at + 시각"
  },
  "9": {
   "score": "2",
   "fix": [
    "'So you're free at one thirty'처럼 다음 일정까지 말한 건 ✅ 좋아짐",
    "Kevin Moore's interview / has been canceled 문장이 'was is what is canceled'로 무너짐",
    "eleven thirty → elementary, one thirty → one story 로 들림 (th 발음)",
    "※ 음성인식이 섞였을 수 있어 실제보다 조금 낮게 들렸을 가능성 있음"
   ],
   "script": "Actually, I'm afraid that's not right. Kevin Moore's interview at 11:30 has been canceled, so you'll be free until the next interview at 1:30.",
   "words": [
    "has been canceled",
    "thirty (써-리)",
    "I'm afraid that's not right"
   ],
   "grammar": "현재완료 수동태 has been canceled — was is ✘, 한 동사만"
  },
  "10": {
   "score": "2",
   "fix": [
    "두 지원자 다 말함 ✅ 1회차보다 좋아짐",
    "'his job is Blue Mobile' ✘ → he currently works at",
    "sales mobile → sales manager, Green Fools → Green Foods",
    "nine thirty → 9 story (th)",
    "the Brain Song ✘ → 이름 앞 the 빼기"
   ],
   "script": "There are two applicants for the sales manager position. First, Jason Choi, who currently works at Blue Mobile, has an interview at 9:30 a.m. Second, Brian Song from Green Foods will be interviewed at 3:00 p.m. Kevin Moore also applied, but his interview has been canceled.",
   "words": [
    "works at ~",
    "applicant",
    "be interviewed"
   ],
   "grammar": "There are two applicants for ~ · First, ~ Second, ~ · 이름 앞 관사 ✘"
  },
  "11": {
   "score": "3 / 5",
   "fix": [
    "47.8초·99단어로 1회차(73단어)보다 길어짐 ✅",
    "learn → run, foreign → 4-inch 로 계속 들림 (가장 큰 감점)",
    "'so … but … because … so' 한 문장으로 끝없이 이어짐 → 마침표 찍고 새 문장",
    "경험(8살에 영어 시작 → 유럽 여행에서 외국 친구와 대화)은 좋음 → 결과를 짧게 정리"
   ],
   "script": "I agree that students should start learning a foreign language in elementary school. The main reason is that young children pick up new sounds much more easily. For example, in my case, I started learning English when I was eight. At first it was very hard to understand, but because I started early, I got used to it. Two years ago, when I traveled around Europe, I could easily catch up with my foreign friends in conversation. That's why I believe learning a foreign language early is really helpful.",
   "words": [
    "foreign (f-오린, 윗니로 아랫입술)",
    "learn (l-얼ㄴ)",
    "get used to",
    "catch up with",
    "travel around Europe"
   ],
   "grammar": "한 문장 = 한 생각 · 마침표 → 다음 문장 · 의견 → The main reason → For example, in my case → That's why · ⚠️ 통째 암기 금지"
  }
 },
 "notes": [
  {
   "q": 1,
   "type": "발음",
   "said": "work → walk 로 들림",
   "fix": "work",
   "why": "work는 입을 작게 오므린 '워ㄹㅋ'(ɜːr), walk는 크게 벌린 '워ㅋ'. r 소리를 살짝 넣기."
  },
  {
   "q": 1,
   "type": "발음",
   "said": "monthly → mostly 로 들림",
   "fix": "monthly",
   "why": "n-th: 먼(n) 다음 혀끝을 이 사이에 살짝 → th리. s로 새지 않게."
  },
  {
   "q": 2,
   "type": "읽기",
   "said": "welcome to 7th traffic report",
   "fix": "welcome to the seven o'clock traffic report",
   "why": "7:00 = seven o'clock. 서수(seventh)로 읽지 않기. 앞에 the."
  },
  {
   "q": 2,
   "type": "발음",
   "said": "near East East Trev",
   "fix": "near Exit Twelve",
   "why": "Exit = 엑-싯(g 소리 아님 egzit 가능), Twelve = 트웰브(v로 끝). 숫자는 모르면 천천히라도 정확하게."
  },
  {
   "q": 2,
   "type": "읽기",
   "said": "Impossible take Maple Avenue",
   "fix": "If possible, take Maple Avenue",
   "why": "If possible, 다음에 쉼표 쉬기 → 붙여 읽으면 impossible로 들림."
  },
  {
   "q": 2,
   "type": "발음",
   "said": "Costa Highway",
   "fix": "Coastal Highway",
   "why": "coastal = 코우스틀. 끝 -tal을 '틀'로 확실히."
  },
  {
   "q": 3,
   "type": "문법",
   "said": "man wearing wearing watching watching watching is wearing a hat",
   "fix": "A man wearing a hat is looking at his phone.",
   "why": "단어가 막히면 같은 단어 반복 대신 쉬운 동사(looking at / holding)로 바꾸고 문장을 끝내기. 문장 = 주어 + be ~ing."
  },
  {
   "q": 3,
   "type": "표현",
   "said": "is using a circle",
   "fix": "is holding a phone",
   "why": "모르는 물건은 아는 가장 쉬운 단어로(phone, cup, bag)."
  },
  {
   "q": 3,
   "type": "문법",
   "said": "Two people are talking to all of them",
   "fix": "Two people are talking to each other.",
   "why": "서로 = each other."
  },
  {
   "q": 4,
   "type": "문법",
   "said": "The fruit are displayed on the sherbet",
   "fix": "Some fruits are displayed on the shelves.",
   "why": "fruit 단수면 is, 여러 종류면 fruits are. shelves = 셸브즈 (shelf의 복수)."
  },
  {
   "q": 4,
   "type": "표현",
   "said": "a woman wearing some tissue",
   "fix": "a woman wearing a headscarf",
   "why": "머리 스카프 = headscarf. 모르면 a scarf."
  },
  {
   "q": 4,
   "type": "내용",
   "said": "it looks like sunny day",
   "fix": "It looks like a busy market.",
   "why": "실내 사진엔 날씨 말하지 않기 — 보이는 것만. 셀 수 있는 명사 앞 a."
  },
  {
   "q": 5,
   "type": "문법",
   "said": "I usually use my smartphone at 3 hours in a day",
   "fix": "I usually use my smartphone for about three hours a day.",
   "why": "기간은 for (at ✘), 빈도는 a day (in a day ✘)."
  },
  {
   "q": 5,
   "type": "문법",
   "said": "I mostly use watching some video",
   "fix": "I mostly use it to watch videos.",
   "why": "use it to + 동사원형. video는 셀 수 있으니 videos."
  },
  {
   "q": 6,
   "type": "문법",
   "said": "I usually use the YouTube so watching some video and before I got to sleep",
   "fix": "I usually watch YouTube videos before I go to sleep.",
   "why": "앱 이름 앞 the ✘. 습관은 현재형 go (got ✘). so 뒤엔 주어+동사."
  },
  {
   "q": 7,
   "type": "문법",
   "said": "his vocabulary skill is very high for the me",
   "fix": "His vocabulary is much better than mine.",
   "why": "비교는 better than + mine. 'for the me' 같은 형태는 없음."
  },
  {
   "q": 7,
   "type": "문법",
   "said": "he is studying smart phone vocabulary in English",
   "fix": "He studies English words with an app on his smartphone.",
   "why": "평소 습관은 현재형 studies. '스마트폰으로' = with an app on his smartphone."
  },
  {
   "q": 8,
   "type": "표현",
   "said": "First interviewer is Johnson Choi",
   "fix": "The first interview is with Jason Choi.",
   "why": "interviewer = 면접관. 지원자와의 면접은 interview is with + 사람."
  },
  {
   "q": 9,
   "type": "문법",
   "said": "Kevin Mora was is what is canceled",
   "fix": "Kevin Moore's interview has been canceled.",
   "why": "동사는 하나만: has been canceled. 사람이 아니라 면접(interview)이 취소됨."
  },
  {
   "q": 9,
   "type": "발음",
   "said": "eleven thirty → elementary / one thirty → one story",
   "fix": "eleven thirty / one thirty",
   "why": "thirty = 혀끝을 이 사이에 → 써-리. s나 st로 내지 않기."
  },
  {
   "q": 10,
   "type": "표현",
   "said": "his job is Blue Mobile",
   "fix": "He currently works at Blue Mobile.",
   "why": "job = 직업. 회사는 works at + 회사."
  },
  {
   "q": 10,
   "type": "문법",
   "said": "the Brain Song is also sales mobile",
   "fix": "Brian Song is also applying for the sales manager position.",
   "why": "이름 앞 the ✘. 표에 있는 단어(manager)는 그대로 읽기."
  },
  {
   "q": 11,
   "type": "발음",
   "said": "foreign → 4-inch 로 들림",
   "fix": "foreign",
   "why": "f는 윗니를 아랫입술에 대고 바람 → 'f오-린'. 끝에 ch 소리 없음."
  },
  {
   "q": 11,
   "type": "발음",
   "said": "learn → run 으로 들림 (2회 연속)",
   "fix": "learn",
   "why": "l: 혀끝을 윗잇몸에 붙이고 시작, 모음은 입 작게 '얼'. 이번 주 최우선 발음."
  },
  {
   "q": 11,
   "type": "문법",
   "said": "in my case I run a 4-inch language in English first round is elementary school and the age is 8",
   "fix": "In my case, I started learning English when I was eight.",
   "why": "start learning ~ when I was 나이. 한 문장 = 한 생각."
  },
  {
   "q": 11,
   "type": "표현",
   "said": "I did trip with Europe",
   "fix": "I traveled around Europe.",
   "why": "'유럽을 여행하다' = travel around Europe / take a trip to Europe."
  }
 ],
 "words": [
  [
   "beanie",
   "비니|털모자"
  ],
  [
   "lean on the counter",
   "카운터에 기대다|카운터에 기대어 있다"
  ],
  [
   "register",
   "계산대"
  ],
  [
   "plaid shirt",
   "체크 셔츠|체크무늬 셔츠"
  ],
  [
   "headscarf",
   "머리 스카프|스카프"
  ],
  [
   "shelves",
   "선반들|선반"
  ],
  [
   "aisle",
   "통로"
  ],
  [
   "price sign",
   "가격표"
  ],
  [
   "indoor market",
   "실내 시장"
  ],
  [
   "each other",
   "서로"
  ],
  [
   "Exit Twelve",
   "12번 출구"
  ],
  [
   "If possible",
   "가능하면|가능하다면"
  ],
  [
   "stay tuned",
   "채널 고정|채널 고정하세요"
  ],
  [
   "get used to",
   "익숙해지다|~에 익숙해지다"
  ],
  [
   "travel around Europe",
   "유럽을 여행하다|유럽 여행하다"
  ],
  [
   "foreign language",
   "외국어"
  ],
  [
   "better than mine",
   "내 것보다 낫다|나보다 낫다"
  ],
  [
   "A man wearing a beanie is leaning on the counter.",
   "비니를 쓴 남자가 카운터에 기대어 있어요|비니 쓴 남자가 카운터에 기대 있어요"
  ],
  [
   "Some fruits are displayed on the shelves.",
   "과일이 선반에 진열되어 있어요|과일들이 선반에 진열돼 있어요"
  ],
  [
   "I mostly use it to watch videos.",
   "주로 영상 보는 데 써요|주로 영상을 보려고 써요"
  ],
  [
   "He currently works at Blue Mobile.",
   "그는 현재 블루 모바일에서 일해요|그는 지금 블루 모바일에서 일해요"
  ],
  [
   "I started learning English when I was eight.",
   "저는 여덟 살 때 영어를 배우기 시작했어요|여덟 살 때 영어를 배우기 시작했어요"
  ]
 ]
}
};
