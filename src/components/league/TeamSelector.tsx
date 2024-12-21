import React from 'react';
import { useClubs } from '../../hooks/useClubs';
import { ErrorAlert } from '../ui/ErrorAlert';
import type { LeagueId } from '../../data/leagues';

interface TeamSelectorProps {
  selectedTeam: string | null;
  onTeamSelect: (teamId: string) => void;
  leagueId: LeagueId | null;
}

export function TeamSelector({ selectedTeam, onTeamSelect, leagueId }: TeamSelectorProps) {
  const { clubs, error } = useClubs(leagueId);

  return (
    <div className="mb-6">
      {error && <ErrorAlert message={error} />}
      
      <label htmlFor="team" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Selecciona un equipo
      </label>
      <select
        id="team"
        value={selectedTeam || ''}
        onChange={(e) => onTeamSelect(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm rounded-md"
        disabled={!leagueId}
      >
        <option value="">Selecciona un equipo...</option>
        {clubs.map((club) => (
          <option key={club} value={club}>
            {club}
          </option>
        ))}
      </select>
    </div>
  );
}