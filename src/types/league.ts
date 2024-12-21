export interface League {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  leagueId: string;
}

export interface Player {
  license: string;
  name: string;
  gamesPlayed: number;
  winRate: number;
  points: number;
}

export interface LeagueStanding {
  position: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  setsFor: number;
  setsAgainst: number;
  coefficient: number;
  points: number;
}

export interface Match {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  matchNumber: string;
  score?: {
    home: number;
    away: number;
  };
}