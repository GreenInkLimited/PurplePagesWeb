import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdClear } from "react-icons/md";
import { AddBusiness } from "../../apis/BusinessApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiImageAddLine,
} from "react-icons/ri";
import Marketplace1 from "../../assets/Jiji.png";
import Marketplace2 from "../../assets/Marketplace3.png";
import Marketplace3 from "../../assets/Bumpa.png";
import Marketplace4 from "../../assets/Marketplace1.png";
import Marketplace5 from "../../assets/Marketplace2.png";
import Marketplace6 from "../../assets/Flutter.png";
import Marketplace7 from "../../assets/Others.png";
import * as Yup from "yup";

const CreateBusiness = ({ closeModal }) => {
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const [bannerName, setBannerName] = useState("No File Selected");
  const [verificationError, setVerificationError] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const [previewBannerURL, setPreviewBannerURL] = useState(null);

  const [isActive, setIsActive] = useState(false);
  const [isActiveLocation, setIsActiveLocation] = useState(false);
  const [isActiveLga, setIsActiveLga] = useState(false);
  const [isActiveCategory, setIsActiveCategory] = useState(false);
  const [isActiveMarket, setIsActiveMarket] = useState(false);

  const [selected, setSelected] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");
  //const [adsContent, setAdsContent] = useState([]);

  const options = ["registered", "not registered"];
  const locations = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];
  const categories = [
    "Education",
    "Food & drinks",
    "Fashion",
    "Technology",
    "Logistics",
    "Entertainment",
    "Agriculture",
    "Finance",
    "Construction",
    "Pharmaceuticals",
    "Branding & Marketing",
    "Others",
  ];
  const markets = [
    { name: "Jiji", image: Marketplace1 },
    { name: "Jumia", image: Marketplace2 },
    { name: "Bumpa", image: Marketplace3 },
    { name: "Pocket", image: Marketplace4 },
    { name: "Shopify", image: Marketplace5 },
    { name: "Flutterwave", image: Marketplace6 },
    { name: "Others", image: Marketplace7 },
  ];

  const stateLgasMap = {
    Abia: [
      "Aba North",
      "Aba South",
      "Arochukwu",
      "Bende",
      "Ikwuano",
      "Isiala-Ngwa North",
      "Isiala-Ngwa South",
      "Isuikwato",
      "Obi Nwa",
      "Ohafia",
      "Osisioma",
      "Ngwa",
      "Ugwunagbo",
      "Ukwa East",
      "Ukwa West",
      "Umuahia North",
      "Umuahia South",
      "Umu-Neochi",
    ],
    Adamawa: [
      "Demsa",
      "Fufore",
      "Ganaye",
      "Gireri",
      "Gombi",
      "Guyuk",
      "Hong",
      "Jada",
      "Lamurde",
      "Madagali",
      "Maiha",
      "Mayo-Belwa",
      "Michika",
      "Mubi North",
      "Mubi South",
      "Numan",
      "Shelleng",
      "Song",
      "Toungo",
      "Yola North",
      "Yola South",
    ],
    Anambra: [
      "Aguata",
      "Anambra East",
      "Anambra West",
      "Anaocha",
      "Awka North",
      "Awka South",
      "Ayamelum",
      "Dunukofia",
      "Ekwusigo",
      "Idemili North",
      "Idemili south",
      "Ihiala",
      "Njikoka",
      "Nnewi North",
      "Nnewi South",
      "Ogbaru",
      "Onitsha North",
      "Onitsha South",
      "Orumba North",
      "Orumba South",
      "Oyi",
    ],
    "Akwa Ibom": [
      "Abak",
      "Eastern Obolo",
      "Eket",
      "Esit Eket",
      "Essien Udim",
      "Etim Ekpo",
      "Etinan",
      "Ibeno",
      "Ibesikpo Asutan",
      "Ibiono Ibom",
      "Ika",
      "Ikono",
      "Ikot Abasi",
      "Ikot Ekpene",
      "Ini",
      "Itu",
      "Mbo",
      "Mkpat Enin",
      "Nsit Atai",
      "Nsit Ibom",
      "Nsit Ubium",
      "Obot Akara",
      "Okobo",
      "Onna",
      "Oron",
      "Oruk Anam",
      "Udung Uko",
      "Ukanafun",
      "Uruan",
      "Urue-Offong/Oruko ",
      "Uyo",
    ],
    Bauchi: [
      "Alkaleri",
      "Bauchi",
      "Bogoro",
      "Damban",
      "Darazo",
      "Dass",
      "Ganjuwa",
      "Giade",
      "Itas/Gadau",
      "Jama'are",
      "Katagum",
      "Kirfi",
      "Misau",
      "Ningi",
      "Shira",
      "Tafawa-Balewa",
      "Toro",
      "Warji",
      "Zaki",
    ],
    Bayelsa: [
      "Brass",
      "Ekeremor",
      "Kolokuma/Opokuma",
      "Nembe",
      "Ogbia",
      "Sagbama",
      "Southern Jaw",
      "Yenegoa",
    ],
    Benue: [
      "Ado",
      "Agatu",
      "Apa",
      "Buruku",
      "Gboko",
      "Guma",
      "Gwer East",
      "Gwer West",
      "Katsina-Ala",
      "Konshisha",
      "Kwande",
      "Logo",
      "Makurdi",
      "Obi",
      "Ogbadibo",
      "Oju",
      "Okpokwu",
      "Ohimini",
      "Oturkpo",
      "Tarka",
      "Ukum",
      "Ushongo",
      "Vandeikya",
    ],
    Borno: [
      "Abadam",
      "Askira/Uba",
      "Bama",
      "Bayo",
      "Biu",
      "Chibok",
      "Damboa",
      "Dikwa",
      "Gubio",
      "Guzamala",
      "Gwoza",
      "Hawul",
      "Jere",
      "Kaga",
      "Kala/Balge",
      "Konduga",
      "Kukawa",
      "Kwaya Kusar",
      "Mafa",
      "Magumeri",
      "Maiduguri",
      "Marte",
      "Mobbar",
      "Monguno",
      "Ngala",
      "Nganzai",
      "Shani",
    ],
    "Cross River": [
      "Akpabuyo",
      "Odukpani",
      "Akamkpa",
      "Biase",
      "Abi",
      "Ikom",
      "Yarkur",
      "Odubra",
      "Boki",
      "Ogoja",
      "Yala",
      "Obanliku",
      "Obudu",
      "Calabar South",
      "Etung",
      "Bekwara",
      "Bakassi",
      "Calabar Municipality",
    ],
    Delta: [
      "Oshimili",
      "Aniocha",
      "Aniocha South",
      "Ika South",
      "Ika North-East",
      "Ndokwa West",
      "Ndokwa East",
      "Isoko south",
      "Isoko North",
      "Bomadi",
      "Burutu",
      "Ughelli South",
      "Ughelli North",
      "Ethiope West",
      "Ethiope East",
      "Sapele",
      "Okpe",
      "Warri North",
      "Warri South",
      "Uvwie",
      "Udu",
      "Warri Central",
      "Ukwani",
      "Oshimili North",
      "Patani",
    ],
    Ebonyi: [
      "Afikpo South",
      "Afikpo North",
      "Onicha",
      "Ohaozara",
      "Abakaliki",
      "Ishielu",
      "lkwo",
      "Ezza",
      "Ezza South",
      "Ohaukwu",
      "Ebonyi",
      "Ivo",
    ],
    Enugu: [
      "Enugu South,",
      "Igbo-Eze South",
      "Enugu North",
      "Nkanu",
      "Udi Agwu",
      "Oji-River",
      "Ezeagu",
      "IgboEze North",
      "Isi-Uzo",
      "Nsukka",
      "Igbo-Ekiti",
      "Uzo-Uwani",
      "Enugu Eas",
      "Aninri",
      "Nkanu East",
      "Udenu.",
    ],
    Edo: [
      "Esan North-East",
      "Esan Central",
      "Esan West",
      "Egor",
      "Ukpoba",
      "Central",
      "Etsako Central",
      "Igueben",
      "Oredo",
      "Ovia SouthWest",
      "Ovia South-East",
      "Orhionwon",
      "Uhunmwonde",
      "Etsako East",
      "Esan South-East",
    ],
    Ekiti: [
      "Ado",
      "Ekiti-East",
      "Ekiti-West",
      "Emure/Ise/Orun",
      "Ekiti South-West",
      "Ikere Ekiti",
      "Irepodun",
      "Ijero,",
      "Ido/Osi",
      "Oye",
      "Ikole",
      "Moba",
      "Gbonyin",
      "Efon",
      "Ise/Orun",
      "Ilejemeje.",
    ],
    "FCT - Abuja": [
      "Abaji",
      "Abuja Municipal",
      "Bwari",
      "Gwagwalada",
      "Kuje",
      "Kwali",
    ],
    Gombe: [
      "Akko",
      "Balanga",
      "Billiri",
      "Dukku",
      "Kaltungo",
      "Kwami",
      "Shomgom",
      "Funakaye",
      "Gombe",
      "Nafada/Bajoga",
      "Yamaltu/Delta.",
    ],
    Imo: [
      "Aboh-Mbaise",
      "Ahiazu-Mbaise",
      "Ehime-Mbano",
      "Ezinihitte",
      "Ideato North",
      "Ideato South",
      "Ihitte/Uboma",
      "Ikeduru",
      "Isiala Mbano",
      "Isu",
      "Mbaitoli",
      "Mbaitoli",
      "Ngor-Okpala",
      "Njaba",
      "Nwangele",
      "Nkwerre",
      "Obowo",
      "Oguta",
      "Ohaji/Egbema",
      "Okigwe",
      "Orlu",
      "Orsu",
      "Oru East",
      "Oru West",
      "Owerri-Municipal",
      "Owerri North",
      "Owerri West",
    ],
    Jigawa: [
      "Auyo",
      "Babura",
      "Birni Kudu",
      "Biriniwa",
      "Buji",
      "Dutse",
      "Gagarawa",
      "Garki",
      "Gumel",
      "Guri",
      "Gwaram",
      "Gwiwa",
      "Hadejia",
      "Jahun",
      "Kafin Hausa",
      "Kaugama Kazaure",
      "Kiri Kasamma",
      "Kiyawa",
      "Maigatari",
      "Malam Madori",
      "Miga",
      "Ringim",
      "Roni",
      "Sule-Tankarkar",
      "Taura",
      "Yankwashi",
    ],
    Kaduna: [
      "Birni-Gwari",
      "Chikun",
      "Giwa",
      "Igabi",
      "Ikara",
      "jaba",
      "Jema'a",
      "Kachia",
      "Kaduna North",
      "Kaduna South",
      "Kagarko",
      "Kajuru",
      "Kaura",
      "Kauru",
      "Kubau",
      "Kudan",
      "Lere",
      "Makarfi",
      "Sabon-Gari",
      "Sanga",
      "Soba",
      "Zango-Kataf",
      "Zaria",
    ],
    Kano: [
      "Ajingi",
      "Albasu",
      "Bagwai",
      "Bebeji",
      "Bichi",
      "Bunkure",
      "Dala",
      "Dambatta",
      "Dawakin Kudu",
      "Dawakin Tofa",
      "Doguwa",
      "Fagge",
      "Gabasawa",
      "Garko",
      "Garum",
      "Mallam",
      "Gaya",
      "Gezawa",
      "Gwale",
      "Gwarzo",
      "Kabo",
      "Kano Municipal",
      "Karaye",
      "Kibiya",
      "Kiru",
      "kumbotso",
      "Kunchi",
      "Kura",
      "Madobi",
      "Makoda",
      "Minjibir",
      "Nasarawa",
      "Rano",
      "Rimin Gado",
      "Rogo",
      "Shanono",
      "Sumaila",
      "Takali",
      "Tarauni",
      "Tofa",
      "Tsanyawa",
      "Tudun Wada",
      "Ungogo",
      "Warawa",
      "Wudil",
    ],
    Katsina: [
      "Bakori",
      "Batagarawa",
      "Batsari",
      "Baure",
      "Bindawa",
      "Charanchi",
      "Dandume",
      "Danja",
      "Dan Musa",
      "Daura",
      "Dutsi",
      "Dutsin-Ma",
      "Faskari",
      "Funtua",
      "Ingawa",
      "Jibia",
      "Kafur",
      "Kaita",
      "Kankara",
      "Kankia",
      "Katsina",
      "Kurfi",
      "Kusada",
      "Mai'Adua",
      "Malumfashi",
      "Mani",
      "Mashi",
      "Matazuu",
      "Musawa",
      "Rimi",
      "Sabuwa",
      "Safana",
      "Sandamu",
      "Zango",
    ],
    Kebbi: [
      "Aleiro",
      "Arewa-Dandi",
      "Argungu",
      "Augie",
      "Bagudo",
      "Birnin Kebbi",
      "Bunza",
      "Dandi",
      "Fakai",
      "Gwandu",
      "Jega",
      "Kalgo",
      "Koko/Besse",
      "Maiyama",
      "Ngaski",
      "Sakaba",
      "Shanga",
      "Suru",
      "Wasagu/Danko",
      "Yauri",
      "Zuru",
    ],
    Kogi: [
      "Adavi",
      "Ajaokuta",
      "Ankpa",
      "Bassa",
      "Dekina",
      "Ibaji",
      "Idah",
      "Igalamela-Odolu",
      "Ijumu",
      "Kabba/Bunu",
      "Kogi",
      "Lokoja",
      "Mopa-Muro",
      "Ofu",
      "Ogori/Mangongo",
      "Okehi",
      "Okene",
      "Olamabolo",
      "Omala",
      "Yagba East",
      "Yagba West",
    ],
    Kwara: [
      "Asa",
      "Baruten",
      "Edu",
      "Ekiti",
      "Ifelodun",
      "Ilorin East",
      "Ilorin West",
      "Irepodun",
      "Isin",
      "Kaiama",
      "Moro",
      "Offa",
      "Oke-Ero",
      "Oyun",
      "Pategi",
    ],
    Lagos: [
      "Agege",
      "Ajeromi-Ifelodun",
      "Alimosho",
      "Amuwo-Odofin",
      "Apapa",
      "Badagry",
      "Epe",
      "Eti-Osa",
      "Ibeju/Lekki",
      "Ifako-Ijaye",
      "Ikeja",
      "Ikorodu",
      "Kosofe",
      "Lagos Island",
      "Lagos Mainland",
      "Mushin",
      "Ojo",
      "Oshodi-Isolo",
      "Shomolu",
      "Surulere",
    ],
    Nasarawa: [
      "Akwanga",
      "Awe",
      "Doma",
      "Karu",
      "Keana",
      "Keffi",
      "Kokona",
      "Lafia",
      "Nasarawa",
      "Nasarawa-Eggon",
      "Obi",
      "Toto",
      "Wamba",
    ],
    Niger: [
      "Agaie",
      "Agwara",
      "Bida",
      "Borgu",
      "Bosso",
      "Chanchaga",
      "Edati",
      "Gbako",
      "Gurara",
      "Katcha",
      "Kontagora",
      "Lapai",
      "Lavun",
      "Magama",
      "Mariga",
      "Mashegu",
      "Mokwa",
      "Muya",
      "Pailoro",
      "Rafi",
      "Rijau",
      "Shiroro",
      "Suleja",
      "Tafa",
      "Wushishi",
    ],
    Ogun: [
      "Abeokuta North",
      "Abeokuta South",
      "Ado-Odo/Ota",
      "Egbado North",
      "Egbado South",
      "Ewekoro",
      "Ifo",
      "Ijebu East",
      "Ijebu North",
      "Ijebu North East",
      "Ijebu Ode",
      "Ikenne",
      "Imeko-Afon",
      "Ipokia",
      "Obafemi-Owode",
      "Ogun Waterside",
      "Odeda",
      "Odogbolu",
      "Remo North",
      "Shagamu",
    ],
    Ondo: [
      "Akoko North East",
      "Akoko North West",
      "Akoko South Akure East",
      "Akoko South West",
      "Akure North",
      "Akure South",
      "Ese-Odo",
      "Idanre",
      "Ifedore",
      "Ilaje",
      "Ile-Oluji",
      "Okeigbo",
      "Irele",
      "Odigbo",
      "Okitipupa",
      "Ondo East",
      "Ondo West",
      "Ose",
      "Owo",
    ],
    Osun: [
      "Aiyedade",
      "Aiyedire",
      "Atakumosa East",
      "Atakumosa West",
      "Boluwaduro",
      "Boripe",
      "Ede North",
      "Ede South",
      "Egbedore",
      "Ejigbo",
      "Ife Central",
      "Ife East",
      "Ife North",
      "Ife South",
      "Ifedayo",
      "Ifelodun",
      "Ila",
      "Ilesha East",
      "Ilesha West",
      "Irepodun",
      "Irewole",
      "Isokan",
      "Iwo",
      "Obokun",
      "Odo-Otin",
      "Ola-Oluwa",
      "Olorunda",
      "Oriade",
      "Orolu",
      "Osogbo",
    ],
    Oyo: [
      "Afijio",
      "Akinyele",
      "Atiba",
      "Atigbo",
      "Egbeda",
      "Ibadan Central",
      "Ibadan North",
      "Ibadan North West",
      "Ibadan South East",
      "Ibadan South West",
      "Ibarapa Central",
      "Ibarapa East",
      "Ibarapa North",
      "Ido",
      "Irepo",
      "Iseyin",
      "Itesiwaju",
      "Iwajowa",
      "Kajola",
      "Lagelu Ogbomosho North",
      "Ogbomosho South",
      "Ogo Oluwa",
      "Olorunsogo",
      "Oluyole",
      "Ona-Ara",
      "Orelope",
      "Ori Ire",
      "Oyo East",
      "Oyo West",
      "Saki East",
      "Saki West",
      "Surulere",
    ],
    Plateau: [
      "Barikin Ladi",
      "Bassa",
      "Bokkos",
      "Jos East",
      "Jos North",
      "Jos South",
      "Kanam",
      "Kanke",
      "Langtang North",
      "Langtang South",
      "Mangu",
      "Mikang",
      "Pankshin",
      "Qua'an Pan",
      "Riyom",
      "Shendam",
      "Wase",
    ],
    Rivers: [
      "Abua/Odual",
      "Ahoada East",
      "Ahoada West",
      "Akuku Toru",
      "Andoni",
      "Asari-Toru",
      "Bonny",
      "Degema",
      "Emohua",
      "Eleme",
      "Etche",
      "Gokana",
      "Ikwerre",
      "Khana",
      "Obia/Akpor",
      "Ogba/Egbema/Ndoni",
      "Ogu/Bolo",
      "Okrika",
      "Omumma",
      "Opobo/Nkoro",
      "Oyigbo",
      "Port-Harcourt",
      "Tai",
    ],
    Sokoto: [
      "Binji",
      "Bodinga",
      "Dange-shnsi",
      "Gada",
      "Goronyo",
      "Gudu",
      "Gawabawa",
      "Illela",
      "Isa",
      "Kware",
      "kebbe",
      "Rabah",
      "Sabon birni",
      "Shagari",
      "Silame",
      "Sokoto North",
      "Sokoto South",
      "Tambuwal",
      "Tqngaza",
      "Tureta",
      "Wamako",
      "Wurno",
      "Yabo",
    ],
    Taraba: [
      "Ardo-kola",
      "Bali",
      "Donga",
      "Gashaka",
      "Cassol",
      "Ibi",
      "Jalingo",
      "Karin-Lamido",
      "Kurmi",
      "Lau",
      "Sardauna",
      "Takum",
      "Ussa",
      "Wukari",
      "Yorro",
      "Zing",
    ],
    Yobe: [
      "Bade",
      "Bursari",
      "Damaturu",
      "Fika",
      "Fune",
      "Geidam",
      "Gujba",
      "Gulani",
      "Jakusko",
      "Karasuwa",
      "Karawa",
      "Machina",
      "Nangere",
      "Nguru Potiskum",
      "Tarmua",
      "Yunusari",
      "Yusufari",
    ],
    Zamfara: [
      "Anka",
      "Bakura",
      "Birnin Magaji",
      "Bukkuyum",
      "Bungudu",
      "Gummi",
      "Gusau",
      "Kaura",
      "Namoda",
      "Maradun",
      "Maru",
      "Shinkafi",
      "Talata Mafara",
      "Tsafe",
      "Zurmi",
    ],
  };
  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "create business",
    AddBusiness,
    {
      onSuccess: (data) => {
        if (data && data.status_lean) {
          const business_id = data.id;
          localStorage.setItem("id", business_id);
          // Verification successful
          navigate("/personal");
        } else {
          // Verification unsuccessful
          setVerificationError("Something is wrong");
          // You can perform any additional actions here, such as showing an error message
        }
      },
    }
  );

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewURL(previewURL);
    }
  };

  const handleBannerUpload = (event) => {
    const fileBanner = event.target.files[0];
    if (fileBanner) {
      setBannerName(fileBanner.name);
      setBanner(fileBanner);
      const previewBannerURL = URL.createObjectURL(fileBanner);
      setPreviewBannerURL(previewBannerURL);
    }
  };

  const handleCACUpload = (event) => {
    const file = event.target.files[0];
    // Handle CAC certificate upload logic
  };

  const initialValues = {
    image: null,
    banner: null,
    name: "",
    business_type: "",
    rc_number: "",
    category: "",
    location: "",
    lga: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    marketplace: "",
    marketplace_link: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Business Name is Required"),
    business_type: Yup.string().email("Business Type is Required"),
    rc_number: Yup.string().required("rc_number is Required"),
    category: Yup.string().required("Business Category is Required"),
    location: Yup.string().required("Business Location is Required"),
    lga: Yup.string().required("Business LGA is Required"),
    description: Yup.string().required("Business Description is Required"),
    phone: Yup.string().required("Business Phone is Required"),
    email: Yup.string().required("Business Email is Required"),
    website: Yup.string().required("Website is Required"),
    address: Yup.string().required("Address is Required"),
    marketplace: Yup.string().required("Marketplace is Required"),
    marketplace_link: Yup.string().required("Marketplace Link is Required"),
  });

  const handleSubmit = async (values) => {
    console.log("handleSubmit called with values:", values);
    const updatedValues = {
      ...values,
      image: image,
      banner: banner,
      business_type: selected,
      location: selectedLocation,
      lga: selectedLga,
      category: selectedCategory,
      marketplace: selectedMarket,
    };
    try {
      const response = await mutateAsync(updatedValues);
      if (response && response.status_lean) {
        const businessId = response.id;

        localStorage.setItem("business_id", businessId);

        // Verification successful
        navigate("/personal");
      } else {
        // Verification unsuccessful
        setVerificationError("Something is wrong");
        // You can perform any additional actions here, such as showing an error message
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="container">
      <div className="create__business-container">
        <div className="create__business-header">
          <span className="close" onClick={closeModal}>
            <MdClear />
          </span>
          <div className="create__business-detail">
            <h4>Create Business</h4>
          </div>
        </div>
        <div className="create__business-body">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <label>Upload your logo (optional)</label>
              <div
                className="upload__file-container"
                onClick={() => document.querySelector(".logo-input").click()}
              >
                <Field
                  className="input-field logo-input"
                  type="file"
                  accept="image/jpeg, image/png"
                  name="image"
                  hidden
                  onChange={handleLogoUpload}
                />
                {previewURL ? (
                  <img
                    src={previewURL}
                    alt={fileName}
                    className="uploaded-image"
                  />
                ) : (
                  <RiImageAddLine color="#EBB8FC" />
                )}
              </div>
              <small>Your image should be in JPEG or PNG format</small>

              <label>Upload your Banner (optional)</label>
              <div
                className="upload__file-container"
                onClick={() => document.querySelector(".banner-input").click()}
              >
                <Field
                  className="input-field banner-input" // Change the class name to 'banner-input'
                  type="file"
                  accept="image/jpeg, image/png"
                  name="banner"
                  hidden
                  onChange={handleBannerUpload}
                />
                {previewBannerURL ? ( // Use 'previewBannerURL' for displaying the banner preview
                  <img
                    src={previewBannerURL}
                    alt={bannerName}
                    className="uploaded-image"
                  />
                ) : (
                  <RiImageAddLine color="#EBB8FC" />
                )}
              </div>
              <small>Your image should be in JPEG or PNG format</small>

              <label>Business Name</label>
              <Field
                className="input"
                type="text"
                name="name"
                placeholder="e.g Purplepages"
              />
              <ErrorMessage
                name="name"
                component="small"
                className="error-message"
              />
              <div className="create__business__row">
                <div>
                  <label>Business Type</label>
                  <Field name="business_type">
                    {({ field }) => (
                      <div className="dropdown">
                        <div
                          className="dropdown-btn"
                          onClick={() => setIsActive(!isActive)}
                        >
                          {selected || field.value || "Select Type"}{" "}
                          {/* Add the placeholder text */}
                          <div className="dropdown-icons">
                            {isActive ? (
                              <RiArrowUpSLine className="dropdown-icon" />
                            ) : (
                              <RiArrowDownSLine className="dropdown-icon" />
                            )}
                          </div>
                        </div>
                        {isActive && (
                          <div className="dropdown-content">
                            {options.map((option) => (
                              <div
                                key={option}
                                onClick={() => {
                                  setSelected(option);
                                  setIsActive(false);
                                  field.onChange({ target: { value: option } });
                                }}
                                className="dropdown-item"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <ErrorMessage
                  name="business_type"
                  component="small"
                  className="error-message"
                />
                <div>
                  <label>RC Number</label>
                  <Field
                    className="input"
                    type="text"
                    name="rc_number"
                    placeholder="If applicable"
                  />
                  <ErrorMessage
                    name="rc_number"
                    component="small"
                    className="error-message"
                  />
                </div>
              </div>
              <div className="create__business__row">
                <div>
                  <label>Business Location</label>
                  <Field name="location">
                    {({ field }) => (
                      <div className="dropdown">
                        <div
                          className="dropdown-btn"
                          onClick={() => setIsActiveLocation(!isActiveLocation)}
                        >
                          {selectedLocation || field.value || "Select"}
                          <div className="dropdown-icons">
                            {isActiveLocation ? (
                              <RiArrowUpSLine className="dropdown-icon" />
                            ) : (
                              <RiArrowDownSLine className="dropdown-icon" />
                            )}
                          </div>
                        </div>
                        {isActiveLocation && (
                          <div className="dropdown-content">
                            {locations.map((option) => (
                              <div
                                key={option}
                                onClick={() => {
                                  setSelectedLocation(option);
                                  setSelectedLga(""); // Clear selected LGA
                                  setIsActiveLocation(false);
                                  field.onChange({ target: { value: option } });
                                }}
                                className="dropdown-item"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <label>LGA</label>
                  <Field name="lga">
                    {({ field }) => (
                      <div className="dropdown">
                        <div
                          className="dropdown-btn"
                          onClick={() => setIsActiveLga(!isActiveLga)}
                        >
                          {selectedLga || field.value || "Select"}
                          <div className="dropdown-icons">
                            {isActiveLga ? (
                              <RiArrowUpSLine className="dropdown-icon" />
                            ) : (
                              <RiArrowDownSLine className="dropdown-icon" />
                            )}
                          </div>
                        </div>
                        {isActiveLga && (
                          <div className="dropdown-content">
                            {stateLgasMap[selectedLocation]?.map((option) => (
                              <div
                                key={option}
                                onClick={() => {
                                  setSelectedLga(option);
                                  setIsActiveLga(false);
                                  field.onChange({ target: { value: option } });
                                }}
                                className="dropdown-item"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>
              <label>Business Address</label>
              <Field
                className="input"
                type="text"
                name="address"
                placeholder="placeholder text"
              />
              <ErrorMessage
                name="address"
                component="small"
                className="error-message"
              />
              <div className="create__business__row">
                <div>
                  <label>Business Email</label>
                  <Field
                    className="input"
                    type="text"
                    name="email"
                    placeholder=""
                  />
                  <ErrorMessage
                    name="email"
                    component="small"
                    className="error-message"
                  />
                </div>
                <div>
                  <label>Business Phone Number</label>
                  <Field
                    className="input"
                    type="text"
                    name="phone"
                    placeholder=""
                  />
                  <ErrorMessage
                    name="phone"
                    component="small"
                    className="error-message"
                  />
                </div>
              </div>
              <label>Business Category</label>
              <Field name="category" className="input">
                {({ field }) => (
                  <div className="dropdownx">
                    <div
                      className="dropdown-btn"
                      onClick={() => setIsActiveCategory(!isActiveCategory)}
                    >
                      {selectedCategory || field.value || "Select Type"}{" "}
                      {/* Add the placeholder text */}
                      <div className="dropdown-icons">
                        {isActiveCategory ? (
                          <RiArrowUpSLine className="dropdown-icon" />
                        ) : (
                          <RiArrowDownSLine className="dropdown-icon" />
                        )}
                      </div>
                    </div>
                    {isActiveCategory && (
                      <div className="dropdown-content">
                        {categories.map((option) => (
                          <div
                            key={option}
                            onClick={() => {
                              setSelectedCategory(option);
                              setIsActiveCategory(false);
                              field.onChange({ target: { value: option } });
                            }}
                            className="dropdown-item"
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Field>
              <div className="create__business__row">
                <div>
                  <label>Your Marketplace</label>

                  <Field name="marketplace">
                    {({ field }) => (
                      <div className="dropdown">
                        <div
                          className="dropdown-btn"
                          onClick={() => setIsActiveMarket(!isActiveMarket)}
                        >
                          {selectedMarket || field.value || "Select Market"}{" "}
                          {/* Add the placeholder text */}
                          <div className="dropdown-icons">
                            {isActiveMarket ? (
                              <RiArrowUpSLine className="dropdown-icon" />
                            ) : (
                              <RiArrowDownSLine className="dropdown-icon" />
                            )}
                          </div>
                        </div>
                        {isActiveMarket && (
                          <div className="dropdown-content">
                            {markets.map((option) => (
                              <div
                                key={option}
                                onClick={() => {
                                  setSelectedMarket(option.name);
                                  setIsActiveMarket(false);
                                  field.onChange({
                                    target: { value: option.name },
                                  });
                                }}
                                className="dropdown-itemx"
                              >
                                <p>{option.name}</p>
                                <img src={option.image} alt={option.name} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div>
                  <label>Marketplace Link</label>
                  <Field
                    className="input"
                    type="text"
                    name="marketplace_link"
                    placeholder=""
                  />
                  <ErrorMessage
                    name="marketplace_link"
                    component="small"
                    className="error-message"
                  />
                </div>
              </div>
              <label>Business Website (If any)</label>
              <Field
                className="input"
                type="text"
                name="website"
                placeholder=""
              />
              <ErrorMessage
                name="website"
                component="small"
                className="error-message"
              />

              <label>Describe your business</label>
              <Field
                as="textarea"
                className="textareax"
                name="description"
                placeholder="What seems to be the problem?"
              />
              <ErrorMessage
                name="description"
                component="small"
                className="error-message"
              />
              <div className="create__binex-button">
                <button className="user_user__button" type="submit">
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateBusiness;
