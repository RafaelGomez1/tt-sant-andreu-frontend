import React from 'react';
import type { Match } from '../../../services/api/types';
import { TeamName } from './TeamName';
import { MatchScore } from './MatchScore';
import { getMatchRowColor } from '../../../utils/matchUtils';

interface MobileMatchListProps {
  matches: Match[];
  clubName: string;
}

export function MobileMatchList({ matches, clubName }: MobileMatchListProps) {
  return (
    <div className="block sm:hidden">
      {matches.map((match) => (
        <div 
          key={match.id} 
          className={`p-4 border-b ${getMatchRowColor(match)}`}
        >
          <div className="flex flex-col space-y-2">
            <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
              {match.dateTime}
            </div>
            <div className="grid grid-cols-3 items-center">
              <TeamName name={match.homeGame ? clubName : match.visitorClub} />
              <MatchScore match={match} />
              <TeamName name={match.homeGame ? match.visitorClub : clubName} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}