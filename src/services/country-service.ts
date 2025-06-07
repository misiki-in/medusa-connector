import { BaseService } from "./base-service"

const countries = [
  {
    "iso2": "AX",
    "code": "AX",
    "iso3": "ALA",
    "numCode": 248,
    "dialCode": "+358",
    "name": "Åland Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AF",
    "code": "AF",
    "iso3": "AFG",
    "numCode": 4,
    "dialCode": "+93",
    "name": "Afghanistan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AL",
    "code": "AL",
    "iso3": "ALB",
    "numCode": 8,
    "dialCode": "+355",
    "name": "Albania",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "DZ",
    "code": "DZ",
    "iso3": "DZA",
    "numCode": 12,
    "dialCode": "+213",
    "name": "Algeria",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AS",
    "code": "AS",
    "iso3": "ASM",
    "numCode": 16,
    "dialCode": "+1684",
    "name": "American Samoa",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AD",
    "code": "AD",
    "iso3": "AND",
    "numCode": 20,
    "dialCode": "+376",
    "name": "Andorra",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AO",
    "code": "AO",
    "iso3": "AGO",
    "numCode": 24,
    "dialCode": "+244",
    "name": "Angola",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AI",
    "code": "AI",
    "iso3": "AIA",
    "numCode": 660,
    "dialCode": "+1264",
    "name": "Anguilla",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AQ",
    "code": "AQ",
    "iso3": "ATA",
    "numCode": 10,
    "dialCode": "+672",
    "name": "Antarctica",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AG",
    "code": "AG",
    "iso3": "ATG",
    "numCode": 28,
    "dialCode": "+1268",
    "name": "Antigua and Barbuda",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AR",
    "code": "AR",
    "iso3": "ARG",
    "numCode": 32,
    "dialCode": "+54",
    "name": "Argentina",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AM",
    "code": "AM",
    "iso3": "ARM",
    "numCode": 51,
    "dialCode": "+374",
    "name": "Armenia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AW",
    "code": "AW",
    "iso3": "ABW",
    "numCode": 533,
    "dialCode": "+297",
    "name": "Aruba",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AU",
    "code": "AU",
    "iso3": "AUS",
    "numCode": 36,
    "dialCode": "+61",
    "name": "Australia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AT",
    "code": "AT",
    "iso3": "AUT",
    "numCode": 40,
    "dialCode": "+43",
    "name": "Austria",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "AZ",
    "code": "AZ",
    "iso3": "AZE",
    "numCode": 31,
    "dialCode": "+994",
    "name": "Azerbaijan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BS",
    "code": "BS",
    "iso3": "BHS",
    "numCode": 44,
    "dialCode": "+1242",
    "name": "Bahamas",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BH",
    "code": "BH",
    "iso3": "BHR",
    "numCode": 48,
    "dialCode": "+973",
    "name": "Bahrain",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BD",
    "code": "BD",
    "iso3": "BGD",
    "numCode": 50,
    "dialCode": "+880",
    "name": "Bangladesh",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BB",
    "code": "BB",
    "iso3": "BRB",
    "numCode": 52,
    "dialCode": "+1246",
    "name": "Barbados",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BY",
    "code": "BY",
    "iso3": "BLR",
    "numCode": 112,
    "dialCode": "+375",
    "name": "Belarus",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BE",
    "code": "BE",
    "iso3": "BEL",
    "numCode": 56,
    "dialCode": "+32",
    "name": "Belgium",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BZ",
    "code": "BZ",
    "iso3": "BLZ",
    "numCode": 84,
    "dialCode": "+501",
    "name": "Belize",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BJ",
    "code": "BJ",
    "iso3": "BEN",
    "numCode": 204,
    "dialCode": "+229",
    "name": "Benin",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BM",
    "code": "BM",
    "iso3": "BMU",
    "numCode": 60,
    "dialCode": "+1441",
    "name": "Bermuda",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BT",
    "code": "BT",
    "iso3": "BTN",
    "numCode": 64,
    "dialCode": "+975",
    "name": "Bhutan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BO",
    "code": "BO",
    "iso3": "BOL",
    "numCode": 68,
    "dialCode": "+591",
    "name": "Bolivia (Plurinational State of)",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BQ",
    "code": "BQ",
    "iso3": "BES",
    "numCode": 535,
    "dialCode": "+599",
    "name": "Bonaire, Sint Eustatius and Saba",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BA",
    "code": "BA",
    "iso3": "BIH",
    "numCode": 70,
    "dialCode": "+387",
    "name": "Bosnia and Herzegovina",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BW",
    "code": "BW",
    "iso3": "BWA",
    "numCode": 72,
    "dialCode": "+267",
    "name": "Botswana",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BV",
    "code": "BV",
    "iso3": "BVT",
    "numCode": 74,
    "dialCode": "+47",
    "name": "Bouvet Island",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BR",
    "code": "BR",
    "iso3": "BRA",
    "numCode": 76,
    "dialCode": "+55",
    "name": "Brazil",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "IO",
    "code": "IO",
    "iso3": "IOT",
    "numCode": 86,
    "dialCode": "+246",
    "name": "British Indian Ocean Territory",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BN",
    "code": "BN",
    "iso3": "BRN",
    "numCode": 96,
    "dialCode": "+673",
    "name": "Brunei Darussalam",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BG",
    "code": "BG",
    "iso3": "BGR",
    "numCode": 100,
    "dialCode": "+359",
    "name": "Bulgaria",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BF",
    "code": "BF",
    "iso3": "BFA",
    "numCode": 854,
    "dialCode": "+226",
    "name": "Burkina Faso",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "BI",
    "code": "BI",
    "iso3": "BDI",
    "numCode": 108,
    "dialCode": "+257",
    "name": "Burundi",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CV",
    "code": "CV",
    "iso3": "CPV",
    "numCode": 132,
    "dialCode": "+238",
    "name": "Cabo Verde",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KH",
    "code": "KH",
    "iso3": "KHM",
    "numCode": 116,
    "dialCode": "+855",
    "name": "Cambodia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CM",
    "code": "CM",
    "iso3": "CMR",
    "numCode": 120,
    "dialCode": "+237",
    "name": "Cameroon",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CA",
    "code": "CA",
    "iso3": "CAN",
    "numCode": 124,
    "dialCode": "+1",
    "name": "Canada",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KY",
    "code": "KY",
    "iso3": "CYM",
    "numCode": 136,
    "dialCode": "+1345",
    "name": "Cayman Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CF",
    "code": "CF",
    "iso3": "CAF",
    "numCode": 140,
    "dialCode": "+236",
    "name": "Central African Republic",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CL",
    "code": "CL",
    "iso3": "CHL",
    "numCode": 152,
    "dialCode": "+56",
    "name": "Chile",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CN",
    "code": "CN",
    "iso3": "CHN",
    "numCode": 156,
    "dialCode": "+86",
    "name": "China",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CX",
    "code": "CX",
    "iso3": "CXR",
    "numCode": 162,
    "dialCode": "+61",
    "name": "Christmas Island",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CC",
    "code": "CC",
    "iso3": "CCK",
    "numCode": 166,
    "dialCode": "+61",
    "name": "Cocos (Keeling) Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CO",
    "code": "CO",
    "iso3": "COL",
    "numCode": 170,
    "dialCode": "+57",
    "name": "Colombia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KM",
    "code": "KM",
    "iso3": "COM",
    "numCode": 174,
    "dialCode": "+269",
    "name": "Comoros",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CG",
    "code": "CG",
    "iso3": "COG",
    "numCode": 178,
    "dialCode": "+242",
    "name": "Congo",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CD",
    "code": "CD",
    "iso3": "COD",
    "numCode": 180,
    "dialCode": "+243",
    "name": "Congo, Democratic Republic of the",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CK",
    "code": "CK",
    "iso3": "COK",
    "numCode": 184,
    "dialCode": "+682",
    "name": "Cook Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CR",
    "code": "CR",
    "iso3": "CRI",
    "numCode": 188,
    "dialCode": "+506",
    "name": "Costa Rica",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CI",
    "code": "CI",
    "iso3": "CIV",
    "numCode": 384,
    "dialCode": "+225",
    "name": "Côte d'Ivoire",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "HR",
    "code": "HR",
    "iso3": "HRV",
    "numCode": 191,
    "dialCode": "+385",
    "name": "Croatia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CU",
    "code": "CU",
    "iso3": "CUB",
    "numCode": 192,
    "dialCode": "+53",
    "name": "Cuba",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CW",
    "code": "CW",
    "iso3": "CUW",
    "numCode": 531,
    "dialCode": "+599",
    "name": "Curaçao",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CY",
    "code": "CY",
    "iso3": "CYP",
    "numCode": 196,
    "dialCode": "+357",
    "name": "Cyprus",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "CZ",
    "code": "CZ",
    "iso3": "CZE",
    "numCode": 203,
    "dialCode": "+420",
    "name": "Czech Republic",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "DK",
    "code": "DK",
    "iso3": "DNK",
    "numCode": 208,
    "dialCode": "+45",
    "name": "Denmark",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "DJ",
    "code": "DJ",
    "iso3": "DJI",
    "numCode": 262,
    "dialCode": "+253",
    "name": "Djibouti",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "DM",
    "code": "DM",
    "iso3": "DMA",
    "numCode": 212,
    "dialCode": "+1767",
    "name": "Dominica",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "DO",
    "code": "DO",
    "iso3": "DOM",
    "numCode": 214,
    "dialCode": "+1809",
    "name": "Dominican Republic",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "EC",
    "code": "EC",
    "iso3": "ECU",
    "numCode": 218,
    "dialCode": "+593",
    "name": "Ecuador",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "EG",
    "code": "EG",
    "iso3": "EGY",
    "numCode": 818,
    "dialCode": "+20",
    "name": "Egypt",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GQ",
    "code": "GQ",
    "iso3": "GNQ",
    "numCode": 226,
    "dialCode": "+240",
    "name": "Equatorial Guinea",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "ER",
    "code": "ER",
    "iso3": "ERI",
    "numCode": 232,
    "dialCode": "+291",
    "name": "Eritrea",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "EE",
    "code": "EE",
    "iso3": "EST",
    "numCode": 233,
    "dialCode": "+372",
    "name": "Estonia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "ET",
    "code": "ET",
    "iso3": "ETH",
    "numCode": 231,
    "dialCode": "+251",
    "name": "Ethiopia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "FK",
    "code": "FK",
    "iso3": "FLK",
    "numCode": 238,
    "dialCode": "+500",
    "name": "Falkland Islands (Malvinas)",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "FO",
    "code": "FO",
    "iso3": "FRO",
    "numCode": 234,
    "dialCode": "+298",
    "name": "Faroe Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "FJ",
    "code": "FJ",
    "iso3": "FJI",
    "numCode": 242,
    "dialCode": "+679",
    "name": "Fiji",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "FI",
    "code": "FI",
    "iso3": "FIN",
    "numCode": 246,
    "dialCode": "+358",
    "name": "Finland",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "FR",
    "code": "FR",
    "iso3": "FRA",
    "numCode": 250,
    "dialCode": "+33",
    "name": "France",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GF",
    "code": "GF",
    "iso3": "GUF",
    "numCode": 254,
    "dialCode": "+594",
    "name": "French Guiana",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "PF",
    "code": "PF",
    "iso3": "PYF",
    "numCode": 258,
    "dialCode": "+689",
    "name": "French Polynesia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GA",
    "code": "GA",
    "iso3": "GAB",
    "numCode": 266,
    "dialCode": "+241",
    "name": "Gabon",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GM",
    "code": "GM",
    "iso3": "GMB",
    "numCode": 270,
    "dialCode": "+220",
    "name": "Gambia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GE",
    "code": "GE",
    "iso3": "GEO",
    "numCode": 268,
    "dialCode": "+995",
    "name": "Georgia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "DE",
    "code": "DE",
    "iso3": "DEU",
    "numCode": 276,
    "dialCode": "+49",
    "name": "Germany",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GH",
    "code": "GH",
    "iso3": "GHA",
    "numCode": 288,
    "dialCode": "+233",
    "name": "Ghana",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GI",
    "code": "GI",
    "iso3": "GIB",
    "numCode": 292,
    "dialCode": "+350",
    "name": "Gibraltar",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GR",
    "code": "GR",
    "iso3": "GRC",
    "numCode": 300,
    "dialCode": "+30",
    "name": "Greece",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GL",
    "code": "GL",
    "iso3": "GRL",
    "numCode": 304,
    "dialCode": "+299",
    "name": "Greenland",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GD",
    "code": "GD",
    "iso3": "GRD",
    "numCode": 308,
    "dialCode": "+1473",
    "name": "Grenada",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GP",
    "code": "GP",
    "iso3": "GLP",
    "numCode": 312,
    "dialCode": "+590",
    "name": "Guadeloupe",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GU",
    "code": "GU",
    "iso3": "GUM",
    "numCode": 316,
    "dialCode": "+1671",
    "name": "Guam",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GT",
    "code": "GT",
    "iso3": "GTM",
    "numCode": 320,
    "dialCode": "+502",
    "name": "Guatemala",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GG",
    "code": "GG",
    "iso3": "GGY",
    "numCode": 831,
    "dialCode": "+44",
    "name": "Guernsey",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GN",
    "code": "GN",
    "iso3": "GIN",
    "numCode": 324,
    "dialCode": "+224",
    "name": "Guinea",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GW",
    "code": "GW",
    "iso3": "GNB",
    "numCode": 624,
    "dialCode": "+245",
    "name": "Guinea-Bissau",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "GY",
    "code": "GY",
    "iso3": "GUY",
    "numCode": 328,
    "dialCode": "+592",
    "name": "Guyana",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "HT",
    "code": "HT",
    "iso3": "HTI",
    "numCode": 332,
    "dialCode": "+509",
    "name": "Haiti",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "HM",
    "code": "HM",
    "iso3": "HMD",
    "numCode": 334,
    "dialCode": "+0",
    "name": "Heard Island and McDonald Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "HN",
    "code": "HN",
    "iso3": "HND",
    "numCode": 340,
    "dialCode": "+504",
    "name": "Honduras",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "HK",
    "code": "HK",
    "iso3": "HKG",
    "numCode": 344,
    "dialCode": "+852",
    "name": "Hong Kong",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "HU",
    "code": "HU",
    "iso3": "HUN",
    "numCode": 348,
    "dialCode": "+36",
    "name": "Hungary",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "IS",
    "code": "IS",
    "iso3": "ISL",
    "numCode": 352,
    "dialCode": "+354",
    "name": "Iceland",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "IN",
    "code": "IN",
    "iso3": "IND",
    "numCode": 356,
    "dialCode": "+91",
    "name": "India",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "ID",
    "code": "ID",
    "iso3": "IDN",
    "numCode": 360,
    "dialCode": "+62",
    "name": "Indonesia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "IR",
    "code": "IR",
    "iso3": "IRN",
    "numCode": 364,
    "dialCode": "+98",
    "name": "Iran (Islamic Republic of)",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "IQ",
    "code": "IQ",
    "iso3": "IRQ",
    "numCode": 368,
    "dialCode": "+964",
    "name": "Iraq",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "IE",
    "code": "IE",
    "iso3": "IRL",
    "numCode": 372,
    "dialCode": "+353",
    "name": "Ireland",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "IM",
    "code": "IM",
    "iso3": "IMN",
    "numCode": 833,
    "dialCode": "+44",
    "name": "Isle of Man",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "IL",
    "code": "IL",
    "iso3": "ISR",
    "numCode": 376,
    "dialCode": "+972",
    "name": "Israel",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "IT",
    "code": "IT",
    "iso3": "ITA",
    "numCode": 380,
    "dialCode": "+39",
    "name": "Italy",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "JM",
    "code": "JM",
    "iso3": "JAM",
    "numCode": 388,
    "dialCode": "+1876",
    "name": "Jamaica",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "JP",
    "code": "JP",
    "iso3": "JPN",
    "numCode": 392,
    "dialCode": "+81",
    "name": "Japan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "JE",
    "code": "JE",
    "iso3": "JEY",
    "numCode": 832,
    "dialCode": "+44",
    "name": "Jersey",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "JO",
    "code": "JO",
    "iso3": "JOR",
    "numCode": 400,
    "dialCode": "+962",
    "name": "Jordan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KZ",
    "code": "KZ",
    "iso3": "KAZ",
    "numCode": 398,
    "dialCode": "+7",
    "name": "Kazakhstan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KE",
    "code": "KE",
    "iso3": "KEN",
    "numCode": 404,
    "dialCode": "+254",
    "name": "Kenya",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KI",
    "code": "KI",
    "iso3": "KIR",
    "numCode": 296,
    "dialCode": "+686",
    "name": "Kiribati",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KP",
    "code": "KP",
    "iso3": "PRK",
    "numCode": 408,
    "dialCode": "+850",
    "name": "Korea (Democratic People's Republic of)",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KR",
    "code": "KR",
    "iso3": "KOR",
    "numCode": 410,
    "dialCode": "+82",
    "name": "Korea, Republic of",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KW",
    "code": "KW",
    "iso3": "KWT",
    "numCode": 414,
    "dialCode": "+965",
    "name": "Kuwait",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "KG",
    "code": "KG",
    "iso3": "KGZ",
    "numCode": 417,
    "dialCode": "+996",
    "name": "Kyrgyzstan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "LA",
    "code": "LA",
    "iso3": "LAO",
    "numCode": 418,
    "dialCode": "+856",
    "name": "Lao People's Democratic Republic",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "LV",
    "code": "LV",
    "iso3": "LVA",
    "numCode": 428,
    "dialCode": "+371",
    "name": "Latvia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "LB",
    "code": "LB",
    "iso3": "LBN",
    "numCode": 422,
    "dialCode": "+961",
    "name": "Lebanon",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "LS",
    "code": "LS",
    "iso3": "LSO",
    "numCode": 426,
    "dialCode": "+266",
    "name": "Lesotho",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "LR",
    "code": "LR",
    "iso3": "LBR",
    "numCode": 430,
    "dialCode": "+231",
    "name": "Liberia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "LY",
    "code": "LY",
    "iso3": "LBY",
    "numCode": 434,
    "dialCode": "+218",
    "name": "Libya",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "LI",
    "code": "LI",
    "iso3": "LIE",
    "numCode": 438,
    "dialCode": "+423",
    "name": "Liechtenstein",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "LT",
    "code": "LT",
    "iso3": "LTU",
    "numCode": 440,
    "dialCode": "+370",
    "name": "Lithuania",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "LU",
    "code": "LU",
    "iso3": "LUX",
    "numCode": 442,
    "dialCode": "+352",
    "name": "Luxembourg",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MO",
    "code": "MO",
    "iso3": "MAC",
    "numCode": 446,
    "dialCode": "+853",
    "name": "Macao",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MG",
    "code": "MG",
    "iso3": "MDG",
    "numCode": 450,
    "dialCode": "+261",
    "name": "Madagascar",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MW",
    "code": "MW",
    "iso3": "MWI",
    "numCode": 454,
    "dialCode": "+265",
    "name": "Malawi",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MY",
    "code": "MY",
    "iso3": "MYS",
    "numCode": 458,
    "dialCode": "+60",
    "name": "Malaysia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MV",
    "code": "MV",
    "iso3": "MDV",
    "numCode": 462,
    "dialCode": "+960",
    "name": "Maldives",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "ML",
    "code": "ML",
    "iso3": "MLI",
    "numCode": 466,
    "dialCode": "+223",
    "name": "Mali",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MT",
    "code": "MT",
    "iso3": "MLT",
    "numCode": 470,
    "dialCode": "+356",
    "name": "Malta",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MH",
    "code": "MH",
    "iso3": "MHL",
    "numCode": 584,
    "dialCode": "+692",
    "name": "Marshall Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MQ",
    "code": "MQ",
    "iso3": "MTQ",
    "numCode": 474,
    "dialCode": "+596",
    "name": "Martinique",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MR",
    "code": "MR",
    "iso3": "MRT",
    "numCode": 478,
    "dialCode": "+222",
    "name": "Mauritania",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MU",
    "code": "MU",
    "iso3": "MUS",
    "numCode": 480,
    "dialCode": "+230",
    "name": "Mauritius",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "YT",
    "code": "YT",
    "iso3": "MYT",
    "numCode": 175,
    "dialCode": "+262",
    "name": "Mayotte",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MX",
    "code": "MX",
    "iso3": "MEX",
    "numCode": 484,
    "dialCode": "+52",
    "name": "Mexico",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "FM",
    "code": "FM",
    "iso3": "FSM",
    "numCode": 583,
    "dialCode": "+691",
    "name": "Micronesia (Federated States of)",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MD",
    "code": "MD",
    "iso3": "MDA",
    "numCode": 498,
    "dialCode": "+373",
    "name": "Moldova, Republic of",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MC",
    "code": "MC",
    "iso3": "MCO",
    "numCode": 492,
    "dialCode": "+377",
    "name": "Monaco",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MN",
    "code": "MN",
    "iso3": "MNG",
    "numCode": 496,
    "dialCode": "+976",
    "name": "Mongolia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "ME",
    "code": "ME",
    "iso3": "MNE",
    "numCode": 499,
    "dialCode": "+382",
    "name": "Montenegro",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MS",
    "code": "MS",
    "iso3": "MSR",
    "numCode": 500,
    "dialCode": "+1664",
    "name": "Montserrat",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MA",
    "code": "MA",
    "iso3": "MAR",
    "numCode": 504,
    "dialCode": "+212",
    "name": "Morocco",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MZ",
    "code": "MZ",
    "iso3": "MOZ",
    "numCode": 508,
    "dialCode": "+258",
    "name": "Mozambique",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MM",
    "code": "MM",
    "iso3": "MMR",
    "numCode": 104,
    "dialCode": "+95",
    "name": "Myanmar",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NA",
    "code": "NA",
    "iso3": "NAM",
    "numCode": 516,
    "dialCode": "+264",
    "name": "Namibia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NR",
    "code": "NR",
    "iso3": "NRU",
    "numCode": 520,
    "dialCode": "+674",
    "name": "Nauru",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NP",
    "code": "NP",
    "iso3": "NPL",
    "numCode": 524,
    "dialCode": "+977",
    "name": "Nepal",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NL",
    "code": "NL",
    "iso3": "NLD",
    "numCode": 528,
    "dialCode": "+31",
    "name": "Netherlands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NC",
    "code": "NC",
    "iso3": "NCL",
    "numCode": 540,
    "dialCode": "+687",
    "name": "New Caledonia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NZ",
    "code": "NZ",
    "iso3": "NZL",
    "numCode": 554,
    "dialCode": "+64",
    "name": "New Zealand",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NI",
    "code": "NI",
    "iso3": "NIC",
    "numCode": 558,
    "dialCode": "+505",
    "name": "Nicaragua",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NE",
    "code": "NE",
    "iso3": "NER",
    "numCode": 562,
    "dialCode": "+227",
    "name": "Niger",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NG",
    "code": "NG",
    "iso3": "NGA",
    "numCode": 566,
    "dialCode": "+234",
    "name": "Nigeria",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NU",
    "code": "NU",
    "iso3": "NIU",
    "numCode": 570,
    "dialCode": "+683",
    "name": "Niue",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NF",
    "code": "NF",
    "iso3": "NFK",
    "numCode": 574,
    "dialCode": "+672",
    "name": "Norfolk Island",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "MP",
    "code": "MP",
    "iso3": "MNP",
    "numCode": 580,
    "dialCode": "+1670",
    "name": "Northern Mariana Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "NO",
    "code": "NO",
    "iso3": "NOR",
    "numCode": 578,
    "dialCode": "+47",
    "name": "Norway",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "OM",
    "code": "OM",
    "iso3": "OMN",
    "numCode": 512,
    "dialCode": "+968",
    "name": "Oman",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "PK",
    "code": "PK",
    "iso3": "PAK",
    "numCode": 586,
    "dialCode": "+92",
    "name": "Pakistan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "PW",
    "code": "PW",
    "iso3": "PLW",
    "numCode": 585,
    "dialCode": "+680",
    "name": "Palau",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "PS",
    "code": "PS",
    "iso3": "PSE",
    "numCode": 275,
    "dialCode": "+970",
    "name": "Palestine, State of",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "PT",
    "code": "PT",
    "iso3": "PRT",
    "numCode": 351,
    "dialCode": "+351",
    "name": "Portugal",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "PY",
    "code": "PY",
    "iso3": "PRY",
    "numCode": 600,
    "dialCode": "+595",
    "name": "Paraguay",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "QA",
    "code": "QA",
    "iso3": "QAT",
    "numCode": 634,
    "dialCode": "+974",
    "name": "Qatar",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "RO",
    "code": "RO",
    "iso3": "ROU",
    "numCode": 642,
    "dialCode": "+40",
    "name": "Romania",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "RU",
    "code": "RU",
    "iso3": "RUS",
    "numCode": 643,
    "dialCode": "+7",
    "name": "Russian Federation",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "RW",
    "code": "RW",
    "iso3": "RWA",
    "numCode": 646,
    "dialCode": "+250",
    "name": "Rwanda",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SA",
    "code": "SA",
    "iso3": "SAU",
    "numCode": 682,
    "dialCode": "+966",
    "name": "Saudi Arabia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SB",
    "code": "SB",
    "iso3": "SLB",
    "numCode": 90,
    "dialCode": "+677",
    "name": "Solomon Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SM",
    "code": "SM",
    "iso3": "SMR",
    "numCode": 674,
    "dialCode": "+378",
    "name": "San Marino",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SN",
    "code": "SN",
    "iso3": "SEN",
    "numCode": 686,
    "dialCode": "+221",
    "name": "Senegal",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "RS",
    "code": "RS",
    "iso3": "SRB",
    "numCode": 688,
    "dialCode": "+381",
    "name": "Serbia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SC",
    "code": "SC",
    "iso3": "SYC",
    "numCode": 690,
    "dialCode": "+248",
    "name": "Seychelles",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SL",
    "code": "SL",
    "iso3": "SLE",
    "numCode": 694,
    "dialCode": "+232",
    "name": "Sierra Leone",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SG",
    "code": "SG",
    "iso3": "SGP",
    "numCode": 702,
    "dialCode": "+65",
    "name": "Singapore",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SK",
    "code": "SK",
    "iso3": "SVK",
    "numCode": 703,
    "dialCode": "+421",
    "name": "Slovakia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SI",
    "code": "SI",
    "iso3": "SVN",
    "numCode": 705,
    "dialCode": "+386",
    "name": "Slovenia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SO",
    "code": "SO",
    "iso3": "SOM",
    "numCode": 706,
    "dialCode": "+252",
    "name": "Somalia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SR",
    "code": "SR",
    "iso3": "SUR",
    "numCode": 740,
    "dialCode": "+597",
    "name": "Suriname",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SS",
    "code": "SS",
    "iso3": "SSD",
    "numCode": 728,
    "dialCode": "+211",
    "name": "South Sudan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "ST",
    "code": "ST",
    "iso3": "STP",
    "numCode": 678,
    "dialCode": "+239",
    "name": "Sao Tome and Principe",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SV",
    "code": "SV",
    "iso3": "SLV",
    "numCode": 222,
    "dialCode": "+503",
    "name": "El Salvador",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SX",
    "code": "SX",
    "iso3": "SXM",
    "numCode": 534,
    "dialCode": "+1-721",
    "name": "Sint Maarten (Dutch part)",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SY",
    "code": "SY",
    "iso3": "SYR",
    "numCode": 760,
    "dialCode": "+963",
    "name": "Syrian Arab Republic",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "SZ",
    "code": "SZ",
    "iso3": "SWZ",
    "numCode": 748,
    "dialCode": "+268",
    "name": "Eswatini",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TC",
    "code": "TC",
    "iso3": "TCA",
    "numCode": 796,
    "dialCode": "+1-649",
    "name": "Turks and Caicos Islands",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TD",
    "code": "TD",
    "iso3": "TCD",
    "numCode": 148,
    "dialCode": "+235",
    "name": "Chad",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TF",
    "code": "TF",
    "iso3": "ATF",
    "numCode": 260,
    "dialCode": "+262",
    "name": "French Southern Territories",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TG",
    "code": "TG",
    "iso3": "TGO",
    "numCode": 768,
    "dialCode": "+228",
    "name": "Togo",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TH",
    "code": "TH",
    "iso3": "THA",
    "numCode": 764,
    "dialCode": "+66",
    "name": "Thailand",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TJ",
    "code": "TJ",
    "iso3": "TJK",
    "numCode": 762,
    "dialCode": "+992",
    "name": "Tajikistan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TK",
    "code": "TK",
    "iso3": "TKL",
    "numCode": 772,
    "dialCode": "+690",
    "name": "Tokelau",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TL",
    "code": "TL",
    "iso3": "TLS",
    "numCode": 626,
    "dialCode": "+670",
    "name": "Timor-Leste",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TM",
    "code": "TM",
    "iso3": "TKM",
    "numCode": 795,
    "dialCode": "+993",
    "name": "Turkmenistan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TN",
    "code": "TN",
    "iso3": "TUN",
    "numCode": 788,
    "dialCode": "+216",
    "name": "Tunisia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TO",
    "code": "TO",
    "iso3": "TON",
    "numCode": 776,
    "dialCode": "+676",
    "name": "Tonga",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TR",
    "code": "TR",
    "iso3": "TUR",
    "numCode": 792,
    "dialCode": "+90",
    "name": "Turkey",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TT",
    "code": "TT",
    "iso3": "TTO",
    "numCode": 780,
    "dialCode": "+1-868",
    "name": "Trinidad and Tobago",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TV",
    "code": "TV",
    "iso3": "TUV",
    "numCode": 798,
    "dialCode": "+688",
    "name": "Tuvalu",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "TZ",
    "code": "TZ",
    "iso3": "TZA",
    "numCode": 834,
    "dialCode": "+255",
    "name": "Tanzania, United Republic of",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "UA",
    "code": "UA",
    "iso3": "UKR",
    "numCode": 804,
    "dialCode": "+380",
    "name": "Ukraine",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "UG",
    "code": "UG",
    "iso3": "UGA",
    "numCode": 800,
    "dialCode": "+256",
    "name": "Uganda",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "US",
    "code": "US",
    "iso3": "USA",
    "numCode": 840,
    "dialCode": "+1",
    "name": "United States of America",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "UY",
    "code": "UY",
    "iso3": "URY",
    "numCode": 858,
    "dialCode": "+598",
    "name": "Uruguay",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "UZ",
    "code": "UZ",
    "iso3": "UZB",
    "numCode": 860,
    "dialCode": "+998",
    "name": "Uzbekistan",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "VA",
    "code": "VA",
    "iso3": "VAT",
    "numCode": 336,
    "dialCode": "+379",
    "name": "Holy See (Vatican City State)",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "VC",
    "code": "VC",
    "iso3": "VCT",
    "numCode": 670,
    "dialCode": "+1-784",
    "name": "Saint Vincent and the Grenadines",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "VE",
    "code": "VE",
    "iso3": "VEN",
    "numCode": 862,
    "dialCode": "+58",
    "name": "Venezuela (Bolivarian Republic of)",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "VN",
    "code": "VN",
    "iso3": "VNM",
    "numCode": 704,
    "dialCode": "+84",
    "name": "Viet Nam",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "VU",
    "code": "VU",
    "iso3": "VUT",
    "numCode": 548,
    "dialCode": "+678",
    "name": "Vanuatu",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "WF",
    "code": "WF",
    "iso3": "WLF",
    "numCode": 876,
    "dialCode": "+681",
    "name": "Wallis and Futuna",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "WS",
    "code": "WS",
    "iso3": "WSM",
    "numCode": 882,
    "dialCode": "+685",
    "name": "Samoa",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "YE",
    "code": "YE",
    "iso3": "YEM",
    "numCode": 887,
    "dialCode": "+967",
    "name": "Yemen",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "ZA",
    "code": "ZA",
    "iso3": "ZAF",
    "numCode": 710,
    "dialCode": "+27",
    "name": "South Africa",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "ZM",
    "code": "ZM",
    "iso3": "ZMB",
    "numCode": 894,
    "dialCode": "+260",
    "name": "Zambia",
    "displayName": null,
    "regionId": null
  },
  {
    "iso2": "ZW",
    "code": "ZW",
    "iso3": "ZWE",
    "numCode": 716,
    "dialCode": "+263",
    "name": "Zimbabwe",
    "displayName": null,
    "regionId": null
  }
]

/**
 * CountryService provides functionality for working with specific resources
 * in the Litekart API.
 *
 * This service helps with:
 * - Main functionality point 1
 * - Main functionality point 2
 * - Main functionality point 3
 */
export class CountryService extends BaseService {
  private static instance: CountryService

  /**
   * Get the singleton instance
   */
  /**
 * Get the singleton instance
 * 
 * @returns {CountryService} The singleton instance of CountryService
 */
  static getInstance(): CountryService {
    if (!CountryService.instance) {
      CountryService.instance = new CountryService()
    }
    return CountryService.instance
  }
  /**
 * Fetches Country from the API
 * 
 * @param {Object} options - The request options
 * @param {number} [options.page=1] - The page number for pagination
 * @param {string} [options.q=''] - Search query string
 * @param {string} [options.sort='-createdAt'] - Sort order
 * @returns {Promise<any>} The requested data
 * @api {get} /api/country Get country
 * 
 * @example
 * // Example usage
 * const result = await countryService.list({ page: 1 });
 */
  async list() {
    return countries
  }
}

// // Use singleton instance
export const countryService = CountryService.getInstance()

