import endent from "endent";
import Head from "next/head";

import { Layout } from "@/components/layout";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Configuration, OpenAIApi } from "openai";

const Languages = [
  "Abkhazian",
  "Achinese",
  "Acoli",
  "Adangme",
  "Adyghe",
  "Afar",
  "Afrihili",
  "Afrikaans",
  "Aghem",
  "Ainu",
  "Akan",
  "Akkadian",
  "Akoose",
  "Alabama",
  "Albanian",
  "Aleut",
  "Algerian Arabic",
  "Amarik",
  "American English",
  "American Sign Language",
  "Ancient Egyptian",
  "Ancient Greek",
  "Angika",
  "Ao Naga",
  "Arabik",
  "Aragonese",
  "Aramaic",
  "Araona",
  "Arapaho",
  "Arawak",
  "Armenian",
  "Aromanian",
  "Arpitan",
  "Assamese",
  "Asturian",
  "Asu",
  "Atsam",
  "Australian English",
  "Austrian German",
  "Avaric",
  "Avestan",
  "Awadhi",
  "Aymara",
  "Azerbaijani",
  "Badaga",
  "Bafia",
  "Bafut",
  "Bakhtiari",
  "Balinese",
  "Baluchi",
  "Bambara",
  "Bamun",
  "Banjar",
  "Basaa",
  "Bashkir",
  "Basque",
  "Batak Toba",
  "Bavarian",
  "Beja",
  "Belarus kasa",
  "Bemba",
  "Bena",
  "Bengali kasa",
  "Betawi",
  "Bɛɛmis kasa",
  "Bhojpuri",
  "Bikol",
  "Bini",
  "Bishnupriya",
  "Bislama",
  "Blin",
  "Blissymbols",
  "Bodo",
  "Borɔfo",
  "Bosnian",
  "Bɔlgeria kasa",
  "Brahui",
  "Braj",
  "Brazilian Portuguese",
  "Breton",
  "British English",
  "Buginese",
  "Bulu",
  "Buriat",
  "Caddo",
  "Cajun French",
  "Canadian English",
  "Canadian French",
  "Cantonese",
  "Capiznon",
  "Carib",
  "Catalan",
  "Cayuga",
  "Cebuano",
  "Central Atlas Tamazight",
  "Central Dusun",
  "Central Kurdish",
  "Central Yupik",
  "Chadian Arabic",
  "Chagatai",
  "Chamorro",
  "Chechen",
  "Cherokee",
  "Cheyenne",
  "Chibcha",
  "Chiga",
  "Chimborazo Highland Quichua",
  "Chinook Jargon",
  "Chipewyan",
  "Choctaw",
  "Church Slavic",
  "Chuukese",
  "Chuvash",
  "Classical Newari",
  "Classical Syriac",
  "Colognian",
  "Comorian",
  "Congo Swahili",
  "Coptic",
  "Cornish",
  "Corsican",
  "Cree",
  "Creek",
  "Crimean Turkish",
  "Croatian",
  "Dakota",
  "Danish",
  "Dargwa",
  "Dazaga",
  "Delaware",
  "Dɛɛkye",
  "Dinka",
  "Divehi",
  "Dogri",
  "Dogrib",
  "Duala",
  "Dyula",
  "Dzongkha",
  "Eastern Frisian",
  "Efik",
  "Egyptian Arabic",
  "Ekajuk",
  "Elamite",
  "Embu",
  "Emilian",
  "Erzya",
  "Esperanto",
  "Estonian",
  "European Portuguese",
  "European Spanish",
  "Ewe",
  "Ewondo",
  "Extremaduran",
  "Fang",
  "Fanti",
  "Faroese",
  "Fiji Hindi",
  "Fijian",
  "Filipino",
  "Finnish",
  "Flemish",
  "Fon",
  "Frafra",
  "Frɛnkye",
  "Friulian",
  "Fulah",
  "Ga",
  "Gagauz",
  "Galician",
  "Gan Chinese",
  "Ganda",
  "Gayo",
  "Gbaya",
  "Geez",
  "Georgian",
  "Gheg Albanian",
  "Ghomala",
  "Gilaki",
  "Gilbertese",
  "Goan Konkani",
  "Gondi",
  "Gorontalo",
  "Gothic",
  "Grebo",
  "Greek kasa",
  "Guarani",
  "Gujarati",
  "Gusii",
  "Gwichʼin",
  "Gyaaman",
  "Gyabanis kasa",
  "Gyapan kasa",
  "Haida",
  "Haitian",
  "Hakka Chinese",
  "Hangri kasa",
  "Hausa",
  "Hawaiian",
  "Hebrew",
  "Herero",
  "Hiligaynon",
  "Hindi",
  "Hiri Motu",
  "Hittite",
  "Hmong",
  "Hupa",
  "Iban",
  "Ibibio",
  "Icelandic",
  "Ido",
  "Igbo",
  "Iloko",
  "Inari Sami",
  "Indonihyia kasa",
  "Ingrian",
  "Ingush",
  "Interlingua",
  "Interlingue",
  "Inuktitut",
  "Inupiaq",
  "Irish",
  "Italy kasa",
  "Jamaican Creole English",
  "Jju",
  "Jola-Fonyi",
  "Judeo-Arabic",
  "Judeo-Persian",
  "Jutish",
  "Kabardian",
  "Kabuverdianu",
  "Kabyle",
  "Kachin",
  "Kaingang",
  "Kako",
  "Kalaallisut",
  "Kalenjin",
  "Kalmyk",
  "Kamba",
  "Kambodia kasa",
  "Kanembu",
  "Kannada",
  "Kanuri",
  "Kara-Kalpak",
  "Karachay-Balkar",
  "Karelian",
  "Kashmiri",
  "Kashubian",
  "Kawi",
  "Kazakh",
  "Kenyang",
  "Khasi",
  "Khotanese",
  "Khowar",
  "Kikuyu",
  "Kimbundu",
  "Kinaray-a",
  "Kirmanjki",
  "Klingon",
  "Kom",
  "Komi-Permyak",
  "Komi",
  "Kongo",
  "Konkani",
  "Korea kasa",
  "Koro",
  "Kosraean",
  "Kotava",
  "Koyra Chiini",
  "Koyraboro Senni",
  "Kpelle",
  "Krio",
  "Kuanyama",
  "Kumyk",
  "Kurdish",
  "Kurukh",
  "Kutenai",
  "Kwasio",
  "Kyaena kasa",
  "Kyɛk kasa",
  "Kyrgyz",
  "Kʼicheʼ",
  "Ladino",
  "Lahnda",
  "Lakota",
  "Lamba",
  "Langi",
  "Lao",
  "Latgalian",
  "Latin American Spanish",
  "Latin",
  "Latvian",
  "Laz",
  "Lezghian",
  "Ligurian",
  "Limburgish",
  "Lingala",
  "Lingua Franca Nova",
  "Literary Chinese",
  "Lithuanian",
  "Livonian",
  "Lojban",
  "Lombard",
  "Low German",
  "Lower Silesian",
  "Lower Sorbian",
  "Lozi",
  "Luba-Katanga",
  "Luba-Lulua",
  "Luiseno",
  "Lule Sami",
  "Lunda",
  "Luo",
  "Luxembourgish",
  "Luyia",
  "Maba",
  "Macedonian",
  "Machame",
  "Madurese",
  "Mafa",
  "Magahi",
  "Main-Franconian",
  "Maithili",
  "Makasar",
  "Makhuwa-Meetto",
  "Makonde",
  "Malagasy",
  "Malay kasa",
  "Malayalam",
  "Maltese",
  "Manchu",
  "Mandar",
  "Mandingo",
  "Manipuri",
  "Manx",
  "Maori",
  "Mapuche",
  "Marathi",
  "Mari",
  "Marshallese",
  "Marwari",
  "Masai",
  "Mazanderani",
  "Medumba",
  "Mende",
  "Mentawai",
  "Meru",
  "Metaʼ",
  "Mexican Spanish",
  "Micmac",
  "Middle Dutch",
  "Middle English",
  "Middle French",
  "Middle High German",
  "Middle Irish",
  "Min Nan Chinese",
  "Minangkabau",
  "Mingrelian",
  "Mirandese",
  "Mizo",
  "Modern Standard Arabic",
  "Mohawk",
  "Moksha",
  "Moldavian",
  "Mongo",
  "Mongolian",
  "Morisyen",
  "Moroccan Arabic",
  "Mossi",
  "Multiple Languages",
  "Mundang",
  "Muslim Tat",
  "Myene",
  "Nama",
  "Nauru",
  "Navajo",
  "Ndonga",
  "Neapolitan",
  "Newari",
  "Nɛpal kasa",
  "Ngambay",
  "Ngiemboon",
  "Ngomba",
  "Nheengatu",
  "Nias",
  "Niuean",
  "No linguistic content",
  "Nogai",
  "North Ndebele",
  "Northern Frisian",
  "Northern Sami",
  "Northern Sotho",
  "Norwegian Bokmål",
  "Norwegian Nynorsk",
  "Norwegian",
  "Novial",
  "Nuer",
  "Nyamwezi",
  "Nyanja",
  "Nyankole",
  "Nyasa Tonga",
  "Nyoro",
  "Nzima",
  "NʼKo",
  "Occitan",
  "Ojibwa",
  "Old English",
  "Old French",
  "Old High German",
  "Old Irish",
  "Old Norse",
  "Old Persian",
  "Old Provençal",
  "Oriya",
  "Oromo",
  "Osage",
  "Ossetic",
  "Ottoman Turkish",
  "Pahlavi",
  "Palatine German",
  "Palauan",
  "Pali",
  "Pampanga",
  "Pangasinan",
  "Papiamento",
  "Pashto",
  "Pennsylvania German",
  "Pɛɛhyia kasa",
  "Phoenician",
  "Picard",
  "Piedmontese",
  "Plautdietsch",
  "Pohnpeian",
  "Pontic",
  "Pɔland kasa",
  "Pɔɔtugal kasa",
  "Prussian",
  "Pungyabi kasa",
  "Quechua",
  "Rahyia kasa",
  "Rajasthani",
  "Rapanui",
  "Rarotongan",
  "Rewanda kasa",
  "Riffian",
  "Romagnol",
  "Romansh",
  "Romany",
  "Rombo",
  "Romenia kasa",
  "Root",
  "Rotuman",
  "Roviana",
  "Rundi",
  "Rusyn",
  "Rwa",
  "Saho",
  "Sakha",
  "Samaritan Aramaic",
  "Samburu",
  "Samoan",
  "Samogitian",
  "Sandawe",
  "Sango",
  "Sangu",
  "Sanskrit",
  "Santali",
  "Sardinian",
  "Sasak",
  "Sassarese Sardinian",
  "Saterland Frisian",
  "Saurashtra",
  "Scots",
  "Scottish Gaelic",
  "Selayar",
  "Selkup",
  "Sena",
  "Seneca",
  "Serbian",
  "Serbo-Croatian",
  "Serer",
  "Seri",
  "Shambala",
  "Shan",
  "Shona",
  "Sichuan Yi",
  "Sicilian",
  "Sidamo",
  "Siksika",
  "Silesian",
  "Simplified Chinese",
  "Sindhi",
  "Sinhala",
  "Skolt Sami",
  "Slave",
  "Slovak",
  "Slovenian",
  "Soga",
  "Sogdien",
  "Somalia kasa",
  "Soninke",
  "South Azerbaijani",
  "South Ndebele",
  "Southern Altai",
  "Southern Sami",
  "Southern Sotho",
  "Spain kasa",
  "Sranan Tongo",
  "Standard Moroccan Tamazight",
  "Sukuma",
  "Sumerian",
  "Sundanese",
  "Susu",
  "Swahili",
  "Swati",
  "Sweden kasa",
  "Swiss French",
  "Swiss German",
  "Swiss High German",
  "Syriac",
  "Tachelhit",
  "Taeland kasa",
  "Tagalog",
  "Tahitian",
  "Taita",
  "Tajik",
  "Talysh",
  "Tamashek",
  "Tamil kasa",
  "Taroko",
  "Tasawaq",
  "Tatar",
  "Telugu",
  "Tereno",
  "Teso",
  "Tetum",
  "Tɛɛki kasa",
  "Tibetan",
  "Tigre",
  "Tigrinya",
  "Timne",
  "Tiv",
  "Tlingit",
  "Tok Pisin",
  "Tokelau",
  "Tongan",
  "Tornedalen Finnish",
  "Traditional Chinese",
  "Tsakhur",
  "Tsakonian",
  "Tsimshian",
  "Tsonga",
  "Tswana",
  "Tulu",
  "Tumbuka",
  "Tunisian Arabic",
  "Turkmen",
  "Turoyo",
  "Tuvalu",
  "Tuvinian",
  "Twi",
  "Tyap",
  "Udmurt",
  "Ugaritic",
  "Ukren kasa",
  "Umbundu",
  "Unknown Language",
  "Upper Sorbian",
  "Urdu kasa",
  "Uyghur",
  "Uzbek",
  "Vai",
  "Venda",
  "Venetian",
  "Veps",
  "Viɛtnam kasa",
  "Volapük",
  "Võro",
  "Votic",
  "Vunjo",
  "Walloon",
  "Walser",
  "Waray",
  "Warlpiri",
  "Washo",
  "Wayuu",
  "Welsh",
  "West Flemish",
  "Western Frisian",
  "Western Mari",
  "Wolaytta",
  "Wolof",
  "Wu Chinese",
  "Xhosa",
  "Xiang Chinese",
  "Yangben",
  "Yao",
  "Yapese",
  "Yemba",
  "Yiddish",
  "Yoruba",
  "Zapotec",
  "Zarma",
  "Zaza",
  "Zeelandic",
  "Zenaga",
  "Zhuang",
  "Zoroastrian Dari",
  "Zulu",
  "Zuni",
];

export default function IndexPage() {
  const [inputLanguage, setInputLanguage] = React.useState<string>("American English");
  const [inputText, setInputText] = React.useState<string>("");
  const [outputLanguage, setOutputLanguage] = React.useState<string>("Finnish");
  const [outputText, setOutputText] = React.useState<string>("");
  const [model, setModel] = React.useState<string>("gpt-3.5-turbo");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [apiKey, setApiKey] = React.useState<string>("");

  const processSubmission = async () => {
    setLoading(true);
    setOutputText("");

    try {
      const openai = new OpenAIApi(new Configuration({ apiKey }));
      const response = await openai.createChatCompletion({
        model,
        messages: [
          {
            role: "system",
            content: [
              "You are an expert translator in all natural languages.",
              `Translate the "${inputLanguage}" text to "${outputLanguage}" text.`,
              "Provide back only the text, nothing before and nothing after.",
            ].join(" "),
          },
          { role: "user", content: inputText },
        ],
        temperature: 0,
        top_p: 1,
        n: 1,
      });

      if (
        !response.status
        || response.status < 200
        || response.status > 299
      ) {
        setLoading(false);

        let errorMessage = `OpenAI API Error: ${response.status} - ${response.statusText}`;

        if (response.data) {
          errorMessage += `\n\n${response.data}`;
        }

        if (response.status === 500) {
          errorMessage += "\n\nCheck the API status: https://status.openai.com";
        }

        setOutputText(errorMessage);

        return;
      }

      setOutputText(response.data.choices[0].message.content);
    } catch (error) {
      setOutputText(error.message);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");

    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Next.js</title>
        <meta
          name="description"
          content="Next.js template for building apps with Radix UI and Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pb-8 pt-6">
        <div className="flex w-full flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-sm font-bold">Input</div>

            <Select defaultValue={inputLanguage} onValueChange={(value) => setInputLanguage(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a programming language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Languages.map((language) => <SelectItem key={language} value={language}>{language}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Textarea
              value={inputText}
              onChange={(value) => setInputText(value.target.value)}
            />
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-sm font-bold">Output</div>

            <Select defaultValue={outputLanguage} onValueChange={(value) => setOutputLanguage(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a programming language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Languages.map((language) => <SelectItem key={language} value={language}>{language}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Textarea value={outputText} readOnly />
          </div>
        </div>

        <Separator />

        <div className="flex justify-between space-x-4">
          <div className="w-[256px]">
            <Select defaultValue={model} onValueChange={(value) => setModel(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an OpenAI model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5</SelectItem>
                  <SelectItem value="gpt-4">GPT-4.0</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Input
            type="email"
            placeholder="OpenAI API Key"
            value={apiKey}
            onChange={(value) => {
              setApiKey(value.target.value);

              localStorage.setItem("apiKey", value.target.value);
            }}
          />

          <Button type="submit" onClick={() => processSubmission()} disabled={loading}>Process</Button>
        </div>
      </section>
    </Layout>
  );
}
