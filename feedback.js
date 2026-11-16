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
}
};
