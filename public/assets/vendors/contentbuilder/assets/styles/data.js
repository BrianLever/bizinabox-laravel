﻿var jsonStyles = {
  data: {
    categories: [
      /*{ "id": 0, "desc": "Default" },*/
      { id: -1, desc: 'ALL' },
      { id: 1, desc: 'Sans-serif & Sans-serif' },
      { id: 2, desc: 'Serif & Serif' },
      { id: 3, desc: 'Sans-serif & Serif' },
      { id: 4, desc: 'Serif & Sans-serif' },
      { id: 5, desc: 'Monospace & Monospace' },
      { id: 6, desc: 'Monospace & Sans-serif' },
      { id: 7, desc: 'Sans-serif & Monospace' },
      { id: 8, desc: 'Display & Sans-serif' },
      { id: 9, desc: 'Handwriting & Sans-serif' },
      { id: 10, desc: 'Display & Serif' },
      { id: 11, desc: 'Handwriting & Serif' },
      { id: 12, desc: 'Display & Monospace' },
      { id: 13, desc: 'Handwriting & Monospace' },
      { id: 14, desc: 'Display & Display' }
    ],
    styles: [
      {
        css: 'basetype-amaticsc-josepfinsans.css',
        sectioncss: 'type-amaticsc-josepfinsans.css',
        classname: 'type-amaticsc-josepfinsans',
        img: 'type-amaticsc-josepfinsans.jpg',
        category: 9,
        default: true,
        caption: 'Amatic SC & Josefin Sans'
      },
      {
        css: 'basetype-sourcesanspro-anonymouspro.css',
        sectioncss: 'type-sourcesanspro-anonymouspro.css',
        classname: 'type-sourcesanspro-anonymouspro',
        img: 'type-sourcesanspro-anonymouspro.jpg',
        category: 7,
        default: true,
        caption: 'Source Sans Pro & Anonymous Pro'
      },
      {
        css: 'basetype-poppins-oldstandardtt.css',
        sectioncss: 'type-poppins-oldstandardtt.css',
        classname: 'type-poppins-oldstandardtt',
        img: 'type-poppins-oldstandardtt.jpg',
        category: 3,
        default: true,
        caption: 'Poppins & Old Standard TT'
      },
      {
        css: 'basetype-spectralsc-karma.css',
        sectioncss: 'type-spectralsc-karma.css',
        classname: 'type-spectralsc-karma',
        img: 'type-spectralsc-karma.jpg',
        category: 2,
        default: true,
        caption: 'Spectral SC & Karma'
      },
      {
        css: 'basetype-yesteryear-chivo.css',
        sectioncss: 'type-yesteryear-chivo.css',
        classname: 'type-yesteryear-chivo',
        img: 'type-yesteryear-chivo.jpg',
        category: 9,
        default: true,
        caption: 'Yesteryear & Chivo'
      },
      {
        css: 'basetype-alegreyasanssc-hind.css',
        sectioncss: 'type-alegreyasanssc-hind.css',
        classname: 'type-alegreyasanssc-hind',
        img: 'type-alegreyasanssc-hind.jpg',
        category: 1,
        default: true,
        caption: 'Alegreya Sans SC & Hind'
      },
      {
        css: 'basetype-cabinsketch-montserrat.css',
        sectioncss: 'type-cabinsketch-montserrat.css',
        classname: 'type-cabinsketch-montserrat',
        img: 'type-cabinsketch-montserrat.jpg',
        category: 8,
        default: true,
        caption: 'Cabin Sketch & Montserrat'
      },
      {
        css: 'basetype-ptserif-poppins.css',
        sectioncss: 'type-ptserif-poppins.css',
        classname: 'type-ptserif-poppins',
        img: 'type-ptserif-poppins.jpg',
        category: 4,
        default: true,
        caption: 'PT Serif & Poppins'
      },
      {
        css: 'basetype-kellyslab-yantramanav.css',
        sectioncss: 'type-kellyslab-yantramanav.css',
        classname: 'type-kellyslab-yantramanav',
        img: 'type-kellyslab-yantramanav.jpg',
        category: 8,
        default: true,
        caption: 'Kelly Slab & Yantramanav'
      },
      {
        css: 'basetype-anonymouspro-catamaran.css',
        sectioncss: 'type-anonymouspro-catamaran.css',
        classname: 'type-anonymouspro-catamaran',
        img: 'type-anonymouspro-catamaran.jpg',
        category: 6,
        default: true,
        caption: 'Anonymous Pro & Catamaran'
      },
      {
        css: 'basetype-nothingyouc-ibmplexmono.css',
        sectioncss: 'type-nothingyouc-ibmplexmono.css',
        classname: 'type-nothingyouc-ibmplexmono',
        img: 'type-nothingyouc-ibmplexmono.jpg',
        category: 13,
        default: true,
        caption: 'Nothing You Could Do & IBM Plex Mono'
      },
      {
        css: 'basetype-juliussansone-taviraj.css',
        sectioncss: 'type-juliussansone-taviraj.css',
        classname: 'type-juliussansone-taviraj',
        img: 'type-juliussansone-taviraj.jpg',
        category: 3,
        default: true,
        caption: 'Julius Sans One & Taviraj'
      },
      {
        css: 'basetype-voltaire-sourcecodepro.css',
        sectioncss: 'type-voltaire-sourcecodepro.css',
        classname: 'type-voltaire-sourcecodepro',
        img: 'type-voltaire-sourcecodepro.jpg',
        category: 7,
        default: true,
        caption: 'Voltaire & Source Code Pro'
      },
      {
        css: 'basetype-oregano-zillaslab.css',
        sectioncss: 'type-oregano-zillaslab.css',
        classname: 'type-oregano-zillaslab',
        img: 'type-oregano-zillaslab.jpg',
        category: 10,
        default: true,
        caption: 'Oregano & Zilla Slab'
      },
      {
        css: 'basetype-yellowtail-frankruhllibre.css',
        sectioncss: 'type-yellowtail-frankruhllibre.css',
        classname: 'type-yellowtail-frankruhllibre',
        img: 'type-yellowtail-frankruhllibre.jpg',
        category: 11,
        default: true,
        caption: 'Yellowtail & Frank Ruhl Libre'
      },
      {
        css: 'basetype-anonymouspro.css',
        sectioncss: 'type-anonymouspro.css',
        classname: 'type-anonymouspro',
        img: 'type-anonymouspro.jpg',
        category: 5,
        default: false,
        caption: 'Anonymous Pro'
      },
      {
        css: 'basetype-sedgwickave-spectral.css',
        sectioncss: 'type-sedgwickave-spectral.css',
        classname: 'type-sedgwickave-spectral',
        img: 'type-sedgwickave-spectral.jpg',
        category: 10,
        default: false,
        caption: 'Sedgwick Ave & Spectral'
      },
      {
        css: 'basetype-dancingscript-anonymouspro.css',
        sectioncss: 'type-dancingscript-anonymouspro.css',
        classname: 'type-dancingscript-anonymouspro',
        img: 'type-dancingscript-anonymouspro.jpg',
        category: 13,
        default: false,
        caption: 'Dancing Script & Anonymous Pro'
      },
      {
        css: 'basetype-unicaone-cormorantgaramond.css',
        sectioncss: 'type-unicaone-cormorantgaramond.css',
        classname: 'type-unicaone-cormorantgaramond',
        img: 'type-unicaone-cormorantgaramond.jpg',
        category: 10,
        default: false,
        caption: 'Unica One & Cormorant Garamond'
      },
      {
        css: 'basetype-allan-overpassmono.css',
        sectioncss: 'type-allan-overpassmono.css',
        classname: 'type-allan-overpassmono',
        img: 'type-allan-overpassmono.jpg',
        category: 12,
        default: false,
        caption: 'Allan & Overpass Mono'
      },
      {
        css: 'basetype-averialibre-barlow.css',
        sectioncss: 'type-averialibre-barlow.css',
        classname: 'type-averialibre-barlow',
        img: 'type-averialibre-barlow.jpg',
        category: 8,
        default: false,
        caption: 'Averia Libre & Barlow'
      },
      {
        css: 'basetype-merriweathersans-martel.css',
        sectioncss: 'type-merriweathersans-martel.css',
        classname: 'type-merriweathersans-martel',
        img: 'type-merriweathersans-martel.jpg',
        category: 3,
        default: false,
        caption: 'Merriweather Sans & Martel'
      },
      { css: 'basetype-poppins.css', sectioncss: 'type-poppins.css', classname: 'type-poppins', img: 'type-poppins.jpg', category: 1, default: false, caption: 'Poppins' },
      {
        css: 'basetype-satisfy-economica.css',
        sectioncss: 'type-satisfy-economica.css',
        classname: 'type-satisfy-economica',
        img: 'type-satisfy-economica.jpg',
        category: 9,
        default: false,
        caption: 'Satisfy & Economica'
      },
      {
        css: 'basetype-josefinsans-lekton.css',
        sectioncss: 'type-josefinsans-lekton.css',
        classname: 'type-josefinsans-lekton',
        img: 'type-josefinsans-lekton.jpg',
        category: 1,
        default: false,
        caption: 'Josefin Sans & Lekton'
      },
      {
        css: 'basetype-specialelite-encodesans.css',
        sectioncss: 'type-specialelite-encodesans.css',
        classname: 'type-specialelite-encodesans',
        img: 'type-specialelite-encodesans.jpg',
        category: 8,
        default: false,
        caption: 'Special Elite & Encode Sans'
      },
      {
        css: 'basetype-parisienne-maitree.css',
        sectioncss: 'type-parisienne-maitree.css',
        classname: 'type-parisienne-maitree',
        img: 'type-parisienne-maitree.jpg',
        category: 11,
        default: false,
        caption: 'Parisienne & Maitree'
      },
      {
        css: 'basetype-marcellussc-heebo.css',
        sectioncss: 'type-marcellussc-heebo.css',
        classname: 'type-marcellussc-heebo',
        img: 'type-marcellussc-heebo.jpg',
        category: 4,
        default: false,
        caption: 'Marcellus SC & Heebo'
      },
      {
        css: 'basetype-oswald-cousine.css',
        sectioncss: 'type-oswald-cousine.css',
        classname: 'type-oswald-cousine',
        img: 'type-oswald-cousine.jpg',
        category: 7,
        default: false,
        caption: 'Oswald & Cousine'
      },
      {
        css: 'basetype-londrinashadow-martel.css',
        sectioncss: 'type-londrinashadow-martel.css',
        classname: 'type-londrinashadow-martel',
        img: 'type-londrinashadow-martel.jpg',
        category: 10,
        default: false,
        caption: 'Londrina Shadow & Martel'
      },
      {
        css: 'basetype-oranienbaum-sourcesanspro.css',
        sectioncss: 'type-oranienbaum-sourcesanspro.css',
        classname: 'type-oranienbaum-sourcesanspro',
        img: 'type-oranienbaum-sourcesanspro.jpg',
        category: 4,
        default: false,
        caption: 'Oranienbaum & Source Sans Pro'
      },
      {
        css: 'basetype-sriracha-arvo.css',
        sectioncss: 'type-sriracha-arvo.css',
        classname: 'type-sriracha-arvo',
        img: 'type-sriracha-arvo.jpg',
        category: 11,
        default: false,
        caption: 'Sriracha & Arvo'
      },
      {
        css: 'basetype-merriweather.css',
        sectioncss: 'type-merriweather.css',
        classname: 'type-merriweather',
        img: 'type-merriweather.jpg',
        category: 2,
        default: false,
        caption: 'Merriweather'
      },
      {
        css: 'basetype-badscript-rokkitt.css',
        sectioncss: 'type-badscript-rokkitt.css',
        classname: 'type-badscript-rokkitt',
        img: 'type-badscript-rokkitt.jpg',
        category: 11,
        default: false,
        caption: 'Bad Script & Rokkitt'
      },
      {
        css: 'basetype-poiretone-pridi.css',
        sectioncss: 'type-poiretone-pridi.css',
        classname: 'type-poiretone-pridi',
        img: 'type-poiretone-pridi.jpg',
        category: 10,
        default: false,
        caption: 'Poiret One & Pridi'
      },
      {
        css: 'basetype-inconsolata.css',
        sectioncss: 'type-inconsolata.css',
        classname: 'type-inconsolata',
        img: 'type-inconsolata.jpg',
        category: 5,
        default: false,
        caption: 'Inconsolata'
      },
      {
        css: 'basetype-novamono-robotomono.css',
        sectioncss: 'type-novamono-robotomono.css',
        classname: 'type-novamono-robotomono',
        img: 'type-novamono-robotomono.jpg',
        category: 5,
        default: false,
        caption: 'Nova Mono & Roboto Mono'
      },
      {
        css: 'basetype-spacemono.css',
        sectioncss: 'type-spacemono.css',
        classname: 'type-spacemono',
        img: 'type-spacemono.jpg',
        category: 5,
        default: false,
        caption: 'Space Mono'
      },
      {
        css: 'basetype-pollerone-ibmplexserif.css',
        sectioncss: 'type-pollerone-ibmplexserif.css',
        classname: 'type-pollerone-ibmplexserif',
        img: 'type-pollerone-ibmplexserif.jpg',
        category: 10,
        default: false,
        caption: 'Poller One & IBM Plex Serif'
      },
      {
        css: 'basetype-italiana-martel.css',
        sectioncss: 'type-italiana-martel.css',
        classname: 'type-italiana-martel',
        img: 'type-italiana-martel.jpg',
        category: 2,
        default: false,
        caption: 'Italiana & Martel'
      },
      {
        css: 'basetype-julee-lora.css',
        sectioncss: 'type-julee-lora.css',
        classname: 'type-julee-lora',
        img: 'type-julee-lora.jpg',
        category: 11,
        default: false,
        caption: 'Julee & Lora'
      },
      {
        css: 'basetype-elsie-frankruhllibre.css',
        sectioncss: 'type-elsie-frankruhllibre.css',
        classname: 'type-elsie-frankruhllibre',
        img: 'type-elsie-frankruhllibre.jpg',
        category: 10,
        default: false,
        caption: 'Elsie & Frank Ruhl Libre'
      },
      {
        css: 'basetype-playfairdisp-petitformalscr.css',
        sectioncss: 'type-playfairdisp-petitformalscr.css',
        classname: 'type-playfairdisp-petitformalscr',
        img: 'type-playfairdisp-petitformalscr.jpg',
        category: 2,
        default: false,
        caption: 'Playfair Display'
      },
      {
        css: 'basetype-josefinsans-neuton.css',
        sectioncss: 'type-josefinsans-neuton.css',
        classname: 'type-josefinsans-neuton',
        img: 'type-josefinsans-neuton.jpg',
        category: 3,
        default: false,
        caption: 'Josefin Sans & Neuton'
      },
      {
        css: 'basetype-stintultracon-inconsolata.css',
        sectioncss: 'type-stintultracon-inconsolata.css',
        classname: 'type-stintultracon-inconsolata',
        img: 'type-stintultracon-inconsolata.jpg',
        category: 12,
        default: false,
        caption: 'Stint Ultra Condensed & Inconsolata'
      },
      {
        css: 'basetype-sixcaps-robotomono.css',
        sectioncss: 'type-sixcaps-robotomono.css',
        classname: 'type-sixcaps-robotomono',
        img: 'type-sixcaps-robotomono.jpg',
        category: 7,
        default: false,
        caption: 'Six Caps & Roboto Mono'
      },
      {
        css: 'basetype-raleway-playfairdisplay.css',
        sectioncss: 'type-raleway-playfairdisplay.css',
        classname: 'type-raleway-playfairdisplay',
        img: 'type-raleway-playfairdisplay.jpg',
        category: 1,
        default: false,
        caption: 'Raleway'
      },
      {
        css: 'basetype-pacifico-nanumgothiccod.css',
        sectioncss: 'type-pacifico-nanumgothiccod.css',
        classname: 'type-pacifico-nanumgothiccod',
        img: 'type-pacifico-nanumgothiccod.jpg',
        category: 13,
        default: false,
        caption: 'Pacifico & Nanum Gothic Coding'
      },
      {
        css: 'basetype-ubuntumono-sourcecodepro.css',
        sectioncss: 'type-ubuntumono-sourcecodepro.css',
        classname: 'type-ubuntumono-sourcecodepro',
        img: 'type-ubuntumono-sourcecodepro.jpg',
        category: 5,
        default: false,
        caption: 'Ubuntu Mono & Source Code Pro'
      },
      {
        css: 'basetype-sharetechmono-nunito.css',
        sectioncss: 'type-sharetechmono-nunito.css',
        classname: 'type-sharetechmono-nunito',
        img: 'type-sharetechmono-nunito.jpg',
        category: 6,
        default: false,
        caption: 'Share Tech Mono & Nunito'
      },
      { css: 'basetype-lato.css', sectioncss: 'type-lato.css', classname: 'type-lato', img: 'type-lato.jpg', category: 1, default: false, caption: 'Lato' },
      {
        css: 'basetype-pathwaygothicone-merriweather.css',
        sectioncss: 'type-pathwaygothicone-merriweather.css',
        classname: 'type-pathwaygothicone-merriweather',
        img: 'type-pathwaygothicone-merriweather.jpg',
        category: 3,
        default: false,
        caption: 'Pathway Gothic One & Merriweather'
      },
      {
        css: 'basetype-forum-nanumgothiccoding.css',
        sectioncss: 'type-forum-nanumgothiccoding.css',
        classname: 'type-forum-nanumgothiccoding',
        img: 'type-forum-nanumgothiccoding.jpg',
        category: 12,
        default: false,
        caption: 'Forum & Nanum Gothic Coding'
      },
      {
        css: 'basetype-bilbo-halant.css',
        sectioncss: 'type-bilbo-halant.css',
        classname: 'type-bilbo-halant',
        img: 'type-bilbo-halant.jpg',
        category: 11,
        default: false,
        caption: 'Bilbo & Halant'
      },
      {
        css: 'basetype-greatvibes-robotomono.css',
        sectioncss: 'type-greatvibes-robotomono.css',
        classname: 'type-greatvibes-robotomono',
        img: 'type-greatvibes-robotomono.jpg',
        category: 13,
        default: false,
        caption: 'Great Vibes & Roboto Mono'
      },
      {
        css: 'basetype-pinyonscript-firasans.css',
        sectioncss: 'type-pinyonscript-firasans.css',
        classname: 'type-pinyonscript-firasans',
        img: 'type-pinyonscript-firasans.jpg',
        category: 9,
        default: false,
        caption: 'Pinyon Script & Fira Sans'
      },
      {
        css: 'basetype-hammersmithone-poppins.css',
        sectioncss: 'type-hammersmithone-poppins.css',
        classname: 'type-hammersmithone-poppins',
        img: 'type-hammersmithone-poppins.jpg',
        category: 1,
        default: false,
        caption: 'Hammersmith One & Poppins'
      },
      {
        css: 'basetype-arimamadurai.css',
        sectioncss: 'type-arimamadurai.css',
        classname: 'type-arimamadurai',
        img: 'type-arimamadurai.jpg',
        category: 14,
        default: false,
        caption: 'Arima Madurai'
      },
      {
        css: 'basetype-teko-muktamahee.css',
        sectioncss: 'type-teko-muktamahee.css',
        classname: 'type-teko-muktamahee',
        img: 'type-teko-muktamahee.jpg',
        category: 1,
        default: false,
        caption: 'Teko & Mukta Mahee'
      },
      {
        css: 'basetype-heebo-ibmplexmono.css',
        sectioncss: 'type-heebo-ibmplexmono.css',
        classname: 'type-heebo-ibmplexmono',
        img: 'type-heebo-ibmplexmono.jpg',
        category: 7,
        default: false,
        caption: 'Heebo & IBM Plex Mono'
      },
      {
        css: 'basetype-sail-rasa.css',
        sectioncss: 'type-sail-rasa.css',
        classname: 'type-sail-rasa',
        img: 'type-sail-rasa.jpg',
        category: 10,
        default: false,
        caption: 'Sail & Rasa'
      },
      {
        css: 'basetype-sairacon-thegirlnextdoor.css',
        sectioncss: 'type-sairacon-thegirlnextdoor.css',
        classname: 'type-sairacon-thegirlnextdoor',
        img: 'type-sairacon-thegirlnextdoor.jpg',
        category: 1,
        default: false,
        caption: 'Saira Condensed'
      },
      {
        css: 'basetype-frankruhllibre-lato.css',
        sectioncss: 'type-frankruhllibre-lato.css',
        classname: 'type-frankruhllibre-lato',
        img: 'type-frankruhllibre-lato.jpg',
        category: 4,
        default: false,
        caption: 'Frank Ruhl Libre & Lato'
      },
      {
        css: 'basetype-yantramanav-ibmplexserif.css',
        sectioncss: 'type-yantramanav-ibmplexserif.css',
        classname: 'type-yantramanav-ibmplexserif',
        img: 'type-yantramanav-ibmplexserif.jpg',
        category: 1,
        default: false,
        caption: 'Yantramanav & IBM Plex Serif'
      },
      {
        css: 'basetype-quicksand-kalam.css',
        sectioncss: 'type-quicksand-kalam.css',
        classname: 'type-quicksand-kalam',
        img: 'type-quicksand-kalam.jpg',
        category: 1,
        default: false,
        caption: 'Quicksand & Kalam'
      },
      {
        css: 'basetype-ibmplexmono.css',
        sectioncss: 'type-ibmplexmono.css',
        classname: 'type-ibmplexmono',
        img: 'type-ibmplexmono.jpg',
        category: 5,
        default: false,
        caption: 'IBM Plex Mono'
      },
      {
        css: 'basetype-cinzeldecor-palanquin.css',
        sectioncss: 'type-cinzeldecor-palanquin.css',
        classname: 'type-cinzeldecor-palanquin',
        img: 'type-cinzeldecor-palanquin.jpg',
        category: 8,
        default: false,
        caption: 'Cinzel Decorative & Palanquin'
      },
      {
        css: 'basetype-yesevaone-forum.css',
        sectioncss: 'type-yesevaone-forum.css',
        classname: 'type-yesevaone-forum',
        img: 'type-yesevaone-forum.jpg',
        category: 14,
        default: false,
        caption: 'Yeseva One & Forum'
      },
      {
        css: 'basetype-oswald-biryani.css',
        sectioncss: 'type-oswald-biryani.css',
        classname: 'type-oswald-biryani',
        img: 'type-oswald-biryani.jpg',
        category: 1,
        default: false,
        caption: 'Oswald & Biryani'
      },
      {
        css: 'basetype-yanonekaff-josefinsans.css',
        sectioncss: 'type-yanonekaff-josefinsans.css',
        classname: 'type-yanonekaff-josefinsans',
        img: 'type-yanonekaff-josefinsans.jpg',
        category: 1,
        default: false,
        caption: 'Yanone Kaffeesatz & Josefin Sans'
      },
      {
        css: 'basetype-abrilfatface-assistant.css',
        sectioncss: 'type-abrilfatface-assistant.css',
        classname: 'type-abrilfatface-assistant',
        img: 'type-abrilfatface-assistant.jpg',
        category: 8,
        default: false,
        caption: 'Abril Fatface & Assistant'
      },
      {
        css: 'basetype-nanumgothiccod-firasanscon.css',
        sectioncss: 'type-nanumgothiccod-firasanscon.css',
        classname: 'type-nanumgothiccod-firasanscon',
        img: 'type-nanumgothiccod-firasanscon.jpg',
        category: 6,
        default: false,
        caption: 'Nanum Gothic Coding & Fira Sans Condensed'
      },
      {
        css: 'basetype-inder-trirong.css',
        sectioncss: 'type-inder-trirong.css',
        classname: 'type-inder-trirong',
        img: 'type-inder-trirong.jpg',
        category: 3,
        default: false,
        caption: 'Inder & Trirong'
      },
      {
        css: 'basetype-dosis-oldstandardtt.css',
        sectioncss: 'type-dosis-oldstandardtt.css',
        classname: 'type-dosis-oldstandardtt',
        img: 'type-dosis-oldstandardtt.jpg',
        category: 1,
        default: false,
        caption: 'Dosis & Old Standard TT'
      },
      {
        css: 'basetype-atma-tajawal.css',
        sectioncss: 'type-atma-tajawal.css',
        classname: 'type-atma-tajawal',
        img: 'type-atma-tajawal.jpg',
        category: 8,
        default: false,
        caption: 'Atma & Tajawal'
      },
      {
        css: 'basetype-prata-hindsiliguri.css',
        sectioncss: 'type-prata-hindsiliguri.css',
        classname: 'type-prata-hindsiliguri',
        img: 'type-prata-hindsiliguri.jpg',
        category: 4,
        default: false,
        caption: 'Prata & Hind Siliguri'
      },
      {
        css: 'basetype-engagement-spectral.css',
        sectioncss: 'type-engagement-spectral.css',
        classname: 'type-engagement-spectral',
        img: 'type-engagement-spectral.jpg',
        category: 11,
        default: false,
        caption: 'Engagement & Spectral'
      },
      {
        css: 'basetype-federo-gothica1.css',
        sectioncss: 'type-federo-gothica1.css',
        classname: 'type-federo-gothica1',
        img: 'type-federo-gothica1.jpg',
        category: 1,
        default: false,
        caption: 'Federo & Gothic A1'
      },
      {
        css: 'basetype-fjallaone-ibmplexserif.css',
        sectioncss: 'type-fjallaone-ibmplexserif.css',
        classname: 'type-fjallaone-ibmplexserif',
        img: 'type-fjallaone-ibmplexserif.jpg',
        category: 3,
        default: false,
        caption: 'Fjalla One & IBM Plex Serif'
      },
      {
        css: 'basetype-dynalight-mada.css',
        sectioncss: 'type-dynalight-mada.css',
        classname: 'type-dynalight-mada',
        img: 'type-dynalight-mada.jpg',
        category: 8,
        default: false,
        caption: 'Dynalight & Mada'
      },
      {
        css: 'basetype-cormorantsc-ibmplexsanscon.css',
        sectioncss: 'type-cormorantsc-ibmplexsanscon.css',
        classname: 'type-cormorantsc-ibmplexsanscon',
        img: 'type-cormorantsc-ibmplexsanscon.jpg',
        category: 4,
        default: false,
        caption: 'Cormorant SC & IBM Plex Sans Condensed'
      },
      {
        css: 'basetype-kalam-robotomono.css',
        sectioncss: 'type-kalam-robotomono.css',
        classname: 'type-kalam-robotomono',
        img: 'type-kalam-robotomono.jpg',
        category: 13,
        default: false,
        caption: 'Kalam & Roboto Mono'
      },
      {
        css: 'basetype-fugazone-librefranklin.css',
        sectioncss: 'type-fugazone-librefranklin.css',
        classname: 'type-fugazone-librefranklin',
        img: 'type-fugazone-librefranklin.jpg',
        category: 8,
        default: false,
        caption: 'Fugaz One & Libre Franklin'
      },
      {
        css: 'basetype-gravitasone-nanummyeongjo.css',
        sectioncss: 'type-gravitasone-nanummyeongjo.css',
        classname: 'type-gravitasone-nanummyeongjo',
        img: 'type-gravitasone-nanummyeongjo.jpg',
        category: 10,
        default: false,
        caption: 'Gravitas One & Nanum Myeongjo'
      },
      {
        css: 'basetype-yeonsung-palanquin.css',
        sectioncss: 'type-yeonsung-palanquin.css',
        classname: 'type-yeonsung-palanquin',
        img: 'type-yeonsung-palanquin.jpg',
        category: 8,
        default: false,
        caption: 'Yeon Sung & Palanquin'
      },
      {
        css: 'basetype-rancho-robotoslab.css',
        sectioncss: 'type-rancho-robotoslab.css',
        classname: 'type-rancho-robotoslab',
        img: 'type-rancho-robotoslab.jpg',
        category: 11,
        default: false,
        caption: 'Rancho & Roboto Slab'
      },
      {
        css: 'basetype-tenaram-overpassmono.css',
        sectioncss: 'type-tenaram-overpassmono.css',
        classname: 'type-tenaram-overpassmono',
        img: 'type-tenaram-overpassmono.jpg',
        category: 7,
        default: false,
        caption: 'Tenali Ramakrishna & Overpass Mono'
      },
      {
        css: 'basetype-thegirlnextdoor-sourcesanspro.css',
        sectioncss: 'type-thegirlnextdoor-sourcesanspro.css',
        classname: 'type-thegirlnextdoor-sourcesanspro',
        img: 'type-thegirlnextdoor-sourcesanspro.jpg',
        category: 9,
        default: false,
        caption: 'The Girl Next Door & Source Sans Pro'
      },
      {
        css: 'basetype-alexbrush-ibmplexsans.css',
        sectioncss: 'type-alexbrush-ibmplexsans.css',
        classname: 'type-alexbrush-ibmplexsans',
        img: 'type-alexbrush-ibmplexsans.jpg',
        category: 9,
        default: false,
        caption: 'Alex Brush & IBM Plex Sans'
      },
      {
        css: 'basetype-boogaloo-inconsolata.css',
        sectioncss: 'type-boogaloo-inconsolata.css',
        classname: 'type-boogaloo-inconsolata',
        img: 'type-boogaloo-inconsolata.jpg',
        category: 12,
        default: false,
        caption: 'Boogaloo & Inconsolata'
      },
      {
        css: 'basetype-caveat-sourcecodepro.css',
        sectioncss: 'type-caveat-sourcecodepro.css',
        classname: 'type-caveat-sourcecodepro',
        img: 'type-caveat-sourcecodepro.jpg',
        category: 13,
        default: false,
        caption: 'Caveat & Source Code Pro'
      },
      {
        css: 'basetype-passionone-worksans.css',
        sectioncss: 'type-passionone-worksans.css',
        classname: 'type-passionone-worksans',
        img: 'type-passionone-worksans.jpg',
        category: 8,
        default: false,
        caption: 'Passion One & Work Sans'
      },
      {
        css: 'basetype-anticdidone-halant.css',
        sectioncss: 'type-anticdidone-halant.css',
        classname: 'type-anticdidone-halant',
        img: 'type-anticdidone-halant.jpg',
        category: 2,
        default: false,
        caption: 'Antic Didone & Halant'
      },

      {
        css: 'basetype-adventpro-opensans.css',
        sectioncss: 'type-adventpro-opensans.css',
        classname: 'type-adventpro-opensans',
        img: 'type-adventpro-opensans.jpg',
        category: 1,
        default: false,
        caption: 'Advent Pro & Open Sans'
      },
      {
        css: 'basetype-cutivemono-lato.css',
        sectioncss: 'type-cutivemono-lato.css',
        classname: 'type-cutivemono-lato',
        img: 'type-cutivemono-lato.jpg',
        category: 6,
        default: false,
        caption: 'Cutive Mono & Lato'
      },
      {
        css: 'basetype-elsie-montserrat.css',
        sectioncss: 'type-elsie-montserrat.css',
        classname: 'type-elsie-montserrat',
        img: 'type-elsie-montserrat.jpg',
        category: 8,
        default: false,
        caption: 'Elsie & Montserrat'
      },
      {
        css: 'basetype-macondo-mukta.css',
        sectioncss: 'type-macondo-mukta.css',
        classname: 'type-macondo-mukta',
        img: 'type-macondo-mukta.jpg',
        category: 8,
        default: false,
        caption: 'Macondo & Mukta'
      },
      {
        css: 'basetype-oswald-opensans.css',
        sectioncss: 'type-oswald-opensans.css',
        classname: 'type-oswald-opensans',
        img: 'type-oswald-opensans.jpg',
        category: 1,
        default: false,
        caption: 'Oswald & Open Sans'
      },
      {
        css: 'basetype-poppins-lekton.css',
        sectioncss: 'type-poppins-lekton.css',
        classname: 'type-poppins-lekton',
        img: 'type-poppins-lekton.jpg',
        category: 1,
        default: false,
        caption: 'Poppins & Lekton'
      },
      {
        css: 'basetype-raleway-neuton.css',
        sectioncss: 'type-raleway-neuton.css',
        classname: 'type-raleway-neuton',
        img: 'type-raleway-neuton.jpg',
        category: 3,
        default: false,
        caption: 'Raleway & Neuton'
      },
      {
        css: 'basetype-sourcecodepro-nunitosans.css',
        sectioncss: 'type-sourcecodepro-nunitosans.css',
        classname: 'type-sourcecodepro-nunitosans',
        img: 'type-sourcecodepro-nunitosans.jpg',
        category: 6,
        default: false,
        caption: 'Source Code Pro & Nunito Sans'
      },
      {
        css: 'basetype-tangerine-opensans.css',
        sectioncss: 'type-tangerine-opensans.css',
        classname: 'type-tangerine-opensans',
        img: 'type-tangerine-opensans.jpg',
        category: 9,
        default: false,
        caption: 'Tangerine & Open Sans'
      },

      {
        css: 'basetype-alegreya-lato.css',
        sectioncss: 'type-alegreya-lato.css',
        classname: 'type-alegreya-lato',
        img: 'type-alegreya-lato.jpg',
        category: 4,
        default: false,
        caption: 'Alegreya & Lato'
      },
      {
        css: 'basetype-amaticsc-lato.css',
        sectioncss: 'type-amaticsc-lato.css',
        classname: 'type-amaticsc-lato',
        img: 'type-amaticsc-lato.jpg',
        category: 9,
        default: false,
        caption: 'Amatic SC & Lato'
      },
      {
        css: 'basetype-heebo-ibmplexmono-2.css',
        sectioncss: 'type-heebo-ibmplexmono-2.css',
        classname: 'type-heebo-ibmplexmono-2',
        img: 'type-heebo-ibmplexmono-2.jpg',
        category: 7,
        default: false,
        caption: 'Heebo & IBM Plex Mono'
      },
      {
        css: 'basetype-juliussansone-robotocondensed.css',
        sectioncss: 'type-juliussansone-robotocondensed.css',
        classname: 'type-juliussansone-robotocondensed',
        img: 'type-juliussansone-robotocondensed.jpg',
        category: 1,
        default: false,
        caption: 'Julius Sans One & Roboto Condensed'
      },
      {
        css: 'basetype-montserrat-roboto.css',
        sectioncss: 'type-montserrat-roboto.css',
        classname: 'type-montserrat-roboto',
        img: 'type-montserrat-roboto.jpg',
        category: 1,
        default: false,
        caption: 'Montserrat & Roboto'
      },
      {
        css: 'basetype-nothingyouc-ibmplexmono-2.css',
        sectioncss: 'type-nothingyouc-ibmplexmono-2.css',
        classname: 'type-nothingyouc-ibmplexmono-2',
        img: 'type-nothingyouc-ibmplexmono-2.jpg',
        category: 13,
        default: false,
        caption: 'Nothing You Could Do & IBM Plex Mono'
      },
      {
        css: 'basetype-raleway-lato.css',
        sectioncss: 'type-raleway-lato.css',
        classname: 'type-raleway-lato',
        img: 'type-raleway-lato.jpg',
        category: 1,
        default: false,
        caption: 'Raleway & Lato'
      },
      {
        css: 'basetype-raleway-lusitana.css',
        sectioncss: 'type-raleway-lusitana.css',
        classname: 'type-raleway-lusitana',
        img: 'type-raleway-lusitana.jpg',
        category: 3,
        default: false,
        caption: 'Raleway & Lusitana'
      },
      {
        css: 'basetype-rufina-oxygen.css',
        sectioncss: 'type-rufina-oxygen.css',
        classname: 'type-rufina-oxygen',
        img: 'type-rufina-oxygen.jpg',
        category: 4,
        default: false,
        caption: 'Rufina & Oxygen'
      },
      {
        css: 'basetype-sacramento-opensans.css',
        sectioncss: 'type-sacramento-opensans.css',
        classname: 'type-sacramento-opensans',
        img: 'type-sacramento-opensans.jpg',
        category: 9,
        default: false,
        caption: 'Sacramento & Open Sans'
      },
      {
        css: 'basetype-specialelite-playfairdisplay.css',
        sectioncss: 'type-specialelite-playfairdisplay.css',
        classname: 'type-specialelite-playfairdisplay',
        img: 'type-specialelite-playfairdisplay.jpg',
        category: 10,
        default: false,
        caption: 'Special Elite & Playfair Display'
      },
      {
        css: 'basetype-unicaone-sourcesanspro.css',
        sectioncss: 'type-unicaone-sourcesanspro.css',
        classname: 'type-unicaone-sourcesanspro',
        img: 'type-unicaone-sourcesanspro.jpg',
        category: 8,
        default: false,
        caption: 'Unica One & Source Sans Pro'
      }
    ]
  }
};
