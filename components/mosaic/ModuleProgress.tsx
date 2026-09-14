
import React from 'react';
import { UserLevel } from '../../types';

interface ModuleProgressProps {
  currentModule: number;
  userLevel: number;
}

const getRoleName = (level: number) => {
  switch (level) {
    case UserLevel.EJEMPLOS_DE_VENTA: return 'Ejemplos de venta';
    case UserLevel.COLABORADOR: return 'Colaborador';
    case UserLevel.MOCOTA_SIN_REDACCION: return 'Delegado (Gestión)';
    case UserLevel.MOCOTA_CON_REDACCION: return 'Oficina Técnica';
    default: return 'General';
  }
};

const ModuleProgress = ({ currentModule, userLevel }: ModuleProgressProps) => {
  const roleName = getRoleName(userLevel);
  const stepsCount = 5;
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className="w-full mb-10 pb-6 border-b border-mosaic-white-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <span className="mosaic-label text-mosaic-black-300">
          Itinerario: <span className="text-mosaic-cyan">{roleName}</span>
        </span>
        <span className="mosaic-label text-mosaic-black-500">
          Paso {currentModule} de {stepsCount}
        </span>
      </div>

      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-mosaic-white-300" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-mosaic-cyan transition-all duration-500"
          style={{ width: `${((currentModule - 1) / (stepsCount - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step < currentModule;
          const isActive = step === currentModule;
          const label = userLevel !== UserLevel.EJEMPLOS_DE_VENTA && step === 5 ? 'Test' : `M${step}`;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 flex items-center justify-center text-xs mosaic-label transition-all ${
                  isActive
                    ? 'bg-mosaic-black-500 text-mosaic-white-100'
                    : isCompleted
                      ? 'bg-mosaic-cyan text-mosaic-white-100'
                      : 'bg-mosaic-white-200 text-mosaic-black-300 border border-mosaic-white-300'
                }`}
              >
                {isCompleted ? '✓' : label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleProgress;
