// 실전 연습 데이터 (연습문제은행 06과 동일). Day 1 = 2026-11-16.
const P2_SCENES = [
 ["office meeting presentation","street crosswalk people"],["cafe counter barista customer","supermarket vegetables shopping"],
 ["airport check-in line luggage","park bench people dog"],["construction workers helmet","library students studying"],
 ["restaurant waiter serving food","train station platform"],["outdoor market stall","office copy machine coworkers"],
 ["hotel lobby front desk","bicycle riders city street"],["warehouse boxes forklift","kitchen cooking family"],
 ["concert stage audience","bus stop waiting people"],["hospital reception","bookstore customers shelves"],
 ["conference room laptops","beach umbrellas people"],["clothing store fitting room","farmers market fruits"],
 ["office meeting presentation","outdoor market stall"]
];
const P3_SETS = [
 {ctx:"A marketing firm is doing research about coffee shops.",q:["How often do you go to a coffee shop, and who do you usually go with?","What do you usually order at a coffee shop? Why?","Which would you prefer: a large franchise coffee shop or a small local cafe? Why?"]},
 {ctx:"You are participating in a survey about smartphones.",q:["How many hours a day do you use your smartphone?","What is your favorite app, and why do you use it?","Do you think it's a good idea for young children to have smartphones? Why or why not?"]},
 {ctx:"A travel magazine is researching travel habits.",q:["When was the last time you went on a trip, and where did you go?","Do you prefer to travel alone or with others? Why?","What is the most important factor when you choose a hotel: price, location, or reviews? Why?"]},
 {ctx:"Your city is researching public transportation.",q:["How do you usually get to work or school, and how long does it take?","What do you usually do while you are on public transportation?","What would encourage more people in your city to use public transportation? Why?"]},
 {ctx:"A bookstore is doing research about reading habits.",q:["How often do you read books, and what kind of books do you read?","Do you prefer paper books or e-books? Why?","Would you join a book discussion group? Why or why not?"]},
 {ctx:"A fitness company is researching exercise habits.",q:["How often do you exercise, and where do you usually exercise?","When do you usually exercise: in the morning or in the evening? Why?","If a new gym opened near your home, what would most influence your decision to join it? Why?"]},
 {ctx:"An online shopping company is doing a survey.",q:["What was the last thing you bought online?","How long does it usually take for your online orders to arrive?","What are the advantages of shopping at a store instead of online?"]},
 {ctx:"A research firm is studying how people spend their weekends.",q:["What did you do last weekend?","Do you usually spend your weekends at home or outside? Why?","Which would you prefer for a weekend: watching a movie at home or going to a concert? Why?"]},
 {ctx:"A company is researching music listening habits.",q:["When do you usually listen to music, and for how long?","How do you usually find new music to listen to?","Do you think it's a good idea to listen to music while studying or working? Why?"]},
 {ctx:"A local newspaper is writing about restaurants in your area.",q:["How often do you eat out, and who do you usually eat with?","What kind of food do you enjoy the most? Why?","What is the most important thing when you choose a restaurant: taste, price, or atmosphere? Why?"]},
 {ctx:"A university is researching online classes.",q:["Have you ever taken an online class? What was it about?","What device do you usually use for online classes or meetings? Why?","Do you think online classes are as effective as classes in a classroom? Why or why not?"]},
 {ctx:"A company is researching how people use their free time after work.",q:["What time do you usually finish work or school, and what do you do after that?","Would you like to learn a new skill in your free time? What skill?","What would be the best way for a company to help employees reduce stress? Why?"]},
 {ctx:"A community center is researching how people use neighborhood parks.",q:["How often do you go to a park near your home?","What do you usually do when you go to a park?","What would make the parks in your neighborhood better? Why?"]}
];
const P4_TABLES = {
 A:{title:"Greenville Marketing Conference",info:"Date: Saturday, March 14 · Location: Riverside Hotel, Ballroom · Registration fee: $60 (members $40)",head:["Time","Session","Speaker"],rows:[["9:00–9:30 a.m.","Welcome Speech","Daniel Park"],["9:30–10:30 a.m.","Workshop: Social Media Trends","Emily Clark"],["10:30–11:30 a.m.","Lecture: Building a Brand","Mark Lee"],["11:30 a.m.–12:30 p.m.","Lunch",""],["12:30–1:30 p.m.","<s>Panel: Online Advertising</s> (Canceled)","Various"],["1:30–2:30 p.m.","Workshop: Customer Data","Emily Clark"],["2:30–3:30 p.m.","Presentation: Marketing Budgets","Sarah Kim"]]},
 B:{title:"Job Interview Schedule — Hanbit Electronics",info:"Friday, June 5 · Room 402",head:["Time","Applicant","Position","Current employer"],rows:[["9:30 a.m.","Jason Choi","Sales Manager","Blue Mobile"],["10:30 a.m.","Mina Han","Design Engineer","Star Motors"],["11:30 a.m.","<s>Kevin Moore</s> (Canceled)","Sales Manager","Top Retail"],["1:30 p.m.","Linda Yoon","Design Engineer","Hanbit Electronics (internal)"],["3:00 p.m.","Brian Song","Sales Manager","Green Foods"]]},
 C:{title:"Resume — Sophie Lin",info:"Applying for: Project Manager",head:["Section","Details"],rows:[["Education","M.S. in Mechanical Engineering, Korea University, 2019"],["","B.S. in Mechanical Engineering, Jeonbuk National University, 2017"],["Experience","Senior Engineer, Hyundai Robotics (2021–present)"],["","Engineer, LG Parts (2019–2021)"],["Skills","AutoCAD, Python, fluent in English and Chinese"]]},
 D:{title:"City Library Summer Program",info:"July · Free for members",head:["Date","Program","Time","Instructor"],rows:[["July 3 (Mon)","Kids Story Time","10:00 a.m.","Amy Lee"],["July 5 (Wed)","Resume Writing Workshop","7:00 p.m.","John Kim"],["July 10 (Mon)","Photography Basics","2:00 p.m.","Amy Lee"],["July 12 (Wed)","Resume Writing Workshop → <b>moved to July 14 (Fri)</b>","7:00 p.m.","John Kim"],["July 17 (Mon)","Book Club: Science Fiction","6:30 p.m.","Paul Han"]]},
 E:{title:"Business Trip Itinerary — Mr. Ryan Cho (Tokyo)",info:"Hotel: Shinjuku Plaza Hotel (2 nights)",head:["Date","Time","Schedule"],rows:[["Nov 3 (Tue)","8:20 a.m.","Depart Incheon (KE701) → arrive Tokyo 10:40 a.m."],["Nov 3","2:00 p.m.","Meeting with Sato Trading"],["Nov 4 (Wed)","10:00 a.m.","Factory tour, Yokohama"],["Nov 4","6:30 p.m.","<s>Dinner with clients</s> (Canceled)"],["Nov 5 (Thu)","1:00 p.m.","Depart Tokyo → arrive Incheon 3:30 p.m."]]},
 F:{title:"Riverside Community Center Fitness Classes",info:"Fee: $30 per month per class",head:["Class","Day","Time","Room"],rows:[["Yoga","Mon, Wed","7:00 a.m.","Studio A"],["Swimming","Tue, Thu","6:00 p.m.","Pool"],["Pilates","Mon, Wed","7:30 p.m.","Studio B"],["Basketball","Saturday","10:00 a.m.","Gym"],["Dance","Friday","8:00 p.m.","Studio A (new class)"]]},
 G:{title:"New Employee Training Workshop",info:"Friday, April 10 · Training Room 3",head:["Time","Session","Leader"],rows:[["9:00 a.m.","Company History & Values","CEO Jane Moon"],["10:00 a.m.","Safety Rules","Tom Baker"],["11:00 a.m.","Computer System Training","Lisa Park"],["12:00 p.m.","Lunch (provided)",""],["1:00 p.m.","Team Building Activity","Tom Baker"],["3:00 p.m.","Q&A with Managers","Various"]]}
};
const P4_DAYS = [
 {t:"A",q:["Where is the conference held, and how much is registration?","I heard there's a panel on online advertising after lunch. Is that right?","Can you tell me about the sessions Emily Clark is leading?"]},
 {t:"B",q:["What time is the first interview, and who is it with?","I'll meet Kevin Moore at 11:30, right?","Who are the applicants for the Sales Manager position?"]},
 {t:"C",q:["What was her most recent degree, and when did she receive it?","I heard she has no experience at a large company. Is that true?","Tell me about her work experience."]},
 {t:"D",q:["Do I have to pay for the programs?","There's a resume workshop on July 12, right?","What programs does Amy Lee teach?"]},
 {t:"E",q:["What time does my flight leave, and when does it arrive?","I have a dinner with clients on Wednesday, right?","What's my schedule on November 3rd and 4th?"]},
 {t:"F",q:["How much are the classes?","Swimming is on Monday, right?","I can only come in the evening. Which classes can I take?"]},
 {t:"G",q:["Where and when is the training?","I have to bring my own lunch, right?","What sessions is Tom Baker leading?"]},
 {t:"A",q:["What time does the conference start, and who gives the first speech?","I'm a member. Do I have to pay sixty dollars?","What's scheduled in the afternoon after lunch?"]},
 {t:"B",q:["Where will the interviews take place?","All the applicants are from other companies, right?","Tell me about the interviews for the Design Engineer position."]},
 {t:"C",q:["Where did she get her bachelor's degree?","Does she speak any foreign languages?","Can you give me details about her education and skills?"]},
 {t:"D",q:["When is the book club meeting?","All the programs are in the morning, right?","I work during the day. Which programs can I attend in the evening?"]},
 {t:"E",q:["Where am I staying?","I'm coming back on Friday, right?","Can you tell me about all my meetings during the trip?"]},
 {t:"F",q:["Where is the dance class?","There are no classes on weekends, right?","Tell me about the classes on Monday and Wednesday."]}
];
const P5_DAYS = [
 ["Do you agree or disagree with the following statement? Employees should be allowed to work from home at least two days a week. Use specific reasons or examples to support your opinion.","Which is the most important quality for a team leader: good communication, technical knowledge, or decision-making skills? Use specific reasons or examples to support your opinion."],
 ["Do you agree or disagree with the following statement? Students should learn a foreign language starting in elementary school.","What are the advantages of taking online classes? Use specific reasons or examples to support your opinion."],
 ["Would you prefer to work for a large company or a small company? Why?","Do you agree or disagree with the following statement? Social media has more negative effects than positive effects on young people."],
 ["Which is the best way for a city to reduce traffic: improving public transportation, raising parking fees, or building more roads?","Do you agree or disagree with the following statement? Companies should provide free meals to employees."],
 ["Do you agree or disagree with the following statement? It is better to save money than to spend it on travel.","What is the most effective way to learn new job skills: taking a class, watching online videos, or learning from coworkers?"],
 ["Do you agree or disagree with the following statement? Children should be required to do household chores.","Would you prefer to live in a big city or a small town? Why?"],
 ["Do you agree or disagree with the following statement? Advertisements influence people's buying decisions too much.","What are the advantages of working in a team rather than working alone?"],
 ["Do you agree or disagree with the following statement? Universities should require students to do an internship before graduating.","Which is more important when choosing a job: salary, work-life balance, or chances for promotion?"],
 ["Do you agree or disagree with the following statement? Technology has made people less social.","Should companies hire employees with experience or train new employees with potential? Why?"],
 ["Do you agree or disagree with the following statement? Governments should spend more money on public parks.","What is the best way to stay healthy: exercising regularly, eating healthy food, or getting enough sleep?"],
 ["Do you agree or disagree with the following statement? Students learn more from field trips than from classroom lessons.","Would you prefer a job with a high salary and long hours or a job with a lower salary and short hours? Why?"],
 ["Do you agree or disagree with the following statement? People should buy products from local businesses rather than large online stores.","What are the disadvantages of using a smartphone too much?"],
 ["Do you agree or disagree with the following statement? Companies should let employees use AI tools at work.","Do you agree or disagree with the following statement? A four-day work week is better for both companies and employees."]
];
