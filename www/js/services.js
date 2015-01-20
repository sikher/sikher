angular.module('starter.services', [])

.factory('Data', function() {

  return {
        all: function(data) {
          return data;
        },
        remove: function(data, dataId) {
          data.splice(data.indexOf(dataId), 1);
        },
        get: function(data, dataId) {
          return [data[dataId]];
        },
        filter: function(data, dataId, field) {
          var output = [];
          for (var i = 0; i < data.length; i++) {
            if (parseInt(data[i][field]) === parseInt(dataId)) {
              output.push(data[i]);
            }
          }
          return output;
        }
    }
})

.factory('Scripture', function() {

  var data = [
  {
    "id":1,
    "scripture":"sggs",
    "page":1,
    "line":1,
    "hymn":1,
    "gurmukhi":"< siq nwmu krqw purKu inrBau inrvYru Akwl mUriq AjUnI sYBM gur pRswid ]",
    "transliteration":"Ikoankaar Sathnaam Karathaa Purakh Nirabho Niravair Akaal Moorath Ajoonee Saibhan Gurprasaadh ||",
    "translation":"One Universal Creator God, TheName Is Truth  Creative Being Personified No Fear No Hatred Image Of The Undying, Beyond Birth, Self-Existent. By Guru's Grace~",
    "gurmukhi_search":"<snkpnnAmAsgp",
    "transliteration_search":"iskpnnamasgp"
  },
  {
    "id":2,
    "scripture":"sggs",
    "page":1,
    "line":3,
    "hymn":1,
    "gurmukhi":"] jpu ]",
    "transliteration":"|| Jap ||",
    "translation":"Chant And Meditate:",
    "gurmukhi_search":"j",
    "transliteration_search":"j"
  },
  {
    "id":3,
    "scripture":"sggs",
    "page":1,
    "line":4,
    "hymn":1,
    "gurmukhi":"Awid scu jugwid scu ]",
    "transliteration":"Aadh Sach Jugaadh Sach ||",
    "translation":"True In The Primal Beginning. True Throughout The Ages.",
    "gurmukhi_search":"Asjs",
    "transliteration_search":"asjs"
  },
  {
    "id":4,
    "scripture":"sggs",
    "page":1,
    "line":4,
    "hymn":1,
    "gurmukhi":"hY BI scu nwnk hosI BI scu ]1]",
    "transliteration":"Hai Bhee Sach Naanak Hosee Bhee Sach ||1||",
    "translation":"True Here And Now. O Nanak, Forever And Ever True. ||1||",
    "gurmukhi_search":"hBsnhBs",
    "transliteration_search":"hbsnhbs"
  },
  {
    "id":5,
    "scripture":"sggs",
    "page":1,
    "line":5,
    "hymn":1,
    "gurmukhi":"socY soic n hoveI jy socI lK vwr ]",
    "transliteration":"Sochai Soch N Hovee Jae Sochee Lakh Vaar ||",
    "translation":"By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times.",
    "gurmukhi_search":"ssnhjslv",
    "transliteration_search":"ssnhjslv"
  },
  {
    "id":6,
    "scripture":"sggs",
    "page":1,
    "line":5,
    "hymn":1,
    "gurmukhi":"cupY cup n hoveI jy lwie rhw ilv qwr ]",
    "transliteration":"Chupai Chup N Hovee Jae Laae Rehaa Liv Thaar ||",
    "translation":"By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within.",
    "gurmukhi_search":"ccnhjlrlq",
    "transliteration_search":"ccnhjlrlt"
  },
  {
    "id":7,
    "scripture":"sggs",
    "page":1,
    "line":5,
    "hymn":1,
    "gurmukhi":"BuiKAw BuK n auqrI jy bMnw purIAw Bwr ]",
    "transliteration":"Bhukhiaa Bhukh N Outharee Jae Bannaa Pureeaa Bhaar ||",
    "translation":"The hunger of the hungry is not appeased, even by piling up loads of worldly goods.",
    "gurmukhi_search":"BBnajbpB",
    "transliteration_search":"bbnajbpb"
  },
  {
    "id":8,
    "scripture":"sggs",
    "page":1,
    "line":6,
    "hymn":1,
    "gurmukhi":"shs isAwxpw lK hoih q iek n clY nwil ]",
    "transliteration":"Sehas Siaanapaa Lakh Hohi Th Eik N Chalai Naal ||",
    "translation":"Hundreds of thousands of clever tricks, but not even one of them will go along with you in the end.",
    "gurmukhi_search":"sslhqencn",
    "transliteration_search":"sslhtencn"
  },
  {
    "id":9,
    "scripture":"sggs",
    "page":1,
    "line":6,
    "hymn":1,
    "gurmukhi":"ikv sicAwrw hoeIAY ikv kUVY qutY pwil ]",
    "transliteration":"Kiv Sachiaaraa Hoeeai Kiv Koorrai Thutti Paal ||",
    "translation":"So how can you become truthful? And how can the veil of illusion be torn away?",
    "gurmukhi_search":"kshkkqp",
    "transliteration_search":"kshkktp"
  },
  {
    "id":10,
    "scripture":"sggs",
    "page":1,
    "line":7,
    "hymn":1,
    "gurmukhi":"hukim rjweI clxw nwnk iliKAw nwil ]1]",
    "transliteration":"Hukam Rajaaee Chalanaa Naanak Likhiaa Naal ||1||",
    "translation":"O Nanak, it is written that you shall obey the Hukam of His Command, and walk in the Way of His Will. ||1||",
    "gurmukhi_search":"hrcnln",
    "transliteration_search":"hrcnln"
  },
  {
    "id":11,
    "scripture":"sggs",
    "page":1,
    "line":7,
    "hymn":2,
    "gurmukhi":"hukmI hovin Awkwr hukmu n kihAw jweI ]",
    "transliteration":"Hukamee Hovan Aakaar Hukam N Kehiaa Jaaee ||",
    "translation":"By His Command, bodies are created; His Command cannot be described.",
    "gurmukhi_search":"hhAhnkj",
    "transliteration_search":"hhahnkj"
  },
  {
    "id":12,
    "scripture":"sggs",
    "page":1,
    "line":8,
    "hymn":2,
    "gurmukhi":"hukmI hovin jIA hukim imlY vifAweI ]",
    "transliteration":"Hukamee Hovan Jeea Hukam Milai Vaddiaaee ||",
    "translation":"By His Command, souls come into being; by His Command, glory and greatness are obtained.",
    "gurmukhi_search":"hhjhmv",
    "transliteration_search":"hhjhmv"
  },
  {
    "id":13,
    "scripture":"sggs",
    "page":1,
    "line":8,
    "hymn":2,
    "gurmukhi":"hukmI auqmu nIcu hukim iliK duK suK pweIAih ]",
    "transliteration":"Hukamee Outham Neech Hukam Likh Dhukh Sukh Paaeeahi ||",
    "translation":"By His Command, some are high and some are low; by His Written Command, pain and pleasure are obtained.",
    "gurmukhi_search":"hanhldsp",
    "transliteration_search":"hanhldsp"
  },
  {
    "id":14,
    "scripture":"sggs",
    "page":1,
    "line":9,
    "hymn":2,
    "gurmukhi":"ieknw hukmI bKsIs ieik hukmI sdw BvweIAih ]",
    "transliteration":"Eikanaa Hukamee Bakhasees Eik Hukamee Sadha Bhavaaeeahi ||",
    "translation":"Some, by His Command, are blessed and forgiven; others, by His Command, wander aimlessly forever.",
    "gurmukhi_search":"ehbehsB",
    "transliteration_search":"ehbehsb"
  },
  {
    "id":15,
    "scripture":"sggs",
    "page":1,
    "line":9,
    "hymn":2,
    "gurmukhi":"hukmY AMdir sBu ko bwhir hukm n koie ]",
    "transliteration":"Hukamai Andhr Sabh Ko Baahar Hukam N Koe ||",
    "translation":"Everyone is subject to His Command; no one is beyond His Command.",
    "gurmukhi_search":"hAskbhnk",
    "transliteration_search":"haskbhnk"
  },
  {
    "id":16,
    "scripture":"sggs",
    "page":1,
    "line":10,
    "hymn":2,
    "gurmukhi":"nwnk hukmY jy buJY q haumY khY n koie ]2]",
    "transliteration":"Naanak Hukamai Jae Bujhai Th Houmai Kehai N Koe ||2||",
    "translation":"O Nanak, one who understands His Command, does not speak in ego. ||2||",
    "gurmukhi_search":"nhjbqhknk",
    "transliteration_search":"nhjbthknk"
  },
  {
    "id":17,
    "scripture":"sggs",
    "page":1,
    "line":10,
    "hymn":3,
    "gurmukhi":"gwvY ko qwxu hovY iksY qwxu ]",
    "transliteration":"Gaavai Ko Thaan Hovai Kisai Thaan ||",
    "translation":"Some sing of His Power-who has that Power?",
    "gurmukhi_search":"gkqhkq",
    "transliteration_search":"gkthkt"
  },
  {
    "id":18,
    "scripture":"sggs",
    "page":1,
    "line":11,
    "hymn":3,
    "gurmukhi":"gwvY ko dwiq jwxY nIswxu ]",
    "transliteration":"Gaavai Ko Dhaath Jaanai Neesaan ||",
    "translation":"Some sing of His Gifts, and know His Sign and Insignia.",
    "gurmukhi_search":"gkdjn",
    "transliteration_search":"gkdjn"
  },
  {
    "id":19,
    "scripture":"sggs",
    "page":1,
    "line":11,
    "hymn":3,
    "gurmukhi":"gwvY ko gux vifAweIAw cwr ]",
    "transliteration":"Gaavai Ko Gun Vaddiaaeeaa Chaar ||",
    "translation":"Some sing of His Glorious Virtues, Greatness and Beauty.",
    "gurmukhi_search":"gkgvc",
    "transliteration_search":"gkgvc"
  },
  {
    "id":20,
    "scripture":"sggs",
    "page":1,
    "line":11,
    "hymn":3,
    "gurmukhi":"gwvY ko ividAw ivKmu vIcwru ]",
    "transliteration":"Gaavai Ko Vidhiaa Vikham Veechaar ||",
    "translation":"Some sing of knowledge obtained of Him, through difficult philosophical studies.",
    "gurmukhi_search":"gkvvv",
    "transliteration_search":"gkvvv"
  },
  {
    "id":21,
    "scripture":"sggs",
    "page":1,
    "line":12,
    "hymn":3,
    "gurmukhi":"gwvY ko swij kry qnu Kyh ]",
    "transliteration":"Gaavai Ko Saaj Karae Than Khaeh ||",
    "translation":"Some sing that He fashions the body, and then again reduces it to dust.",
    "gurmukhi_search":"gkskqK",
    "transliteration_search":"gksktk"
  },
  {
    "id":22,
    "scripture":"sggs",
    "page":1,
    "line":12,
    "hymn":3,
    "gurmukhi":"gwvY ko jIA lY iPir dyh ]",
    "transliteration":"Gaavai Ko Jeea Lai Fir Dhaeh ||",
    "translation":"Some sing that He takes life away, and then again restores it.",
    "gurmukhi_search":"gkjlPd",
    "transliteration_search":"gkjlfd"
  },
  {
    "id":23,
    "scripture":"sggs",
    "page":1,
    "line":12,
    "hymn":3,
    "gurmukhi":"gwvY ko jwpY idsY dUir ]",
    "transliteration":"Gaavai Ko Jaapai Dhisai Dhoor ||",
    "translation":"Some sing that He seems so very far away.",
    "gurmukhi_search":"gkjdd",
    "transliteration_search":"gkjdd"
  },
  {
    "id":24,
    "scripture":"sggs",
    "page":2,
    "line":1,
    "hymn":3,
    "gurmukhi":"gwvY ko vyKY hwdrw hdUir ]",
    "transliteration":"Gaavai Ko Vaekhai Haadhraa Hadhoor ||",
    "translation":"Some sing that He watches over us, face to face, ever-present.",
    "gurmukhi_search":"gkvhh",
    "transliteration_search":"gkvhh"
  },
  {
    "id":25,
    "scripture":"sggs",
    "page":2,
    "line":1,
    "hymn":3,
    "gurmukhi":"kQnw kQI n AwvY qoit ]",
    "transliteration":"Kathhanaa Kathhee N Aavai Thott ||",
    "translation":"There is no shortage of those who preach and teach.",
    "gurmukhi_search":"kknAq",
    "transliteration_search":"kknat"
  },
  {
    "id":26,
    "scripture":"sggs",
    "page":2,
    "line":1,
    "hymn":3,
    "gurmukhi":"kiQ kiQ kQI kotI koit koit ]",
    "transliteration":"Kathh Kathh Kathhee Kottee Kott Kott ||",
    "translation":"Millions upon millions offer millions of sermons and stories.",
    "gurmukhi_search":"kkkkkk",
    "transliteration_search":"kkkkkk"
  },
  {
    "id":27,
    "scripture":"sggs",
    "page":2,
    "line":2,
    "hymn":3,
    "gurmukhi":"dydw dy lYdy Qik pwih ]",
    "transliteration":"Dhaedhaa Dhae Laidhae Thhak Paahi ||",
    "translation":"The Great Giver keeps on giving, while those who receive grow weary of receiving.",
    "gurmukhi_search":"ddlQp",
    "transliteration_search":"ddltp"
  },
  {
    "id":28,
    "scripture":"sggs",
    "page":2,
    "line":2,
    "hymn":3,
    "gurmukhi":"jugw jugMqir KwhI Kwih ]",
    "transliteration":"Jugaa Juganthar Khaahee Khaahi ||",
    "translation":"Throughout the ages, consumers consume.",
    "gurmukhi_search":"jjKK",
    "transliteration_search":"jjkk"
  },
  {
    "id":29,
    "scripture":"sggs",
    "page":2,
    "line":2,
    "hymn":3,
    "gurmukhi":"hukmI hukmu clwey rwhu ]",
    "transliteration":"Hukamee Hukam Chalaaeae Raahu ||",
    "translation":"The Commander, by His Command, leads us to walk on the Path.",
    "gurmukhi_search":"hhcr",
    "transliteration_search":"hhcr"
  },
  {
    "id":30,
    "scripture":"sggs",
    "page":2,
    "line":3,
    "hymn":3,
    "gurmukhi":"nwnk ivgsY vyprvwhu ]3]",
    "transliteration":"Naanak Vigasai Vaepravaahu ||3||",
    "translation":"O Nanak, He blossoms forth, Carefree and Untroubled. ||3||",
    "gurmukhi_search":"nvv",
    "transliteration_search":"nvv"
  },
  {
    "id":31,
    "scripture":"sggs",
    "page":2,
    "line":3,
    "hymn":4,
    "gurmukhi":"swcw swihbu swcu nwie BwiKAw Bwau Apwru ]",
    "transliteration":"Saachaa Saahib Saach Naae Bhaakhiaa Bhaao Apaar ||",
    "translation":"True is the Master, True is His Name-speak it with infinite love.",
    "gurmukhi_search":"sssnBBA",
    "transliteration_search":"sssnbba"
  },
  {
    "id":32,
    "scripture":"sggs",
    "page":2,
    "line":3,
    "hymn":4,
    "gurmukhi":"AwKih mMgih dyih dyih dwiq kry dwqwru ]",
    "transliteration":"Aakhehi Mangehi Dhaehi Dhaehi Dhaath Karae Dhaathaar ||",
    "translation":"People beg and pray, \"Give to us, give to us\", and the Great Giver gives His Gifts.",
    "gurmukhi_search":"Amdddkd",
    "transliteration_search":"amdddkd"
  },
  {
    "id":33,
    "scripture":"sggs",
    "page":2,
    "line":4,
    "hymn":4,
    "gurmukhi":"Pyir ik AgY rKIAY ijqu idsY drbwru ]",
    "transliteration":"Faer K Agai Rakheeai Jith Dhisai Dharabaar ||",
    "translation":"So what offering can we place before Him, by which we might see the Darbaar of His Court?",
    "gurmukhi_search":"PkArjdd",
    "transliteration_search":"fkarjdd"
  },
  {
    "id":34,
    "scripture":"sggs",
    "page":2,
    "line":4,
    "hymn":4,
    "gurmukhi":"muhO ik bolxu bolIAY ijqu suix Dry ipAwru ]",
    "transliteration":"Muha K Bolan Boleeai Jith Sun Dhharae Piaar ||",
    "translation":"What words can we speak to evoke His Love?",
    "gurmukhi_search":"mkbbjsDp",
    "transliteration_search":"mkbbjsdp"
  },
  {
    "id":35,
    "scripture":"sggs",
    "page":2,
    "line":5,
    "hymn":4,
    "gurmukhi":"AMimRq vylw scu nwau vifAweI vIcwru ]",
    "transliteration":"Anmrith Vaelaa Sach Naao Vaddiaaee Veechaar ||",
    "translation":"In the Amrit Vaylaa, the ambrosial hours before dawn, chant the True Name, and contemplate His Glorious Greatness.",
    "gurmukhi_search":"Avsnvv",
    "transliteration_search":"avsnvv"
  },
  {
    "id":36,
    "scripture":"sggs",
    "page":2,
    "line":5,
    "hymn":4,
    "gurmukhi":"krmI AwvY kpVw ndrI moKu duAwru ]",
    "transliteration":"Karamee Aavai Kaparraa Nadhree Mokh Dhuaar ||",
    "translation":"By the karma of past actions, the robe of this physical body is obtained. By His Grace, the Gate of Liberation is found.",
    "gurmukhi_search":"kAknmd",
    "transliteration_search":"kaknmd"
  },
  {
    "id":37,
    "scripture":"sggs",
    "page":2,
    "line":6,
    "hymn":4,
    "gurmukhi":"nwnk eyvY jwxIAY sBu Awpy sicAwru ]4]",
    "transliteration":"Naanak Eaevai Jaaneeai Sabh Aapae Sachiaar ||4||",
    "translation":"O Nanak, know this well: the True One Himself is All. ||4||",
    "gurmukhi_search":"nejsAs",
    "transliteration_search":"nejsas"
  },
  {
    "id":38,
    "scripture":"sggs",
    "page":2,
    "line":6,
    "hymn":5,
    "gurmukhi":"QwipAw n jwie kIqw n hoie ]",
    "transliteration":"Thhaapiaa N Jaae Keethaa N Hoe ||",
    "translation":"He cannot be established, He cannot be created.",
    "gurmukhi_search":"Qnjknh",
    "transliteration_search":"tnjknh"
  },
  {
    "id":39,
    "scripture":"sggs",
    "page":2,
    "line":7,
    "hymn":5,
    "gurmukhi":"Awpy Awip inrMjnu soie ]",
    "transliteration":"Aapae Aap Niranjan Soe ||",
    "translation":"He Himself is Immaculate and Pure.",
    "gurmukhi_search":"AAns",
    "transliteration_search":"aans"
  },
  {
    "id":40,
    "scripture":"sggs",
    "page":2,
    "line":7,
    "hymn":5,
    "gurmukhi":"ijin syivAw iqin pwieAw mwnu ]",
    "transliteration":"Jin Saeviaa Thin Paaeiaa Maan ||",
    "translation":"Those who serve Him are honored.",
    "gurmukhi_search":"jsqpm",
    "transliteration_search":"jstpm"
  },
  {
    "id":41,
    "scripture":"sggs",
    "page":2,
    "line":7,
    "hymn":5,
    "gurmukhi":"nwnk gwvIAY guxI inDwnu ]",
    "transliteration":"Naanak Gaaveeai Gunee Nidhhaan ||",
    "translation":"O Nanak, sing of the Lord, the Treasure of Excellence.",
    "gurmukhi_search":"nggn",
    "transliteration_search":"nggn"
  },
  {
    "id":42,
    "scripture":"sggs",
    "page":2,
    "line":8,
    "hymn":5,
    "gurmukhi":"gwvIAY suxIAY min rKIAY Bwau ]",
    "transliteration":"Gaaveeai Suneeai Man Rakheeai Bhaao ||",
    "translation":"Sing, and listen, and let your mind be filled with love.",
    "gurmukhi_search":"gsmrB",
    "transliteration_search":"gsmrb"
  },
  {
    "id":43,
    "scripture":"sggs",
    "page":2,
    "line":8,
    "hymn":5,
    "gurmukhi":"duKu prhir suKu Gir lY jwie ]",
    "transliteration":"Dhukh Parehar Sukh Ghar Lai Jaae ||",
    "translation":"Your pain shall be sent far away, and peace shall come to your home.",
    "gurmukhi_search":"dpsGlj",
    "transliteration_search":"dpsglj"
  },
  {
    "id":44,
    "scripture":"sggs",
    "page":2,
    "line":8,
    "hymn":5,
    "gurmukhi":"gurmuiK nwdM gurmuiK vydM gurmuiK rihAw smweI ]",
    "transliteration":"Guramukh Naadhn Guramukh Vaedhan Guramukh Rehiaa Samaaee ||",
    "translation":"The Guru's Word is the Sound-current of the Naad; the Guru's Word is the Wisdom of the Vedas; the Guru's Word is all-pervading.",
    "gurmukhi_search":"gngvgrs",
    "transliteration_search":"gngvgrs"
  },
  {
    "id":45,
    "scripture":"sggs",
    "page":2,
    "line":9,
    "hymn":5,
    "gurmukhi":"guru eIsru guru gorKu brmw guru pwrbqI mweI ]",
    "transliteration":"Gur Eesar Gur Gorakh Baramaa Gur Paarabathee Maaee ||",
    "translation":"The Guru is Shiva, the Guru is Vishnu and Brahma; the Guru is Paarvati and Lakhshmi.",
    "gurmukhi_search":"geggbgpm",
    "transliteration_search":"geggbgpm"
  },
  {
    "id":46,
    "scripture":"sggs",
    "page":2,
    "line":9,
    "hymn":5,
    "gurmukhi":"jy hau jwxw AwKw nwhI khxw kQnu n jweI ]",
    "transliteration":"Jae Ho Jaanaa Aakhaa Naahee Kehanaa Kathhan N Jaaee ||",
    "translation":"Even knowing God, I cannot describe Him; He cannot be described in words.",
    "gurmukhi_search":"jhjAnkknj",
    "transliteration_search":"jhjankknj"
  },
  {
    "id":47,
    "scripture":"sggs",
    "page":2,
    "line":10,
    "hymn":5,
    "gurmukhi":"gurw iek dyih buJweI ]",
    "transliteration":"Guraa Eik Dhaehi Bujhaaee ||",
    "translation":"The Guru has given me this one understanding:",
    "gurmukhi_search":"gedb",
    "transliteration_search":"gedb"
  },
  {
    "id":48,
    "scripture":"sggs",
    "page":2,
    "line":10,
    "hymn":5,
    "gurmukhi":"sBnw jIAw kw ieku dwqw so mY ivsir n jweI ]5]",
    "transliteration":"Sabhanaa Jeeaa Kaa Eik Dhaathaa So Mai Visar N Jaaee ||5||",
    "translation":"There is only the One, the Giver of all souls. May I never forget Him! ||5||",
    "gurmukhi_search":"sjkedsmvnj",
    "transliteration_search":"sjkedsmvnj"
  },
  {
    "id":49,
    "scripture":"sggs",
    "page":2,
    "line":11,
    "hymn":6,
    "gurmukhi":"qIriQ nwvw jy iqsu Bwvw ivxu Bwxy ik nwie krI ]",
    "transliteration":"Theerathh Naavaa Jae This Bhaavaa Vin Bhaanae K Naae Karee ||",
    "translation":"If I am pleasing to Him, then that is my pilgrimage and cleansing bath. Without pleasing Him, what good are ritual cleansings?",
    "gurmukhi_search":"qnjqBvBknk",
    "transliteration_search":"tnjtbvbknk"
  },
  {
    "id":50,
    "scripture":"sggs",
    "page":2,
    "line":11,
    "hymn":6,
    "gurmukhi":"qIriQ nwvw jy iqsu Bwvw ivxu Bwxy ik nwie krI ]",
    "transliteration":"Theerathh Naavaa Jae This Bhaavaa Vin Bhaanae K Naae Karee ||",
    "translation":"If I am pleasing to Him, then that is my pilgrimage and cleansing bath. Without pleasing Him, what good are ritual cleansings?",
    "gurmukhi_search":"qnjqBvBknk",
    "transliteration_search":"tnjtbvbknk"
  }
];

return data;
})

.factory('Prayers', function() {
  var data = [{
    id: 0,
    name: 'Jap Ji Sahib',
    description: 'Song of the Soul',
  }, {
    id: 1,
    name: 'Jaap Sahib',
    description: 'Song of Recitation',
  }, {
    id: 2,
    name: 'Tav Prasad Savaiye',
    description: 'Song By Thy Grace',
  }, {
    id: 3,
    name: 'Chaupai Sahib',
    description: 'Song of the Poet',
  }, {
    id: 4,
    name: 'Anand Sahib',
    description: 'Song of Bliss',
  },
  {
    id: 5,
    name: 'Rehraas Sahib',
    description: 'Song of Continued Essence',
  },
  {
    id: 6,
    name: 'Kirtan Sohila',
    description: 'Song of Rest',
  }];


  return data;
})

.factory('Favourites', function() {
  var data = [{
    "id":47,
    "scripture":"sggs",
    "page":2,
    "line":10,
    "hymn":5,
    "gurmukhi":"gurw iek dyih buJweI ]",
    "transliteration":"Guraa Eik Dhaehi Bujhaaee ||",
    "translation":"The Guru has given me this one understanding:",
    "gurmukhi_search":"gedb",
    "transliteration_search":"gedb"
  },
  {
    "id":48,
    "scripture":"sggs",
    "page":2,
    "line":10,
    "hymn":5,
    "gurmukhi":"sBnw jIAw kw ieku dwqw so mY ivsir n jweI ]5]",
    "transliteration":"Sabhanaa Jeeaa Kaa Eik Dhaathaa So Mai Visar N Jaaee ||5||",
    "translation":"There is only the One, the Giver of all souls. May I never forget Him! ||5||",
    "gurmukhi_search":"sjkedsmvnj",
    "transliteration_search":"sjkedsmvnj"
  },
  {
    "id":49,
    "scripture":"sggs",
    "page":2,
    "line":11,
    "hymn":6,
    "gurmukhi":"qIriQ nwvw jy iqsu Bwvw ivxu Bwxy ik nwie krI ]",
    "transliteration":"Theerathh Naavaa Jae This Bhaavaa Vin Bhaanae K Naae Karee ||",
    "translation":"If I am pleasing to Him, then that is my pilgrimage and cleansing bath. Without pleasing Him, what good are ritual cleansings?",
    "gurmukhi_search":"qnjqBvBknk",
    "transliteration_search":"tnjtbvbknk"
  }];


  return data;

});
