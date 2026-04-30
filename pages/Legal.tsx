
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Cookie, ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Legal = ({ type }: { type: 'privacy' | 'cookies' | 'legal' }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const content = {
    privacy: {
      title: 'Política de Privacidad',
      icon: <Shield className="w-12 h-12 text-brand-primary" />,
      text: (
        <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>
            Redescomerciales.ai para proteger los derechos individuales, especialmente en relación con el tratamiento automatizado y con la intención de ser transparente con el Usuario, ha establecido una política que incluye todos esos tratamientos, las finalidades perseguidas por los mismos, la legitimidad de los mismos y también los instrumentos disponibles para el Usuario para que pueda ejercer sus derechos.
          </p>
          <p>
            La navegación por este sitio web implica la aceptación total de las siguientes disposiciones y condiciones de uso. Se acepta el uso de cookies. Si no está de acuerdo, envíe un correo electrónico a info@redescomerciales.ai.
          </p>
          <p>
            La versión actualizada de esta política de privacidad es la única aplicable durante el tiempo que se utilice el sitio web, hasta que no exista otra versión que la reemplace.
          </p>
          <p>
            Para obtener información adicional sobre la protección de datos personales, le invitamos a consultar la página web de la AEPD (Agencia Española de Protección de Datos).
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Recopilación de datos</h3>
          <p>Sus datos son recopilados por el PROPIETARIO.</p>
          <p>
            Los datos personales son toda información relativa a una persona física identificada o identificable (persona afectada). Se entiende por persona identificable aquella que puede ser identificada, directa o indirectamente, especialmente mediante un nombre, un número de identificación (DNI, NIF, NIE, pasaporte) o uno o varios elementos específicos de su identidad física, fisiológica, genética, psíquica, económica, cultural o social.
          </p>
          <p>
            Los datos que generalmente se recopilarán son: nombre y apellidos, dirección, correo electrónico, número de teléfono, fecha de nacimiento y datos relacionados con el medio de pago. Se podrán recopilar otros tipos de datos y se informará al usuario.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">¿Con qué finalidad se tratan sus datos personales?</h3>
          <p>
            La finalidad del tratamiento de los datos personales que se puedan recabar es su uso principal por parte del TITULAR para la gestión de su relación con usted, para poder ofrecerle productos y servicios acordes a sus intereses, para mejorar su experiencia de usuario y, en su caso, para tramitar sus solicitudes, peticiones o pedidos. Se elaborará un perfil comercial basado en la información que usted proporcione. No se tomarán decisiones automatizadas basadas en este perfil.
          </p>
          <p>
            Los datos facilitados se conservarán mientras se mantenga la relación comercial, siempre que el interesado no solicite su supresión, o durante los años necesarios para cumplir con las obligaciones legales.
          </p>
          <p>
            Se registrarán en el archivo del cliente y su tratamiento se registrará en el registro de tratamientos que el TITULAR debe mantener (antes del 25 de mayo de 2018 también podía incluirse en el archivo elaborado con los datos personales registrados en la AEPD (Agencia Española de Protección de Datos) o en el organismo competente de la respectiva Comunidad Autónoma).
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">¿Cuál es la legitimidad del tratamiento de sus datos?</h3>
          <p>La base legal para el tratamiento de sus datos personales es:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>El interés legítimo del PROPIETARIO.</li>
            <li>El consentimiento del usuario o cliente para el tratamiento de sus datos.</li>
          </ul>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">¿A qué destinatarios se comunicarán los datos?</h3>
          <p>
            Los datos personales del Usuario podrán ser comunicados eventualmente a terceros relacionados con el PROPIETARIO por contrato para la realización de las tareas necesarias para la gestión de su cuenta como cliente y sin necesidad de que él o ella dé su autorización.
          </p>
          <p>
            También cuando fuera necesario comunicarse con las autoridades en caso de que el Usuario hubiera realizado acciones contrarias a la Ley o infringido el contenido del aviso legal.
          </p>
          <p>
            Los datos del Usuario podrán ser comunicados a otras empresas del grupo, en su caso, para fines administrativos internos que podrían implicar el tratamiento de dichos datos.
          </p>
          <p>
            Los datos personales del Usuario podrán ser transferidos a un tercer país o a una organización internacional, pero el Usuario deberá ser informado cuando se produzca dicha transferencia, así como de las condiciones de la misma y del destinatario.
          </p>
          <p>
            Cuando determinados datos sean obligatorios para acceder a funcionalidades específicas del sitio web, el PROPIETARIO indicará este carácter obligatorio en el momento de la recogida de los datos del Usuario.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Cookies</h3>
          <p>
            Al navegar por este sitio, las cookies del PROPIETARIO del sitio y/o de terceros pueden instalarse en su ordenador, tableta o teléfono móvil. Durante la primera navegación, aparecerá un banner informativo sobre el uso de cookies.
          </p>
          <p>
            Por lo tanto, al continuar la navegación, el Usuario se considerará informado y habrá aceptado el uso de dichas cookies. El consentimiento otorgado tendrá una validez de trece meses.
          </p>
          <p>Para obtener más información, consulte nuestra política de cookies.</p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Derechos de usuario</h3>
          <p>
            Se informa al usuario de la posibilidad de ejercer sus derechos de acceso, rectificación, cancelación y oposición. Asimismo, toda persona tiene derecho a la limitación del tratamiento de sus datos personales, derecho a la supresión de los datos personales transmitidos al responsable del tratamiento y derecho a la portabilidad de sus datos.
          </p>
          <p>
            El usuario tiene la posibilidad de presentar una reclamación ante la AEPD (Agencia Española de Protección de Datos) o el organismo competente de la respectiva Comunidad Autónoma, cuando no haya obtenido una solución satisfactoria en el ejercicio de sus derechos mediante comunicación escrita.
          </p>
          <p>
            Salvo que el Usuario se oponga, mediante el envío de un correo electrónico a la dirección info@redescomerciales.ai, sus datos podrán ser utilizados, en su caso, para enviarle información comercial de Redescomerciales.ai.
          </p>
          <p>
            Los datos facilitados se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales.
          </p>
          <p>
            El Usuario es responsable de que la información proporcionada a través de este sitio web sea veraz, respondiendo a la exactitud de todos los datos comunicados y la mantendrá actualizada para reflejar una situación real, siendo responsable de la información falsa o inexacta proporcionada y de los daños, inconvenientes y problemas que puedan causar Redescomerciales.ai o terceros.
          </p>
          <p>
            Esta información será almacenada y gestionada con la debida confidencialidad, aplicando las medidas de seguridad informática necesarias para evitar el acceso o el uso indebido de sus datos, su manipulación, deterioro o pérdida.
          </p>
          <p>
            Sin embargo, el Usuario debe tener en cuenta que la seguridad de los sistemas informáticos nunca es absoluta. Al proporcionar datos personales en línea, dicha información puede ser recopilada sin su consentimiento y procesada por terceros no autorizados.
          </p>
          <p>
            Redescomerciales.ai declina cualquier tipo de responsabilidad por las consecuencias que estos actos puedan tener para el Usuario, si este publicó la información voluntariamente.
          </p>
          <p>
            Podrá acceder y ejercer estos derechos mediante solicitud escrita y firmada que podrá enviarse a la dirección Avda Diagonal, 523, 1er 2. Barcelona, adjuntando una fotocopia del DNI o documento equivalente.
          </p>
          <p>
            La solicitud también puede enviarse al siguiente correo electrónico: info@redescomerciales.ai.
          </p>
          <p>
            Estos derechos serán atendidos en el plazo de un mes, que podrá prorrogarse a dos meses si la complejidad de la solicitud o el número de solicitudes recibidas así lo requieren. Todo ello sin perjuicio de la obligación de conservar determinados datos en los plazos legales y hasta que prescriban las posibles responsabilidades derivadas de un posible tratamiento o, en su caso, de una relación contractual.
          </p>
          <p>
            Además de lo anterior, y en relación con la normativa de protección de datos, los usuarios que lo soliciten tienen la posibilidad de organizar el destino de sus datos tras su fallecimiento.
          </p>
        </div>
      )
    },
    cookies: {
      title: 'Política de Cookies',
      icon: <Cookie className="w-12 h-12 text-brand-primary" />,
      text: (
        <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
          <h3 className="text-xl font-bold text-brand-dark dark:text-white">1. Uso de cookies</h3>
          <p>
            El sitio web www.redescomerciales.ai (el Sitio Web), propiedad de Redescomerciales.ai, utiliza cookies.
          </p>
          <p>
            Una cookie es un archivo que se descarga en tu ordenador al acceder a determinadas páginas web. Las cookies permiten a un sitio web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación del usuario o de su ordenador y, según la información que contengan y la forma en que utilice su ordenador, pueden utilizarse para reconocer al usuario. Además, mejoran la experiencia de navegación, ya que permiten al sitio web ofrecer al usuario información que pueda ser de su interés en función del uso que haga del contenido del sitio web.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">2. Consentimiento</h3>
          <p>
            Las cookies que utilizamos no almacenan ningún dato personal ni ningún tipo de información que pueda identificarle, a menos que desee registrarse voluntariamente para utilizar los servicios que ponemos a su disposición o para recibir información sobre promociones y contenido de su interés.
          </p>
          <p>Al navegar por primera vez, aparecerá un banner que explica el uso de cookies.</p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">3. Tipos y finalidad de las cookies</h3>
          <p>Las cookies, según su permanencia, se pueden clasificar de la siguiente manera:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cookies de sesión:</strong> caducan cuando el usuario cierra el navegador.</li>
            <li><strong>Cookies persistentes:</strong> caducan cuando se cumple la finalidad para la que se utilizan (por ejemplo, para que el usuario permanezca identificado en el sitio web y sus servicios o cuando se eliminan manualmente).</li>
          </ul>
          <p>En nuestro sitio web utilizamos diferentes tipos de cookies para mejorar la experiencia de nuestros usuarios.</p>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Cookies necesarias:</strong> son imprescindibles para habilitar las funciones básicas de este sitio, como el inicio de sesión seguro o la gestión de sus preferencias de consentimiento. Estas cookies no almacenan ningún dato que permita identificarle personalmente.</li>
            <li><strong>Cookies funcionales:</strong> ayudan a realizar ciertas funciones, como compartir el contenido del sitio web en plataformas de redes sociales, recopilar comentarios y otras funciones de terceros.</li>
            <li><strong>Cookies analíticas:</strong> se utilizan para comprender cómo interactúan los visitantes con el sitio web. Estas cookies ayudan a proporcionar información sobre métricas como el número de visitantes, la tasa de rebote, la fuente de tráfico, etc.</li>
            <li><strong>Cookies publicitarias:</strong> se utilizan para ofrecer a los visitantes anuncios personalizados basados en las páginas que han visitado anteriormente y para analizar la eficacia de las campañas publicitarias.</li>
          </ul>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">4. Cómo bloquear o eliminar las cookies instaladas</h3>
          <p>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu ordenador configurando las opciones de tu navegador. Encontrarás información sobre cómo hacerlo, en relación con los navegadores más comunes, en los siguientes enlaces:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><a href="http://support.google.com/chrome/bin/answer.py?hl=es&answer=95647" className="text-brand-primary hover:underline">Chrome</a></li>
            <li><a href="http://support.apple.com/kb/ph5042" className="text-brand-primary hover:underline">Safari</a></li>
            <li><a href="http://windows.microsoft.com/es-es/windows7/how-to-manage-cookies-in-internet-explorer-9" className="text-brand-primary hover:underline">Explorer</a></li>
            <li><a href="http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we" className="text-brand-primary hover:underline">Firefox</a></li>
          </ul>
          <p>Todo lo relacionado con las cookies de Google, tanto analíticas como publicitarias, así como su gestión y configuración, puede consultarse en:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><a href="https://www.google.es/intl/es/policies/technologies/types/" className="text-brand-primary hover:underline">Tipos de cookies de Google</a></li>
            <li><a href="https://www.google.es/policies/technologies/ads/" className="text-brand-primary hover:underline">Publicidad de Google</a></li>
            <li><a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" className="text-brand-primary hover:underline">Uso de cookies de Google Analytics</a></li>
          </ul>
          <p>
            Sin embargo, le informamos de la posibilidad de que la desactivación de una cookie pueda impedir o dificultar la navegación o la prestación de los servicios ofrecidos en el sitio web.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">5. Modificaciones</h3>
          <p>
            Las cookies de este sitio web o esta política pueden actualizarse, por lo que le recomendamos que las revise periódicamente.
          </p>
        </div>
      )
    },
    legal: {
      title: 'Aviso Legal',
      icon: <FileText className="w-12 h-12 text-brand-primary" />,
      text: (
        <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
          <h3 className="text-xl font-bold text-brand-dark dark:text-white">Datos de identificación</h3>
          <p>
            1. Usted está visitando el sitio web redescomerciales.ai propiedad de Redescomerciales.ai, con domicilio social en Avda Diagonal, 523, 1er 2. Barcelona, inscrita en el Registro Mercantil de Barcelona en el tomo 47545, hoja 116, página 555162, (que en dicho documento se denomina &lt;&lt; Redescomerciales.ai&gt;&gt;).
          </p>
          <p>Esta actividad no está sujeta a ningún régimen de autorización administrativa previa.</p>
          <p>Puede ponerse en contacto con Redescomerciales.ai por cualquiera de los siguientes medios:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Teléfono: +34 623 140 545.</li>
            <li>Correo electrónico de contacto: info@redescomerciales.ai.</li>
          </ul>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Alojamiento web</h3>
          <p>Webempresa Europa SL</p>
          <p>Calle Almagro, 11, Madrid, 28010, Madrid.</p>
          <p>Teléfono: 910912834.</p>
          <p>Correo electrónico de contacto: comercial@webempresa.com.</p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Usuarios</h3>
          <p>
            2. Estas condiciones (en adelante, Aviso Legal) tienen por objeto regular el uso del sitio web de Redescomerciales.ai que pone a disposición del público.
          </p>
          <p>
            El acceso y/o uso de este sitio web de Redescomerciales.ai le atribuye la condición de USUARIO, quien acepta, desde dicho acceso y/o uso, las condiciones generales de uso aquí reflejadas. Estas condiciones serán aplicables independientemente de las condiciones generales de contratación que pudieran ser obligatorias.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Utilizando el portal</h3>
          <p>
            3. redescomerciales.ai proporciona acceso a multitud de información, servicios, programas o datos (en adelante, “los contenidos”) en Internet pertenecientes a Redescomerciales.ai o a sus licenciantes a los que el USUARIO puede tener acceso.
          </p>
          <p>
            El USUARIO asume la responsabilidad del uso del sitio web de Redescomerciales.ai. Esta responsabilidad se extiende al registro necesario para acceder a determinados servicios o contenidos. En dicho registro, el USUARIO deberá proporcionar información veraz y lícita. Como resultado de este registro, se le podrá asignar una contraseña, de la cual será responsable, comprometiéndose a hacer un uso diligente y confidencial de la misma.
          </p>
          <p>
            El USUARIO se compromete a hacer un uso adecuado de los contenidos y servicios (por ejemplo, servicios de chat, foros de discusión o grupos de noticias) que Redescomerciales.ai ofrece a través de su sitio Redescomerciales.ai y (incluyendo, pero sin limitarse a) no utilizarlos para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Participar en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público.</li>
            <li>Difundir contenido o propaganda de carácter racista, xenófobo, pornográfico ilegal, que promueva el terrorismo o viole los derechos humanos.</li>
            <li>Causar daños a los sistemas físicos y lógicos de Redescomerciales.ai, sus proveedores o terceros, introducir o propagar virus informáticos o cualquier otro sistema físico o lógico que pueda causar los daños mencionados.</li>
            <li>Intentar acceder y, cuando proceda, utilizar las cuentas de correo electrónico de otros usuarios y modificar o manipular sus mensajes.</li>
            <li>No utilice el sitio web ni la información contenida en él con fines comerciales, políticos, publicitarios ni para ningún otro uso comercial, especialmente para el envío de correos electrónicos no solicitados.</li>
          </ul>
          <p>
            Redescomerciales.ai se reserva el derecho de retirar todos los comentarios y contribuciones que atenten contra la dignidad de la persona, que sean discriminatorios, xenófobos, racistas, pornográficos, que amenacen a menores, el orden público o la seguridad pública, o que, a su juicio, no sean adecuados para su publicación. En ningún caso, Redescomerciales.ai se responsabilizará de las opiniones expresadas por los usuarios a través de foros, chats u otras herramientas de participación.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Protección de datos</h3>
          <p>4. Todo lo relacionado con la política de protección de datos está contenido en el documento de política de privacidad.</p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Contenido. Propiedad intelectual e industrial</h3>
          <p>
            5. Redescomerciales.ai es titular de todos los derechos de propiedad intelectual e industrial de su sitio web, así como de los elementos contenidos en el mismo (a título enunciativo: imágenes, fotografías, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales utilizados, programas informáticos necesarios para su funcionamiento, acceso y uso, etc.), propiedad de Redescomerciales.ai o de sus licenciantes.
          </p>
          <p>
            Todos los derechos reservados. De conformidad con lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, queda expresamente prohibida la reproducción, distribución y comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de este sitio web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Redescomerciales.ai.
          </p>
          <p>
            El USUARIO se compromete a respetar los derechos de propiedad intelectual e industrial de Redescomerciales.ai. Podrá visualizar los elementos del sitio web de Redescomerciales.ai e incluso imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en cualquier otro soporte físico, siempre que sea única y exclusivamente para su uso personal y privado. El USUARIO no podrá suprimir, alterar, eludir ni manipular ningún dispositivo de protección o sistema de seguridad instalado en las páginas de Redescomerciales.ai.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Exclusión de garantías y responsabilidad</h3>
          <p>
            6. El USUARIO reconoce que el uso del sitio web, sus contenidos y servicios se realiza bajo su exclusiva responsabilidad. En concreto, a título enunciativo, Redescomerciales.ai no asume ninguna responsabilidad en los siguientes ámbitos:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>a) La disponibilidad en el funcionamiento del sitio web, sus servicios y contenidos y su calidad o interoperabilidad.</li>
            <li>b) La finalidad para la que el sitio web sirve a los objetivos del USUARIO.</li>
            <li>c) La infracción de la legislación vigente por parte del USUARIO o de terceros y, específicamente, de los derechos de propiedad intelectual o industrial que sean propiedad de otras personas o entidades.</li>
            <li>d) La existencia de códigos maliciosos o cualquier otro elemento informático dañino que pudiera causar daños al sistema informático del USUARIO o de terceros. Es responsabilidad del USUARIO, en todo caso, disponer de las herramientas adecuadas para la detección y desinfección de dichos elementos.</li>
            <li>e) El acceso fraudulento a los contenidos o servicios por parte de terceros no autorizados o, en su caso, la captura, eliminación, alteración, modificación o manipulación de mensajes y comunicaciones de cualquier tipo que dichos terceros puedan realizar.</li>
            <li>f) La exactitud, veracidad, actualidad y utilidad de los contenidos y servicios ofrecidos y el uso posterior que el USUARIO haga de ellos. Redescomerciales.ai empleará todos los medios y esfuerzos razonables para proporcionar información actualizada y fiable.</li>
            <li>g) Daños causados a los equipos informáticos durante el acceso al sitio web y daños causados a los USUARIOS cuando tengan su origen en fallas o desconexiones en las redes de telecomunicaciones que interrumpan el servicio.</li>
            <li>h) Daños derivados de circunstancias resultantes de un caso fortuito o de fuerza mayor.</li>
          </ul>
          <p>
            En caso de que existan foros, al utilizarlos o espacios similares, se debe tener en cuenta que los mensajes reflejan únicamente la opinión del USUARIO que los envía, quien es el único responsable. Redescomerciales.ai no se responsabiliza del contenido de los mensajes enviados por el USUARIO.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Modificación de este aviso legal y duración</h3>
          <p>
            7. Redescomerciales.ai se reserva el derecho de realizar sin previo aviso las modificaciones que considere oportunas en el sitio web de Redescomerciales.ai, pudiendo cambiar, eliminar o añadir tanto los contenidos y servicios prestados a través del mismo como la forma en que se presentan o se ubican en el sitio web de Redescomerciales.ai.
          </p>
          <p>
            La validez de las condiciones antes mencionadas dependerá de su publicación y estarán vigentes hasta que sean modificadas por otras debidamente publicadas.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Enlaces</h3>
          <p>
            8. En caso de que redescomerciales.ai incluya enlaces o hipervínculos a otros sitios web, Redescomerciales.ai no ejercerá ningún tipo de control sobre dichos sitios ni sus contenidos. En ningún caso Redescomerciales.ai asumirá responsabilidad alguna por el contenido de los enlaces a sitios web de terceros, ni garantizará la disponibilidad técnica, la calidad, la fiabilidad, la exactitud, la amplitud, la veracidad, la validez ni la constitucionalidad de ningún material o información contenida en dichos hipervínculos u otros sitios web. Asimismo, la inclusión de estas conexiones externas no implicará ningún tipo de asociación, fusión ni participación con las entidades enlazadas.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Derecho de exclusión</h3>
          <p>
            9. Redescomerciales.ai se reserva el derecho de denegar o retirar el acceso al sitio web de Redescomerciales.ai y/o a los servicios ofrecidos sin previo aviso, a petición propia o de un tercero, a aquellos usuarios que no cumplan con el contenido de este aviso legal.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">General</h3>
          <p>
            10. Redescomerciales.ai perseguirá el incumplimiento de estas condiciones, así como cualquier uso indebido del sitio web de Redescomerciales.ai, ejerciendo todas las acciones civiles y penales que le correspondan por ley.
          </p>

          <h3 className="text-xl font-bold text-brand-dark dark:text-white mt-8">Ley aplicable y jurisdicción</h3>
          <p>
            11. La relación entre Redescomerciales.ai y el USUARIO se regirá por la normativa española vigente. Todas las controversias y reclamaciones derivadas de este aviso legal serán resueltas por los juzgados y tribunales competentes.
          </p>
          <p className="text-sm italic mt-8">
            Esta política de cookies se actualizó el 24 de diciembre de 2021 para adaptarse al Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD).
          </p>
        </div>
      )
    }
  };

  const activeContent = content[type];

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark-bg pt-24 pb-20 transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-brand-primary hover:gap-3 transition-all mb-8 font-bold"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver al inicio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-brand-dark-card rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-white/5 shadow-xl"
        >
          <div className="flex flex-col items-center text-center mb-12">
            <div className="mb-6 p-4 bg-white dark:bg-white/5 rounded-2xl shadow-sm">
              {activeContent.icon}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-brand-dark dark:text-white">
              {activeContent.title}
            </h1>
          </div>

          <div className="prose prose-brand max-w-none">
            {activeContent.text}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Legal;
