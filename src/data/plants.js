const img = (id) => `${import.meta.env.BASE_URL}images/plants/${id}.webp`;

const plant = (id, name, cost, description) => ({ id, name, cost, description, image: img(id) });

export const plantCategories = [
  {
    category: "Air Purifying Plants",
    plants: [
      plant("snake-plant", "Snake Plant", 15, "Produces oxygen at night, improving air quality."),
      plant("spider-plant", "Spider Plant", 12, "Filters formaldehyde and xylene from the air."),
      plant("peace-lily", "Peace Lily", 18, "Removes mold spores and purifies the air."),
      plant("boston-fern", "Boston Fern", 20, "Adds humidity to the air and removes toxins."),
      plant("rubber-plant", "Rubber Plant", 17, "Easy to care for and effective at removing toxins."),
      plant("aloe-vera", "Aloe Vera", 14, "Purifies the air and has healing properties for skin."),
    ],
  },
  {
    category: "Aromatic Fragrant Plants",
    plants: [
      plant("lavender", "Lavender", 20, "Calming scent, used in aromatherapy."),
      plant("jasmine", "Jasmine", 18, "Sweet fragrance, promotes relaxation."),
      plant("rosemary", "Rosemary", 15, "Invigorating scent, often used in cooking."),
      plant("mint", "Mint", 12, "Refreshing aroma, used in teas and cooking."),
      plant("lemon-balm", "Lemon Balm", 14, "Citrusy scent, relieves stress and promotes sleep."),
      plant("hyacinth", "Hyacinth", 22, "Beautiful flowering plant known for its fragrance."),
    ],
  },
  {
    category: "Insect Repellent Plants",
    plants: [
      plant("oregano", "Oregano", 10, "Contains compounds that can deter certain insects."),
      plant("marigold", "Marigold", 8, "Natural insect repellent, also adds color to the garden."),
      plant("geraniums", "Geraniums", 20, "Known for their insect-repelling properties and pleasant scent."),
      plant("basil", "Basil", 9, "Repels flies and mosquitoes, also used in cooking."),
      plant("catnip", "Catnip", 13, "Repels mosquitoes and attracts cats."),
    ],
  },
  {
    category: "Medicinal Plants",
    plants: [
      plant("echinacea", "Echinacea", 16, "Boosts the immune system, helps fight colds."),
      plant("peppermint", "Peppermint", 13, "Relieves digestive issues and headaches."),
      plant("chamomile", "Chamomile", 15, "Soothes anxiety and promotes sleep."),
      plant("calendula", "Calendula", 12, "Heals wounds and soothes skin irritations."),
    ],
  },
  {
    category: "Low Maintenance Plants",
    plants: [
      plant("zz-plant", "ZZ Plant", 25, "Thrives in low light and requires minimal watering."),
      plant("pothos", "Pothos", 10, "Tolerates neglect and can grow in various conditions."),
      plant("cast-iron-plant", "Cast Iron Plant", 20, "Hardy plant that tolerates low light and neglect."),
      plant("succulents", "Succulents", 18, "Drought-tolerant plants with unique shapes and colors."),
      plant("aglaonema", "Aglaonema", 22, "Requires minimal care and adds color to indoor spaces."),
    ],
  },
];

export const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
