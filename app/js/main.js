$(document).ready(function () {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
});


function calculate() {
    $('#form').hide();
    $('#results').show();

    let unhookOdds = 0.04;
    let unhookAttempts = 3;
    let unhookText =
        `Base unhook odds: ${unhookOdds * 100}%.
        <br>Base unhook attempts: ${unhookAttempts}.
        <br>
        <br><b>Bonuses:</b>
        <br>`;

    let slipperyMeat = getSlipperyMeat();
    if (slipperyMeat.attempts > 0) {
        unhookAttempts += slipperyMeat.attempts;
        unhookOdds += slipperyMeat.odds;
        unhookText += `<b>Slippery Meat</b>:
        <br>Attempts: ${slipperyMeat.attempts}
        <br>Odds: ${(slipperyMeat.odds * 100).toFixed(2)}%.
        <br>
        <br>`;
    }

    let personalLuck = getPersonalLuck();
    if (personalLuck > 0) {
        unhookOdds += personalLuck;
        unhookText += `<b>Personal Luck</b>:
        <br>Odds: ${(personalLuck * 100).toFixed(2)}%.
        <br>
        <br>`;
    }

    let upTheAnte = getUpTheAnte();
    if (upTheAnte > 0) {
        unhookOdds += upTheAnte;
        unhookText += `<b>Up the Ante</b>:
        <br>Odds: ${(upTheAnte * 100).toFixed(2)}%.
        <br>
        <br>`;
    }

    let sharedLuck = getSharedLuck();
    if (sharedLuck > 0) {
        unhookOdds += sharedLuck;
        unhookText += `<b>Shared Luck</b>:
        <br>Odds: ${(sharedLuck * 100).toFixed(2)}%.
        <br>
        <br>`;
    }

    unhookText += `Total unhook odds: ${(unhookOdds * 100).toFixed(2)}%.
    <br>Total unhook attempts: ${unhookAttempts}.
    <br>
    <br>`;


    let failOdds = 1 - unhookOdds;
    for (let i = 0; i < unhookAttempts; i++) {
        let oddsOfFailing = Math.pow(failOdds, i + 1);
        let oddsOfSuccess = 1 - oddsOfFailing;

        unhookText += `Odds of unhooking at least once in ${i + 1} attempts: ${(oddsOfSuccess * 100).toFixed(2)}%.
        <br>`;

        $(`#sim-${i+1}`).attr('src', Math.random() < oddsOfSuccess ? 'img/icons/IconStatusEffects_luck.webp' : 'img/icons/IconHelpLoading_hook.webp');
    }

    $(`#sim-${unhookAttempts+1}`).attr('src', 'img/icons/IconHelp_entity.webp');
    $('.unhook-result').html(unhookText);
}

function closeIt(){ // naming it close doesn't work. i hate js 
    $('#form').show();
    $('#results').hide();
}

/**
 * Calculates total bonus attempts and odds from slippery meat.
 * @returns {JSON} The amount of bonus attempts and the total bonus odds
 */
function getSlipperyMeat() {
    switch (document.querySelector('input[name="slippery-meat"]:checked').value) {
        case "0": // No bonus
            return {
                attempts: 0,
                    odds: 0
            };
        case "1": // Slippery Meat level 1
            return {
                attempts: 3,
                    odds: 0.02
            };

        case "2": // Slippery Meat level 2
            return {
                attempts: 3,
                    odds: 0.03
            };
        case "3": // Slippery Meat level 3
            return {
                attempts: 3,
                    odds: 0.04
            };
    }
}

/**
 * Gets the bonus odds from using personal luck offerings.
 * @returns {Number} The total increased odds per unhook
 */
function getPersonalLuck() {
    return document.querySelector('input[name="personal-luck"]:checked').value / 100;
}

/**
 * Calculates total bonus odds of self unhooking from up the ante.
 * @returns {Number} The total increased odds in case all 4 players are alive
 */
function getUpTheAnte() {
    let total = 0;

    total += document.querySelector('#up-the-ante-1').value * 0.03;
    total += document.querySelector('#up-the-ante-2').value * 0.06;
    total += document.querySelector('#up-the-ante-3').value * 0.09;

    return total;
}

/**
 * Calculates total bonus odds from using shared luck offerings.
 * @returns {Number} The total increased odds per unhook
 */
function getSharedLuck() {
    let total = 0;

    total += document.querySelector('#shared-luck-1').value * 0.01;
    total += document.querySelector('#shared-luck-2').value * 0.02;
    total += document.querySelector('#shared-luck-3').value * 0.03;

    return total;
}