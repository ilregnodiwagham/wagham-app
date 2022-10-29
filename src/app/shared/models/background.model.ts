export class Background {
  name: string;
  race: string;
  link: string;

  constructor(data: BackgroundData) {
    this.name = data.name;
    this.race = data.race;
    this.link = data.link;
  }

}

export interface BackgroundData {
  name: string;
  race: string;
  link: string;
}
