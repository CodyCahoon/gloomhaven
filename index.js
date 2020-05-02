(function(){
    'use strict';

    const configureButton = (id, fn) => {
        document.getElementById(id).addEventListener('click', () => {
            fn();
            renderCards();
        });
    };

    const characters = {
        Spellweaver: 'Spellweaver',
        Summoner: 'Summoner',
        Sunkeeper: 'Sunkeeper',
        Quartermaster: 'Quartermaster',
    };

    const cardsByCharacter = {
        [characters.Spellweaver]: [],
        [characters.Summoner]: [],
        [characters.Sunkeeper]: [],
        [characters.Quartermaster]: [],
    };

    const cards = {
        all: [],
        available: [],
        drawn: [],
    }

    const cardToResource = new Map([
        ['-2', 'Damage--Minus--2'], 
        ['-1', 'Damage--Minus--1'],    
        ['+0', 'Damage--Plus--0'],
        ['+1', 'Damage--Plus--1'],
        ['+2', 'Damage--Plus--2'],
        ['double', 'Damage--Double'],
        ['bless', 'Damage--Bless'],
        ['miss', 'Damage--Miss'],
        ['curse', 'Damage--Curse'],
        ['+2fire', 'Damage--Plus--2--Fire'],
        ['+2ice', 'Damage--Plus--2--Ice'],
        ['earth', 'Element--Earth'],
        ['fire', 'Element--Fire'],
        ['wind', 'Element--Wind'],
        ['darkness', 'Element--Darkness'],
        ['light', 'Element--Light'],
        ['refresh', 'Refresh'],
        ['pierce3', 'Pierce--3'],
        ['blank', 'Attack--Modifier--Blank'],
        ['poison', 'Poison'],
        ['+0stun', 'Damage--Plus--0--Stun'],
        ['-1scenario', 'Damage--Minus--1'],
        ['+1roll', 'Damage--Plus--1--Roll'],
        ['+1curse', 'Damage--Plus--1--Curse'],
	    ['stun--roll', 'Stun--Roll'],
	    ['target--roll', 'Target--Roll'],
    ]);

    init();

    function init() {
        setupSpellweaver();
        setupSummoner();
        setupSunkeeper();
        setupQuartermaster();

        const character = window.location.href.split('?')[1] || 'spellweaver';

        const deck = getDeck(character);
        cards.all = [...deck];
        cards.available = [...deck];
        cards.drawn = [];

        renderName(character);
        renderCards();

        function getDeck() {
            if (character === 'spellweaver') {
                return cardsByCharacter[characters.Spellweaver];
            }

            if (character === 'summoner') {
                return cardsByCharacter[characters.Summoner];
            }

            if (character === 'sunkeeper') {
                return cardsByCharacter[characters.Sunkeeper];
            }

            return cardsByCharacter[characters.Quartermaster];
        }


        function addToDeck(deck, card, amount = 1) {
            for (let i = 0; i < amount; i++) {
                deck.push(card);
            }
        }

        function setupSpellweaver() {
            const deck = cardsByCharacter[characters.Spellweaver];
            addToDeck(deck, '+1', 11);
            addToDeck(deck, '+0', 2);
            addToDeck(deck, '+0stun');
            addToDeck(deck, '-1', 3);
            addToDeck(deck, '+2fire', 2);
            addToDeck(deck, '+2ice', 2);
            addToDeck(deck, '+2');
            addToDeck(deck, 'double');
            addToDeck(deck, 'miss');
            addToDeck(deck, '+1curse');

            // Elements
            addToDeck(deck, 'earth');
            addToDeck(deck, 'wind');
            addToDeck(deck, 'light');
            addToDeck(deck, 'darkness');
        }

        function setupSummoner() {
            const deck = cardsByCharacter[characters.Summoner];
            addToDeck(deck, '+1', 10);
            addToDeck(deck, '+0', 7);
            addToDeck(deck, '+2', 3);
            addToDeck(deck, 'double');
            addToDeck(deck, 'miss');
            addToDeck(deck, 'poison');
            addToDeck(deck, 'fire');
            addToDeck(deck, 'wind');
        }

        function setupSunkeeper() {
            const deck = cardsByCharacter[characters.Sunkeeper];
            addToDeck(deck, '+1', 7);
            addToDeck(deck, '-1');
            addToDeck(deck, '+2');
            addToDeck(deck, 'double');
            addToDeck(deck, 'miss');
            addToDeck(deck, '+1roll', 4);
        }

        function setupQuartermaster() {
            const deck = cardsByCharacter[characters.Quartermaster];
            addToDeck(deck, '+1', 7);
            addToDeck(deck, '-1');
            addToDeck(deck, '-2');
            addToDeck(deck, '+2', 3);
            addToDeck(deck, 'double');
            addToDeck(deck, 'miss');
            addToDeck(deck, 'pierce3', 2);
            addToDeck(deck, 'refresh');
            addToDeck(deck, '+1roll', 2);
            addToDeck(deck, 'stun--roll');
            addToDeck(deck, 'target--roll');
        }
    }

    configureButton('draw', onDraw);
    configureButton('shuffle', onShuffle);
    configureButton('bless', onAddBless);
    configureButton('curse', onAddCurse);
    configureButton('scenario-effect', onAddScenarioEffect);

    function onDraw() {
        const hasCardsToDraw = cards.available.length > 0;
        if (!hasCardsToDraw) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * cards.available.length);
        const card = cards.available[randomIndex];
        cards.drawn.unshift(card);
        cards.available = cards.available.filter((_, i) => i !== randomIndex);
    }

    function onShuffle() {
        const cardsToKeep = new Set(['bless', 'curse', '-1scenario']);
        const keepCards = cards.available.filter(c => cardsToKeep.has(c));
        cards.available = [...cards.all, ...keepCards];
        cards.drawn = [];
    }

    function onAddBless() {
        addCard('bless');
    }

    function onAddCurse() {
        addCard('curse');
    }

    function onAddScenarioEffect() {
        addCard('-1scenario');
    }

    function addCard(cardName) {
        cards.available.push(cardName);

        const card = createCard(cardName);
        card.style.position = 'absolute';
        card.style.top = '4px';
        card.style.left = '3px';
        card.classList.add('added-card');
        
        const drawingDeck = document.getElementById('drawing-deck');
        if (!drawingDeck) {
            return;
        }
        drawingDeck.appendChild(card);

        setTimeout(() => {
            card.remove();
        }, 1000)
    }

    function renderCards() {
        const hasCardsToDraw = cards.available.length > 0;
        const filter = hasCardsToDraw ? '' : 'grayscale(1)';
        document.getElementById('draw').style.filter = filter;
        document.getElementById('total-cards').innerHTML = cards.available.length;

        if (needsShuffle()) {
            document.getElementById('draw').classList.add('needs-shuffle');
            document.getElementById('shuffle-deck').style.display = 'block';
        } else {
            document.getElementById('draw').classList.remove('needs-shuffle');
            document.getElementById('shuffle-deck').style.display = 'none';
        }

        const placeholder = document.getElementById('placeholder');
        placeholder.innerHTML = null;
        
        const cardsToRender = cards.drawn.length === 0 ? ['blank'] : cards.drawn;
        cardsToRender.map(createCard).forEach(img => placeholder.appendChild(img));
    }

    function needsShuffle() {
        const isShuffle = c => new Set(['double', 'miss']).has(c);
        return cards.drawn.filter(isShuffle).length > 0;
    }

    function renderName(name) {
        document.getElementById('name').innerHTML = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    }

    function createCard(name) {
        const img = document.createElement('img');
        const resource = cardToResource.get(name);
        img.src = `./assets/attacks/${resource}.png`;
        return img;
    }
})();
