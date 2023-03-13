import { Interpolation, SpringValue } from "@react-spring/web";

export enum CardAttribute {
  DARK = "DARK",
  DIVINE = "DIVINE",
  EARTH = "EARTH",
  FIRE = "FIRE",
  LIGHT = "LIGHT",
  WATER = "WATER",
  WIND = "WIND",
}

export enum CardType {
  SPELL_CARD = "Spell Card",
  TRAP_CARD = "Trap Card",
  SKILL_CARD = "Skill Card",
  EFFECT_MONSTER = "Effect Monster",
  TUNER_MONSTER = "Tuner Monster",
  LINK_MONSTER = "Link Monster",
  NORMAL_MONSTER = "Normal Monster",
  SYNCHRO_TUNER_MONSTER = "Synchro Tuner Monster",
  FUSION_MONSTER = "Fusion Monster",
  PENDULUM_NORMAL_MONSTER = "Pendulum Normal Monster",
  XYZ_MONSTER = "XYZ Monster",
  PENDULUM_EFFECT_MONSTER = "Pendulum Effect Monster",
  RITUAL_EFFECT_MONSTER = "Ritual Effect Monster",
  UNION_EFFECT_MONSTER = "Union Effect Monster",
  SYNCHRO_MONSTER = "Synchro Monster",
  FLIP_EFFECT_MONSTER = "Flip Effect Monster",
  GEMINI_MONSTER = "Gemini Monster",
  SPIRIT_MONSTER = "Spirit Monster",
  TOKEN = "Token",
  PENDULUM_EFFECT_FUSION_MONSTER = "Pendulum Effect Fusion Monster",
  RITUAL_MONSTER = "Ritual Monster",
  TOON_MONSTER = "Toon Monster",
  XYZ_PENDULUM_EFFECT_MONSTER = "XYZ Pendulum Effect Monster",
  NORMAL_TUNER_MONSTER = "Normal Tuner Monster",
  PENDULUM_TUNER_EFFECT_MONSTER = "Pendulum Tuner Effect Monster",
  SYNCHRO_PENDULUM_EFFECT_MONSTER = "Synchro Pendulum Effect Monster",
  PENDULUM_EFFECT_RITUAL_MONSTER = "Pendulum Effect Ritual Monster",
  PENDULUM_FLIP_EFFECT_MONSTER = "Pendulum Flip Effect Monster",
}

export enum CardFrameType {
  SPELL = "spell",
  TRAP = "trap",
  SKILL = "skill",
  EFFECT = "effect",
  LINK = "link",
  NORMAL = "normal",
  SYNCHRO = "synchro",
  FUSION = "fusion",
  NORMAL_PENDULUM = "normal_pendulum",
  XYZ = "xyz",
  EFFECT_PENDULUM = "effect_pendulum",
  RITUAL = "ritual",
  TOKEN = "token",
  FUSION_PENDULUM = "fusion_pendulum",
  XYZ_PENDULUM = "xyz_pendulum",
  SYNCHRO_PENDULUM = "synchro_pendulum",
  RITUAL_PENDULUM = "ritual_pendulum",
}

export enum CardRarity {
  SUPER_RARE = "Super Rare",
  SHORT_PRINT = "Short Print",
  SECRET_RARE = "Secret Rare",
  ULTRA_RARE = "Ultra Rare",
  COMMON = "Common",
  RARE = "Rare",
  PRISMATIC_SECRET_RARE = "Prismatic Secret Rare",
  DUEL_TERMINAL_NORMAL_PARALLEL_RARE = "Duel Terminal Normal Parallel Rare",
  GOLD_SECRET_RARE = "Gold Secret Rare",
  COLLECTOR_S_RARE = "Collector's Rare",
  DUEL_TERMINAL_RARE_PARALLEL_RARE = "Duel Terminal Rare Parallel Rare",
  DUEL_TERMINAL_SUPER_PARALLEL_RARE = "Duel Terminal Super Parallel Rare",
  ULTIMATE_RARE = "Ultimate Rare",
  STARFOIL_RARE = "Starfoil Rare",
  GOLD_RARE = "Gold Rare",
  PREMIUM_GOLD_RARE = "Premium Gold Rare",
  DUEL_TERMINAL_ULTRA_PARALLEL_RARE = "Duel Terminal Ultra Parallel Rare",
  GHOST_RARE = "Ghost Rare",
  MOSAIC_RARE = "Mosaic Rare",
  SUPER_SHORT_PRINT = "Super Short Print",
  SHATTERFOIL_RARE = "Shatterfoil Rare",
  PLATINIUM_RARE = "Platinum Rare",
  STARLIGHT_RARE = "Starlight Rare",
  EXTRA_SECRET_RARE = "Extra Secret Rare",
  PLATINIUM_SECRET_RARE = "Platinum Secret Rare",
  _10000_SECRET_RARE = "10000 Secret Rare",
  GHOST_GOLD_RARE = "Ghost/Gold Rare",
}

export enum CardRace {
  EQUIP = "Equip",
  NORMAL = "Normal",
  CONTINUOUS = "Continuous",
  DAVID = "David",
  QUICK_PLAY = "Quick-Play",
  FRIEND = "Friend",
  BEAST = "Beast",
  BEAST_WARRIOR = "Beast-Warrior",
  INSECT = "Insect",
  DRAGON = "Dragon",
  WARRIOR = "Warrior",
  FAIRY = "Fairy",
  REPTILE = "Reptile",
  FISH = "Fish",
  CYBERSE = "Cyberse",
  MACHINE = "Machine",
  PSYCHIC = "Psychic",
  PLANT = "Plant",
  ARKANA = "Arkana",
  AQUA = "Aqua",
  FIELD = "Field",
  SPELLCASTER = "Spellcaster",
  DINOSAUR = "Dinosaur",
  WINGED_BEAST = "Winged Beast",
  PYRO = "Pyro",
  THUNDER = "Thunder",
  WYRM = "Wyrm",
  ROCK = "Rock",
  ZOMBIE = "Zombie",
  COUNTER = "Counter",
  KAIBA = "Kaiba",
  RITUAL = "Ritual",
  CHAZZ_PRINCET = "Chazz Princeton",
  KEITH = "Keith",
  SEA_SERPENT = "Sea Serpent",
  ALEXIS_RHODES = "Alexis Rhodes",
  ISHIZU_ISHTAR = "Ishizu Ishtar",
  YAMI_YUGI = "Yami Yugi",
  ESPA_ROBA = "Espa Roba",
  JOEY = "Joey",
  AXEL_BRODIE = "Axel Brodie",
  SETO_KAIBA = "Seto Kaiba",
  EMMA = "Emma",
  YAMI_MARIK = "Yami Marik",
  JESSE_ANDERSO = "Jesse Anderso",
  ISHIZU = "Ishizu",
  YAMI_BAKURA = "Yami Bakura",
  YUBEL = "Yubel",
  ANDREW = "Andrew",
  PEGASUS = "Pegasus",
  BONZ = "Bonz",
  CHRISTINE = "Christine",
  DR_VELLIAN_C = "Dr. Vellian C",
  ODION = "Odion",
  MAI_VALENTINE = "Mai Valentine",
  ASTER_PHOENIX = "Aster Phoenix",
  CREATOR_GOD = "Creator-God",
  WEEVIL = "Weevil",
  TYRANNO_HASSL = "Tyranno Hassl",
  JOEY_WHEELER = "Joey Wheeler",
  REX = "Rex",
  DIVINE_BEAST = "Divine-Beast",
  JADEN_YUKI = "Jaden Yuki",
  MAKO = "Mako",
  BASTION_MISAW = "Bastion Misaw",
  LUMIS_AND_UMB = "Lumis and Umb",
  YUGI = "Yugi",
  SYRUS_TRUESDA = "Syrus Truesda",
  TEA_GARDNER = "Tea Gardner",
  MAI = "Mai",
  ZANE_TRUESDAL = "Zane Truesdal",
}

export interface CardProps {
  uniqueId: number;
  id: number;
  name: string;
  name_en: string;
  type: CardType;
  frameType: CardFrameType;
  archetype?: string;
  rarity: CardRarity;
  setCode: string;
  race: CardRace;
  attribute?: CardAttribute;
  level?: number;
  atk?: number;
  def?: number;
  image_large: string;
  image_small: string;
  canBeSelected?: boolean;
  canPop?: boolean;
  canBeDragged?: boolean;
  canBeRotated?: boolean;
}

export interface CardStaticStyles extends React.CSSProperties {
  "--seedx": number;
  "--seedy": number;
  "--cosmosbg": string;
}

export interface CardDynamicStyles extends React.CSSProperties {
  "--pointer-x": Interpolation<string, any>;
  "--pointer-y": Interpolation<string, any>;
  "--pointer-from-center": Interpolation<number, any>;
  "--pointer-from-top": Interpolation<number, any>;
  "--pointer-from-left": Interpolation<number, any>;
  "--card-opacity": SpringValue<number>;
  "--rotate-x": Interpolation<string, any>;
  "--rotate-y": Interpolation<string, any>;
  "--card-scale": SpringValue<number>;
  "--background-x": Interpolation<string, any>;
  "--background-y": Interpolation<string, any>;
  "--translate-x": Interpolation<string, any>;
  "--translate-y": Interpolation<string, any>;
}

export interface CardInteractPointerEvent<T> extends React.PointerEvent<T> {
  clientX: number;
  clientY: number;
}

export interface CardInteractTouchEvent<T> extends React.TouchEvent<T> {
  clientX: number;
  clientY: number;
}
