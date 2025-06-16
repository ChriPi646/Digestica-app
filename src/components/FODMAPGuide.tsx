import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface FODMAPGuideProps {
  onBack: () => void;
}

const FODMAPGuide: React.FC<FODMAPGuideProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Terug naar hoofdmenu</span>
          </button>
        </div>

        {/* Header/Cover */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white p-12 text-center rounded-2xl mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <span className="text-6xl mb-4 block">🌟</span>
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">FODMAP Gids</h1>
            <div className="text-2xl mb-6 text-white/95">Eindelijk begrip voor je buikklachten</div>
            
            <div className="bg-white/20 border-2 border-white/30 rounded-full p-6 max-w-md mx-auto backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-2 text-yellow-200">7 van de 10 mensen voelen zich beter!</h3>
              <p className="text-lg text-white/90">Met deze simpele aanpak</p>
            </div>
            
            <div className="mt-8 text-white/80">
              <div className="text-lg font-medium">Digestica - Begrijpelijke zorg voor iedereen</div>
              <div className="text-sm mt-2">Gemaakt op: {new Date().toLocaleDateString('nl-NL')}</div>
            </div>
          </div>
        </div>

        {/* Section 1: Waarom heb ik buikpijn? */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">🤔 Waarom heb ik buikpijn?</h1>
          
          <p className="text-lg mb-6 text-gray-700">
            Heb je vaak buikpijn, een opgeblazen gevoel, of problemen met je ontlasting? Dan ben je niet alleen. 
            <span className="bg-yellow-200 px-2 py-1 rounded font-semibold text-yellow-800 mx-1">Miljoenen mensen</span> 
            hebben dit.
          </p>
          
          <p className="text-lg mb-8 text-gray-700">
            De goede nieuws? Er is een eenvoudige manier om erachter te komen wat het veroorzaakt. Het heet het <strong>FODMAP dieet</strong>.
          </p>

          <div className="text-center my-8">
            <div className="text-6xl font-bold text-blue-600 mb-2">70-86%</div>
            <p className="text-xl text-green-600 font-semibold">van de mensen voelt zich beter met deze methode</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
              🎯 Wat kun je verwachten?
            </h4>
            <ul className="space-y-3 text-green-700">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">•</span>
                <span><strong>Minder buikpijn</strong> - Je buik doet minder vaak pijn</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">•</span>
                <span><strong>Minder opgeblazen</strong> - Je voelt je niet meer zo vol</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">•</span>
                <span><strong>Betere ontlasting</strong> - Niet meer te hard of te zacht</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">•</span>
                <span><strong>Meer energie</strong> - Je voelt je fitter</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">•</span>
                <span><strong>Beter slapen</strong> - Minder zorgen over je buik</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2: Wat zijn FODMAPs? */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">🧬 Wat zijn FODMAPs? (Simpel uitgelegd)</h1>
          
          <p className="text-lg mb-6 text-gray-700">
            FODMAP is een moeilijk woord voor bepaalde suikers in ons eten. Deze suikers kunnen bij sommige mensen buikpijn veroorzaken.
          </p>
          
          <p className="text-lg mb-8 text-gray-700">
            <strong>Denk er zo over:</strong> Net zoals sommige mensen geen melk kunnen drinken, kunnen sommige mensen bepaalde suikers niet goed verwerken.
          </p>

          <div className="text-center my-6 text-4xl">⬇️</div>

          <h2 className="text-2xl font-bold text-blue-600 mb-6 pl-4 border-l-4 border-blue-500">
            De 5 Soorten "Moeilijke Suikers"
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-6">
              <h3 className="text-xl font-bold text-red-700 mb-3">🍎 Fruitsuiker (te veel)</h3>
              <p className="mb-2"><strong>Zit in:</strong> Appels, peren, honing</p>
              <p className="mb-4"><strong>Probleem:</strong> Te veel fruitsuiker ineens</p>
              <div className="bg-red-100 p-3 rounded">
                <strong>💡 Simpel:</strong> Vervang appel door sinaasappel
              </div>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-6">
              <h3 className="text-xl font-bold text-orange-700 mb-3">🥛 Melksuiker</h3>
              <p className="mb-2"><strong>Zit in:</strong> Melk, yoghurt, zachte kaas</p>
              <p className="mb-4"><strong>Probleem:</strong> Je lichaam maakt niet genoeg enzym</p>
              <div className="bg-orange-100 p-3 rounded">
                <strong>💡 Simpel:</strong> Gebruik lactosevrije melk
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-700 mb-3">🌾 Graansuiker</h3>
              <p className="mb-2"><strong>Zit in:</strong> Tarwe, ui, knoflook</p>
              <p className="mb-4"><strong>Probleem:</strong> Mensen kunnen dit niet verteren</p>
              <div className="bg-yellow-100 p-3 rounded">
                <strong>💡 Simpel:</strong> Gebruik rijst in plaats van pasta
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-3">🫘 Bonensuiker</h3>
              <p className="mb-2"><strong>Zit in:</strong> Bonen, linzen, cashewnoten</p>
              <p className="mb-4"><strong>Probleem:</strong> Moeilijk verteerbaar</p>
              <div className="bg-green-100 p-3 rounded">
                <strong>💡 Simpel:</strong> Begin met kleine hoeveelheden
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h4 className="text-lg font-bold text-blue-800 mb-3">🤓 Even Duidelijk</h4>
            <p className="text-blue-700">
              Je hoeft dit niet allemaal te onthouden! Het belangrijkste is: <strong>sommige voedingsmiddelen kunnen buikpijn geven, andere niet</strong>. We gaan je leren welke dat zijn.
            </p>
          </div>
        </div>

        {/* Section 3: Het 3-Stappenplan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">🗓️ Het 3-Stappenplan (Heel Simpel)</h1>
          
          <p className="text-lg mb-6 text-gray-700">
            Het FODMAP dieet werkt in 3 stappen. Elke stap heeft een doel. <strong>Belangrijk:</strong> Doe dit samen met een diëtist!
          </p>

          <div className="text-center my-6 text-4xl">1️⃣ ➡️ 2️⃣ ➡️ 3️⃣</div>
          
          <div className="space-y-6">
            {/* Stap 1 */}
            <div className="bg-red-50 border-l-8 border-red-500 rounded-r-lg p-6 relative">
              <div className="absolute -top-3 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                STAP 1
              </div>
              <h3 className="text-xl font-bold text-red-700 mt-4 mb-4">Weglaten (2-6 weken)</h3>
              
              <p className="mb-4 text-red-800"><strong>Wat doe je?</strong> Je eet even geen moeilijke voedingsmiddelen.</p>
              
              <div className="bg-red-100 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-red-800 mb-3">🔄 Vervangen, niet hongeren!</h4>
                <ul className="space-y-2 text-red-700">
                  <li><strong>Appel</strong> → Banaan of sinaasappel</li>
                  <li><strong>Gewone melk</strong> → Lactosevrije melk</li>
                  <li><strong>Tarwebrood</strong> → Rijstbrood</li>
                  <li><strong>Ui</strong> → Bieslook</li>
                </ul>
              </div>
              
              <div className="bg-red-200 border border-red-400 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-2">⏰ Let Op!</h4>
                <p className="text-red-700">
                  <strong>Maximaal 6 weken!</strong> Langer is niet goed voor je. Als je je na 6 weken niet beter voelt, werkt dit dieet niet voor jou.
                </p>
              </div>
            </div>

            {/* Stap 2 */}
            <div className="bg-orange-50 border-l-8 border-orange-500 rounded-r-lg p-6 relative">
              <div className="absolute -top-3 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                STAP 2
              </div>
              <h3 className="text-xl font-bold text-orange-700 mt-4 mb-4">Uitproberen (6-8 weken)</h3>
              
              <p className="mb-4 text-orange-800"><strong>Wat doe je?</strong> Je probeert één voor één voedingsmiddelen terug. Zo ontdek je wat jij wel en niet kunt eten.</p>
              
              <div className="bg-orange-100 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-orange-800 mb-3">🧪 Hoe test je?</h4>
                <ol className="space-y-2 text-orange-700 list-decimal list-inside">
                  <li><strong>Week 1:</strong> Test mango (klein stukje → groter stukje → groot stukje)</li>
                  <li><strong>Week 2:</strong> Test melk (klein glaasje → groter glaasje)</li>
                  <li><strong>Week 3:</strong> Test pasta (klein bordje → groter bordje)</li>
                  <li>En zo verder...</li>
                </ol>
              </div>
              
              <p className="text-orange-800"><strong>Belangrijk:</strong> Test maar 1 ding per week. Schrijf op hoe je je voelt.</p>
            </div>

            {/* Stap 3 */}
            <div className="bg-green-50 border-l-8 border-green-500 rounded-r-lg p-6 relative">
              <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                STAP 3
              </div>
              <h3 className="text-xl font-bold text-green-700 mt-4 mb-4">Jouw Eigen Dieet (Voor Altijd)</h3>
              
              <p className="mb-4 text-green-800"><strong>Wat doe je?</strong> Je maakt jouw eigen dieet. Met de dingen die je wel kunt eten en zonder de dingen die buikpijn geven.</p>
              
              <div className="bg-green-100 p-4 rounded-lg mb-4">
                <h4 className="font-bold text-green-800 mb-3">🎯 Jouw Nieuwe Regels</h4>
                <ul className="space-y-2 text-green-700">
                  <li><strong>Geen problemen:</strong> Eet normaal</li>
                  <li><strong>Beetje problemen:</strong> Eet kleine stukjes</li>
                  <li><strong>Veel problemen:</strong> Beter niet eten</li>
                </ul>
              </div>
              
              <div className="bg-green-200 border border-green-400 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2">🔄 Belangrijk om te Weten</h4>
                <p className="text-green-700">
                  <strong>Blijf niet voor altijd streng!</strong> Het doel is om zoveel mogelijk te kunnen eten. Test om de paar maanden opnieuw of je dingen weer kunt verdragen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Wat kan ik wel en niet eten? */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">📝 Wat Kan Ik Wel en Niet Eten?</h1>
          
          <p className="text-lg mb-8 text-gray-700">
            Hier is een <strong>simpele lijst</strong> van wat meestal wel en niet kan. 
            <span className="bg-yellow-200 px-2 py-1 rounded font-semibold text-yellow-800 mx-1">Let op:</span> 
            De hoeveelheid is belangrijk!
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Wel eten */}
            <div className="bg-green-50 border-4 border-green-400 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
                ✅ Meestal Goed
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-green-700 bg-green-200 px-3 py-1 rounded mb-2">🍓 Fruit</h4>
                  <ul className="text-green-600 space-y-1 ml-4">
                    <li>• Banaan (1 stuk)</li>
                    <li>• Sinaasappel (1 stuk)</li>
                    <li>• Aardbeien (kleine bakje)</li>
                    <li>• Druiven (handjevol)</li>
                    <li>• Kiwi (2 stuks)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-green-700 bg-green-200 px-3 py-1 rounded mb-2">🥕 Groente</h4>
                  <ul className="text-green-600 space-y-1 ml-4">
                    <li>• Wortel</li>
                    <li>• Paprika</li>
                    <li>• Spinazie</li>
                    <li>• Tomaat</li>
                    <li>• Komkommer</li>
                    <li>• Aardappel</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-green-700 bg-green-200 px-3 py-1 rounded mb-2">🍞 Brood & Granen</h4>
                  <ul className="text-green-600 space-y-1 ml-4">
                    <li>• Rijst (alle soorten)</li>
                    <li>• Glutenvrij brood</li>
                    <li>• Haver (niet te veel)</li>
                    <li>• Rijstwafels</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-green-700 bg-green-200 px-3 py-1 rounded mb-2">🥛 Zuivel</h4>
                  <ul className="text-green-600 space-y-1 ml-4">
                    <li>• Lactosevrije melk</li>
                    <li>• Harde kazen</li>
                    <li>• Havermilk</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-green-700 bg-green-200 px-3 py-1 rounded mb-2">🥩 Eiwitten</h4>
                  <ul className="text-green-600 space-y-1 ml-4">
                    <li>• Vlees, vis, kip</li>
                    <li>• Eieren</li>
                    <li>• Amandelen (10 stuks)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Niet eten */}
            <div className="bg-red-50 border-4 border-red-400 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-red-700 mb-6 flex items-center">
                ❌ Beter Niet (in het begin)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-red-700 bg-red-200 px-3 py-1 rounded mb-2">🍎 Fruit</h4>
                  <ul className="text-red-600 space-y-1 ml-4">
                    <li>• Appel</li>
                    <li>• Peer</li>
                    <li>• Mango (groot stuk)</li>
                    <li>• Watermeloen</li>
                    <li>• Honing</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-red-700 bg-red-200 px-3 py-1 rounded mb-2">🧅 Groente</h4>
                  <ul className="text-red-600 space-y-1 ml-4">
                    <li>• Ui (alle soorten)</li>
                    <li>• Knoflook</li>
                    <li>• Champignons</li>
                    <li>• Avocado (groot stuk)</li>
                    <li>• Asperges</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-red-700 bg-red-200 px-3 py-1 rounded mb-2">🍞 Brood & Granen</h4>
                  <ul className="text-red-600 space-y-1 ml-4">
                    <li>• Gewoon brood</li>
                    <li>• Normale pasta</li>
                    <li>• Roggebrood</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-red-700 bg-red-200 px-3 py-1 rounded mb-2">🥛 Zuivel</h4>
                  <ul className="text-red-600 space-y-1 ml-4">
                    <li>• Gewone melk</li>
                    <li>• Yoghurt</li>
                    <li>• Zachte kazen</li>
                    <li>• Ijs</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-red-700 bg-red-200 px-3 py-1 rounded mb-2">🫘 Bonen & Noten</h4>
                  <ul className="text-red-600 space-y-1 ml-4">
                    <li>• Bruine bonen</li>
                    <li>• Linzen</li>
                    <li>• Cashewnoten</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">📱 Handige Hulp</h4>
              <p className="text-blue-700">
                <strong>Download de Monash FODMAP app</strong> (kost ongeveer €10). Dit is de officiële app die precies vertelt hoeveel je van iets mag eten.
              </p>
            </div>

            <div className="bg-red-50 border border-red-300 rounded-lg p-4">
              <h4 className="font-bold text-red-800 mb-2">⚠️ Let Op de Hoeveelheid!</h4>
              <ul className="text-red-700 space-y-1">
                <li><strong>Avocado:</strong> Klein stukje = OK, heel avocado = problemen</li>
                <li><strong>Amandelen:</strong> 10 stuks = OK, hele zak = problemen</li>
                <li><strong>Druiven:</strong> Handjevol = OK, hele tros = problemen</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Belangrijke Informatie</h3>
          <div className="text-sm text-gray-700 space-y-3">
            <p><strong>Deze gids is alleen voor informatie. Het vervangt geen medisch advies.</strong></p>
            
            <p>Het FODMAP dieet is een medische behandeling. Je hebt hulp nodig van:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Een dokter (huisarts of specialist)</li>
              <li>Een diëtist die het FODMAP dieet kent</li>
            </ul>
            
            <p><strong>Digestica en CentepedeX zijn niet verantwoordelijk als je dit dieet verkeerd doet.</strong></p>
            
            <p className="text-center font-bold text-gray-800">Praat altijd eerst met je dokter!</p>
            
            <div className="text-center pt-4 border-t border-gray-300 mt-4">
              <p className="font-semibold">© 2024 Digestica</p>
              <p>Begrijpelijke zorg voor iedereen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FODMAPGuide;