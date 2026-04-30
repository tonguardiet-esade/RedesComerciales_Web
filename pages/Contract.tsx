
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Contract = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState("");
  const [signing, setSigning] = useState(false);

  if (!user) return null;

  const handleSign = async () => {
    if (!agreed || !signature.trim()) return;
    
    setSigning(true);
    // Simular proceso de firma
    await new Promise(resolve => setTimeout(resolve, 1500));

    updateUser({ contract_signed: true });
    setSigning(false);
    navigate('/portal');
  };

  const currentDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 transition-colors">
      <div className="bg-white dark:bg-brand-dark-card rounded-xl shadow-lg border border-gray-200 dark:border-white/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-brand-dark dark:bg-black/40 p-6 text-white text-center">
            <h1 className="text-2xl font-bold">Convenio de Colaboración - Ejemplos de venta</h1>
            <p className="text-brand-secondary dark:text-brand-primary text-sm mt-1">Redescomerciales.ai Ecosystem</p>
        </div>

        {/* Contract Content */}
        <div className="p-8 md:p-12 h-96 overflow-y-auto bg-gray-50 dark:bg-brand-dark-bg border-b border-gray-200 dark:border-white/5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
            <p className="mb-4"><strong>REUNIDOS</strong></p>
            <p className="mb-4">
                De una parte, FUNDSWIN S.L., con domicilio social en [Dirección Fiscal], en adelante "LA EMPRESA".<br/>
                Y de otra, <strong>{user.nombre}</strong>, con email {user.email}, en adelante "EL EJEMPLOS DE VENTA".
            </p>

            <p className="mb-4"><strong>EXPONEN</strong></p>
            <p className="mb-4">
                Que LA EMPRESA dispone de una plataforma tecnológica para la gestión de ayudas públicas.<br/>
                Que EL EJEMPLOS DE VENTA está interesado en referenciar potenciales clientes a LA EMPRESA.
            </p>

            <p className="mb-4"><strong>ACUERDAN</strong></p>
            <ol className="list-decimal ml-6 space-y-4 mb-6">
                <li>
                    <strong>OBJETO:</strong> El presente convenio regula la colaboración comercial donde el Ejemplos de venta referenciará contactos (Leads) a través de la plataforma.<br/>
                    éxito con LA EMPRESA.
                </li>
                <li>
                    <strong>NO EXCLUSIVIDAD:</strong> Esta colaboración no implica exclusividad ni relación laboral alguna.
                </li>
                <li>
                    <strong>CONFIDENCIALIDAD:</strong> Ambas partes se comprometen a mantener el secreto de la información comercial compartida.
                </li>
                <li>
                    <strong>DURACIÓN:</strong> El contrato tiene una duración indefinida, pudiendo resolverse por cualquiera de las partes con un preaviso de 15 días.
                </li>
                <li>
                    <strong>COMISIÓN INICIAL DEL EJEMPLOS DE VENTA:</strong> El Ejemplos de venta percibirá una comisión inicial en la que obtendrá el 50% de la primera suscripcion o cuota mensual que genere. Esta primera cuota que recibira de manera neta estará comprendida a partir 200 €, dependiendo del tipo de colaboración acordada y del volumen o características de los clientes referidos. El importe exacto será definido de mutuo acuerdo entre las partes antes del inicio de la colaboración. Esta comisión se abonará una única vez durante el primer mes y será independiente de las comisiones posteriores que puedan generarse por resultados o ventas efectivas.
                </li>
            </ol>
            
            <p className="text-right mt-8">
                En Madrid, a {currentDate}.
            </p>
        </div>

        {/* Signing Area */}
        <div className="p-8 bg-white dark:bg-brand-dark-card">
            <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-4">Firma Digital</h3>
            
            <label className="flex items-center gap-3 mb-6 p-4 border border-gray-100 dark:border-white/5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                <input 
                    type="checkbox" 
                    className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">He leído y acepto los términos y condiciones del Convenio de Colaboración.</span>
            </label>

            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Escribe tu nombre completo para firmar
                </label>
                <input 
                    type="text"
                    placeholder="Escribe tu nombre aquí..."
                    className="w-full p-4 border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-bg rounded-xl font-handwriting text-2xl text-brand-dark dark:text-white focus:border-brand-primary focus:outline-none"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    style={{ fontFamily: 'cursive' }} 
                />
            </div>

            <div className="flex justify-end gap-4">
                <button 
                    onClick={() => navigate('/portal')}
                    className="px-6 py-3 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-white/10"
                >
                    Cancelar
                </button>
                <button 
                    onClick={handleSign}
                    disabled={!agreed || !signature.trim() || signing}
                    className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {signing ? (
                        <>Fimando...</>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Firmar Convenio
                        </>
                    )}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Contract;
