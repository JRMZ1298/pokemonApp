export interface Pokemon {
  height: number;
  id: number;
  moves: Move[];
  name: string;
  sprites: Sprites;
  types: Type[];
  weight: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  order: number | null;
  version_group: Species;
}

export interface Other {
  "official-artwork": OfficialArtwork;
}

export interface Sprites {
  other?: Other;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Type {
  slot: number;
  type: Species;
}
