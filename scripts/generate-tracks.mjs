// Run with: node scripts/generate-tracks.mjs
// Generates lib/tracks-full.ts from the compact raw data below.

import { writeFileSync } from "fs";

const BASE = "https://shemenmusic.com/three";

// Compact track data: [title, artist, duration, plays, slug, category]
// category: "i" = instrumental, "w" = worship
const RAW = [
  // ── INSTRUMENTALS page 1 ──────────────────────────────────────────────────
  ["1234 Jesus","The Living Waters Singers","04:48",1,"1234-jesus-2","i"],
  ["1234 Jesus (Official Instrumental with BVs)","shemenmusic","04:48",1,"1234-jesus","i"],
  ["A FaithFul Friend 112","First Love Music & Aida","05:00",3,"a-faithful-friend-112","i"],
  ["A Lovely Diamond 212","First Love Music & Keziah","05:49",16,"a-lovely-diamond-212","i"],
  ["A Mega Church 01","First Love Music & Aida","07:33",3,"a-mega-church-01","i"],
  ["A Soul Is A Soul 70","First Love Music & Aida","06:21",12,"a-soul-is-a-soul-70","i"],
  ["Abide In Me","Sandra Crouch","05:00",1,"abide-in-me","i"],
  ["Abide In Me (Full Instrumental)","Sandra Crouch","05:00",1,"abide-in-me-full-instrumental","i"],
  ["All About You","MINISTRY MUSIC INSTRUMENTALS","06:04",1,"all-about-you","i"],
  ["All Have Sinned 241","First Love Music & Aida","09:21",3,"all-have-sinned-241","i"],
  ["All I Want Is A Christian Girl 116","First Love Music & Aida","06:40",4,"all-i-want-is-a-christian-girl-116","i"],
  ["All Things Work Together 161","First Love Music & Keziah","05:24",2,"all-things-work-together-161","i"],
  ["Altar Call 114","First Love Music & Aida","05:58",6,"altar-call-114-2","i"],
  ["Anoint Me (w/ BGVs)","Georlynn & First Love Music","07:49",8,"anoint-me","i"],
  ["Anoint Me (without BGVs)","Georlynn & First Love Music","07:49",4,"anoint-me-without-bgvs","i"],
  ["Anoint Me 191","Georlynn","07:50",4,"anoint-me-191","i"],
  ["Be Nice 136","First Love Music & Aida","06:18",1,"be-nice-136","i"],
  ["Be Quick To Obey 90","First Love Music & Aida","08:34",5,"be-quick-to-obey-90","i"],
  ["Be Strong In The Lord 8","First Love Music & Aida","06:29",2,"be-strong-in-the-lord-8","i"],
  ["Be Zealously Affected 07","First Love Music & Aida","09:27",1,"be-zealously-affected-07","i"],
  ["Bear Much Fruit 193","First Love Music & Georlynn","05:48",4,"bear-much-fruit-193","i"],
  ["Bear Your Cross 137","First Love Music & Aida","09:06",0,"bear-your-cross-137","i"],
  ["Blessed Are Thou Oh Lord","First Love Music & Keziah","05:35",8,"blessed-are-thou-oh-lord","i"],
  ["Blessed Jesus 195","First Love Music & Georlynn","06:15",3,"blessed-jesus-195","i"],
  ["Blind Bartimaeus 218","Aseda","07:32",0,"blind-bartimaeus-218","i"],
  ["Blocked My View Instrumental (with BVs)","First Love Music & Keziah","06:16",5,"blocked-my-view-instrumental-with-bvs-official-instrumental","i"],
  ["Books Are A Blessing 125","First Love Music & Aida","03:45",2,"books-are-a-blessing-125","i"],
  ["Born Again 102","First Love Music & Aida","04:19",3,"born-again-102","i"],
  ["Break Up 53","First Love Music & Aida","04:46",1,"break-up-53-2","i"],
  ["Bridge Over Troubled Water (Full Instrumental Track)","The Stars","05:29",2,"bridge-over-troubled-water-full-instrumental-track","i"],
  ["Build Your House On A Rock 20","First Love Music & Aida","08:35",3,"build-your-house-on-the-rock-20","i"],
  ["By His Wounds","First Love Music & Keziah","05:42",6,"by-his-wounds","i"],
  ["Call Me if You Love Me 186","Keziah","08:22",1,"call-me-if-you-love-me-186","i"],
  ["Can You Reach My Friend","Helen Baylor","03:46",0,"can-you-reach-my-friend","i"],
  ["Candle In The Dark 117","First Love Music & Aida","09:33",2,"candle-in-the-dark-117","i"],
  ["Carry Me 109","First Love Music & Aida","05:12",3,"carry-me-109","i"],
  ["Cherish The Love Of God 75","First Love Music & Aida","05:53",1,"cherish-the-love-of-god-75","i"],
  ["Choose Me, Use Me 124","First Love Music & Aida","08:20",0,"choose-me-use-me-124","i"],
  ["Choosing 133","First Love Music & Aida","06:10",0,"choosing-133","i"],
  ["Christian Soldier 46","First Love Music & Aida","05:40",1,"christian-soldier-46","i"],
  ["Come Away (Full Instrumental Track)","Maranatha Music","03:27",2,"come-away-full-instrumental-track","i"],
  ["Come Home (Full Instrumental Track)","Andraé Crouch & MINISTRY MUSIC INSTRUMENTALS","05:47",4,"come-home-full-instrumental-track","i"],
  ["Come To Me My Dear 246","First Love Music & Keziah","04:55",3,"come-to-me-my-dear-246-2","i"],
  ["Come Unto Me 103","First Love Music & Aida","07:44",1,"come-unto-me-103","i"],
  ["Comforter","MINISTRY MUSIC INSTRUMENTALS","04:40",1,"comforter","i"],
  ["Communion Song 72","First Love Music & Aida","04:56",5,"communion-song-72","i"],
  ["Count It All Joy","MINISTRY MUSIC INSTRUMENTALS","05:01",2,"count-it-all-joy","i"],
  ["Dare Bolder Programs Instrumental (withBVs)","First Love Music & Aida","07:30",3,"dare-bolder-programs-instrumental-withbvs-official-instrumental","i"],
  ["Deeper 147","Georlynn","05:56",15,"deeper-147","i"],
  ["Did You Read My Letter 94","First Love Music & Aida","08:33",0,"did-you-read-my-letter-94","i"],
  // ── page 2 ────────────────────────────────────────────────────────────────
  ["Do Not Love The World My Brother 47","First Love Music & Aida","13:29",60,"do-not-love-the-world-my-brother-47","i"],
  ["Do Not Stir Up 09","First Love Music & Aida","09:47",8,"do-not-stir-up-09","i"],
  ["Do What He Likes 143","First Love Music & Aida","10:16",18,"do-what-he-likes-143","i"],
  ["Dreamin","Andraé Crouch & MINISTRY MUSIC INSTRUMENTALS","03:13",8,"dreamin","i"],
  ["Early in the Morning","MINISTRY MUSIC INSTRUMENTALS","05:30",0,"early-in-the-morning","i"],
  ["El Shaddai","BDR","05:47",14,"el-shaddai","i"],
  ["Ends Of The World 71","First Love Music & Aida","06:37",93,"ends-of-the-world-71","i"],
  ["Eunuchs in the Palace 206","Keziah","07:10",211,"eunuchs-in-the-palace-206","i"],
  ["Every Valley F","MINISTRY MUSIC INSTRUMENTALS","03:20",3,"every-valley-f","i"],
  ["Every Valley G","MINISTRY MUSIC INSTRUMENTALS","03:20",5,"every-valley-g","i"],
  ["Everybody Needs a Little Help 184","Keziah","07:26",270,"everybody-needs-a-little-help-184","i"],
  ["Everybody's Got to Know","MINISTRY MUSIC INSTRUMENTALS","08:46",2,"everybodys-got-to-know","i"],
  ["Everybody's Got To Know (Full Instrumental)","Andraé Crouch","05:37",6,"everybodys-got-to-know-full-instrumental","i"],
  ["Fall In Love With You Again (Official Instrumental)","First Love Music","09:05",130,"fall-in-love-with-you-again-official-instrumental","i"],
  ["Favourite Child 144","First Love Music & Aida","04:53",281,"favourite-child-144","i"],
  ["Finish What You Started (Full Instrumental Track)","The Imperials","04:21",0,"finish-what-you-started-full-instrumental-track","i"],
  ["First Love Love First","The Living Waters Singers","0:00",1,"first-love-love-first","i"],
  ["First Love Love First (Official Instrumental with BVs)","The Living Waters Singers","04:17",261,"first-love-love-first-official-instrumental-with-bvs","i"],
  ["For The Mercy (Official Instrumental)","First Love Music","04:03",41,"for-the-mercy-official-instrumental","i"],
  ["Forsake The World 108","First Love Music & Aida","06:31",71,"forsake-the-world-108","i"],
  ["Fulfill Your Ministry 132","First Love Music & Aida","04:34",97,"fulfill-your-ministry-132","i"],
  ["Give Him Your Life 105","First Love Music & Aida","05:50",14,"give-him-your-life-105","i"],
  ["Give Thyself Wholly 11","First Love Music & Aida","06:41",52,"give-thyself-wholly-11","i"],
  ["Give Your Life To Christ 150","Georlynn & First Love Music","05:56",219,"give-your-life-to-christ-150","i"],
  ["Give Your Life To The Lord","The Living Waters Singers","0:00",1,"give-your-life-to-the-lord","i"],
  ["Give Your Life To The Lord (Official Instrumental with BVs)","The Living Waters Singers","05:28",684,"give-your-life-to-the-lord-official-instrumental-with-bvs","i"],
  ["Go Church","The Living Waters Singers","0:00",5,"go-church","i"],
  ["Go Church (Official Instrumental with BVs)","The Living Waters Singers","06:11",1900,"go-church-official-instrumental-with-bvs","i"],
  ["Go Go Go (Full Instrumental)","Shirley Caesar","03:20",15,"go-go-go-full-instrumental","i"],
  ["Go Into The World","Georlynn & First Love Music","0:00",54,"go-into-the-world","i"],
  ["Go Into The World 151","Georlynn","05:42",110,"go-into-the-world-151","i"],
  ["Go On In The Spirit 76","First Love Music & Aida","09:04",40,"go-on-in-the-spirit-76","i"],
  ["Go Somewhere 04","First Love Music & Aida","06:20",268,"go-somewhere-04","i"],
  ["Go To Church 194","Georlynn","05:48",435,"go-to-church-194","i"],
  ["Go Ye 237","First Love Music & Aida","05:04",33,"go-ye-237","i"],
  ["Go Ye Instrumental (with BVs)","First Love Music & Aida","05:04",20,"go-ye-instrumental-with-bvs-official-instrumental","i"],
  ["God Is Here","Lara Martin","05:45",97,"god-is-here","i"],
  ["God's Love Has To Deal with It 81","First Love Music & Aida","04:51",12,"gods-love-has-to-deal-with-it-81","i"],
  ["God's Love Is Greater 87","First Love Music & Aida","03:53",9,"gods-love-is-greater-87","i"],
  ["Going Deeper, Doing More 215","Georlynn","07:40",148,"going-deeper-doing-more-215","i"],
  ["Good Friday 229","First Love Music & Aida","06:53",180,"good-friday-229","i"],
  ["Good Master 234","First Love Music & Aida","06:28",163,"good-master-234","i"],
  ["Greater Love","BDR","05:26",50,"greater-love","i"],
  ["Hard Follower 68","First Love Music & Aida","07:38",35,"hard-follower-68","i"],
  ["Have Mercy On Us Instrumental (with BVs)","First Love Music & Keziah","03:32",183,"have-mercy-on-us-instrumental-with-bvs-official-instrumental","i"],
  ["He Does All Things Well (Full Instrumental)","Andraé Crouch","05:07",6,"he-does-all-things-well-full-instrumental","i"],
  ["He Must Increase 214","Georlynn","05:44",200,"he-must-increase-214","i"],
  ["He Saved You, He Saved Me 35","First Love Music & Aida","05:06",239,"he-saved-you-he-saved-me-35","i"],
  ["He That Hath My Commandments 163","Georlynn","08:44",401,"he-that-hath-my-commandments-163","i"],
  ["He Will Carry Me","First Love Music & Keziah","04:44",486,"he-will-carry-me","i"],
  // ── page 3 ────────────────────────────────────────────────────────────────
  ["He Will Carry You (Full Instrumental Track)","Scott Wesley Brown","05:28",131,"if-he-carried-the-weight-of-the-world-full-instrumental-track","i"],
  ["He's Waiting","MINISTRY MUSIC INSTRUMENTALS","04:36",2,"hes-waiting","i"],
  ["Heaven Song (Full Instrumental Track)","Mary McKee & The Genesis","03:36",15,"heaven-song-full-instrumental-track","i"],
  ["Heed The Call (Full Instrumental)","The Imperials","02:58",8,"heed-the-call-full-instrumental","i"],
  ["Here We Stand 29","First Love Music & Aida","05:12",39,"here-we-stand-29","i"],
  ["Hi Everybody 2","First Love Music & Aida","07:04",85,"hi-everybody-2","i"],
  ["Hi James 50","First Love Music & Aida","07:33",54,"hi-james-50","i"],
  ["Honey Honey 13","First Love Music & Aida","06:07",67,"honey-honey-13","i"],
  ["Honeymoon 154","First Love Music & Keziah","13:22",27,"honeymoon-154","i"],
  ["I Acknowledged My Sin 217","Aseda","05:16",39,"i-acknowledged-my-sin-217","i"],
  ["I Am The Way, The Truth, The Life (Official Instrumental)","First Love Music","03:45",24,"i-am-the-way-the-truth-the-life-official-instrumental","i"],
  ["I Am Thirsty 225","First Love Music & Keziah","05:47",344,"i-am-thirsty-225","i"],
  ["I and the Children 182","Aseda","07:38",7,"i-and-the-children-182","i"],
  ["I Believe I Can Try 58","First Love Music & Aida","08:42",34,"i-believe-i-can-try-58","i"],
  ["I Can't Believe It's True 196","Georlynn","04:41",59,"i-cant-believe-its-true-196","i"],
  ["I Can't Go Without Your Presence 78","First Love Music & Aida","08:16",99,"i-cant-go-without-your-presence-78","i"],
  ["I Can't Keep It to Myself","MINISTRY MUSIC INSTRUMENTALS","05:41",45,"i-cant-keep-it-to-myself","i"],
  ["I Can't Get Enough 199","Keziah","05:50",26,"i-cant-get-enough-199","i"],
  ["I Cannot Love You More Than I Love God 134","First Love Music & Aida","07:43",2,"i-cannot-love-you-more-than-i-love-god-134","i"],
  ["I Don't Wanna Be Good For Nothing 141","First Love Music & Aida","06:45",101,"i-dont-wanna-be-good-for-nothing-141","i"],
  ["I Don't Wanna Fail In My Mission 18","First Love Music & Aida","05:13",111,"i-dont-wanna-fail-in-my-mission-18","i"],
  ["I Fell In Love With God 189","Georlynn","05:07",158,"i-fell-in-love-with-god-189","i"],
  ["I Got The Call Of God 113","Aida & First Love Music","08:16",16,"i-got-the-call-of-god-113-2","i"],
  ["I Guess You Remember 40","First Love Music & Aida","05:58",17,"i-guess-you-remember-40","i"],
  ["I Have Found A New Life 33","First Love Music & Aida","06:15",204,"i-have-found-a-new-life-33","i"],
  ["I Know I Really Like You 156","Georlynn","06:01",304,"i-know-i-really-like-you-156","i"],
  ["I Know Thy Works 248","Aseda","07:16",64,"i-know-thy-works-248","i"],
  ["I Like The Way You Like Me 148","Georlynn","05:55",78,"i-like-the-way-you-like-me-148","i"],
  ["I Must Work 169","Georlynn","10:03",130,"i-must-work-169","i"],
  ["I Need My Quiet Time 97","First Love Music & Aida","08:23",58,"i-need-my-quiet-time-97","i"],
  ["I Notice Other Girls 111","First Love Music & Aida","10:23",9,"i-notice-other-girls-111","i"],
  ["I Press Toward The Mark (Official Instrumental)","First Love Music","04:29",108,"i-press-toward-the-mark-official-instrumental","i"],
  ["I Really Like Sunday Morning 38","First Love Music & Aida","05:56",35,"i-really-like-sunday-morning-38","i"],
  ["I Really Love You Jesus 180","First Love Music & Georlynn","06:53",73,"i-really-love-you-jesus-180","i"],
  ["I See It in Your Eyes 205","Aseda","06:44",2,"i-see-it-in-your-eyes-205","i"],
  ["I See The Light (Full Instrumental Track)","Passage","03:44",14,"i-see-the-light-full-instrumental-track","i"],
  ["I See You Jesus 206","Aseda","05:00",4,"i-see-you-jesus-206","i"],
  ["I Sought The Lord 26","First Love Music & Aida","08:52",7,"i-sought-the-lord-26","i"],
  ["I Still Like You 168","First Love Music & Keziah","10:43",43,"i-still-like-you-168","i"],
  ["I Waited Patiently","FIRST LOVE MUSIC INSTRUMENTALS","04:54",62,"i-waited-patiently-2","i"],
  ["I Wanna Be A Virtuous Woman 24","First Love Music & Aida","06:00",41,"i-wanna-be-a-virtuous-woman-24","i"],
  ["I Want My Love To Last 115","First Love Music & Aida","03:25",1,"i-want-my-love-to-last-115","i"],
  ["I Want To Be More like Jesus (D)","First Love Music","06:30",160,"i-want-to_d_instrumental-2","i"],
  ["I Will Be Calling 164","Georlynn & First Love Music","12:45",271,"i-will-be-calling-164","i"],
  ["I Will Bless the Lord","MINISTRY MUSIC INSTRUMENTALS","05:50",50,"i-will-bless-the-lord","i"],
  ["I Will Bless The Lord 242","Aida & First Love Music","07:06",363,"i-will-bless-the-lord-242","i"],
  ["I Will Build Your Church 28","First Love Music & Aida","08:26",236,"i-will-build-your-church-28","i"],
  ["I Will Miss You 92","First Love Music & Aida","05:23",4,"i-will-miss-you-92","i"],
  ["I Will Pay Thee All 174","Keziah & First Love Music","09:45",3,"i-will-pay-thee-all-174","i"],
  ["I Will Praise Thee With My Whole Heart 209","First Love Music & Keziah","04:05",39,"i-will-praise-thee-with-my-whole-heart-ps9-209","i"],
  // ── page 4 ────────────────────────────────────────────────────────────────
  ["I Wish 200","Keziah","05:36",1,"i-wish-200","i"],
  ["I'm Impressed 233","Aseda","04:33",3,"im-impressed-233","i"],
  ["I'm Responding 185","Keziah & First Love Music","04:20",3,"im-responding-185","i"],
  ["I'm The One You're Looking For 32","First Love Music & Aida","05:26",0,"im-the-one-youre-looking-for-32","i"],
  ["I've Found it","The Living Waters Singers","0:00",14,"ive-found-it","i"],
  ["I'm Starting My Journey 201","Keziah","03:35",0,"im-starting-my-journey-201","i"],
  ["If I Give My Life For You 10","First Love Music & Aida","07:38",0,"if-i-give-my-life-for-you-10","i"],
  ["If My People 159","First Love Music & Keziah","07:21",4,"if-my-people-159","i"],
  ["If You Could See Me Now 120","First Love Music & Aida","05:28",0,"if-you-could-see-me-now-120","i"],
  ["If You Need Someone To Send 42","First Love Music & Aida","04:33",0,"if-you-need-someone-to-send-42","i"],
  ["In His Time (Full Instrumental Track)","Maranatha Music","03:16",0,"in-his-time-full-instrumental-track","i"],
  ["It's Not Just A Story (Full Instrumental Track)","Andraé Crouch","02:53",0,"its-not-just-a-story-full-instrumental-track","i"],
  ["It's Our Time","MINISTRY MUSIC INSTRUMENTALS","04:19",1,"its-our-time","i"],
  ["Jesus Heals Your Heart 17","First Love Music & Aida","08:34",2,"jesus-heals-your-heart-17","i"],
  ["Jesus I Love You 202","Keziah","04:32",14,"jesus-i-love-you-202","i"],
  ["Jesus is Love","MINISTRY MUSIC INSTRUMENTALS","06:22",2,"jesus-is-lord","i"],
  ["Jesus Is The Best 244","First Love Music & Aida","11:37",2,"jesus-is-the-best-244","i"],
  ["Jesus Is The Door","The Living Waters Singers","0:00",9,"jesus-is-the-door","i"],
  ["Jesus Loves Me Oh Yeah 15","First Love Music & Aida","05:42",5,"jesus-loves-me-oh-yeah-15","i"],
  ["Jesus Prayed 31","First Love Music & Aida","04:34",4,"jesus-prayed-31","i"],
  ["Jesus Really Needs To Know 62","ThomasS","0:00",9,"jesus-really-needs-to-know-62","i"],
  ["Jesus Saviour Of The World 142","First Love Music & Aida","06:42",9,"jesus-savoiur-of-the-world-142","i"],
  ["Jesus You're So Cool","The Living Waters Singers","0:00",1,"jesus-youre-so-cool","i"],
  ["Jesus You're So Cool (Official Instrumental with BVs)","The Living Waters Singers","05:28",0,"jesus-youre-so-cool-official-instrumental-with-bvs","i"],
  ["Jesus You're Beautiful 166","First Love Music & Keziah","09:52",1,"jesus-youre-beautiful-166","i"],
  ["Johnny","Jermaine Edwards","04:22",0,"johnny","i"],
  ["Joy To My Soul (Full Instrumental Track)","Oslo Gospel Choir","04:33",0,"joy-to-my-soul-full-instrumental-track","i"],
  ["Keep On Do The Work Of God 41","First Love Music & Aida","06:00",1,"keep-on-do-the-work-of-god-41","i"],
  ["Keep on Dreamin 219","Aseda","07:49",1,"keep-on-dreamin-219","i"],
  ["Keep Preaching 66","First Love Music & Aida","03:18",4,"keep-preaching-66","i"],
  ["Keeping My Eyes On You (Full Instrumental Track)","Twila Paris","03:23",0,"keeping-my-eyes-on-you-full-instrumental-track","i"],
  ["Knowing Me Knowing You 104","First Love Music & Aida","06:48",0,"knowing-me-knowing-you-104-2","i"],
  ["Kobby Gee 43","First Love Music & Aida","06:50",4,"kobby-gee-43","i"],
  ["Lamentations 192","Aseda","06:36",2,"lamentations-192","i"],
  ["Last Days 126","First Love Music & Aida","04:57",0,"last-days-126","i"],
  ["Learning to Live Like Jesus","MINISTRY MUSIC INSTRUMENTALS","04:46",0,"learning-to-live-like-jesus","i"],
  ["Let Me Love 183","Keziah & First Love Music","04:21",3,"let-me-love-183","i"],
  ["Let Me Stand Before You 165","First Love Music & Keziah","10:44",3,"let-me-stand-before-you-165","i"],
  ["Let Me Tell You Now 34","First Love Music & Aida","06:23",5,"let-me-tell-you-now-34","i"],
  ["Let My People Go 21","First Love Music & Aida","07:08",0,"let-my-people-go-21","i"],
  ["Let The Church Say Amen","Andraé Crouch","05:52",1,"let-the-church-say-amen","i"],
  ["Let the Church Say Amen","MINISTRY MUSIC INSTRUMENTALS","05:52",2,"let-the-church-say-amen-2","i"],
  ["Let The Weary Rest","FIRST LOVE MUSIC INSTRUMENTALS","04:35",6,"let-the-weary-rest","i"],
  ["Let Thy Mercies","FIRST LOVE MUSIC INSTRUMENTALS","05:13",4,"let-thy-mercies","i"],
  ["Let Us Come Boldly 210","First Love Music & Aseda","05:37",10,"let-us-come-boldly-210","i"],
  ["Let's Sit and Talk 171","Keziah & First Love Music","12:51",0,"lets-sit-and-talk-171","i"],
  ["Life is So Short (Full Instrumental Track)","Bernice Offei","05:21",1,"life-is-so-short-full-instrumental-track","i"],
  ["Live For Jesus","BDR","04:08",1,"live-for-jesus","i"],
  ["Living Waters","The Living Waters Singers","0:00",8,"living-waters","i"],
  ["Living Waters (Official Instrumental with BVs)","The Living Waters Singers","04:59",3,"living-waters-official-instrumental-with-bvs","i"],
  // ── page 5 ────────────────────────────────────────────────────────────────
  ["Lo I Tell You a Mystery 155","First Love Music & Keziah","06:57",1,"lo-i-tell-you-a-mystery-155","i"],
  ["Look a Little Closer A","MINISTRY MUSIC INSTRUMENTALS","06:42",0,"look-a-little-closer-a","i"],
  ["Lord It's Not for What You Give Me 211","First Love Music & Keziah","08:51",6,"lord-its-not-for-what-you-give-me-211","i"],
  ["Lord, Let Me Have a Dream","MINISTRY MUSIC INSTRUMENTALS","03:41",1,"lord-let-me-have-a-dream","i"],
  ["Losing, Suffering and Dying 74","First Love Music & Aida","07:35",1,"losing-suffering-and-dying-74","i"],
  ["Love Is As Strong As Death 51","First Love Music & Aida","05:07",3,"love-is-as-strong-as-death-51-2","i"],
  ["Love Is Patient 99","First Love Music & Aida","10:03",3,"love-is-patient-99-2","i"],
  ["Love Lifted Me (Full Instrumental Track)","Mary McKee & The Genesis","03:37",0,"love-lifted-me-full-instrumental-track","i"],
  ["Loving My Maker","First Love Music","07:57",13,"lovingmymakernov6inst-2","i"],
  ["Loyalty And Disloyalty 100","First Love Music & Aida","10:35",7,"loyalty-and-disloyalty-100","i"],
  ["Making up the Hedge","First Love Music","05:52",7,"making-up-the-hedge","i"],
  ["Man On A Mission","First Love Music","05:14",0,"man-on-a-mission-square_1","i"],
  ["Maximum Impact 93","First Love Music & Aida","07:08",2,"maximum-impact-93-3","i"],
  ["Me Mboa (Official Instrumental)","First Love Music","04:27",1,"me-mboa-official-instrumental","i"],
  ["Meteasea (Official Instrumental)","First Love Music","07:19",1,"meteasea-official-instrumental","i"],
  ["Missionary Song 118","First Love Music & Aida","08:10",1,"missionary-song-118-3","i"],
  ["More Than a Friend","MINISTRY MUSIC INSTRUMENTALS","04:37",0,"more-than-a-friend","i"],
  ["More Than A Friend (Full Instrumental Track)","Helen Baylor","04:29",0,"more-than-a-friend-full-instrumental-track","i"],
  ["Multiply Them 127","First Love Music & Aida","05:20",1,"multiply-them-127-4","i"],
  ["Mustard Seed 129","First Love Music & Aida","03:00",3,"mustard-seed-129-4","i"],
  ["My Beloved Is Mine 52","First Love Music & Aida","07:40",1,"my-beloved-is-mine-52-2","i"],
  ["My Dear Jesus 198","Keziah","06:00",10,"my-dear-jesus-198","i"],
  ["My Father's Love 59","First Love Music & Aida","05:25",0,"my-fathers-love-59-2","i"],
  ["My First Love 36","First Love Music & Aida","05:55",2,"my-first-love-36-2","i"],
  ["Never Let Me Go (C)","Oslo Gospel Choir","05:06",2,"never-let-me-go-c","i"],
  ["New Jerusalem (New School)","BDR","06:19",0,"new-jerusalem-new-school","i"],
  ["New Jerusalem 188","Georlynn","07:03",3,"new-jerusalem-188","i"],
  ["No Apologies 27","First Love Music & Aida","06:59",4,"no-apologies-27-3","i"],
  ["No Ordinary Water","The Living Waters Singers","0:00",4,"no-ordinary-water","i"],
  ["No Ordinary Water (Official Instrumental with BVs)","The Living Waters Singers","07:15",3,"no-ordinary-water-official-instrumental-with-bvs","i"],
  ["No, No, No, You Don't Love The Lord 19","First Love Music & Aida","08:56",1,"no-no-no-you-dont-love-the-lord-19-2","i"],
  ["Nothing Without Your Love","MINISTRY MUSIC INSTRUMENTALS","03:53",0,"nothing-without-your-love","i"],
  ["Now Brought Near 236","First Love Music & Aida","07:13",2,"now-brought-near-236-2","i"],
  ["Now Is The Time","First Love Music","06:27",4,"now-is-the-time-nov6inst-2","i"],
  ["Now That I Know 30","First Love Music & Aida","04:54",5,"now-that-i-know-30-2","i"],
  ["Now That We've Found Christ 14","First Love Music & Aida","06:24",3,"now-that-weve-found-christ-14-2","i"],
  ["Obligations 3","First Love Music & Aida","10:31",0,"obligations-3-2","i"],
  ["Occupy Till I Come 239","First Love Music & Aida","09:16",5,"occupy-till-i-come-239","i"],
  ["Oh It Is Jesus (Full Instrumental)","Andraé Crouch","04:13",4,"oh-it-is-jesus-full-instrumental","i"],
  ["Oh My Shepherd 128","First Love Music & Aida","06:25",1,"oh-my-shepherd-128-2","i"],
  ["Only One Talent 122","First Love Music & Aida","10:44",0,"only-one-talent-122-2","i"],
  ["Parting Souls 173","Georlynn","16:06",4,"parting-souls-173","i"],
  ["Pastor's Wife 101","First Love Music & Aida","09:59",0,"pastors-wife-101-2","i"],
  ["Peace w/BVs","DT","06:56",2,"peace-wbvs","i"],
  ["People Need The Lord (Official Instrumental)","First Love Music","04:34",4,"people-need-the-lord-official-instrumental","i"],
  ["Peter Do You Love Me 157","Georlynn","08:15",1,"peter-do-you-love-me-157","i"],
  ["Peter Lover 37","First Love Music & Aida","03:53",0,"peter-lover-37-2","i"],
  ["Play It Again","MINISTRY MUSIC INSTRUMENTALS","03:20",0,"play-it-again","i"],
  ["Please Don't Pull Me Back 95","Aida & First Love Music","05:57",1,"please-dont-pull-me-back-95-2","i"],
  ["Pray Pray, Why Don't You Rise Up And Pray 49","First Love Music & Aida","04:47",0,"pray-pray-why-dont-you-rise-up-and-pray-49-2","i"],
  // ── page 6 ────────────────────────────────────────────────────────────────
  ["Prayer Changes Things (Official Instrumental)","First Love Music","04:11",8,"prayer-changes-things-official-instrumental","i"],
  ["Preparation Of The Gospel (B)","First Love Music","05:27",1,"preparation-of-the-gospel_b_instrumental-2","i"],
  ["Promise Me 135","First Love Music & Aida","06:56",0,"promise-me-135","i"],
  ["Proposal (I'll Say I love You) 54","First Love Music & Aida","04:47",2,"proposal-ill-say-i-love-you-54","i"],
  ["Propose To Me 55","Aida & First Love Music","05:07",0,"propose-to-me-55-2","i"],
  ["Psalm 1 228","First Love Music & Aida","07:08",4,"psalm-1-228","i"],
  ["Quiet Times","Andraé Crouch","06:04",0,"quiet-times","i"],
  ["Read Your Bible, Pray Everyday 98","First Love Music & Aida","06:02",0,"read-your-bible-pray-everyday-98","i"],
  ["Ready At Twenty 06","Aida","10:02",1,"ready-at-twenty-06","i"],
  ["Reasonable Service 222","First Love Music & Aida","06:54",9,"reasonable-service-222","i"],
  ["Reigning From Sixteen 149","Georlynn","05:06",4,"reigning-from-sixteen-149","i"],
  ["Remember Your Creator 121","First Love Music & Aida","06:17",0,"remember-your-creator-121","i"],
  ["Rose Of Sharon","The Living Waters Singers","0:00",14,"rose-of-sharon","i"],
  ["Rose Of Sharon (Official Instrumental with BVs)","The Living Waters Singers","05:51",6,"rose-of-sharon-official-instrumental-with-bvs","i"],
  ["Say I Do","MINISTRY MUSIC INSTRUMENTALS","04:16",0,"say-i-do","i"],
  ["Security","MINISTRY MUSIC INSTRUMENTALS","05:12",3,"security","i"],
  ["Seek Ye First 39","First Love Music & Aida","05:18",1,"seek-ye-first-39","i"],
  ["Seven Great Principles 138","First Love Music & Aida","07:36",2,"seven-great-principles-138","i"],
  ["Shepherd Of My Soul","Hosanna! Music","04:01",1,"shepherd-of-my-soul","i"],
  ["Shepherd The People","First Love Music","05:08",3,"shepherd-the-people_nov7inst","i"],
  ["Shiella! Strange Woman 44","First Love Music & Aida","06:39",1,"shiella-strange-woman-44","i"],
  ["Simply I Love You","MINISTRY MUSIC INSTRUMENTALS","02:37",0,"simply-i-love-you","i"],
  ["Sing A New Song","First Love Music","08:14",3,"sing-a-new-song-square_1","i"],
  ["Sing Praises 208","Keziah & First Love Music","05:09",6,"sing-praisesps47-27-208","i"],
  ["Sister! Marry Me 56","First Love Music & Aida","06:42",3,"sister-marry-me-56","i"],
  ["So Send I You 170","Georlynn","14:05",6,"so-send-i-you-170","i"],
  ["Solid Rock (Official Instrumental)","First Love Music","03:32",2,"solid-rock-official-instrumental","i"],
  ["Soon and Very Soon B","MINISTRY MUSIC INSTRUMENTALS","03:50",0,"soon-and-very-soon-b","i"],
  ["Speak in Tongues 80","First Love Music & Aida","05:09",3,"speak-in-tongues-80","i"],
  ["Steps Of Jesus 245","First Love Music & Aida","05:06",0,"steps-of-jesus-245","i"],
  ["Stir Up The Gift Of God 05","First Love Music & Aida","05:23",2,"stir-up-the-gift-of-god-05","i"],
  ["Strong Christian 91","Aida & First Love Music","07:48",12,"strong-christian-91","i"],
  ["Sun Of Righteousness 85","First Love Music & Aida","06:19",2,"sun-of-righteousness-85","i"],
  ["Sweet Mama, Poor Lover 139","Aida & First Love Music","06:55",2,"sweet-mama-poor-lover-139","i"],
  ["Sweet Memories 179","First Love Music & Georlynn","07:10",0,"sweet-memories-179","i"],
  ["Take Me Back","Andraé Crouch","04:42",0,"take-me-back","i"],
  ["Take My Life 64","First Love Music & Aida","06:36",8,"take-my-life-64","i"],
  ["Take Up Your Cross (Full Instrumental Track)","Brooklyn Tabernacle Choir","05:31",0,"take-up-your-cross-full-instrumental-track","i"],
  ["Take Up Your Cross 172","First Love Music & Keziah","12:09",3,"take-up-your-cross-172","i"],
  ["Teach Me (Official Instrumental)","First Love Music","05:39",1,"teach-me-official-instrumental","i"],
  ["Tell Them","MINISTRY MUSIC INSTRUMENTALS","04:57",3,"tell-them","i"],
  ["Thank You In My Own Way 221","First Love Music & Aida","04:58",6,"thank-you-in-my-own-way-221","i"],
  ["Thank You Lord (Official Instrumental)","First Love Music","09:09",9,"thank-you-lord-official-instrumental","i"],
  ["Thanks for Reaching 160","First Love Music & Keziah","08:33",5,"thanks-for-reaching-160","i"],
  ["That's Why I Needed You","MINISTRY MUSIC INSTRUMENTALS","04:26",0,"thats-why-i-needed-you","i"],
  ["The American Dream 48","First Love Music & Aida","07:25",0,"the-american-dream-48","i"],
  ["The Anointing 12","First Love Music & Aida","05:53",3,"the-anointing-12","i"],
  ["The Day I Found Jesus 65","First Love Music & Aida","05:57",4,"the-day-i-found-jesus-65","i"],
  ["The First Thing I Do 197","Georlynn","05:19",4,"the-first-thing-i-do-197","i"],
  ["The Grace Chant 238","First Love Music & Aida","07:10",1,"the-grace-chant-238","i"],
  // ── page 7 ────────────────────────────────────────────────────────────────
  ["The Isles Shall Wait For Thee 240","First Love Music & Aida","08:49",2,"the-isles-shall-wait-for-thee-240","i"],
  ["The Lord Is My Light","Andraé Crouch","05:26",3,"the-lord-is-my-light","i"],
  ["The Lord is My Light","Ministry Music Instrumentals","05:10",1,"the-lord-is-my-light-2","i"],
  ["The Lord Is My Light (Full Instrumental Track)","Joyous Celebration","06:19",0,"the-the-lord-is-my-light-full-instrumental-track","i"],
  ["The Lord Thy God 176","First Love Music & Keziah","06:25",11,"the-lord-thy-god-in-the-midst-of-thee-176","i"],
  ["The Lovely Voice Of God 86","First Love Music & Aida","04:13",9,"the-lovely-voice-of-god-86","i"],
  ["The More I Love, the Less I Be Loved 220","Aseda","06:33",0,"the-more-i-love-the-less-i-be-loved-220","i"],
  ["The Mountain Of the Lord's House 77","First Love Music & Aida","06:15",11,"the-mountain-of-the-lords-house-77","i"],
  ["The Sea Of Forgetfulness (Full Instrumental Track)","Helen Baylor","04:11",3,"the-sea-of-forgetfulness-full-instrumental-track","i"],
  ["The Sower 25","First Love Music & Aida","09:31",2,"the-sower-25","i"],
  ["The Winner Takes The Crown 45","First Love Music & Aida","04:59",1,"the-winner-takes-the-crown-45","i"],
  ["There Will Be Sad Days 153","First Love Music & Keziah","07:58",1,"there-will-be-sad-days-153","i"],
  ["There Will Be Traitors 152","First Love Music & Keziah","05:36",1,"there-will-be-traitors-152","i"],
  ["There's An Anointing Coming 22","First Love Music & Aida","04:51",7,"theres-an-anointing-coming-22","i"],
  ["There's No One I Love Like You Jesus 61","First Love Music & Aida","04:25",8,"theres-no-one-i-love-like-you-jesus-61","i"],
  ["There's Nobody Like Jesus","Ministry Music Instrumentals","18:03",5,"theres-nobody-like-jesus","i"],
  ["This is the Day","Ministry Music Instrumentals","02:45",1,"this-is-the-day","i"],
  ["This is The Day 162","First Love Music & Keziah","13:26",2,"this-is-my-day-162","i"],
  ["Tithes And Offerings 88","First Love Music & Aida","05:25",5,"tithes-and-offerings-88","i"],
  ["To God Be the Glory","Ministry Music Instrumentals & Andraé Crouch","03:18",1,"to-god-be-the-glory","i"],
  ["Together Forever 175","First Love Music & Keziah","06:40",5,"together-forever-175","i"],
  ["Turn Our Captivity 207","Keziah & First Love Music","05:02",2,"turn-our-captivityps-126-207","i"],
  ["Twenty-Five To Fifty 123","First Love Music & Aida","07:02",1,"twenty-five-to-fifty-123","i"],
  ["Use It Or Lose It 213","Georlynn","05:16",1,"use-it-or-lose-it-213","i"],
  ["Vengeance Is Mine (F)","First Love Music","05:30",4,"vengeance-is-mine_f_instrumental-2","i"],
  ["Walk By Faith 130","First Love Music & Aida","07:13",3,"walk-by-faith-130","i"],
  ["Walk With You 158","First Love Music & Georlynn","08:09",3,"walk-with-you-158-2","i"],
  ["Walking With Jesus 230","First Love Music & Keziah","06:17",8,"walking-with-jesus-230","i"],
  ["War a Good Warfare 181","First Love Music & Georlynn","06:55",8,"war-a-good-warfare-181","i"],
  ["Wasting My Life 232","First Love Music & Aida","06:44",0,"wasting-my-life-232","i"],
  ["Watch And Pray 79","First Love Music & Aida","03:42",2,"watch-and-pray-79-1","i"],
  ["We Are The Church 107","First Love Music & Aida","06:58",7,"we-are-the-church-107","i"],
  ["We Come Rejoicing (Full Instrumental Track)","Brooklyn Tabernacle Choir","04:07",1,"we-come-rejoicing-full-instrumental-track","i"],
  ["We Want To Bask","First Love Music Instrumentals","05:56",7,"we-want-to-bask","i"],
  ["We Will Stand (Official Instrumental)","First Love Music","04:31",5,"we-will-stand-official-instrumental","i"],
  ["We're Not Close Anymore 119","First Love Music & Aida","08:05",0,"were-not-close-anymore-119","i"],
  ["Welcome Back to Jesus","Ministry Music Instrumentals","03:20",0,"welcome-back-to-jesus","i"],
  ["Welcome Back To Jesus (Bb)","Evie Karlsson","03:20",0,"welcome-back-to-jesus-bb","i"],
  ["What Exactly Do You Mean 140","First Love Music & Aida","04:50",1,"what-exactly-do-you-mean-140","i"],
  ["What Is The Best Way To Pray 131","First Love Music & Aida","05:23",4,"what-is-the-best-way-to-pray-131","i"],
  ["What Is Your Life 16","First Love Music & Aida","08:25",2,"what-is-your-life-16","i"],
  ["When (Full Instrumental)","Kirk Franklin","05:25",0,"when-full-instrumental","i"],
  ["When A Man Has Found a wife 23","First Love Music & Aida","14:27",0,"when-a-man-has-found-23","i"],
  ["When A Man Loves The Lord 60","First Love Music & Aida","07:30",3,"when-a-man-loves-the-lord-60","i"],
  ["When I Fell 57","Aida & First Love Music","08:09",0,"when-i-fell-57","i"],
  ["When I Get To Heaven 83","First Love Music & Aida","05:56",3,"when-i-get-to-heaven-83","i"],
  ["When Will It Be Possible To See You 247","Keziah & First Love Music","08:36",18,"when-will-it-be-possible-to-see-you-247","i"],
  ["When You Died 84","Aida & First Love Music","10:54",1,"when-you-died-84","i"],
  ["Where Jesus Is (Full Instrumental Track)","Andraé Crouch","04:03",1,"where-jesus-is-full-instrumental-track","i"],
  ["Who is Jesus 167","First Love Music & Keziah","10:22",9,"who-is-jesus-167","i"],
  // ── page 8 ────────────────────────────────────────────────────────────────
  ["Whom Shall I Send 204","Keziah","06:18",5,"whom-shall-i-send-204","i"],
  ["Why Did I Come Into The World 82","First Love Music","09:19",3,"why-did-i-come-into-the-world-82","i"],
  ["Wisdom Is The Principal Thing 96","Aida & First Love Music","08:03",6,"wisdom-is-the-principal-thing-96","i"],
  ["Wise As Serpents 67","Aida & First Love Music","06:18",0,"wise-as-serpents-67","i"],
  ["Woman Of Zebedee 73","First Love Music & Aida","04:03",0,"woman-of-zebedee-73","i"],
  ["Wonderful Church 110","Aida & First Love Music","05:31",0,"wonderful-church-110","i"],
  ["Work On 187","Georlynn","07:54",2,"work-on-187","i"],
  ["Worship Him","FIRST LOVE MUSIC INSTRUMENTALS & Keziah","04:00",4,"worship-him","i"],
  ["Ye Shall Receive Power 216","Georlynn","06:10",7,"ye-shall-receive-power-216","i"],
  ["Yes Lord","MINISTRY MUSIC INSTRUMENTALS","05:22",1,"yes-lord","i"],
  ["Yield Not To Temptation (Official Instrumental)","First Love Music & Maya","05:08",1,"yield-not-to-temptation-official-instrumental-2","i"],
  ["You Are My God 69","First Love Music & Aida","05:47",7,"you-are-my-god-69","i"],
  ["You Can Depend on Me","MINISTRY MUSIC INSTRUMENTALS","04:12",0,"you-can-depened-on-me","i"],
  ["You Can't Be Living","MINISTRY MUSIC INSTRUMENTALS","06:26",0,"you-cant-be-living","i"],
  ["You Must Love The Lord 63","First Love Music & Aida","05:01",3,"you-must-love-the-lord-63","i"],
  ["You'll Never Find A Job 145","First Love Music & Aida","07:06",0,"youll-never-find-a-job-145","i"],
  ["You're Gonna Go To Hell 89","First Love Music & Aida","06:29",1,"youre-gonna-go-to-hell-89","i"],
  // ── WORSHIP page 1 ────────────────────────────────────────────────────────
  ["All Around","Israel Houghton","04:38",4,"all-around-2","w"],
  ["All Around","Israel & New Breed","04:38",0,"all-around","w"],
  ["Ancient Of Days","New Breed","04:12",2,"ancient-of-days","w"],
  ["Ancient Of Days (Full Instrumental Track)","Israel & New Breed","04:13",2,"ancient-of-days-full-instrumental-track","w"],
  ["Arise","Don Moen","05:30",4,"arise","w"],
  ["Awake O Sleeper","First Love Music","08:29",1,"awake-o-sleeper","w"],
  ["Awesome In This Place","Keith Staten","04:00",6,"awesome-in-this-place","w"],
  ["Best Praise","Tommy Walker","06:22",0,"best-praise","w"],
  ["Bless The Lord Oh My Soul","Oslo Gospel Choir","04:21",1,"bless-the-lord-oh-my-soul","w"],
  ["Bless The Lord Oh My Soul","Oslo Gospel Choir","04:21",1,"bless-the-lord-oh-my-soul-2","w"],
  ["Bless The Lord Oh My Soul","Oslo Gospel Choir","04:21",2,"bless-the-lord-oh-my-soul-3","w"],
  ["Breathe Upon Me","Benny Hinn","04:48",3,"breathe-upon-me","w"],
  ["Can't Give Up Now","Mary Mary","04:57",4,"cant-give-up-now","w"],
  ["Centre of My Joy (G)","Richard Smallwood","05:17",3,"centre-of-my-joy-g","w"],
  ["Come Closer to Me","Andraé Crouch","05:06",1,"come-closer-to-me","w"],
  ["Come Home","Andraé Crouch & MINISTRY MUSIC INSTRUMENTALS","05:42",0,"come-home","w"],
  ["Come Let Us Worship And Bow Down","Maranatha Music","05:22",2,"come-let-us-worship-and-bow-down","w"],
  ["Come, Now Is The Time","Maranatha Music","04:53",2,"come-now-is-the-time","w"],
  ["Eagles Wings","Hillsong Worship","05:57",2,"eagles-wings","w"],
  ["Fallin' In Love With You Again","Phil Driscoll","07:17",5,"fallin-in-love-with-you-again","w"],
  ["Fresh Oil","Julia Gannon","03:44",2,"fresh-oil-2","w"],
  ["God Is Here","Lara Martin","05:45",3,"god-is-here-2","w"],
  ["God with us","Don Moen","03:54",7,"god-with-us","w"],
  ["Hallowed Be Thy Name","Clint Brown","03:41",2,"hallowed-be-thy-name","w"],
  ["Have Your Way","Don Moen","04:21",4,"have-your-way","w"],
  ["He Came Through","Helen Baylor","05:36",1,"he-came-through","w"],
  ["He Knows My Name New","Tommy Walker","03:41",3,"he-knows-my-name-new","w"],
  ["He's Already Provided","Alvin Slaughter","04:55",1,"hes-already-provided","w"],
  ["Holy Spirit Come","Tommy Walker","06:28",3,"holy-spirit-come","w"],
  ["How could I but love you","Tommy Walker","06:11",1,"how-could-i-but-love-you","w"],
  ["How Good And Pleasant","Tommy Walker","04:02",2,"how-good-and-pleasant","w"],
  ["How great is our God","Chris Tomlin","06:02",1,"how-great-is-our-god","w"],
  ["How I Love You Lord","Tommy Walker","04:57",1,"how-i-love-you-lord-2","w"],
  ["I Believe In Jesus","Tommy Walker","03:52",2,"i-believe-in-jesus","w"],
  ["I Call You Jesus (Full Instrumental Track)","Israel & New Breed","05:42",1,"i-call-you-jesus-full-instrumental-track","w"],
  ["I fix my eyes on you","Tommy Walker","04:04",5,"i-fix-my-eyes-on-you","w"],
  ["I Have A Hope","Tommy Walker","04:39",1,"i-have-a-hope","w"],
  ["I Know Who I Am","Sinach","06:06",3,"i-know-who-i-am","w"],
  ["I sing praises to your name","Terry MacAlmon","06:08",1,"i-sing-praises-to-your-name","w"],
  ["I'm Not Ashamed","Tommy Walker","04:04",1,"im-not-ashamed","w"],
  ["If Heaven Never Was Promised","Andraé Crouch","04:42",1,"if-heaven-never-was-promised","w"],
  ["In Jesus' Name (Full Instrumental Track)","Israel & New Breed","06:30",7,"in-jesus-name-full-instrumental-track","w"],
  ["In Your Presence","Keith Staten","08:43",1,"in-your-presence","w"],
  ["In Your Presence He Is Able","Morris Chapman","05:25",3,"in-your-presence-he-is-able","w"],
  ["Jesus Is Alive Instrumental Track","Ron Kenoly","03:42",0,"jesus-is-alive-instrumental-track","w"],
  ["Jesus Lover Of My Soul","Hillsong Worship","03:36",2,"jesus-lover-of-my-soul","w"],
  ["Jesus What A Wonder You Are","Maranatha Music","04:02",2,"jesus-what-a-wonder-you-are","w"],
  ["Jesus, Lord To Me","Alvin Slaughter","04:16",0,"jesus-lord-to-me","w"],
  ["Jesus, Your Name Is Power","Maranatha Music","03:26",1,"jesus-your-name-is-power","w"],
  ["Lenny Leblanc Love Came Down","Lenny LeBlanc","04:33",3,"lenny-leblanc-love-came-down","w"],
  // ── WORSHIP page 2 ────────────────────────────────────────────────────────
  ["Let It Be Known","Casey J","04:41",7,"let-it-be-known","w"],
  ["Let Your Glory Fill This House","Benny Hinn & Jonathan Stockstill","05:48",88,"let-your-glory-fill-this-house","w"],
  ["Let's Think About Our God","Tommy Walker","06:08",21,"tommy-walker-lets-think-about-our-god","w"],
  ["Lift Him Up","Ron Kenoly","04:08",46,"lift-him-up","w"],
  ["Look My Way","Lenny LeBlanc","04:29",33,"look-my-way","w"],
  ["Lord Make Me Pure In Heart","Lenny LeBlanc","02:46",11,"lord-make-me-pure-in-heart","w"],
  ["Nobody Else Like You","Andraé Crouch","09:05",33,"nobody-else-like-you","w"],
  ["Only A God Like You","Tommy Walker","05:30",90,"only-a-god-like-you","w"],
  ["Shackles (G)","Mary Mary","03:30",42,"shackles-g","w"],
  ["Stay Connected (Full Instrumental Track)","Jackie McCullough","06:56",11,"stay-connected-full-instrumental-track-2","w"],
  ["The More I Seek You (D)","Kari Jobe","05:28",133,"the-more-i-seek-you-d","w"],
  ["The Steadfast Love / As We Gather","Maranatha Music","0:00",271,"the-steadfast-love-as-we-gather-instrumental-track","w"],
  ["We Are Not Ashamed","Andraé Crouch","05:24",54,"we-are-not-ashamed","w"],
];

// Color map by artist
const COLOR_MAP = {
  "The Living Waters Singers": "#0277bd",
  "First Love Music & Aida": "#7c3aed",
  "First Love Music & Keziah": "#065f46",
  "First Love Music & Georlynn": "#b45309",
  "Georlynn & First Love Music": "#b45309",
  "Georlynn": "#d97706",
  "Keziah": "#0369a1",
  "Keziah & First Love Music": "#0369a1",
  "Aseda": "#7f1d1d",
  "MINISTRY MUSIC INSTRUMENTALS": "#374151",
  "FIRST LOVE MUSIC INSTRUMENTALS": "#1e3a5f",
  "First Love Music": "#6d28d9",
  "Aida & First Love Music": "#7c3aed",
};

const FEATURED_SLUGS = new Set([
  "1234-jesus-2","first-love-love-first","give-your-life-to-the-lord",
  "go-church","ive-found-it","jesus-is-the-door","jesus-youre-so-cool",
  "living-waters","no-ordinary-water","rose-of-sharon",
]);

const MOOD_KEYWORDS = {
  anointing: /anoint|spirit|holy|anointing|oil|power|presence|stir up/i,
  beloved: /love|beloved|heart|dear|like you|beautiful|closer|bride|sweet/i,
  dancing: /danc|joy|praise|celebrat|go go|shackles|rejoic/i,
  flow: /water|flow|river|deep|refresh|breath|eagles|thirst/i,
  honour: /lord|king|name|glory|worthy|throne|god|jesus|christ|worship|exalt|majesty|crown|bless|holy/i,
};

function getMood(title) {
  for (const [mood, re] of Object.entries(MOOD_KEYWORDS)) {
    if (re.test(title)) return mood;
  }
  return undefined;
}

function getColor(artist) {
  return COLOR_MAP[artist] ?? "#374151";
}

const tracks = RAW.map(([title, artist, duration, plays, slug, cat]) => {
  const mood = getMood(title);
  const featured = FEATURED_SLUGS.has(slug);
  const trending = plays >= 100;
  const color = getColor(artist);
  const category = cat === "w" ? "worship" : "instrumental";
  const stationUrl = `${BASE}/station/${slug}/`;
  const downloadUrl = `${BASE}/station/${slug}/stream`;

  const parts = [
    `  {`,
    `    id: ${JSON.stringify(slug)},`,
    `    title: ${JSON.stringify(title)},`,
    `    artist: ${JSON.stringify(artist)},`,
    `    duration: ${JSON.stringify(duration)},`,
    `    plays: ${plays},`,
    `    size: "—",`,
    `    category: "${category}",`,
    `    imageUrl: "",`,
    `    coverColor: "${color}",`,
    ...(mood ? [`    mood: "${mood}",`] : []),
    ...(featured ? [`    featured: true,`] : []),
    ...(trending ? [`    trending: true,`] : []),
    `    stationUrl: ${JSON.stringify(stationUrl)},`,
    `    downloadUrl: ${JSON.stringify(downloadUrl)},`,
    `  }`,
  ];
  return parts.join("\n");
});

const output = `// AUTO-GENERATED by scripts/generate-tracks.mjs — do not edit by hand
const BASE = "https://shemenmusic.com/three";

export type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  plays: number;
  size: string;
  category: "instrumental" | "worship";
  imageUrl: string;
  mood?: string;
  featured?: boolean;
  trending?: boolean;
  coverColor: string;
  coverColor2?: string;
  coverImage?: string;
  downloadUrl?: string;
  stationUrl?: string;
  lyrics?: string;
};

export type Playlist = {
  id: string;
  title: string;
  curator: string;
  trackCount: number;
  coverColor: string;
};

export type Mood = {
  id: string;
  label: string;
  emoji: string;
  color: string;
  imageUrl?: string;
};

export const tracks: Track[] = [
${tracks.join(",\n")}
];

export const playlists: Playlist[] = [
  { id: "p1", title: "Songs of the Anointing", curator: "ShemenMusic", trackCount: 12, coverColor: "#7c3aed" },
  { id: "p2", title: "Sunday Morning Worship", curator: "ShemenMusic", trackCount: 8, coverColor: "#0369a1" },
  { id: "p3", title: "Soaking Instrumentals", curator: "ShemenMusic", trackCount: 15, coverColor: "#065f46" },
  { id: "p4", title: "Praise & Dance", curator: "ShemenMusic", trackCount: 10, coverColor: "#d97706" },
];

export const moods: Mood[] = [
  { id: "anointing", label: "Anointing", emoji: "🕊️", color: "#7c3aed" },
  { id: "beloved", label: "Beloved", emoji: "💛", color: "#d97706" },
  { id: "dancing", label: "Dancing", emoji: "🕺", color: "#dc2626" },
  { id: "flow", label: "Flow", emoji: "🌊", color: "#0369a1" },
  { id: "honour", label: "Honour", emoji: "👑", color: "#b45309" },
];

export function formatPlays(n: number): string {
  if (n >= 1000) return \`\${(n / 1000).toFixed(1)}k\`;
  return String(n);
}

export function totalDuration(list: Track[]): string {
  let total = 0;
  for (const t of list) {
    const parts = t.duration.split(":").map(Number);
    if (parts.length === 2) total += (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
  }
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  return h > 0 ? \`\${h}h \${m}m\` : \`\${m}m\`;
}
`;

const outPath = new URL("../lib/data.ts", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
writeFileSync(outPath, output);
console.log("Written " + RAW.length + " tracks to lib/data.ts");
