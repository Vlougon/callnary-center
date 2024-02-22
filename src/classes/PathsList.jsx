export default class PathsList {
    static paths = [
        {
            id: 1,
            href: '/',
            name: 'Inicio'
        },
        {
            id: 2,
            href: '/beneficiaryform',
            name: 'Añadir Beneficiario'
        },
        {
            id: 3,
            href: '/beneficiaryform/:id?',
            name: 'Modificar Datos Beneficiario'
        },
        {
            id: 4,
            href: '/assistantform',
            name: 'Añadir Asistente'
        },
        {
            id: 5,
            href: '/assistantform/:id?',
            name: 'Modificar Datos Asistente'
        },
        {
            id: 6,
            href: '/callform',
            name: 'Llamada'
        },
        {
            id: 7,
            href: '/medicaldataform/:userid',
            name: 'Añadir Datos Medicos'
        },
        {
            id: 8,
            href: '/medicaldataform/:userid/:id?',
            name: 'Modificar Datos Medicos'
        },
        {
            id: 9,
            href: '/contactform/:userid',
            name: 'Añadir Contacto'
        },
        {
            id: 10,
            href: '/contactform/:userid/:id?',
            name: 'Modificar Contacto'
        },
        {
            id: 11,
            href: '/beneficiarylist',
            name: 'Listado de Beneficiarios'
        },
        {
            id: 12,
            href: '/beneficiarylist/:kind?',
            name: 'Beneficiarios para Llamar'
        },
        {
            id: 13,
            href: '/medicaldatalist',
            name: 'Listado Médico'
        },
        {
            id: 14,
            href: '/assistantlist',
            name: 'Listado de Asistentes'
        },
        {
            id: 15,
            href: '/contactlist',
            name: 'Listado de Contactos'
        },
        {
            id: 16,
            href: '/contactlist/:id?',
            name: 'Contactos de un Beneficiario'
        },
        {
            id: 17,
            href: '/calendar',
            name: 'Calendario'
        },
        {
            id: 18,
            href: '/documentgenerator',
            name: 'Generador de Documentos'
        }
    ]
}