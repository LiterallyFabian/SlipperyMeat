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