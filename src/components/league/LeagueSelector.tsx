import React from 'react';
import { LEAGUES, type LeagueId } from '../../data/leagues';

interface LeagueSelectorProps {
  selectedLeague: LeagueId | null;
  onLeagueSelect: (leagueId: LeagueId) => void;
}

export function LeagueSelector({ selectedLeague, onLeagueSelect }: LeagueSelectorProps) {
  return (
    <div className="mb-6">
      <label htmlFor="league" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Selecciona una Liga
      </label>
      <select
        id="league"
        value={selectedLeague || ''}
        onChange={(e) => onLeagueSelect(e.target.value as LeagueId)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm rounded-md"
      >
        <option value="">Selecciona una liga...</option>
        {LEAGUES.map((league) => (
          <option key={league.id} value={league.id}>
            {league.name}
          </option>
        ))}
      </select>
    </div>
  );
}