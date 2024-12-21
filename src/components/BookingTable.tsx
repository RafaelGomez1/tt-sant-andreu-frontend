import React from 'react';
import { UserPlus, UserMinus } from 'lucide-react';
import type { Agenda } from '../services/api/types';
import { isSlotFull } from '../utils/bookingUtils';
import { isPastAgenda } from '../utils/dateUtils';
import { PlayerBadge } from './ui/PlayerBadge';
import { StatusBadge } from './ui/StatusBadge';
import { translateDayOfWeek, translateMonth } from '../utils/translations';

interface BookingTableProps {
  agenda: Agenda;
  onAddBooking: (agendaId: string, hourId: string) => void;
  onDeleteBooking: (agendaId: string, hourId: string) => void;
}

export function BookingTable({ agenda, onAddBooking, onDeleteBooking }: BookingTableProps) {
  if (!agenda?.availableHours) {
    return null;
  }

  const formatTime = (hour: number) => hour.toString();
  const isDisabled = agenda.availableHours.length === 0;
  const isPast = isPastAgenda(agenda.day.number, agenda.month);

  const renderActionButtons = (hourId: string, isFull: boolean, playersCount: number) => {
    if (isPast) {
      return null;
    }

    return (
      <div className="flex space-x-2">
        <button
          onClick={() => onAddBooking(agenda.id, hourId)}
          disabled={isFull}
          className="inline-flex items-center p-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UserPlus className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDeleteBooking(agenda.id, hourId)}
          disabled={playersCount === 0}
          className="inline-flex items-center p-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UserMinus className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b dark:border-gray-700 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {translateDayOfWeek(agenda.day.dayOfWeek)} {agenda.day.number} {translateMonth(agenda.month)}
        </h2>
      </div>
      
      {isDisabled ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No hay horarios disponibles para este día
        </div>
      ) : (
        <>
          {/* Mobile view */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-3 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider text-center">
              <div>Horas</div>
              <div>Jugadores</div>
              {!isPast && <div>Acciones</div>}
            </div>
            {agenda.availableHours.map((hour) => {
              const startTime = formatTime(hour.from);
              const endTime = formatTime(hour.to);
              const isFull = isSlotFull(hour);

              return (
                <div key={hour.id} className="p-4 border-b dark:border-gray-700 last:border-b-0">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                      {startTime} - {endTime}
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      {hour.registeredPlayers?.map((player, index) => (
                        <PlayerBadge key={`${player.name}-${index}`} name={player.name} />
                      ))}
                    </div>
                    {!isPast && (
                      <div className="flex flex-col items-center space-y-2">
                        {renderActionButtons(hour.id, isFull, hour.registeredPlayers?.length || 0)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop view */}
          <div className="hidden sm:block">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Horas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Jugadores
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  {!isPast && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {agenda.availableHours.map((hour) => {
                  const startTime = formatTime(hour.from);
                  const endTime = formatTime(hour.to);
                  const isFull = isSlotFull(hour);

                  return (
                    <tr key={hour.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {startTime} - {endTime}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {hour.registeredPlayers?.map((player, index) => (
                            <PlayerBadge key={`${player.name}-${index}`} name={player.name} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={isFull ? 'full' : 'available'} />
                      </td>
                      {!isPast && (
                        <td className="px-6 py-4">
                          {renderActionButtons(hour.id, isFull, hour.registeredPlayers?.length || 0)}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}