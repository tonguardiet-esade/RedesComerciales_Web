
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AppPage, BackToPortal } from '../components/mosaic/AppShell';
import MosaicButton from '../components/mosaic/MosaicButton';

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
    await new Promise(resolve => setTimeout(resolve, 1500));

    updateUser({ contract_signed: true });
    setSigning(false);
    navigate('/portal');
  };

  const currentDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <AppPage maxWidth="4xl">
      <BackToPortal />

      <div className="border border-mosaic-white-300 bg-mosaic-white-100 overflow-hidden">
        <div className="bg-mosaic-black-500 p-6 text-mosaic-white-100 text-center">
          <h1 className="mosaic-h4 text-mosaic-white-100">Convenio de Colaboración — Ejemplos de venta</h1>
          <p className="mosaic-label text-mosaic-cyan mt-2">Redescomerciales.ai Ecosystem</p>
        </div>

        <div className="p-8 md:p-12 h-96 overflow-y-auto bg-mosaic-white-200 border-b border-mosaic-white-300 text-sm text-mosaic-black-400 leading-relaxed">
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
              <strong>OBJETO:</strong> El presente convenio regula la colaboración comercial donde el Ejemplos de venta referenciará contactos (Leads) a través de la plataforma.
              éxito con LA EMPRESA.
            </li>
            <li><strong>NO EXCLUSIVIDAD:</strong> Esta colaboración no implica exclusividad ni relación laboral alguna.</li>
            <li><strong>CONFIDENCIALIDAD:</strong> Ambas partes se comprometen a mantener el secreto de la información comercial compartida.</li>
            <li><strong>DURACIÓN:</strong> El contrato tiene una duración indefinida, pudiendo resolverse por cualquiera de las partes con un preaviso de 15 días.</li>
            <li>
              <strong>COMISIÓN INICIAL DEL EJEMPLOS DE VENTA:</strong> El Ejemplos de venta percibirá una comisión inicial en la que obtendrá el 50% de la primera suscripcion o cuota mensual que genere. Esta primera cuota que recibira de manera neta estará comprendida a partir 200 €, dependiendo del tipo de colaboración acordada y del volumen o características de los clientes referidos. El importe exacto será definido de mutuo acuerdo entre las partes antes del inicio de la colaboración. Esta comisión se abonará una única vez durante el primer mes y será independiente de las comisiones posteriores que puedan generarse por resultados o ventas efectivas.
            </li>
          </ol>

          <p className="text-right mt-8">En Madrid, a {currentDate}.</p>
        </div>

        <div className="p-8">
          <h3 className="mosaic-h4 mb-6">Firma digital</h3>

          <label className="flex items-start gap-3 mb-6 p-4 border border-mosaic-white-300 hover:border-mosaic-cyan cursor-pointer transition-colors">
            <input
              type="checkbox"
              className="w-4 h-4 mt-0.5 accent-mosaic-cyan"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="mosaic-body text-sm">He leído y acepto los términos y condiciones del Convenio de Colaboración.</span>
          </label>

          <div className="mb-6">
            <label className="mosaic-label text-mosaic-black-300 block mb-2">
              Escribe tu nombre completo para firmar
            </label>
            <input
              type="text"
              placeholder="Escribe tu nombre aquí..."
              className="app-input text-2xl"
              style={{ fontFamily: 'cursive' }}
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-end gap-4">
            <MosaicButton fullWidth={false} variant="secondary" className="px-6" onClick={() => navigate('/portal')}>
              Cancelar
            </MosaicButton>
            <MosaicButton
              fullWidth={false}
              className="px-8"
              onClick={handleSign}
              disabled={!agreed || !signature.trim() || signing}
            >
              {signing ? 'Firmando...' : 'Firmar convenio'}
            </MosaicButton>
          </div>
        </div>
      </div>
    </AppPage>
  );
};

export default Contract;
