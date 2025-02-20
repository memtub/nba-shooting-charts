// Define seasons from 2000-01 to 2023-24
const seasons = Array.from({length: 24}, (_, i) => {
    const startYear = 2000 + i;
    return `${startYear}-${String(startYear + 1).slice(-2)}`;
});

// DOM Elements
const seasonSlider = document.getElementById('season-slider');
const selectedSeasonSpan = document.getElementById('selected-season');
const shootingChart = document.getElementById('shooting-chart');
const annotationTitle = document.getElementById('annotation-title');
const annotationText = document.getElementById('annotation-text');
const eraDisplay = document.getElementById('era-display');
const offensiveStrategyMap = document.getElementById('offensive-strategy-map');

const SEASON_PLAYERS = {
    '2000-01': [
        { name: 'Steve Francis', role: 'Point Guard' },
        { name: 'Cuttino Mobley', role: 'Shooting Guard' },
        { name: 'Maurice Taylor', role: 'Power Forward' }
    ],
    '2001-02': [
        { name: 'Steve Francis', role: 'Point Guard' },
        { name: 'Cuttino Mobley', role: 'Shooting Guard' },
        { name: 'Kenny Thomas', role: 'Power Forward' }
    ],
    '2002-03': [
        { name: 'Steve Francis', role: 'Point Guard' },
        { name: 'Cuttino Mobley', role: 'Shooting Guard' },
        { name: 'Yao Ming', role: 'Center' }
    ],
    '2003-04': [
        { name: 'Yao Ming', role: 'Center' },
        { name: 'Steve Francis', role: 'Point Guard' },
        { name: 'Tracy McGrady', role: 'Shooting Guard' }
    ],
    '2004-05': [
        { name: 'Tracy McGrady', role: 'Shooting Guard' },
        { name: 'Yao Ming', role: 'Center' },
        { name: 'Bob Sura', role: 'Point Guard' }
    ],
    '2005-06': [
        { name: 'Tracy McGrady', role: 'Shooting Guard' },
        { name: 'Yao Ming', role: 'Center' },
        { name: 'Rafer Alston', role: 'Point Guard' }
    ],
    '2006-07': [
        { name: 'Tracy McGrady', role: 'Shooting Guard' },
        { name: 'Yao Ming', role: 'Center' },
        { name: 'Shane Battier', role: 'Small Forward' }
    ],
    '2007-08': [
        { name: 'Tracy McGrady', role: 'Shooting Guard' },
        { name: 'Yao Ming', role: 'Center' },
        { name: 'Luis Scola', role: 'Power Forward' }
    ],
    '2008-09': [
        { name: 'Yao Ming', role: 'Center' },
        { name: 'Tracy McGrady', role: 'Shooting Guard' },
        { name: 'Luis Scola', role: 'Power Forward' }
    ],
    '2009-10': [
        { name: 'Aaron Brooks', role: 'Point Guard' },
        { name: 'Trevor Ariza', role: 'Small Forward' },
        { name: 'Luis Scola', role: 'Power Forward' }
    ],
    '2010-11': [
        { name: 'Kevin Martin', role: 'Shooting Guard' },
        { name: 'Luis Scola', role: 'Power Forward' },
        { name: 'Kyle Lowry', role: 'Point Guard' }
    ],
    '2011-12': [
        { name: 'Kevin Martin', role: 'Shooting Guard' },
        { name: 'Kyle Lowry', role: 'Point Guard' },
        { name: 'Luis Scola', role: 'Power Forward' }
    ],
    '2012-13': [
        { name: 'James Harden', role: 'Shooting Guard' },
        { name: 'Jeremy Lin', role: 'Point Guard' },
        { name: 'Chandler Parsons', role: 'Small Forward' }
    ],
    '2013-14': [
        { name: 'James Harden', role: 'Shooting Guard' },
        { name: 'Dwight Howard', role: 'Center' },
        { name: 'Chandler Parsons', role: 'Small Forward' }
    ],
    '2014-15': [
        { name: 'James Harden', role: 'Shooting Guard' },
        { name: 'Dwight Howard', role: 'Center' },
        { name: 'Trevor Ariza', role: 'Small Forward' }
    ],
    '2015-16': [
        { name: 'James Harden', role: 'Shooting Guard' },
        { name: 'Dwight Howard', role: 'Center' },
        { name: 'Trevor Ariza', role: 'Small Forward' }
    ],
    '2016-17': [
        { name: 'James Harden', role: 'Shooting Guard' },
        { name: 'Chris Paul', role: 'Point Guard' },
        { name: 'Clint Capela', role: 'Center' }
    ],
    '2017-18': [
        { name: 'James Harden', role: 'Shooting Guard' },
        { name: 'Chris Paul', role: 'Point Guard' },
        { name: 'Clint Capela', role: 'Center' }
    ],
    '2018-19': [
        { name: 'James Harden', role: 'Shooting Guard' },
        { name: 'Chris Paul', role: 'Point Guard' },
        { name: 'Clint Capela', role: 'Center' }
    ],
    '2019-20': [
        { name: 'James Harden', role: 'Point Guard' },
        { name: 'Russell Westbrook', role: 'Shooting Guard' },
        { name: 'P.J. Tucker', role: 'Power Forward' }
    ],
    '2020-21': [
        { name: 'Christian Wood', role: 'Center' },
        { name: 'John Wall', role: 'Point Guard' },
        { name: 'Kevin Porter Jr.', role: 'Shooting Guard' }
    ],
    '2021-22': [
        { name: 'Jalen Green', role: 'Shooting Guard' },
        { name: 'Christian Wood', role: 'Center' },
        { name: 'Kevin Porter Jr.', role: 'Point Guard' }
    ],
    '2022-23': [
        { name: 'Jalen Green', role: 'Shooting Guard' },
        { name: 'Alperen Sengun', role: 'Center' },
        { name: 'Kevin Porter Jr.', role: 'Point Guard' }
    ],
    '2023-24': [
        { name: 'Alperen Sengun', role: 'Center' },
        { name: 'Jalen Green', role: 'Shooting Guard' },
        { name: 'Fred VanVleet', role: 'Point Guard' }
    ]
};

// Season annotations
const SEASON_ANNOTATIONS = {
    '2000-01': "The 2000-01 Rockets centered their offense around Steve Francis's dynamic guard play, with heavy isolation sets and mid-range scoring. The team utilized traditional early-2000s NBA offense, with Francis, Cuttino Mobley, and Maurice Taylor forming their scoring trio.",
    '2001-02': "The 2001-02 season continued with the Francis-led approach, though with increased emphasis on pick-and-roll actions. Kenny Thomas emerged as a more reliable frontcourt option, while the team maintained their guard-heavy offensive scheme.",
    '2002-03': "The 2002-03 season marked a significant shift with Yao Ming's arrival, beginning the transition to an inside-out offensive approach. The team still ran primarily through Francis, but began incorporating more post plays to utilize Yao's unique skillset.",
    '2003-04': "In 2003-04, the Rockets fully embraced the Yao Ming post-up game while maintaining Francis's perimeter creation. This season established the foundation of their evolving offensive identity, balancing traditional post play with modern guard action.",
    '2004-05': "The 2004-05 season revolutionized the Rockets' offense with Tracy McGrady's arrival, creating a dual-star system with Yao Ming. The team now had two elite scoring options, with McGrady's perimeter brilliance complementing Yao's post dominance.",
    '2005-06': "The 2005-06 Rockets continued developing their Yao-McGrady partnership, with Rafer Alston providing additional playmaking. The offense became more sophisticated, featuring complex two-man actions between their stars.",
    '2006-07': "In 2006-07, the addition of Shane Battier brought improved spacing and basketball IQ to complement the Yao-McGrady core. The offense reached new levels of efficiency when their stars were healthy.",
    '2007-08': "The 2007-08 season saw the Rockets achieve their famous 22-game win streak, showcasing the potential of their system even during Yao's injury. The offense demonstrated remarkable adaptability, with McGrady shouldering a larger burden and role players stepping up significantly.",
    '2008-09': "2008-09 marked a pivotal season as McGrady's decline forced offensive innovation. Ron Artest's addition with Yao Ming and Luis Scola created a dynamic where Scola's high-post playmaking became a precursor to modern big man play, foreshadowing the versatility later exemplified by Nikola Jokic.",
    '2009-10': "2009-10 saw the Rockets transition to a more modern offense with Aaron Brooks and Trevor Ariza. Their emphasis on three-point shooting and spacing, including Brooks' transition pull-up threes and Ariza's 3-and-D role, became a blueprint for contemporary NBA wing play.",
    '2010-11': "2010-11 showcased early versions of now-popular NBA actions. Kevin Martin's off-ball movement and foul-drawing expertise previewed James Harden's style, while Kyle Lowry emerged as a prototype modern point guard - a bulldog who could reliably shoot from distance.",
    '2011-12': "2011-12, the last season before the analytics revolution, demonstrated transitional basketball. The team's focus on corner threes and layups, while maintaining Scola's mid-post game, bridged the gap between traditional and modern NBA offensive strategies.",
    '2012-13': "2012-13 revolutionized NBA offense with James Harden's and Daryl Morey's arrival. The Rockets' spread pick-and-roll attack, emphasizing three-pointers and rim attacks while eliminating mid-range shots, became a template for modern offenses, particularly influencing the Warriors and Hawks.",
    '2013-14': "2013-14 introduced a now-common dynamic with Dwight Howard's addition. A rim-running center paired with perimeter shooters, combined with Harden's pick-and-roll mastery, reshaped how teams structure offenses around a primary ball-handler with strategic spacing.",
    '2014-15': "2014-15 refined their system further. Trevor Ariza's role as a corner specialist while Harden orchestrated from the top became a blueprint for deploying 3-and-D wings around primary creators, a strategy now standard across the NBA.",
    '2015-16': "2015-16 represented the culmination of pre-D'Antoni concepts. The spacing strategies and shot selection criteria developed during this period directly influenced the league's current analytics-driven offensive approach, setting the stage for basketball's analytical revolution.",
    '2016-17': "2016-17 transformed the Rockets into an analytics-driven offensive juggernaut under D'Antoni. James Harden became the ultimate embodiment of statistical optimization, his step-back three and isolation play redefining perimeter scoring across the NBA.",
    '2017-18': "The 2017-18 Rockets reached the pinnacle of analytical basketball, pushing the superteam Warriors to the brink with their mathematically precise offense. Yet, in a cruel twist of fate, they missed 27 straight three-pointers in Game 7, turning their innovative strategy into a cautionary tale. This moment brutally exposed the limits of reducing basketball to pure mathematical probability.",
    '2018-19': "Harden's solo performance demonstrated how a systemically designed offensive strategy could consistently generate high-percentage opportunities, yet they failed when it mattered the most again.",
    '2019-20': "They replaced Chris Paul with Russell Westbrook, and to optimize Westbrook, they traded away their big-man, creating a new model of individual athleticism optimized through strategic design. But, this team failed when Westbrook got injured, marking D'Antoni's last season with them.",
    '2020-21': "The consequence of the Westbrook trade was the most radical positional experiment in NBA history with 'small ball'. P.J. Tucker's center role challenged traditional definitions, creating a hyper-switchable system that became a critical reference point for defensive versatility.",
    '2021-22': "2021-22 began post-Harden reconstruction while maintaining their strategic DNA. Young talents like Jalen Green embodied their continued commitment to developing players who could thrive in a high-efficiency, space-and-pace system.",
    '2022-23': "2022-23 represented a rebuilding year that preserved their innovative vision. The team's focus on athletic, shooting-capable young players demonstrated a sophisticated approach to talent identification that extended beyond traditional scouting metrics.",
    '2023-24': "2023-24 culminates their long-term strategic evolution. Alperen Şengün's emergence as a top tier playmaking big man calls back of now fan-favourite Luis Scola's days, proving the Rockets remain a crucial laboratory for NBA strategic innovation."
};

// Function to determine era based on season
function determineEra(season) {
    const seasonYear = parseInt(season.split('-')[0]);
    if (seasonYear >= 2020) return 'Rebuild Era Shot Chart';
    if (seasonYear >= 2015) return 'Peak Moreyball Era Shot Chart';
    if (seasonYear >= 2012) return 'Early Harden Era Shot Chart';
    if (seasonYear >= 2009 && seasonYear <= 2011) return 'Transition Era Shot Chart';
    if (seasonYear >= 2003) return 'Yao Ming/McGrady Era Shot Chart';
    return 'Traditional Era Shot Chart';
}

function getPlayerCardColor(playerName, season) {
    const seasonYear = parseInt(season.split('-')[0]);
    
    // Traditional Era (2000-2003)
    if (seasonYear >= 2000 && seasonYear <= 2002) {
        if (playerName === 'Steve Francis') {
            return '#CE1141'; // Rockets Red for Francis
        } else if (playerName === 'Cuttino Mobley') {
            return '#1B4A8A'; // Blue 
        } else {
            return '#2D9141'; // Green for third player
        }
    }
    
    // Yao Ming/McGrady Era (2004-2008)
    if (seasonYear >= 2003 && seasonYear <= 2008) {
        if (playerName === 'Yao Ming') {
            return '#CE1141'; // Rockets Red for Yao
        } else if (playerName === 'Tracy McGrady') {
            return '#1B4A8A'; // Blue for T-Mac
        } else {
            return '#2D9141'; // Green for third player
        }
    }
    
    // Transition Era (2009-2011)
    if (seasonYear >= 2009 && seasonYear <= 2011) {
        if (playerName === 'Aaron Brooks' || playerName === 'Kevin Martin') {
            return '#CE1141'; // Rockets Red for first player
        } else if (playerName === 'Luis Scola') {
            return '#1B4A8A'; // Blue for second player
        } else {
            return '#2D9141'; // Green for third player
        }
    }
    
    // Early Harden Era (2012-2014)
    if (seasonYear >= 2012 && seasonYear <= 2014) {
        if (playerName === 'James Harden') {
            return '#CE1141'; // Rockets Red for Harden
        } else if (playerName === 'Jeremy Lin' || playerName === 'Dwight Howard') {
            return '#1B4A8A'; // Blue for Lin and Howard
        } else {
            return '#2D9141'; // Green for third player
        }
    }
    
    // Peak Moreyball Era (2015-2020)
    if (seasonYear >= 2015 && seasonYear <= 2019) {
        if (playerName === 'James Harden') {
            return '#CE1141'; // Rockets Red for Harden
        } else if (playerName === 'Dwight Howard' || playerName === 'Chris Paul' || playerName === 'Russell Westbrook') {
            return '#1B4A8A'; // Blue for Howard and Paul
        } else {
            return '#2D9141'; // Green for third player
        }
    }
    
    // Rebuild Era (2021 onwards)
    if (seasonYear >= 2020) {
        if (playerName === 'Jalen Green' || playerName === 'John Wall') {
            return '#CE1141'; // Rockets Red for Green
        } else if (playerName === 'Kevin Porter Jr.' || playerName === 'Fred VanVleet') {
            return '#1B4A8A'; // Blue for Porter
        } else {
            return '#2D9141'; // Green for third player
        }
    }
    
    return 'white'; // Default color for other eras
}

// Update season display and chart
function updateChart() {
    const season = seasons[seasonSlider.value];
    const currentEra = determineEra(season);
    eraDisplay.textContent = currentEra;

    // Update shot chart image
    const shotChartPath = `../charts/Houston_Rockets/Houston_Rockets_${season}_frequency.png`;
    shootingChart.src = shotChartPath;
    shootingChart.alt = `Rockets shooting chart for ${season}`;
    
    // Update offensive strategy map
    const strategyMapPath = `../Strategy_Maps/${season}.png`;
    offensiveStrategyMap.src = strategyMapPath;
    offensiveStrategyMap.alt = `Rockets offensive strategy map for ${season}`;
    
    // Update players
    const players = SEASON_PLAYERS[season];
    const playerCards = document.querySelectorAll('.player-card');
    
    players.forEach((player, index) => {
        const card = playerCards[index];
        const playerImage = card.querySelector('.player-image');
        const playerName = card.querySelector('.player-name');
        const playerRole = card.querySelector('.player-role');
        
        // Format player name for image filename
        const imageFileName = player.name.replace(/\s+/g, '_');
        
        // Update player information
        playerImage.src = `../Players/${imageFileName}.png`;
        playerImage.alt = player.name;
        playerName.textContent = player.name;
        playerRole.textContent = player.role;
        
        // Set card background color based on player and era
        const backgroundColor = getPlayerCardColor(player.name, season);
        card.style.backgroundColor = backgroundColor;
        
        // Adjust text color for better contrast if background is colored
        if (backgroundColor !== 'white') {
            playerName.style.color = 'white';
            playerRole.style.color = 'rgba(255, 255, 255, 0.8)';
        } else {
            playerName.style.color = 'var(--primary-color)';
            playerRole.style.color = '#666';
        }
        
        // Error handling for player images
        playerImage.onerror = () => {
            console.error(`Failed to load player image: ${imageFileName}`);
            playerImage.src = '../Players/placeholder.png';
        };
    });
    
    // Error handling for both chart images
    shootingChart.onerror = () => {
        console.error(`Failed to load shot chart: ${shotChartPath}`);
        shootingChart.alt = 'Shot chart not available for this season';
    };

    offensiveStrategyMap.onerror = () => {
        console.error(`Failed to load strategy map: ${strategyMapPath}`);
        offensiveStrategyMap.alt = 'Strategy map not available for this season';
    };

    // Update annotations
    updateAnnotations(season);
}

// Function to update annotations
function updateAnnotations(season) {
    annotationTitle.textContent = `Overview`;
    
    if (SEASON_ANNOTATIONS[season]) {
        annotationText.textContent = SEASON_ANNOTATIONS[season];
    } else {
        annotationText.textContent = `${season} season. Detailed annotation not available for this season.`;
    }
}

function updatePlayers(season) {
    const players = SEASON_PLAYERS[season];
    const playerCards = document.querySelectorAll('.player-card');
    
    players.forEach((player, index) => {
        const card = playerCards[index];
        const playerImage = card.querySelector('.player-image');
        const playerName = card.querySelector('.player-name');
        const playerRole = card.querySelector('.player-role');
        
        // Format player name for image filename (replace spaces with underscores)
        const imageFileName = player.name.replace(/\s+/g, '_');
        
        // Update player information
        playerImage.src = `../Players/${imageFileName}.png`;
        playerImage.alt = player.name;
        playerName.textContent = player.name;
        playerRole.textContent = player.role;
        
        // Error handling for player images
        playerImage.onerror = () => {
            console.error(`Failed to load player image: ${imageFileName}`);
            playerImage.src = '../Players/placeholder.png'; // You might want to add a placeholder image
        };
    });
}

// Event Listeners
seasonSlider.addEventListener('input', () => {
    const selectedSeason = seasons[seasonSlider.value];
    selectedSeasonSpan.textContent = selectedSeason;
    updateChart();
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial season display
    selectedSeasonSpan.textContent = seasons[10]; // Default to middle of the range

    // Initial chart load
    updateChart();
});