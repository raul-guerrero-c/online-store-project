// src/data/productos.js

/**
 * Catálogo de productos simulado.
 * En actividades posteriores se podrá sustituir por una API real
 * conectada a una base de datos relacional y a Elasticsearch.
 *
 * Para las imágenes, usamos el servicio público https://picsum.photos
 * con diferentes "seed" para que cada producto tenga una imagen estable.
 */

export const productos = [
  {
    id: 'p-001',
    nombre: 'Audífonos inalámbricos con cancelación de ruido', // Wireless Noise-Cancelling Headphones
    fabricante: 'SoundWave',
    categoria: 'Audio',
    descripcionCorta:
      'Audífonos inalámbricos de alta fidelidad con cancelación activa de ruido.',
    descripcionLarga:
      'Estos audífonos inalámbricos ofrecen sonido de alta fidelidad y cancelación de ruido activa de primer nivel. Ideales para trabajar en entornos ruidosos, viajar o disfrutar de tu música con la máxima claridad durante todo el día.',
    precio: 199.99,
    moneda: 'USD',
    imagen: 'https://cdn.pixabay.com/photo/2025/09/26/07/48/music-9856275_1280.jpg',
    etiquetas: ['inalámbricos', 'bluetooth', 'cancelación de ruido'],
    stock: 12,
  },
  {
    id: 'p-002',
    nombre: 'Teclado mecánico RGB compacto',
    fabricante: 'KeyPro',
    categoria: 'Periféricos',
    descripcionCorta:
      'Teclado mecánico compacto con iluminación RGB y switches rojos.',
    descripcionLarga:
      'Teclado mecánico de formato compacto con switches lineales rojos silenciosos, ideal para programadores y gamers que buscan un tamaño reducido sin renunciar a la calidad de escritura.',
    precio: 129.9,
    moneda: 'USD',
    imagen: 'https://cdn.pixabay.com/photo/2024/10/30/10/53/ai-generated-9161446_1280.jpg',
    etiquetas: ['mecánico', 'rgb', 'compacto'],
    stock: 8,
  },
  {
    id: 'p-003',
    nombre: 'Mouse gamer ergonómico',
    fabricante: 'ProClick',
    categoria: 'Periféricos',
    descripcionCorta:
      'Mouse ergonómico con sensor óptico de alta precisión y botones programables.',
    descripcionLarga:
      'Mouse diseñado para largas sesiones de uso con agarre cómodo, sensor óptico de alto rendimiento, DPI ajustable y varios botones programables a través de software.',
    precio: 59.5,
    moneda: 'USD',
    imagen: 'https://cdn.pixabay.com/photo/2023/08/10/03/51/ai-generated-8180657_960_720.jpg',
    etiquetas: ['gamer', 'ergonómico', 'rgb'],
    stock: 25,
  },
  {
    id: 'p-004',
    nombre: 'Monitor 27" 4K UHD',
    fabricante: 'VisionDisplay',
    categoria: 'Monitores',
    descripcionCorta:
      'Monitor de 27 pulgadas con resolución 4K UHD y panel IPS.',
    descripcionLarga:
      'Monitor profesional de 27" con resolución 4K UHD, panel IPS de alta precisión de color y múltiples entradas HDMI/DisplayPort, ideal para desarrollo, diseño y consumo multimedia.',
    precio: 399.0,
    moneda: 'USD',
    imagen: 'https://cdn.pixabay.com/photo/2016/05/05/11/22/computer-1373684_1280.jpg',
    etiquetas: ['4k', 'ips', 'uhd'],
    stock: 5,
  },
  {
    id: 'p-005',
    nombre: 'Micrófono USB para streaming',
    fabricante: 'StreamVoice',
    categoria: 'Audio',
    descripcionCorta:
      'Micrófono USB con patrón cardioide ideal para streaming y videollamadas.',
    descripcionLarga:
      'Micrófono USB de calidad profesional con patrón cardioide, brazo ajustable y filtro antipop, ideal para streaming, grabación de podcasts y videoconferencias.',
    precio: 89.99,
    moneda: 'USD',
    imagen: 'https://cdn.pixabay.com/photo/2024/11/30/07/22/ai-generated-9234256_1280.jpg',
    etiquetas: ['streaming', 'podcast', 'usb'],
    stock: 15,
  },
  {
    id: 'p-006',
    nombre: 'Webcam Full HD con autoenfoque',
    fabricante: 'ClearCam',
    categoria: 'Accesorios',
    descripcionCorta:
      'Webcam Full HD 1080p con autoenfoque y corrección automática de luz.',
    descripcionLarga:
      'Webcam de alta definición que se adapta a diferentes condiciones de iluminación, con autoenfoque y micrófono integrado para videollamadas nítidas.',
    precio: 69.99,
    moneda: 'USD',
    imagen: 'https://www.rollingstone.com/wp-content/uploads/2021/06/AdobeStock_388359691.jpeg?w=1581&h=1054&crop=1',
    etiquetas: ['1080p', 'webcam', 'autoenfoque'],
    stock: 18,
  },
  {
    id: 'p-007',
    nombre: 'Bocina portátil Bluetooth',
    fabricante: 'UrbanSound',
    categoria: 'Audio',
    descripcionCorta:
      'Bocina portátil resistente al agua con conectividad Bluetooth 5.0.',
    descripcionLarga:
      'Bocina compacta con sonido potente, batería de larga duración y resistencia a salpicaduras, perfecta para usar en interiores y exteriores.',
    precio: 79.0,
    moneda: 'USD',
    imagen: 'https://m.media-amazon.com/images/I/81jiSi42oqL._AC_SL1500_.jpg',
    etiquetas: ['bluetooth', 'portátil', 'resistente al agua'],
    stock: 20,
  },
  {
    id: 'p-008',
    nombre: 'Laptop ultraligera 14"',
    fabricante: 'FastBook',
    categoria: 'Portátiles',
    descripcionCorta:
      'Laptop ultraligera de 14" con SSD y batería de larga duración.',
    descripcionLarga:
      'Equipo portátil pensado para productividad diaria, con unidad SSD, 16 GB de RAM y peso reducido para poder transportar el equipo a cualquier lugar.',
    precio: 1099.99,
    moneda: 'USD',
    imagen: 'https://www.gizmochina.com/wp-content/uploads/2024/10/Asus-Vivobook-S15-9-768x576.jpg',
    etiquetas: ['ultraligera', 'ssd', 'productividad'],
    stock: 7,
  },
];

// Función auxiliar para obtener un producto por su ID.
export function obtenerProductoPorId(idProducto) {
  return productos.find((producto) => producto.id === idProducto);
}
