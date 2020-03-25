(function(){
    'use strict';

    const configureButton = (id, fn) => {
        document.getElementById(id).addEventListener('click', fn);
    };

    const characters = {
        Spellweaver: 'Spellweaver',
        Summoner: 'Summoner',
        Sunkeeper: 'Sunkeeper',
        Quartermaster: 'Quartermaster',
    }

    const cardsByCharacter = {
        [characters.Spellweaver]: [],
        [characters.Summoner]: [],
        [characters.Sunkeeper]: [],
        [characters.Quartermaster]: [],
    }

    const cardToResource = new Map(
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
        ['fire', 'Element--Fire'],
        ['ice', 'Element--Ice']
        ['refresh', 'Refresh']
        ['pierce3', 'Pierce--3']
    );

    init();

    function init() {
        setupSpellweaver();
        setupSummoner();
        setupSunkeeper();
        setupQuartermaster();

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
        
    }

    function onShuffle() {

    }

    function onAddBless() {

    }

    function onAddCurse() {

    }
})();