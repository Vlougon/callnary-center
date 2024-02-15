export default class PCGenerator {
    static provincesPostalCodes = [
        {
            province: 'Álava',
            postal_code: '01',
        },
        {
            province: 'Albacete',
            postal_code: '02',
        },
        {
            province: 'Alicante',
            postal_code: '03',
        },
        {
            province: 'Almería',
            postal_code: '04',
        },
        {
            province: 'Ávilla',
            postal_code: '05',
        },
        {
            province: 'Badajoz',
            postal_code: '06',
        },
        {
            province: 'Islas Baleares',
            postal_code: '07',
        },
        {
            province: 'Barcelona',
            postal_code: '08',
        },
        {
            province: 'Burgos',
            postal_code: '09',
        },
        {
            province: 'Cáceres',
            postal_code: '10',
        },
        {
            province: 'Cádiz',
            postal_code: '11',
        },
        {
            province: 'Cestellón',
            postal_code: '12',
        },
        {
            province: 'Ciudad Real',
            postal_code: '13',
        },
        {
            province: 'Córdoba',
            postal_code: '14',
        },
        {
            province: 'A Coruña',
            postal_code: '15',
        },
        {
            province: 'Cuenca',
            postal_code: '16',
        },
        {
            province: 'Girona',
            postal_code: '17',
        },
        {
            province: 'Granada',
            postal_code: '18',
        },

        {
            province: 'Guadalajara',
            postal_code: '19',
        },
        {
            province: 'Guipúzcoa',
            postal_code: '20',
        },
        {
            province: 'Huelva',
            postal_code: '21',
        },
        {
            province: 'Huesca',
            postal_code: '22',
        },
        {
            province: 'Jaén',
            postal_code: '23',
        },
        {
            province: 'León',
            postal_code: '24',
        },
        {
            province: 'Lleida',
            postal_code: '25',
        },
        {
            province: 'La Rioja',
            postal_code: '26',
        },
        {
            province: 'Lugo',
            postal_code: '27',
        },
        {
            province: 'Madrid',
            postal_code: '28',
        },
        {
            province: 'Málaga',
            postal_code: '29',
        },
        {
            province: 'Murcia',
            postal_code: '30',
        },
        {
            province: 'Navarra',
            postal_code: '31',
        },
        {
            province: 'Ourense',
            postal_code: '32',
        },
        {
            province: 'Asturias',
            postal_code: '33',
        },
        {
            province: 'Palencia',
            postal_code: '34',
        },
        {
            province: 'Las Palmas',
            postal_code: '35',
        },
        {
            province: 'Pontevedra',
            postal_code: '36',
        },
        {
            province: 'Salamanca',
            postal_code: '37',
        },
        {
            province: 'Santa Cruz de Tenerife',
            postal_code: '38',
        },
        {
            province: 'Cantabria',
            postal_code: '39',
        },
        {
            province: 'Segovia',
            postal_code: '40',
        },
        {
            province: 'Sevilla',
            postal_code: '41',
        },
        {
            province: 'Soria',
            postal_code: '42',
        },
        {
            province: 'Tarragona',
            postal_code: '43',
        },
        {
            province: 'Teruel',
            postal_code: '44',
        },
        {
            province: 'Toledo',
            postal_code: '45',
        },
        {
            province: 'Valencia',
            postal_code: '46',
        },
        {
            province: 'Valladolid',
            postal_code: '47',
        },
        {
            province: 'Vizcaya',
            postal_code: '48',
        },
        {
            province: 'Zamora',
            postal_code: '49',
        },
        {
            province: 'Zaragoza',
            postal_code: '50',
        },
        {
            province: 'Ceuta',
            postal_code: '51',
        },
        {
            province: 'Melilla',
            postal_code: '52',
        },
    ];

    static generatePC(prefix) {
        const fullPostalCode = prefix + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

        return fullPostalCode;
    }

    static validPC(postalCode, provinceName) {
        const prefixes = postalCode.slice(0, 2);
        const fullProvince = this.provincesPostalCodes.filter((province) => province.province === provinceName)[0];

        return prefixes === fullProvince.postal_code ? true : false;
    }
}