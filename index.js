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
        ['curse', 'Damge--Curse'],
        ['+2fire', 'Damage--Plus--2--Fire'],
        ['+2ice', 'Damage--Plus--2--Ice'],
        ['earth', 'Element--Earth'],
        ['wind', 'Element--Wind'],
        ['darkness', 'Element--Darkness'],
        ['light', 'Element--Light'],
        ['refresh', 'Refresh'],
        ['pierce3', 'Pierce--3'],
        ['blank', 'Attack--Modifier--Blank']
    ]);

    init();

    function init() {
        setupSpellweaver();
        setupSummoner();
        setupSunkeeper();
        setupQuartermaster();

        const deck = getDeck();
        cards.all = [...deck];
        cards.available = [...deck];
        cards.drawn = [];
        renderCards();

        function getDeck() {
            let character = window.location.href.split('?')[1];

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
            addToDeck(deck, '-1', 3);
            addToDeck(deck, '+2fire', 2);
            addToDeck(deck, '+2ice', 2);
            addToDeck(deck, '+2');
            addToDeck(deck, 'double');
            addToDeck(deck, 'miss');

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
            addToDeck(deck, '+2');
            addToDeck(deck, 'double');
            addToDeck(deck, 'miss');
        }

        function setupSunkeeper() {
            const deck = cardsByCharacter[characters.Sunkeeper];
            addToDeck(deck, '+1', 7);
            addToDeck(deck, '+0', 7);
            addToDeck(deck, '-1');
            addToDeck(deck, '+2');
            addToDeck(deck, 'double');
            addToDeck(deck, 'miss');
        }

        function setupQuartermaster() {
            const deck = cardsByCharacter[characters.Sunkeeper];
            addToDeck(deck, '+1', 7);
            addToDeck(deck, '+0', 2);
            addToDeck(deck, '-1');
            addToDeck(deck, '-2');
            addToDeck(deck, '+2');
            addToDeck(deck, 'double');
            addToDeck(deck, 'miss');
            addToDeck(deck, 'pierce3', 2);
            addToDeck(deck, 'refresh');
        }
    }

    configureButton('draw', onDraw);
    configureButton('shuffle', onShuffle);
    configureButton('bless', onAddBless);
    configureButton('curse', onAddCurse);

    function onDraw() {
        if (cards.available.length === 0) {
            return;
        }
        const randomIndex = Math.floor(Math.random() * cards.available.length);
        const card = cards.available[randomIndex];
        cards.drawn.unshift(card);
        cards.available = cards.available.filter((_, i) => i !== randomIndex);
    }

    function onShuffle() {
        const blessAndCurse = cards.available.filter(c => c === 'bless' || c === 'curse');
        cards.available = [...cards.all, ...blessAndCurse];
        cards.drawn = [];
    }

    function onAddBless() {
        cards.available.push('bless');
    }

    function onAddCurse() {
        cards.available.push('curse');
    }

    function renderCards() {
        const placeholder = document.getElementById('placeholder');
        placeholder.innerHTML = null;
        
        if (cards.drawn.length === 0) {
            placeholder.appendChild(createCard('blank'));
        } else {
            cards.drawn.map(createCard).forEach(img => placeholder.appendChild(img));
        }

        function createCard(name) {
            const img = document.createElement('img');
            const resource = cardToResource.get(name);
            img.src = `./assets/attacks/${resource}.png`;
            return img;
        }
    }

})();