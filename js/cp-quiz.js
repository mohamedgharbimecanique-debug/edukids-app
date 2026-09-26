// Lecture française des activités CP.
(function(){
  const exemples={BA:'bateau',BE:'bébé',BI:'bicyclette',BO:'ballon',BU:'bureau',PA:'papa',PE:'petit',PI:'pirate',PO:'pomme',PU:'pull',MA:'maman',ME:'melon',MI:'minute',MO:'moto',MU:'musique'};
  window.lireSyllabe=function(syllabe){
    if(!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const mot=exemples[syllabe.toUpperCase()];
    const u=new SpeechSynthesisUtterance(`${syllabe} comme ${mot}`);
    u.lang='fr-FR'; u.rate=.7; u.pitch=1;
    const voix=window.speechSynthesis.getVoices().find(v=>v.lang&&v.lang.toLowerCase().startsWith('fr'));
    if(voix)u.voice=voix;
    window.speechSynthesis.speak(u);
  };
})();