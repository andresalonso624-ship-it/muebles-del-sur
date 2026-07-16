export interface Mueble {
  id: number;
  nombre: string;
  referencia: string;
 medida: string | string[];
  color: string;
  imagenes: string[];
}

export const muebles: Mueble[] = [
  {
    id: 1,
    nombre: "Mostrador Principal Grande",
    referencia: "REF-1001",
    medida: "180 x 55 x 95 cm",
    color: "Madera - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-001-1.jpg",
      "/images/catalogo/producto-001-2.jpg",
    ],
  },

  {
    id: 2,
    nombre: "Mostrador Principal mediano ",
    referencia: "REF-1002",
    medida: [ 
      "150 x 55 x 95 cm",
      "120 x 55 x 95 cm",
      ],
    color: "Madera - Blanco Mate",
    imagenes: [
       "/images/catalogo/producto-002-1.jpg",
      "/images/catalogo/producto-002-2.jpg",
    ],
  },

  {
    id: 3,
    nombre: "Mostrador TPV",
    referencia: "REF-1003",
    medida: "95 x 55 x 60 cm",
    color: "Madera - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-003-1.jpg",
      "/images/catalogo/producto-003-2.jpg",
    ],
  },
    {
    id: 4,
    nombre: "Mostrador Curvo",
    referencia: "REF-1004",
    medida: "95 x 55 x 80 cm",
    color: "Madera - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-004-1.jpg",
      "/images/catalogo/producto-004-2.jpg",
    ],
  },

      {
    id: 5,
    nombre: "Mostrador Luz LED",
    referencia: "REF-1005",
        medida: [ 
      "150 x 55 x 100 cm",
      "180 x 55 x 100 cm",
      ],
    color: "Preferencia del cliente",
    imagenes: [
      "/images/catalogo/producto-005-1.jpg",
    ],
  },

      {
    id: 6,
    nombre: "Mostrador Recepción Luz LED",
    referencia: "REF-1006",
    medida: "180 x 55 x 110 cm",
    color: "Preferencia del cliente",
    imagenes: [
      "/images/catalogo/producto-006-1.jpg",
    ],
  },

      {
    id: 7,
    nombre: "Mesa Redonda 3 Plantas",
    referencia: "REF-1007",
    medida: "120 x 130 x 120 cm",
    color: "Madera - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-007-1.jpg",
    ],
  },

      {
    id: 8,
    nombre: "Mesa Redonda 3 Plantas",
    referencia: "REF-1008",
    medida: "90 x 90 x 110 cm",
    color: "Madera - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-008-1.jpg",
    ],
  },

      {
    id: 9,
    nombre: "Juego de 3 mesas Rectangulares",
    referencia: "REF-1009",
    medida: "100 x 55 x 70 cm",
    color: "Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-009-1.jpg",
    ],
  },

        {
    id: 10,
    nombre: "Juego de 3 mesas Rectangulares",
    referencia: "REF-1010",
    medida: "120 x 55 x 70 cm",
    color: "Madera - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-010-1.jpg",
    ],
  },

        {
    id: 11,
    nombre: "Lamas",
    referencia: "REF-1011",
            medida: [ 
      "120 x 120 x 1.8 cm - 7,5 lineas",
      "120 x 120 x 1.8 cm - 10.5 lineas",
      ],
    color: "Madera - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-011-1.jpg",
    ],
  },

        {
    id: 12,
    nombre: "Baldas para Estanteria",
    referencia: "REF-1012",
medida: "60 x 30 cm hasta  120 x 40 cm",
    color: "Madera - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-012-1.jpg",
    ],
  },

        {
    id: 13,
    nombre: "Expositor Pendietes Luz LED ",
    referencia: "REF-1013",
    medida: "Preferencia del Cliente",
    color: "Beta - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-013-0.jpg",
    ],
  },
          {
    id: 14,
    nombre: "Estanterias ",
    referencia: "REF-1014",
              medida: [ 
      "180 x 30 x 80 cm - 5 Estanterias ",
      "160 x 30 x 80 cm - 4 Estanterias",
      ],
    color: "Marco negro, Baldas Blanco Mate - Marco Blanco, Baldas Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-013-1.jpg",
    ],
  },
          {
    id: 15,
    nombre: "Estanteria Marco Oro Inoxidable ",
    referencia: "REF-1015",
    medida: "210 x 41 cm",
    color: "Blanco Mate ",
    imagenes: [
      "/images/catalogo/producto-014-1.jpg",
    ],
  },
          {
    id: 16,
    nombre: "Estanteria Asimetrica 7 Niveles",
    referencia: "REF-1016",
    medida: "210 x 30 x 100 cm",
    color: "Negro - Blanco Mate - Oro",
    imagenes: [
      "/images/catalogo/producto-015-1.jpg",
    ],
  },
          {
    id: 17,
    nombre: "Estanteria Tipo Escalera",
    referencia: "REF-1017",
    medida: "120 x 60 x 130 cm",
    color: "Negro - Blanco Mate",
    imagenes: [
      "/images/catalogo/producto-015-2.jpg",
    ],
  },
          {
    id: 18,
    nombre: "Estanteria Metalica Decorativa Oro Inoxidable",
    referencia: "REF-1018",
    medida: "131 x 122 x 41 cm",
    color: "Balda Blanco Birllo",
    imagenes: [
      "/images/catalogo/producto-016-1.jpg",
    ],
  },
          {
    id: 19,
    nombre: "Isla de Exhibicion Doble Cara",
    referencia: "REF-1019",
    medida: "240 x 120 x 60 cm",
    color: "Negro",
    imagenes: [
      "/images/catalogo/producto-017-1.jpg",
    ],
  },
            {
    id: 20,
    nombre: "Perchero Ovalado",
    referencia: "REF-1020",
    medida: "200 x 40 x 160 cm",
    color: "Oro Mate",
    imagenes: [
      "/images/catalogo/producto-018-1.jpg",
      "/images/catalogo/producto-018-2.jpg",
    ],
  },          {
    id: 21,
    nombre: "Perchero Doble Brazo",
    referencia: "REF-1021",
    medida: "150 x 50 x 140 cm",
    color: "Oro Acero Inoxidable",
    imagenes: [
      "/images/catalogo/producto-019-1.jpg",
      "/images/catalogo/producto-019-2.jpg",
    ],
  },
            {
    id: 22,
    nombre: "Perchero Semi Circular",
    referencia: "REF-1022",
    medida: "150 x 60 cm",
    color: "Oro Mate",
    imagenes: [
      "/images/catalogo/producto-020-0.jpg",
    ],
  },
  
            {
    id: 23,
    nombre: "Perchero Para Corbata y Cinturones",
    referencia: "REF-1023",
    medida: "150 x 60 cm",
    color: "Plata",
    imagenes: [
      "/images/catalogo/producto-020-1.jpg",
    ],
  },
            {
    id: 24,
    nombre: "Perchero (Burro) Extensible",
    referencia: "REF-1024",
                  medida: [ 
      "100 cm hasta 200 cm ",
      "150 cm hasta 200 cm ",
      ],
    color: "Plata",
    imagenes: [
      "/images/catalogo/producto-021-1.jpg",
    ],
  },
            {
    id: 25,
    nombre: "Perchero (Burro) Fijo",
    referencia: "REF-1025",
                    medida: [ 
      "100 cm hasta 140 cm ",
      "150 cm hasta 140 cm ",
      ],  
    color: "Oro Mate",
    imagenes: [
      "/images/catalogo/producto-022-1.jpg",
    ],
  },
            {
    id: 26,
    nombre: "Perchero (Burro) doble Altura",
    referencia: "REF-1026",
    medida: "150 cm hasta 200 cm",
    color: "Plata",
    imagenes: [
      "/images/catalogo/producto-023-1.jpg",
    ],
  },
            {
    id: 27,
    nombre: "Perchero para Cremallera en U",
    referencia: "REF-1027",
    medida: [ 
      "60 x 30 cm ",
      "90 x 30 cm ",
      ],  
    color: "Plata",
    imagenes: [
      "/images/catalogo/producto-024-1.jpg",
    ],
  },
            {
    id: 28,
    nombre: "Perchero para Cremallera en U",
    referencia: "REF-1028",
    medida: [ 
      "60 x 30 cm ",
      "90 x 30 cm ",
      ],  
    color: "Oro",
    imagenes: [
      "/images/catalogo/producto-025-1.jpg",
    ],
  },
            {
    id: 29,
    nombre: "Perchero Para Lama En  U ",
    referencia: "REF-1029",
      medida: [ 
      "60 x 30 cm ",
      "90 x 30 cm ",
      ], 
    color: "Plata",
    imagenes: [
      "/images/catalogo/producto-026-1.jpg",
    ],
  },
            {
    id: 30,
    nombre: "Cremallera Con embellecedor ",
    referencia: "REF-2001",
    medida: "240 x 6 x 2 cm",
    color: " Oro ",
    imagenes: [
      "/images/catalogo/producto-027-1.jpg",
    ],
    },
            {
    id: 31,
    nombre: "Cremallera Con embellecedor ",
    referencia: "REF-2001 - 1",
    medida: "240 x 6 x 2 cm",
    color: " Plata ",
    imagenes: [
      "/images/catalogo/producto-028-1.jpg",
    ],
    },
            {
    id: 32,
    nombre: "Tubo de Cremallera Redondo ",
    referencia: "REF-2002",
    medida: "240 x 6 cm",
    color: " Plata",
    imagenes: [
      "/images/catalogo/producto-029-1.jpg",
    ],
    },
            {
    id: 33,
    nombre: "Tubo Rectangular ",
    referencia: "REF-2003",
    medida: "300 x 3 x 1.2 cm",
    color: "Plata",
    imagenes: [
      "/images/catalogo/producto-030-1.jpg",
    ],
     },
            {
    id: 34,
    nombre: " Cremalleras ",
    referencia: "REF-2004",
    medida: "240 x 2 x 1.6 cm",
    color: " Oro - Blanco - Negro - Plata",
    imagenes: [
      "/images/catalogo/producto-031-1.jpg",
    ],
        },
            {
    id: 35,
    nombre: "Tubo Rendondo Liso",
    referencia: "REF-2005",
    medida: "300 x 2 cm",
    color: "Plata",
    imagenes: [
      "/images/catalogo/producto-032-1.jpg",
    ],
  },
  
];