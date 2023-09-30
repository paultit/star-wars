export interface Film {
  episode_id: number;
  title: string;
  opening_crawl: string;
  producer: string;
  release_date: string; // Формат: dd.MM.yyy H:mm
  starships: Starship[];
  characters: Person[];
  planets: Planet[];
  url: string;
}

export interface Starship {
  name: string;
  starship_class: string;
  passengers: number;
  length: number;
  created: string; // Формат: dd.MM.yyy H:mm
}

export interface Person {
  name: string;
  gender: string;
  height: number;
  mass: number;
  created: string; // Формат: dd.MM.yyy H:mm
}

export interface Planet {
  name: string;
  climate: string;
  gravity: string;
  population: number;
  created: string; // Формат: dd.MM.yyy H:mm
}
