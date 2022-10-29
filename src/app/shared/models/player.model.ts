export class Player {
  playerId: string;
  name: string;
  dateJoined: Date | null;
  isTraitor: boolean;

  constructor(data: PlayerData) {
    this.playerId = data.playerId;
    this.name = data.name;
    this.dateJoined = !!data.dateJoined ? data.dateJoined : null;
    this.isTraitor = data.isTraitor;
  }
}

export interface PlayerData {
  playerId: string;
  name: string;
  dateJoined: Date;
  isTraitor: boolean;
}
