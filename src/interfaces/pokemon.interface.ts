export interface Pokemon {
  height: number;
  id: number;
  moves: Move[];
  name: string;
  sprites: Sprites;
  types: Type[];
  weight: number;
  movesDetails: MoveDetails[];
}

interface FinalInfo {
  name: string;
  url: string;
}

interface Move {
  move: FinalInfo;
}

interface Other {
  "official-artwork": OfficialArtwork;
}

interface Sprites {
  other?: Other;
}

interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

interface Type {
  slot: number;
  type: FinalInfo;
}

export interface MoveDetails {
  id: number;
  names: Name[];
  power: number;
  pp: number;
  accuracy: number;
  damage_class: FinalInfo;
  priority: number;
  target: FinalInfo;
  type: FinalInfo;
}

interface Name {
  language: FinalInfo;
  name: string;
}
