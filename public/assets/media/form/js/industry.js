let industryEspañol = {
    "step-one-industry-list": [
      "Alojamiento",
      "Agricultura – Cultivos",
      "Agricultura - Ganadería y aves de corral",
      "Alcohol y tabaco",
      "Electrodomésticos y artículos para el hogar",
      "Casa de subastas, antigüedades y arte",
      "Estaciones de servicio y reparación automotriz",
      "Ventas automotrices",
      "Belleza, estética y servicios personales",
      "Materiales de construcción, herramientas y suministros",
      "Productos químicos y relacionados",
      "Ropa y calzado",
      "Educación y capacitación",
      "Ingeniería y arquitectura",
      "Metal fabricado, refinerías y relacionados",
      "Equipo agrícola y suministros",
      "Cine y entretenimiento",
      "Instituciones financieras",
      "Pesca, caza y juegos",
      "Alimentos y bebidas",
      "Silvicultura",
      "Muebles, accesorios y equipos de oficina",
      "Contratistas generales y oficios",
      "Gobierno (municipal, prov. y federal)",
      "Hoteles y alojamiento",
      "Artículos para el hogar y electrodomésticos",
      "Equipos y maquinaria industrial",
      "Seguros",
      "Gestión de inversiones y patrimonio",
      "IT, gestión de datos y software",
      "Joyería y metales preciosos",
      "Productos de Cuero",
      "Legal",
      "Logística, Transporte y Transporte de Carga",
      "Fabricación – Varios",
      "Marketing, Medios y Relaciones Públicas",
      "Medicina, Dental y Salud (excluyendo medicamentos)",
      "Minería (excluyendo Petróleo y Gas)",
      "Organizaciones Sin Fines de Lucro y Benéficas",
      "Petróleo y gas",
      "Electrónica personal (computadora portátil/celular/cámara)",
      "Mercancía personal y accesorios",
      "Productos farmacéuticos",
      "Plásticos, caucho y compuestos",
      "Impresión, publicación y medios impresos",
      "Administración de propiedades",
      "Transporte público (Correo, Ferrocarril, Barco)",
      "Bienes Raíces y Desarrollo Inmobiliario",
      "Venta al por menor – Varios",
      "Ciencia, Investigación y Desarrollo",
      "Servicios – Varios",
      "Deportes y Recreación",
      "Productos de papelería y papel",
      "Almacenamiento",
      "Servicios de impuestos y consultoría",
      "Telecomunicaciones, cable, Internet, VOIP",
      "Textiles y telas",
      "Viajes y turismo",
      "Servicios públicos (gas, agua, hidroeléctrica)",
      "Producción de vehículos (todos los tipos)",
      "Gestión de residuos y reciclaje",
      "Armas y relacionados"
    ]
}

let industryIngles = {
    "step-one-industry-list": [
      "Accommodation",
      "Agriculture – Crops",
      "Agriculture - Livestock and Poultry",
      "Alcohol & Tobacco",
      "Appliances & Household goods",
      "Auction House, Antiques & Art",
      "Automotive Repair & Service Stations",
      "Automotive Sales",
      "Beauty, Esthetics & Personal Services",
      "Building Materials, Tools & Supplies",
      "Chemicals & Related Products",
      "Clothing, Apparel & Footwear",
      "Education and Training",
      "Engineering & Architectural",
      "Fabricated metal, Refineries & Related",
      "Farming Equipment & Supplies",
      "Film & Entertainment",
      "Financial Institutions",
      "Fisheries, Hunting & Gaming",
      "Food & Beverage",
      "Forestry & Silviculture",
      "Furniture, Fixtures & Office Equipment",
      "General Contractors & Trades",
      "Government (Municipal, Prov. & Federal)",
      "Hotels & Accommodation",
      "Household Goods & Appliances",
      "Industrial Equipment & Machinery",
      "Insurance",
      "Investment & Wealth Management",
      "IT, Data Management & Software",
      "Jewellery & Precious Metals",
      "Leather Products",
      "Legal",
      "Logistics, Transport & Freight Forwarding",
      "Manufacturing – Miscellaneous",
      "Marketing, Media & Public Relations",
      "Medical, Dental & Health (excl. drugs)",
      "Mining (excl. Oil and Gas)",
      "Not-For-Profit & Charities",
      "Oil and Gas",
      "Personal Electronics (Laptop/Cellular/Camera)",
      "Personal Merchandise & Accessories",
      "Pharmaceuticals",
      "Plastics, Rubber & Composites",
      "Printing, Publishing & Print Media",
      "Property Management",
      "Public Transportation (Ail, Rail, Boat)",
      "Real Estate & Property Development",
      "Retail – Miscellaneous",
      "Science, Research & Development",
      "Services – Miscellaneous",
      "Sports & Recreation",
      "Stationary & Paper Products",
      "Storage & Warehousing",
      "Tax & Consultancy Services",
      "Telecomm, Cable, Internet, VOIP",
      "Textiles & Fabrics",
      "Travel & Tourism",
      "Utilities (Gas, Water, Hydro)",
      "Vehicle Production (all types)",
      "Waste Management and Recycling",
      "Weapons, Arms & Related"
    ]
}

function fillIndustryEspañol(){
    $('#industry').empty().append('<option value="">Seleccione una industria</option>');
    industryEspañol["step-one-industry-list"].forEach(function(industry){
        $('#industry').append(new Option(industry, industry)) 
    })
    $('#industry').select2({
        placeholder: "Seleccione una industria",
        allowClear: true
    });
}

fillIndustryEspañol()

function fillIndustryIngles(){
    $('#industry').empty().append('<option value="">Select an industry</option>');
    industryIngles["step-one-industry-list"].forEach(function(industry){
        $('#industry').append(new Option(industry, industry)) 
    })
    $('#industry').select2({
        placeholder: "Select an industry",
        allowClear: true
    });
}

